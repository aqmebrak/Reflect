<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mirror</title>
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/jquery.simpleWeather.min.js"></script>
    <script src="js/weather.js"></script>

	<link href="css/mirror.css" rel="stylesheet">
    <script src="js/bootstrap.min.js"></script>
    <script>
        window.setInterval(function(){
            if(localStorage.getItem("reload")) {
                location.reload();
                localStorage.removeItem("reload");
            }
        }, 5000);
	</script>	
</head>
<body>
<?php
echo $_POST['uid'];
?>
<div id="weather"></div>

<div class="grabbable" > Grab me !</div>
</body>

<script>/*
	alert(document.getElementsByClassName('grabbable')[0]);
	(document.getElementsByClassName('grabbable')[0]).kendoDraggable({

  dragstart: function(){
     alert("a");
     $('.draggable').css('background-color', 'red');
  },
  dragend:  function(){
     $('.draggable').css('cursor', 'default');
  }
});
	
	
	
	/*
		var elems = document.getElementsByClassName('grabbable');
		alert(elems.length);
		elems[0].style.color = 'red';
		alert("a");
		alert(elems[0]);
		/*
		elems.forEach( function (elem) {
			elem.onclick=function(){
				elem.style.color = 'blue';
			}
		}
		*/
	</script>
</html>