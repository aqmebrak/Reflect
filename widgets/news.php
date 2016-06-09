<div id="news" class="draggable grabbable">
    <marquee scrollamount="10"></marquee>
</div>

<!------------------------------------------->
<!--------- Style for the newsfeed ---------->
<!------------------------------------------->
<style>
    #news {
        border: 2px white solid;
        border-radius: 10px;
        width: 40%;
        color: white;
        font-size: x-large;
        font-weight: bold;
    }
</style>

<!--------------------------------------------------------------------------------------->
<!-- Php to get the url from the user's config file, load the xml and fetch the titles -->
<!--------------------------------------------------------------------------------------->
<?php
$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

$url = $data['news']['url'];


$content = file_get_contents($url);
$xml = new SimpleXmlElement($content);
$news = [];

foreach($xml->channel->item as $entry) {
    array_push($news,(string) $entry->title);
}

$final = json_encode($news);
?>

<!------------------------------------------------->
<!------ Script for displaying the newsfeed ------->
<!------------------------------------------------->
<script>
    listNewsTitle = <?php echo $final; ?>;
    var length = listNewsTitle.length;
    // First call so we don't wait the first setInterval
    $('#news').find("marquee").text(listNewsTitle[0]);
    setInterval(function() {
            var number = 1 + Math.floor(Math.random() * length); // Random between 1 and length
            $('#news').find("marquee").text(listNewsTitle[number]);
        },
        15000); // every 15 second

    $("#news").mousedown(function () {
        document.cookie = "currentWidget=news";
    });

    /* Put this to make the widget draggable */
    var $draggable = $('.draggable').draggabilly({
        // options...
    });

    //first set the cookie when the widget is selected
    //then ask to a php to change the position of the widget
    var news = "news";
    $("#" + news)
        .mousedown(function () {
            document.cookie = "currentWidget=" + news;
        })
        .mouseup(function () {
            document.cookie = "currentWidget=";
            setTimeout(function(){
                var left = $("#" + news).css("left");
                var top = $("#" + news).css("top");
                $.ajax({
                    url: 'widgetsPosition/setWidgetPosition.php',
                    data: {currentWidget: news, left: left, top: top}
                });
            }, 100);

        });
</script>



