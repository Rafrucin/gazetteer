var e = document.getElementById("selectNumber");
getLocation();
var capital 
var countryName
var countryCode

var addressPoints = []
  
var map = L.map('map');
  
  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
var markers = L.markerClusterGroup();
    
map.addLayer(markers);

var eb = [0, 0]

L.easyButton('fa-info', function (btn, map) {
	$("#myModal").fadeIn();
}).addTo(map);

L.easyButton('fa-cloud-sun', function (btn, map) {
	$("#WeatherModal").fadeIn();
}).addTo(map);

L.easyButton('fa-flag', function (btn, map) {
	$("#flagModal").fadeIn();
}).addTo(map);

L.easyButton('fa-virus', function (btn, map) {
	$("#covidModal").fadeIn();
}).addTo(map);

L.easyButton('fa-couch', function (btn, map) {
	$("#holyModal").fadeIn();
}).addTo(map);

L.easyButton('fa-clock', function (btn, map) {
	$("#timeModal").fadeIn();
}).addTo(map);
L.easyButton('fa-newspaper', function (btn, map) {
	$("#newsModal").fadeIn();
}).addTo(map);


var helloPopup = L.popup().setContent('Zero, Zero');


    L.easyButton('fa-globe', function (btn, map) { helloPopup.setLatLng(eb).openOn(map); map.panTo(new L.LatLng(0, 0)); }).addTo(map);
  


function getLocation() {
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
	  x.innerHTML = "Geolocation is not supported by this browser.";
	}
  };

	$('#selectNumber').change(function(){
		var e = document.getElementById("selectNumber");
		var c = e.value;
		loaddata();
		drawBorder(c);
	})
	

	var rr = "";
			// Get the modal
	var modal = document.getElementById("myModal");
	var weatherModal = document.getElementById("WeatherModal");
	var flagModal = document.getElementById("flagModal");
	var covidModal = document.getElementById("covidModal");
	var holyModal = document.getElementById("holyModal");
	var timeModal = document.getElementById("timeModal");
	var newsModal = document.getElementById("newsModal");
	
	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");
			
		async function showPosition(position) {
		  var latvar = position.coords.latitude;
		  var lngvar = position.coords.longitude;
		  while(!rr){
			  getCountryCodefunc(latvar, lngvar);
			  await new Promise(r => setTimeout(r, 1000));}
		  filldata(rr);
		  //$("#myModal").fadeIn();

		  
		};

	
	function closeModals() {

		$("#myModal").fadeOut();
		$("#WeatherModal").fadeOut();
		$("#flagModal").fadeOut();
		$("#covidModal").fadeOut();
		$("#holyModal").fadeOut();
		$("#timeModal").fadeOut();
		$("#newsModal").fadeOut();
	}

	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = "none";
	  }
	  if (event.target == weatherModal) {
		weatherModal.style.display = "none";
	  }
	  if (event.target == flagModal) {
		flagModal.style.display = "none";
	  }
	  if (event.target == covidModal) {
		covidModal.style.display = "none";
	  }
	  if (event.target == holyModal) {
		holyModal.style.display = "none";
	  }	  
	  if (event.target == timeModal) {
		timeModal.style.display = "none";
	  }	
	  if (event.target == newsModal) {
		newsModal.style.display = "none";
	  }	
	}

	
	
function getCountryCodefunc(lat, lng) {		
	$.ajax({
		url: "libs/php/getCountryCode.php",
		type: 'POST',
		dataType: 'json',
		data: {
			lat: lat,
			lng: lng
		},						
		success: function(result) {
			if (result.status.name == "ok") {
				
				rr = result['data']['countryCode']		
			}	
		},
		error: function(jqXHR, textStatus, errorThrown) {
		}
	}); 
};
	
function filldata(arg) {
	$.ajax({
		url: "libs/php/getCountryInfo.php",
		type: 'POST',
		dataType: 'json',
		data: {
			country: arg
		},
		success: function(result) {
			if (result.status.name == "ok") {
				$('#txtContinent').html(result['data'][0]['continent']);
				$('#txtCapital').html(result['data'][0]['capital']);
				$('#txtLanguages').html(result['data'][0]['languages']);
				$('#txtPopulation').html(result['data'][0]['population']);
				$('#txtArea').html(result['data'][0]['areaInSqKm']);
				$('#currency').html(result['data'][0]['currencyCode']);
				$('#countryName').html(result['data'][0]['countryName']);	
				document.getElementById("selectNumber").value = result['data'][0]['countryName'];
				document.getElementById("modalimg").src = 'https://img.geonames.org/img/country/250/'+arg+'.png'
				drawBorder(result['data'][0]['countryName']);	
				capital = result['data'][0]['capital'];
				countryName = result['data'][0]['countryName']
				countryCode = result['data'][0]['countryCode']
				GetPois(countryName);
				GetWeather(capital);
				GetFlag();
				GetCovid(countryCode);
				GetHolidays(countryCode);
				GetTime(capital);
				GetNews(countryCode);				
			}		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// your error code
		}
	}); 
};


