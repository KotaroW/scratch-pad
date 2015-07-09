import java.util.Scanner;
import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;


public class GetURLContents {

	public static void main ( String[] args ) {

		String outfile = null;
		String urlStr = null;
		String contents = null;

		outfile = getString ( "Outfile" );
		urlStr = getString ( "URL" );


		if ( outfile != null && urlStr != null ) {
			contents = getURLContent ( urlStr );
		}

		if ( contents != null ) {
			if ( writeToFile ( outfile, contents ) ) {
				System.out.println ( "Data written to " + outfile );
			}
			else {
				System.err.println ( "Error: Couldn't write to " + outfile );
			}
		}
		else {
			System.err.println ( "Error: Couldn't fetch data." );
		}

	}


	static String getString ( String strName ) {

		Scanner scn = new Scanner ( System.in );
		String outStr = null;

		do {
			System.out.print ( strName + " (or CTRL + D to exit): " );

			if ( !scn.hasNextLine () ) {
				outStr = null;
				break;
			}
			outStr = scn.nextLine ();

			if ( outStr.equals ( "" ) ) {

				System.out.println ( "Please enter " + strName + "." );

			}

		} while ( outStr.equals ( "" ) );

		return outStr;
	}


	static String getURLContent ( String urlStr ) {

		URL url = null;
		URLConnection urlConn;
		HttpURLConnection conn;
		BufferedReader reader = null;
		String contents = null;

		try {

			url = new URL ( urlStr );
			urlConn = url.openConnection ();

			if ( urlConn instanceof HttpURLConnection ) {

				conn = (HttpURLConnection) urlConn;

			}
			else {
				System.err.println ( "HTTP connection error." );
				contents = null;
				return contents;
			}
			reader = new BufferedReader (
				new InputStreamReader ( conn.getInputStream () )
			);

			String currentLine = null;
			while ( ( currentLine = reader.readLine () ) != null ) {
				if ( contents == null ) {

					contents = "";

				}
				contents += currentLine + "\n";
			}

		} catch ( IOException err ) {

			err.printStackTrace ();

		}

		return contents;
	}


	static boolean writeToFile ( String outfile, String contents ) {

		BufferedWriter writer = null;

		try {

			writer = new BufferedWriter (
				new FileWriter ( outfile )
			);
			writer.write ( contents, 0, contents.length () );
			writer.flush ();

		}
		catch ( IOException err ) {

			err.printStackTrace ();
			return false;

		} finally {

			try {

				if ( writer != null ) {

					writer.close ();

				}
			}
			catch ( IOException err ) {

				err.printStackTrace ();
				return false;
			}
		}

		return true;
	}

}
