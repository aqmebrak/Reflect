
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
      }, 4000 );
    }
 </script>

<style>

 #effect {
	margin-left:60%;
    width:30%;
	
    border-radius: 7px;
    border: medium solid white;
    display: block;
    background-color:white;
	z-index:5;
	position:fixed;
	padding:0.5%;
	
	
	}

</style>



<div id="effect" class="ui-widget-content ui-corner-all">
	bla
</div>