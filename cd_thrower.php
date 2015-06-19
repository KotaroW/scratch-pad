<!DOCTYPE html>
<!--
CD thrower. Just for fun.
-->
<html lang="en">

<head>
	<title>CDs</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="shortcut icon" href="mehta.ico" />

<script>

</script>
</head>

<style>
@font-face { font-family: agra-th; src: url("/fonts/agra_th.ttf"); }
html, body { height: 100%; width: 100%; padding: 0; margin: 0; }
body { font: 85% agra-th; padding: 50px; }
h1, h2, h3 { font-weight: normal; }
img { display: inline-block; -moz-transform:rotate( 25deg); box-shadow: 3px 3px 1px #000; position: absolute; }
#play-area { width: 800px; height: 800px; position: relative; margin: auto; border: dotted 5px #ccc; }

<?php
$keyframes = '@-moz-keyframes monkey%d { 0%% { top: -200px; left: -500px; } 100%% { top: %dpx; left: %dpx; } }' . "\n";
$styles = '#img%d { -moz-transform:rotate(%ddeg); -moz-animation: monkey%d 3s ease-out; }' . "\n";
$finalStyle = '.finalImg%d { top: %dpx; left: %dpx; }' . "\n";

for ( $i = 0; $i < 8; $i++ ) {
	$top = rand(0, 500);
	$left = rand(0, 800);
	$deg = rand( -360, 360 );
	echo sprintf ( $keyframes, $i, $top, $left );
	echo sprintf ( $styles, $i, $deg, $i);
	echo sprintf ( $finalStyle, $i, $top, $left );
}

?>

</style>
<script>
function $ ( eid ) { return document.getElementById ( eid ); }
window.onload = function () {
	$ ( "img0" ).addEventListener ( "animationend", function () { this.className = "finalImg0"; }, false );
	$ ( "img1" ).addEventListener ( "animationend", function () { this.className = "finalImg1"; }, false );	
	$ ( "img2" ).addEventListener ( "animationend", function () { this.className = "finalImg2"; }, false );
	$ ( "img3" ).addEventListener ( "animationend", function () { this.className = "finalImg3"; }, false );
	$ ( "img4" ).addEventListener ( "animationend", function () { this.className = "finalImg4"; }, false );
	$ ( "img5" ).addEventListener ( "animationend", function () { this.className = "finalImg5"; }, false );
	$ ( "img6" ).addEventListener ( "animationend", function () { this.className = "finalImg6"; }, false );
	$ ( "img7" ).addEventListener ( "animationend", function () { this.className = "finalImg7"; }, false );

};
</script>

<body>

<div id="play-area">
<img class="monkey" id="img0" src="./cds/orka_v.jpg" height="125" />
<img id="img1" src="./cds/reconfig_v.jpg" height="125" />
<img id="img2" src="./cds/meeting_v.jpg" height="125" />
<img id="img3" src="./cds/benedict_v.jpg" height="125" />
<img id="img4" src="./cds/shopping_v.jpg" height="125" />
<img id="img5" src="./cds/arrows_v.jpg" height="125" />
<img id="img6" src="./cds/sounding_v.jpg" height="125" />
<img id="img7" src="./cds/madness_v.jpg" height="125" />
</div>
</body>

</html>
