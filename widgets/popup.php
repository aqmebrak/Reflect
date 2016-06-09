
<script>

	

    // run the currently selected effect
    function displayPopup(popupId) {
		
		
      // get effect type from
      //var selectedEffect = $( "#effectTypes" ).val();
	  var effect = "drop";
 
      // most effect types need no options passed by default
      var options = {};
      
 
      // run the effect
      $( "#"+popupId ).show( effect, options, 220, callbackPopup(popupId) );
    }
 
    //callback function to bring a hidden box back
    function callbackPopup(popupId) {
      setTimeout(function() {
		  
        $( "#"+popupId+":visible" ).removeAttr( "style" ).fadeOut();
      }, 200000 );
    }
 </script>

<style>

.popup {
	left:55%;
	border-radius: 7px;
    border: medium solid white;
	z-index:5;
	position:fixed;
	
	font-weight:bold;
	
	max-width:34vw;
	
	
	
	/*background:url(./images/avatar.svg) no-repeat;*/
	background-color: white;
	
}

.popup span  {
	width:20%;
}

.popup * {
	float:left;
	display:inline;
}

.popup div {
	width:60%;
	margin-left:2vw;
}

 #popupHumanize {
	top:9%;
}
	
#popupCountdown {
	top:38%;
}

</style>



<div id="popupHumanize" class="ui-widget-content ui-corner-all popup">
	<span><img src="./images/avatar.svg"  /></span><div></div>
</div>

<div id="popupCountdown" class="ui-widget-content ui-corner-all popup">
<img src="./images/avatar.svg" width="100" /><div></div>
</div>

