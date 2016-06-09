
ALL_SENTENCES_HUMANIZE_TAB = [];


$( window ).load(function() {
	$( ".popup" ).hide();
	loopHumanize();
});


var ALL_SENTENCES_HUMANIZE_TAB;



function loopHumanize() {
	getSentenceForRainAndTemperature();
	setInterval(displayHumanizeData,50000);
	
}

//Affiche toutes les phrases de ALL_SENTENCES_HUMANIZE_TAB dans l'ordre (on peut rajouter des phrases a la volée dans ALL_SENTENCES_HUMANIZE_TAB)
function displayHumanizeData() {
	
	displayHumanizeData.count = (++displayHumanizeData.count)%ALL_SENTENCES_HUMANIZE_TAB.length || 0; //0 au debut quand ce n'est pas initialise
	
	//console.log(ALL_SENTENCES_HUMANIZE_TAB[displayHumanizeData.count]);
	sayPopup("popupHumanize",ALL_SENTENCES_HUMANIZE_TAB[displayHumanizeData.count]);
}


function getSentenceForTemperature() {
	var str = $('#weather').find("div").filter(".temperature").children("h2").text();
	
	var typeDegre = str[str.length-1];
	var degre = parseInt(str.substr(0,str.length-2));  //on enleve le symbole de degre et le F ou C  puis on transforme en int
	
	var stringToDisplay = "";
	
	
	if (typeDegre == "C") {
		if (degre < 0) {
			stringToDisplay+= "Be careful it's very cold outside today ( below 0°C) !";
		}
		else if (degre < 12) {
			stringToDisplay+= "Don't forget your coat if you go outside !";
		}
		else if (degre < 20) {
			stringToDisplay+= "You should take a light jacket with you if you go outside!";
		}
		else {
			stringToDisplay+= "You can wear something light today it's really hot outside!";
		}
	}
	//Pour les farenheit
	else {
		if (degre < 32) {
			stringToDisplay+= "Be careful it's very cold outside today ( below 0°C) !";
		}
		else if (degre < 53) {
			stringToDisplay+= "Don't forget your coat if you go outside !";
		}
		else if (degre < 72) {
			stringToDisplay+="You should take a light jacket with you if you go outside!";
		}
		else {
			stringToDisplay+="You can wear something light today it's really hot outside!";
		}
	}
	
	return stringToDisplay;
}


function getSentenceForRainAndTemperature(){
	var humidity = $('#weather').find("span").filter(".wi-humidity").text();
	humidity = humidity.split(' ').join('');
	humidity = parseInt(humidity.substr(0,humidity.length-1));
	
	sentence =  getSentenceForTemperature();
	
	$.simpleWeather({
        location: getCurrentTown(),
        woeid: '',
        unit: getDegreType(),
        success: function (weather) {
			
			if (weather.rising==2) {
				ALL_SENTENCES_HUMANIZE_TAB.push( sentence+ " And be sure to take your umbrella!");
			}
			else {
				ALL_SENTENCES_HUMANIZE_TAB.push(sentence+ " And no need to take an umbrella today!");
			}
		},
        error: function (error) {
            
        }
	});
}



function getCurrentTown() {
	return $('#city').text();
}

function getDegreType() {
	var str = $('#weather').find("div").filter(".temperature").children("h2").text();
	return str[str.length-1];
}


function sayPopup(popupId,sentence) {
	$( "#"+popupId ).children("div").text(sentence);
	displayPopup(popupId); //defini dans popup.php
}