<?php
/***************************************************************************
 * file: zip_n_encrypt.php
 * date: 2013
 * description:
 *    compresses and encrypts a pdf payslip. calls a bash command to get the
 *    job done.
 ***************************************************************************/

include_once ( './getmethis.php' );

/* check to see if the page has been invoked by an Ajax call. */
if ( isset ( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) &&
	( strtolower ( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) == 'xmlhttprequest' ) )
{
  /* filename should be KA + numbers. */
	$koala_fname = htmlspecialchars ( $_GET[ 'fname' ] );
	$pattern = '/^(KA\d+)_/i';
	$pwd;

	preg_match ( $pattern, $koala_fname, $matches );
	if ( $matches ) {
	  /* call a password-generator. */
		$pwd = get_password ( $matches[ 1 ] );
		if ( !$pwd ) {
			echo false;
			return;
		}
	}
	else {
		echo false;
		return;
	}
  /* call a bash command to zip and encrypt the pdf payment slip. */
	$result = exec ( 'zip -j -P ' . $pwd . ' /var/www/dir/subdir/' . basename ( $koala_fname, '.pdf' ) . '.zip /var/www/dir/subdir/' . $koala_fname );

	if ( $result )
		echo true;
	else
		echo false;
}
/* if it is a direct access, greet nicely */
else
{
	echo "konnichiwa";
}

?>