var countryObj
async function loaddata(){
	var e = document.getElementById("selectNumber");
	var country = e.value;	
	countryObj = ''
	while(!countryObj){GetCountryObj(country);
		await new Promise(r => setTimeout(r, 1000));}		
	filldata(countryObj.properties.iso_a2);
}



function GetCountryObj(arg) {
	$.ajax({
		url: "libs/php/getCountryJson.php",
		type: 'POST',
		dataType: 'json',
		data: {
			countryOrCountryCode: arg
		},
		success: function(result) {
			if (result.status.name == "ok") {
				var parseJson = JSON.parse(result.data)							
				countryObj = parseJson;			
			}		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};


GetCountryList()
function GetCountryList() {
	$.ajax({
		url: "libs/php/getCountryList.php",
		type: 'GET',
		dataType: 'json',
		success: function(result) {
			if (result.status.name == "ok") {
				var parseJson = JSON.parse(result.data)					
				var select = document.getElementById("selectNumber"); 
				select.innerHTML = "";
				for(var i = 0; i < parseJson.length; i++) {
					var opt = parseJson[i];
					select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
				}		
			}		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};


var geoJSONStyle = {
    "color": "#ebde34",
    "weight": 5,
    "opacity": 0.65
};

var countryBorders
async function drawBorder(name) {
	var e = document.getElementById("selectNumber");
		var country = e.value;	
		countryObj = ''
		while(!countryObj){GetCountryObj(country);
			await new Promise(r => setTimeout(r, 1000));}	
		if(countryBorders){countryBorders.removeFrom(map)}
		countryBorders=L.geoJSON(countryObj, {
			style: geoJSONStyle
		}).addTo(map);			
		map.fitBounds(countryBorders.getBounds());
		let rr = countryObj.properties.name
}


var redMarker = L.ExtraMarkers.icon({
    icon: 'fa-utensils',
    markerColor: 'pink',
    shape: 'square',
    prefix: 'fas'
  });

function GetPois(arg) {
	$.ajax({
		url: "libs/php/getpois.php",
		type: 'POST',
		dataType: 'json',
		data: {
			poiloc: arg,
		},
		success: function(result) {
			if (result.status.name == "ok") {
				var parseJson = JSON.parse(result.data)							
				markers.clearLayers();	
				addressPoints =[];
				parseJson.results.forEach(setPOIs);	
			for (var i = 0; i < addressPoints.length; i++) {
				var a = addressPoints[i];
				var title = a[2];
				var marker = L.marker(new L.LatLng(a[0], a[1]), {title: title, icon: redMarker});
				marker.bindPopup(title);
				markers.addLayer(marker);				
			  }
			  GetAdditionalPois(arg);
			}		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};

var eyeMarker = L.ExtraMarkers.icon({
    icon: 'fa-eye',
    markerColor: 'orange',
    shape: 'circle',
    prefix: 'fas'
  }); 

function GetAdditionalPois(arg) {
	$.ajax({
		url: "libs/php/getadditionalpois.php",
		type: 'POST',
		dataType: 'json',
		data: {
			poiloc: arg,
		},
		success: function(result) {
			if (result.status.name == "ok") {
				var parseJson = JSON.parse(result.data)							
				addressPoints =[];
				parseJson.results.forEach(setPOIs);	
			for (var i = 0; i < addressPoints.length; i++) {
				var a = addressPoints[i];
				var title = a[2];
				var marker = L.marker(new L.LatLng(a[0], a[1]), {title: title, icon: eyeMarker});
				marker.bindPopup(title);
				markers.addLayer(marker);
			  }
			}		
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};

function setPOIs(item, index) {
	addressPoints.push([item.coordinates.latitude, item.coordinates.longitude, item.name])	
}

function GetWeather(arg) {
	$.ajax({
		url: "libs/php/getweather.php",
		type: 'POST',
		dataType: 'json',
		data: {
			loc: arg,
		},
		success: function(result) {
			if (result.status.name == "ok") {
				var parseJson = JSON.parse(result.data)	
				var ico = parseJson.list[0].weather[0].icon
				var temp = Math.round(parseJson.list[0].main.temp - 273.15);
				var feels = Math.round(parseJson.list[0].main.feels_like - 273.15);		
				document.getElementById("weatherpic").src = 'https://openweathermap.org/img/w/'+ico+'.png'
				$('#desc').html(parseJson.list[0].weather[0].main);					
				$('#temp').html('Temperature: ' + temp + 'C');	
				$('#feels').html('Feels like: ' + feels + 'C');	
				$('#capital').html('<h4> ' + arg + '</h4>');
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};

function GetFlag(){
	document.getElementById("flagpic").src = 'https://flagcdn.com/160x120/'+countryCode.toLowerCase()+'.png'
	$('#country').html('<h4> ' + countryName + '</h4>');
}

$(window).on('load', function () 
	{if ($('#preloader').length) 
	{$('#preloader').delay(1000).fadeOut('slow',function () 
	{$(this).remove();});}});

function GetCovid(arg) {
	$.ajax({
		url: "libs/php/getcovid.php",
		type: 'POST',
		dataType: 'json',
		data: {
			countryCode: arg,
		},
		success: function(result) {
			if (result.status.name == "ok") {
				var resultObj = JSON.parse(result.data);				
				$('#covidCountry').html('<h4> ' + countryName + '</h4><br><strong>Covid cases</strong>');
				$('#covidconfirmed').html('Confirmed: '+resultObj[0].confirmed);
				$('#covidcritical').html('Critical: '+resultObj[0].critical);
				$('#coviddeaths').html('Deaths: '+resultObj[0].deaths);
				$('#covidrecovered').html('Recovered: '+resultObj[0].recovered);

			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};


function GetHolidays(arg) {
	$.ajax({
		url: "libs/php/getHoliday.php",
		type: 'POST',
		dataType: 'json',
		data: {
			countryCode: arg,
		},
		success: function(result) {
			if (result.status.name == "ok") {				
				if(!result.data){
					$('#holyModalContent').html('<h4>No Data<h4>');
				}
				else{						
					$('#holyModalContent').html('');
					var str ='<table><caption>'+countryName+'<br>Public Holidays</caption>'
					for(var i = 0; i < result.data.length; i++) {
					var holiday = result.data[i];					
					str = str+'<tr><td align="right">'+holiday.date+'</td><td>'+holiday.name+'</td></tr>'
					}
					str = str+'</table>'					
					$('#holyModalContent').html(str);
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};

//GetTime('London')
function GetTime(arg) {
	$.ajax({
		url: "libs/php/getTime.php",
		type: 'POST',
		dataType: 'json',
		data: {
			capital: arg,
		},
		success: function(result) {
			if (result.status.name == "ok") {				
				if(!result.data){
					$('#timeModalContent').html('<h4>No Data<h4>');
				}
				else{
				var str = 'It is <br>'+result.data.date_time_txt+'<br>in '+arg
				$('#timeModalContent').html(str);
				}	
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};

function GetNews(arg) {
	$.ajax({
		url: "libs/php/getNews.php",
		type: 'POST',
		dataType: 'json',
		data: {
			countryCode: arg,
		},
		success: function(result) {
			if (result.status.name == "ok") {				
				if(//!result.data &&result.data.status == 'error'&&
				 !result.data.totalResults){
					console.log(result)
					$('#newsModalContent').html('<h4>No Data<h4>');
				}
				else{
					console.log(result);
					var str = '<div><h3>Top 3 news from '+countryName+'</h3></div>'
					var max_infos = 3;
					var act_infos = 0;
					for(var i = 0; i < 10; i++) {
						if(!result.data.results[i].link || !result.data.results[i].title || !result.data.results[i].description || act_infos>=3){
							continue;	
						}
						str = str + '<div><div><a href="'+result.data.results[i].link+'" target="_blank"><strong>'+result.data.results[i].title+'</strong></a></div>';
						str = str + '<div><p>'+result.data.results[i].description+'</p></div><div>'
						act_infos++;
						if (act_infos < 3){
							str = str + '<div><hr></div>'
						}
					}
					console.log(str);
					$('#newsModalContent').html(str);
				}	
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		}
	}); 
};

