function createTable(tableData) {
var table = document.createElement('table');
var tableBody = document.createElement('tbody');
var headers = ["ledger", "destination", "hash", "amount", "date", "time"];
var header = document.createElement('tr');
headers.forEach(function(cellData) {
  var cell = document.createElement('th');
  cell.appendChild(document.createTextNode(cellData));
  header.appendChild(cell);
 tableBody.appendChild(header);  
});
tableData.forEach(function(rowData) {
  var row = document.createElement('tr');
  rowData.forEach(function(cellData) {
    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode(cellData));
    row.appendChild(cell);
  });
   tableBody.appendChild(row);  
  });
  table.appendChild(tableBody);
  document.body.appendChild(table);
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function getResponse(url){
var table = [];
var response = JSON.parse(httpGet(url));
response.transactions.forEach(function(el) {
 if (el.tx.Destination==="rMtb2JEX8xmcgSKxCB7aZPDyzyVhbM2RzV") {
//date
//hash
//ledger_index
//tx.Account
//tx.Amount
//tx.Destination
//tx.DestinationTag
//tx.Fee
//tx.Flags
//tx.Sequence
//tx.SigningPubKey
//tx.TransactionType
//tx.TxnSignature
    table.push([el.ledger_index,el.tx.DestinationTag,el.hash,parseFloat(el.tx.Amount)/1000000,new Date(el.date).toLocaleDateString(),new Date(el.date).toLocaleTimeString()]);
}
})
if(document.getElementsByTagName("table")[0]) document.getElementsByTagName("table")[0].remove();
createTable(table);
};
function switchDateStatus(){
  var s = document.getElementById("start");
  var e = document.getElementById("end");
  s.disabled = !s.disabled;
  e.disabled  = !e.disabled;
}
function openXRP(){
  var switcher = document.getElementById("dateSwitch").checked;
  var start = "";
  var end = "";
  descending = document.getElementById("descendingSwitch").checked;
  limit = parseInt(document.getElementById("limitValue").value);
  if(switcher){
  start = "&start=" + new Date(document.getElementById("start").value).toISOString();
  end = "&end=" + new Date(document.getElementById("end").value).toISOString();
}
  return "https://data.ripple.com/v2/accounts/rMtb2JEX8xmcgSKxCB7aZPDyzyVhbM2RzV/transactions?descending="+descending+"&limit="+limit+start+end;
  }