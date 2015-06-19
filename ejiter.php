<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<style>
* { padding: 0; margin: 0; }
html, body { width: 100%; height: 100%; }
iframe { width: 100%; height: 99%; }
</style>
<script>
var Editor = {
	init : function () {
		var popeye = window.open ( "./notepad.html", "popeye", "width=300px, height=500px, location=no" );
		popeye.onload = function () {
			popeye.window.moveBy ( 1000, 20 );
			var area51 = popeye.document.querySelector ( "textarea" );
			
			area51.onkeyup = function (evt) {
				document.querySelector ( "iframe" ).src = [ "canvas.php?koala=", encodeURIComponent ( evt.target.value ) ].join ( "" );

				var cookieName = "gorisan";
				var cookieExpiry = new Date ();
				cookieExpiry.setDate ( cookieExpiry.getDate () + 365 );
				var cookieValue = [ encodeURIComponent ( evt.target.value ), "; expires=", cookieExpiry ].join ( "" );
				popeye.document.cookie = [ cookieName, "=", cookieValue ].join ( "" ); 
			};

			if ( popeye.document.cookie ) {
				var gorisan = popeye.document.cookie.match ( /^gorisan=(.+)$/ )[ 1 ];
				area51.value = decodeURIComponent ( gorisan );
			}
		};
	}
};

Editor.init ();


</script>

</head>
<body>
<iframe src="canvas.php" frameborder="no" scroll="auto"></iframe>




</body>
</html>
