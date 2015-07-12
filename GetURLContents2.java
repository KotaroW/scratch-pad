import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.BufferedWriter;
import java.io.FileWriter;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.io.IOException;


public class GetURLContents2 {

	public static final int GOCHA = 1;
	public static final int NO_GOCHA = 0;

	private String strURL = null;
	private String outf = null;

	public GetURLContents2 ( String _strURL, String _outf ) {

		this.strURL = _strURL;
		this.outf = _outf;

	}

	static boolean checkOutf ( String _outf ) {

		final String patternString = "^\\w+\\.(html|xml|txt)";
		Pattern pattern = Pattern.compile ( patternString );
		Matcher matcher = pattern.matcher ( _outf );

		if ( matcher.find () ) {
			return true;
		}
		else {
			System.err.println ( "[Error]: Invalid file type (html, xml or txt)." );
			return false;
		}

	}

	static boolean checkURL ( String _strURL ) {

		final String patternString = "^http\\S+$";
		Pattern pattern = Pattern.compile ( patternString );
		Matcher matcher = pattern.matcher ( _strURL );

		if ( matcher.find () ) {
			return true;
		}
		else {
			System.err.format ( "[Error]: invalid url - '%s'%n", _strURL );
			return false;
		}
	}

	public int getURLContents () {

		try {

			URL url = new URL ( this.strURL );
			URLConnection urlConnection = url.openConnection ();

			if ( urlConnection instanceof HttpURLConnection ) {

				HttpURLConnection connection = ( HttpURLConnection ) urlConnection;

				BufferedReader reader = new BufferedReader (
					new InputStreamReader ( connection.getInputStream () )
				);

				BufferedWriter writer = new BufferedWriter (
					new FileWriter ( this.outf )
				);

				String line = null;

				while ( ( line = reader.readLine () ) != null ) {

					line += "\n";
					writer.write ( line, 0, line.length () );
					writer.flush ();

				}
				connection.disconnect ();
				reader.close ();
				writer.close ();

			}


		} catch ( IOException err ) {

			err.printStackTrace ();
			return GetURLContents2.NO_GOCHA;

		}
		return GetURLContents2.GOCHA;

	}

	public static void main ( String[] args ) {

		if ( args.length != 2 ) {

			System.err.println ( "Usage: java TestClass <url> <outfile>" );
			System.exit ( -1 );

		}

		if ( !GetURLContents2.checkURL ( args[ 0 ] ) || !GetURLContents2.checkOutf ( args[ 1 ] ) ) {
			System.exit ( -1 );
		}

		GetURLContents2 tc = new GetURLContents2 ( args[ 0 ], args[ 1 ] );
		if ( tc.getURLContents () == GetURLContents2.GOCHA ) {

			System.out.println ( "Gocha!" );

		}
		else {
			System.out.println ( "No Gocha ..." );
		}

	}

}
