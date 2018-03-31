function getResponse(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}
function getUrl(address,descending="true",limit="50",start="",end=""){
	return "https://data.ripple.com/v2/accounts/"+address+"/transactions?descending="+descending+"&limit="+limit+start+end;
}
function getValids(){
	var xrpAddress = ["rUocf1ixKzTuEe34kmVhRvGqNCofY1NJzV","rGDqRw6JcoRaW5xbwd5hfiQ6C89NNU2iyu"];
	var respone;
	xrpAddress.forEach(function(a){
		response = response.concat(getResponse(getUrl(xrpAddress)));
	});
	var valid = [];
	response.transactions.forEach(
			function(el){
				if(
					(el.tx.Destination===xrpAddress)&&
					((""+el.tx.DestinationTag).length<6)
				) 
				valid.push(el.hash);
			}
		)
	return valid;
}