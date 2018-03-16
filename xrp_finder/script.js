function getResponse(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}
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
function getUrl(address,descending="true",limit="50",start="",end=""){
	return "https://data.ripple.com/v2/accounts/"+address+"/transactions?descending="+descending+"&limit="+limit+start+end;
}
function getValids(){
	var xrpAddress = "rUocf1ixKzTuEe34kmVhRvGqNCofY1NJzV";
	var response = getResponse(getUrl(xrpAddress));
	var valid = [];
	response.transactions.forEach(
			function(el){
				if(
					(el.tx.Destination===xrpAddress)&&
					(el.tx.DestinationTag===0)
				) 
				valid.push(el.hash);
			}
		)
	return valid;
}
function worker(){
	var olds = [];
	var news = [];
	var i = 0;
	var timer = setInterval(function(){
		news = getValids();
		news.forEach(function(el){
			if (!olds.includes(el)) {
				olds.push(el);
				console.log (olds.includes(el));
				new Audio('https://pidmax.github.io/xrp/found.mp3').play();
				window.open('https://xrpcharts.ripple.com/#/transactions/'+el,'_blank');
				i++;
				
			}
		});
	},1000);
}