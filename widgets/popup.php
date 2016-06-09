
<script>
    // run the currently selected effect
    function displayPopup() {
      // get effect type from
      //var selectedEffect = $( "#effectTypes" ).val();
	  var effect = "drop";
 
      // most effect types need no options passed by default
      var options = {};
      
 
      // run the effect
      $( "#effect" ).show( effect, options, 220, callbackPopup );
    }
 
    //callback function to bring a hidden box back
    function callbackPopup() {
      setTimeout(function() {
        $( "#effect:visible" ).removeAttr( "style" ).fadeOut();
      }, 5000 );
    }
 </script>

<style>

 #effect {
	margin-left:55%;
    width:30%;
	
    border-radius: 7px;
    border: medium solid white;
    display: block;
   
	z-index:5;
	position:fixed;
	padding:0.5%;
	font-weight:bold;
	background:url(./images/avatar.svg) no-repeat;
	background-color: white;
	
	padding-left:4.5%;
	
	}

</style>



<div id="effect" class="ui-widget-content ui-corner-all">
	bla
</div>