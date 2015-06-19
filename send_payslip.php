<?php
/***************************************************************************
 * file: send_payslip.php
 * date: year 2013
 * description:
 *      emails a zipped pdf payslip file.
***************************************************************************/

if ( isset ( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) &&
	( strtolower ( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) == 'xmlhttprequest' ) )
{
	$koala_fname       = htmlspecialchars ( $_GET[ 'fname' ] );
	$koala_staffname = htmlspecialchars ( $_GET[ 'staffname' ] );
	$koala_recipient   = htmlspecialchars ( $_GET[ 'recipient' ] );

/* commented out for the modification on 18 Jan 2014
	$ccto = $_COOKIE[ 'jagger' ] . '@example.com';
*/

	$ccto = "sender@example.com";	// 18 Jan 2014 - at a request from foo-bar
	$timestamp = time ();
	$month = date ( 'F', $timestamp );
	$year = date ( 'Y', $timestamp );
	$subject = 'International Payslip - ' . $month . ' ' . $year;
	$random_hash = md5 ( date ( 'r', time () ) );
	$headers = "From: " . $ccto . "
Reply-to: sender@example.com
";
	$headers .= 'CC: ' . $ccto . "
";
	$headers .= "MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=\"----=_MixedPart_" . $random_hash . "\"";
	$attachment_name = basename ( $koala_fname, '.pdf' ) . '.zip';
	$file_location = '/var/www/dir/subdir/' . $attachment_name;
	$attachment = chunk_split ( base64_encode ( file_get_contents ( $file_location ) ) );


/****  *****/
$message = <<<KOTAROW
------=_MixedPart_$random_hash
Content-Type: multipart/alternative; boundary="----=_AltPart_$random_hash"

------=_AltPart_$random_hash
Content-Type: text/plain; charset="iso-8859-1"
Content-Transfer-Encoding: 7bit

Dear $koala_staffname,

Kindly view the attached Payslip for $month $year.

Should you have any enquiries, please contact us for further clarification.

Thank you.

Best Regards,
Sender

------=_AltPart_$random_hash
Content-Type: text/html; charset="iso-8859-1"
Content-Transfer-Encoding: 7bit
<html>
<head>
<title>International Staff Payslip</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
p { font-family: century; }
</style>
</head>
<body>
<p>Dear $koala_staffname,</p>
<p>Kindly view the attached Payslip for $month $year.</p>
<p>Should you have any enquiries, please contact us for further clarification.</p>
<p>Thank you.</p>
<p>Best Regards,<br>Sender</p>
</body>
</html>
------=_AltPart_$random_hash--

------=_MixedPart_$random_hash
Content-Type: application/zip; name="$attachment_name"
Content-Transfer-Encoding: base64
Content-Disposition: attachment

$attachment

------=_MixedPart_$random_hash--

\KOTAROW;

$mail_sent = mail ( $koala_recipient, $subject, $message, $headers );
echo $mail_sent ? true : false;

}
else
{
	echo "konnichiwa";
}


?>
