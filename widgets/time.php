<?php
$jsonString = file_get_contents('../database/1.json');
$data = json_decode($jsonString, true);

$city = $data['weather']['location'];
$degree = $data['weather']['degree'];
?>

<div style="margin: 15px 0px 0px; display: inline-block; text-align: center; width: 320px;">
    <noscript>
        <div style="display: inline-block; padding: 2px 4px; margin: 0px 0px 5px; border: 1px solid rgb(204, 204, 204); text-align: center; background-color: transparent;">
            <a style="text-decoration: none; font-size: 13px; color: rgb(255, 255, 255);" href=""></a>
        </div>
    </noscript>
    <script src="http://localtimes.info/clock.php?&cp1_Hex=ffffff&cp2_Hex=000000&cp3_Hex=000000&fwdt=320&ham=0&hbg=1&hfg=0&sid=0&mon=0&wek=0&wkf=0&sep=0&widget_number=1000" type="text/javascript">
    </script>
</div>
