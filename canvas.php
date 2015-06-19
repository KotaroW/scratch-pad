<?php header ( "X-XSS-Protection: 0" ); ?>
<?php
if ( $_GET ) {
	echo $_GET[ 'koala' ];
}
?>
