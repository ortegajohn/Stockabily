
//VWWIWESKA8BRE45M
//https://www.alphavantage.co/documentation/



//cc491c72759e4d54a13d6375ad7ed4b8
//https://iextrading.com/developer/docs
// end point https://api.iextrading.com/1.0  /stock/aapl/chart

var price;
var company;
var tickers_already_used = [];
// var column_symbol = $("<th>")
// var column_company = $("<th>")
// var column_price = $("<th>")
// var column_market = $("<th>")

var html_col_values ={
  column_symbol : $("<th>"),
  column_company : $("<th>"),
  column_price : $("<th>"),
  column_market : $("<th>")

}

var table_values = {
  symbol:"",
  price:"",
  company:"",
  market:"",
}

function table(ticker){
  var symbol_table = $("<tr>")
  
  symbol_table.append(`<th id="${ticker}_symbol" class= "symbol" scope="col"></th>`)
  symbol_table.append(`<th id="${ticker}_company" class= "company" scope="col"></th>`)
  symbol_table.append(`<th id="${ticker}_price" class= "price" scope="col"></th>`)
  symbol_table.append(`<th id="${ticker}_market" class= "market" scope="col"></th>`)

$("#table_content").append(symbol_table)
}


function set_symbol(x){
  $("#"+x+"_symbol").text(x)
}


function get_market_cap(ticker){
  $.ajax({
    ///stock/aapl/batch?types=quote,news,chart&range=1m&last=1
    url: "https://api.iextrading.com/1.0/stock/"+ticker+"/batch?types=quote,news,chart&range=1m&last=1",
    method: "GET"
  }).then(function(response) {
    // set_market(response.quote.marketCap)
    $("#"+ticker+"_market").text(response.quote.marketCap)
  });
}


function get_ticker_info(ticker){

  var time_series = [];

      $.ajax({
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey=VWWIWESKA8BRE45M",
        method: "GET"
      }).then(function(response) {
    // console.log("response: ",response)
   
    for(i in response["Time Series (Daily)"]){
      time_series.push(i)
    }
    y  = time_series[0].replace(/^\s+/,"")    
    
    price = response["Time Series (Daily)"][y]["1. open"]
    // console.log(".then_price: ",price);
    // set_price(price)
    $("#"+ticker+"_price").text(response["Time Series (Daily)"][y]["1. open"])
 
    });//.then    

}

function get_ticker_company(ticker){

  $.ajax({
    url: "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+ticker+"&apikey=VWWIWESKA8BRE45M",         
    method: "GET"
  }).then(function(response2) {
    // console.log("response2: ",response2.bestMatches[0]["2. name"])
    company = response2.bestMatches[0]["2. name"]
    // set_company(company)
    $("#"+ticker+"_company").text(response2.bestMatches[0]["2. name"])
    });//.then
    
}


// error link image "https://media.tenor.com/images/b24bfe9402330f5b14ef7dfdd65c6b7a/tenor.gif"
$(document).ready(function() {

});

$(document).on("click",".button", function(e) {
  event.preventDefault();
  var ticker = $(".input").val()
  
  // console.log("ticker: ",ticker)
  console.log("tickers_already_used: ",tickers_already_used.indexOf(ticker))
  if(tickers_already_used.indexOf(ticker)<=-1){
    tickers_already_used.push(ticker);
    table(ticker)
  }
  

  set_symbol(ticker)
  get_market_cap(ticker)
  get_ticker_info(ticker)
  get_ticker_company(ticker)

  

  console.log("table_values: ",table_values)

  $(".input").val("")
  });

  //news 
  //https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10

  function stockinfo(symbol){

    $.ajax({
      url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+symbol+"&apikey=MVG2GAAJUF1WORNH",
      method: "GET"
    }).then(function(response) {
      console.log(response)

      var time_series =[];
      for(i in response["Time Series (Daily)"]){
        time_series.push(i)
      }
      a  = time_series[0].replace(/^\s+/,"")    
       var openPrice = response["Time Series (Daily)"][a]["1. open"]
      console.log(price);
      
      b = time_series[1].replace(/^\s+/,"")
      var highPrice = response["Time Series (Daily)"][b]["2. high"]
     
      c= time_series[2].replace(/^\s+/,"")
      var lowPrice = response["Time Series (Daily)"][c]["3. low"]

      d = time_series[3].replace(/^\s+/,"")
      var lowPrice = response["Time Series (Daily)"][d]["4. close"]


    var symbol = $(".input").val();
    var symbolName = $("<div>");
    var p1 = $("<p>");
    p1.text("Symbol:  " + symbol);
    p1.addClass("para1")

    var open = $("<div>");
    var p2 = $("<p>");
   p2.text("price: " + openPrice )
   p2.addClass("para2")

    var high = $("<div>")
    var p3 = $("<p>");
    p3.text("High Price:  " + highPrice);
    p3.addClass("para3")

    var low = $("<div>");
    var p4 = $("<p>");
    p4.text("low price " + lowPrice);
    p4.addClass("para4")

    var close = 

    
    symbolName.append(p1)
    open.append(p2)
    high.append(p3)
    low.append(p4)
    $("#stockcontent").append(symbolName)
    $("#stockcontent").append(open)
    $("#stockcontent").append(high)
    $("#stockcontent").append(low)
    
    });
  };
  
    
  $(document).on("click","#stockdetails", function(e) {
    var symbol = $(".input").val()
    event.preventDefault();
    stockinfo(symbol);
    
  })