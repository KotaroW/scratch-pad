<?php
/******************************************
 * File		: pallet.php
 *  Written By	: Kotaro W
 *  Date		: 13th, February 2012
 *  Description	: sample code
 ******************************************/





/***** constant variable declarations *****/

/* for $payment_data */
define( 'JOURNAL_NO',   0 );
define( 'PAYMENT_DATE', 1 );
// define( 'EMPLOYEE_CODE', 2 ); commented out because this won't be used for the time being.
define( 'PAYEE',        2 );
define( 'AMOUNT',       3 );
define( 'EMAIL',        4 );

/* for $email_data */
define( 'NAME',       0 );
define( 'EMAIL_ADDR', 1 );

/* for $list_type, the second parameter for get_data */
define( 'PAYMENT_DATA', 0 );
define( 'EMAIL_DATA',   1 );


/* for exclusively for PAYMENT_DATA in get_data() function */
define( 'JOURNAL_NO_TEMP',   20 );
define( 'PAYMENT_DATE_TEMP', 21 );
// define( 'EMPLOYEE_CODE_TEMP', 2 ); commented out because this won't be used for the time being.
define( 'PAYEE_TEMP',         3 );
define( 'AMOUNT_TEMP',       28 );





/***** function definitions ****/
/* generate_payment_advice(): generate a payment advaice list. calls get_data( file pointer, list_type ), which fetches two arrays necessary to make a payment_advice list.
*/
function generate_payment_advice($infile)
{
	$payment_data = array();
	$email_data   = array();
	$fp;


	// First, we take care of payment data.
	$fp = open_file( $infile );

	if( !$fp )		// if failed to open the infile.
		return null;		// returns to the calling function prematurely.

	$payment_data = get_data( $fp, PAYMENT_DATA );
	close_file( $fp, $infile );


	// Then, email address
	$infile = './mailaddr.csv';	// reassign the variable.
	$fp = open_file( $infile );

	if( !$fp )		// same as above.
		return null;

	$email_data = get_data( $fp, EMAIL_DATA );
	close_file( $fp, $infile );

	// get email addresses
	for( $iii = 0; $iii < count( $payment_data ); $iii++ )
	{
		$payment_data[ $iii ][ EMAIL ] = get_email_addr( $payment_data[ $iii ][ PAYEE ], $email_data );
	}


	return $payment_data;

}


/*
open_file(): opens the infile (parameter) and returns the file pointer as the return value. Issues an error message if fails to open the file.
*/
function open_file( $infile )
{
	$fp = fopen( $infile, 'r' );

	if ( $fp )
		return $fp;
	else
	{
		echo "An error occurred in opening '$infile'.";
		return null;	// might be better to return null in the event of a failure.
	}
}


/*
close_file(): closes the infile.
*/
function close_file( $fp, $infile )
{
	fclose( $fp ) or die ("An error occurred in closing '$infile'.</p>");
}


/*
get_data: get only necessary data items from the csv infile given the list type (either PAYMENT_DATA or EMAIL DATA).
*/
function get_data( $fp, $list_type )
{
	$data_array = array();

	if( $list_type == PAYMENT_DATA )
	{
		$index;		// tow lines for each payment data.

		for( $iii = $index = 0; !feof( $fp ); $iii++ )
		{
			$data_row = fgets( $fp );

			if( !$data_row )	// if empty line,
				continue;		// skip it.
			else				// create a temporary array for processing, otherwise.
//				$data_row = split( ',', $data_row );
$data_row = split( "\t", $data_row );

			if( $iii % 2 == 0 )	// if the first line of the two
			{
				$data_array[ $index ] = array();
				array_push( $data_array[ $index ], $data_row[ JOURNAL_NO_TEMP ], $data_row[ PAYMENT_DATE_TEMP ] );
			}
			else
			{
				// Take note that the 2nd element to the last is for email address, the last one is for "deleted" flag.
				array_push( $data_array[ $index ], $data_row[ PAYEE_TEMP ], number_format( doubleval ( $data_row[ AMOUNT_TEMP ] ), 2 ), "", 0 );
				// Do not forget to increment the index variable here. The.
				$index++;
			}
		}
	}
	else
	{
		while( !feof( $fp ) )
		{
			$data_row = fgets( $fp );

			if( !$data_row )
				continue;

			$data_array[] = split( ',', $data_row );
		}
	}
	return $data_array;
}


/*
get_email_addr(scalar, array): matches the payee against the name in the email_data array, and returns the email address found in the $email_arr if they match to a satisfactory extent (more than 60% match). Returns the element empty if the matching fails.
*/
function get_email_addr( $payee, $email_arr )
{

	// Mr Bhuva is an exception ...
	if ( $payee == "BHUVANEDRAM BHUVANAK" )
		return 'b.bhuvanakrishna@shimz.biz';


	$best_match = 0;	// for percentage.
	$needles = split( ' ', $payee );	// words to search for
	$email_address = "";

	for( $iii = 0; $iii < count( $email_arr ); $iii++ )
	{
		$haystack = $email_arr[ $iii ][ NAME ];  // name where the needles are searched for
		// each needle will be matched aginst the name to calculate the "percentage of satisfaction".

		$attempts = $success = 0;
		for( $jjj = 0; $jjj < count( $needles ); $jjj++, $attempts++ )
		{
			if ( preg_match( "/{$needles[ $jjj ]}/i", $haystack ) )
				$success++;

		}
		$match = intval( $success / $attempts * 100);

		if ( $match > $best_match )
		{
			$best_match = $match;
			$email_address = $email_arr[ $iii ][ EMAIL_ADDR ];
		}
	}

	return ( $best_match >= 60 ) ? $email_address : "";

}

?>
