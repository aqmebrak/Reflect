
loopChangeCursor();

function loopChangeCursor() {
	setInterval(checkAndChangeCursorImage,30);
	
}

// ENUM des positions de la souris, de plus en plus loin de l'utilisateur
// CLICKER -> VERY_CLOSE -> CLOSE -> MID -> FAR_AWAY -> CLIC


function checkAndChangeCursorImage() {
	var url = "http://localhost:8080/reflect";
	
	$.getJSON(url+"/database/cursor/cursor_status.json", function(json) {
		
		switch(json.status) {
			case "CLICKER" : $('html').css("cursor","url("+url+"/images/curs/clicker.cur), pointer"); $('a').css("cursor","url("+url+"/images/curs/clicker.cur), pointer"); break;
			case "VERY_CLOSE" : $('html').css("cursor","url("+url+"/images/curs/clicker1.png), pointer");$('a').css("cursor","url("+url+"/images/curs/clicker1.png), pointer"); break;
			case "CLOSE" : $('html').css("cursor","url("+url+"/images/curs/clicker2.png), pointer"); $('a').css("cursor","url("+url+"/images/curs/clicker2.png), pointer");break;
			case "MID" : $('html').css("cursor","url("+url+"/images/curs/clicker3.png), pointer");$('a').css("cursor","url("+url+"/images/curs/clicker3.png), pointer"); break;
			case "FAR_AWAY" : $('html').css("cursor","url("+url+"/images/curs/clicker4.png), pointer");$('a').css("cursor","url("+url+"/images/curs/clicker4.png), pointer"); break;
			case "CLIC" : $('html').css("cursor","url("+url+"/images/curs/clicker5.png), pointer");$('a').css("cursor","url("+url+"/images/curs/clicker5.png), pointer"); break;
			default : $('html').css("cursor","url("+url+"/images/curs/clicker.cur), pointer");$('a').css("cursor","url("+url+"/images/curs/clicker.cur), pointer"); break;
		}
		
	});
}


function redirectConfig() {
	var millisecondsToWait = 200;
	setTimeout(function() {
		document.location.href='http://localhost:8080/reflect/config/weather-config.php';
	}, millisecondsToWait);
	
}