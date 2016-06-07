$(document).ready(function() {
    $("#submit").click(function() {
        localStorage.setItem("reload",true);
    })
});



function redirectConfig() {
	var millisecondsToWait = 200;
	setTimeout(function() {
		document.location.href='config/weather-config.php
	}, millisecondsToWait);
	
}