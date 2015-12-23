var radius = 6371000; //Earth radius in meters

var latitude1;
var longitude1;
var latitude2;
var longitude2;

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

//Returns distance in meters
function distance(lati1, long1, lati2, long2)
{
	//Uses haversine formula
	var sinDeltaLati = Math.sin((lati2-lati1).toRad()/2);

	var sinDeltaLong = Math.sin((long2-long1).toRad()/2);

	return 2*radius*Math.asin(Math.sqrt(sinDeltaLati*sinDeltaLati + Math.cos(lati1.toRad()) * Math.cos(lati2.toRad()) * sinDeltaLong * sinDeltaLong));
}

console.log("GEG");
$( document ).ready(function() {
	$("#calculate").click(function( event ) {
		console.log("Hi!");
		var alright = false;

		//Empty address, use lati/long...
		latitude1 = parseFloat($("#lati1").val());
		if(!isNaN(latitude1))
		{
			longitude1 = parseFloat($("#long1").val());
			if(!isNaN(longitude1))
				alright = true;
		}

		if(alright)
		{
			alright = false;
			latitude2 = parseFloat($("#lati2").val());
			if(!isNaN(latitude2))
			{
				longitude2 = parseFloat($("#long2").val());
				if(!isNaN(longitude2))
					alright = true;
			}
		}

		if(alright)
		{
			$("#result").html((distance(latitude1,longitude1,latitude2,longitude2)/1000).toFixed(2) + " km");
		}
	
	});

	$("#addressReq1").click( function() {
		var xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        var array = JSON.parse(xmlhttp.responseText);
		        setToTextfield(array);
		    }
		};
		xmlhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+$("#address1").val(), true);
		xmlhttp.send();
		
		function setToTextfield(array) {
			$("#lati1").val(array.results[0].geometry.location.lat);
			$("#long1").val(array.results[0].geometry.location.lng);
		}
	});

	$("#addressReq2").click( function() {
		var xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        var array = JSON.parse(xmlhttp.responseText);
		        setToTextfield(array);
		    }
		};
		xmlhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+$("#address2").val(), true);
		xmlhttp.send();
		
		function setToTextfield(array) {
			$("#lati2").val(array.results[0].geometry.location.lat);
			$("#long2").val(array.results[0].geometry.location.lng);
		}
	});
});

$("#calculate").on("click", function() { console.log(".o."); } );
console.log("wgw");