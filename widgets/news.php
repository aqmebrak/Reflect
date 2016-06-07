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
        height: 10%;
        color: white;
        font-size: x-large;
        font-weight: bold;
    }
</style>

<!---------------------------------------------------->
<!-- Php to get the url from the user's config file -->
<!---------------------------------------------------->
<?php

$jsonString = file_get_contents('database/' . $_SESSION['uid'] . '.json');
$data = json_decode($jsonString, true);

$url = $data['news']['url'];
?>

<!------------------------------------------------->
<!-- Script for loading the newsfeed from an url -->
<!------------------------------------------------->
<script>
    $(document).ready(function() {
        var url = "<?php echo $url; ?>";
        getRSSFeed(url);
    });

    function getRSSFeed(url) {
        $.get(url, function (data) {
            var listNews = [];
            $(data).find("item").find("title").each(function () {
                listNews.push($(this).text());
            });
            var length = listNews.length;
            // First call so we don't wait the first setInterval
            $('#news').find("marquee").text(listNews[0]);
            setInterval(function() {
                    var number = 1 + Math.floor(Math.random() * length);
                    $('#news').find("marquee").text(listNews[number]);
                },
                15000); // every 10 second
        });
    }

    /* Put this to make the widget draggable */
    var $draggable = $('.draggable').draggabilly({
        // options...
    });
</script>


