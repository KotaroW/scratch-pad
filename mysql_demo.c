// $ gcc version.c -o version  `mysql_config --cflags --libs`

#include <stdio.h>
#include <unistd.h>
#include <my_global.h>
#include <mysql.h>
#include <string.h>
#include <ctype.h>

/* macro */
#define NUM_ARGC 3
#define QUERY_OK 1
#define QUERY_NG 0
#define QUERY_STR_MAX 1024
#define CONTINUE 1
#define QUIT 0

#define USE 0
#define CREATE 1
#define DROP 2
#define SELECT 3
#define INSERT 4
#define UPDATE 5
#define DELETE 6
#define INVALID_SYNTAX 7

#define USE_STR "use "
#define CREATE_STR "create "
#define DROP_STR "drop "
#define SELECT_STR "select "
#define INSERT_STR "insert "
#define UPDATE_STR "update "
#define DELETE_STR "delete "
/* macro */



/* function forward declarations */
MYSQL* init ( void );
MYSQL* get_connection ( MYSQL* connection, char* host, char* username, char* password );
int get_query_type ( char query_string[] );
void exit_with_error ( MYSQL* connection );
int get_query ( char query_string[], int query_max_size );
void exec_query ( MYSQL* connection, int query_type, char query_string[] );
void display_select_result ( MYSQL_RES* result );
/* function forward declarations */



int main ( int argc, char* argv[] )
{

	if ( argc < NUM_ARGC )
	{
		fprintf ( stderr, "usage: %s <host> <username>\n", argv[ 0 ] );
		exit ( 1 );
	}
	char* password = getpass ( "password: " );

	MYSQL* connection;

	if ( ( connection = init () ) == NULL )
	{
		fprintf ( stderr, "%s\n", mysql_error ( connection ) );
		exit ( 1 );
	}

	if ( get_connection ( connection, argv[ 1 ], argv[ 2 ], password ) == NULL )
	{

		exit_with_error ( connection );

	}

	char query_string[ QUERY_STR_MAX ];

	while ( get_query ( query_string, QUERY_STR_MAX ) ) {

		int query_type = get_query_type ( query_string );

		switch ( query_type )
		{
			case USE:
			case CREATE:
			case DROP:
			case INSERT:
			case UPDATE:
			case DELETE:
			case SELECT:
				exec_query ( connection, query_type, query_string );
				break;

			default:
				fprintf ( stderr, "invalid sql syntax: \n" );
				break;

		}

	}
	mysql_close ( connection );
}


MYSQL* init ( void ) {

	return mysql_init ( NULL );

}


MYSQL* get_connection ( MYSQL* connection, char* host, char* username, char* password )
{

	return mysql_real_connect ( connection, host, username, password, NULL, 0, NULL, 0 );

}


int get_query ( char query_string[], int query_max_size )
{

	int index;
	char inp;
	query_string[ 0 ] = '\0';
	fprintf ( stdout, "Query>> " );

	for ( index = 0;
			( inp = getchar () ) != '\n' && index < query_max_size - 1;
			index++ ) {

			if ( isspace ( inp ) && index == 0 ) {
				index -=1;
				continue;
			}

			query_string[ index ] = inp;

	}
	query_string[ index ] = '\0';

	if ( index == 0 && inp == '\n' )
	{

		get_query ( query_string, query_max_size );

	}
	if ( strcmp ( query_string, "quit" ) == 0 ) {
		fprintf ( stdout, "good day\n" );
		index = 0;
	}


	return ( index > 0 ) ? CONTINUE : QUIT;
}


int get_query_type ( char query_string[] ) {

	int index;
	int str_length = strlen ( query_string );
	char* cpy = ( char* ) malloc ( str_length );
	char* match = NULL;


	for ( index = 0; index < str_length; index++ ) {
		cpy[ index ] = ( isalpha ( query_string[ index ] )
			?
			tolower ( query_string[ index ] )
			:
			query_string[ index ]
		);
	}
	cpy[ index ] = '\0';


    if ( ( match = strstr ( cpy, USE_STR ) ) != NULL
        && ( &match[ 0 ] == &cpy[ 0 ] ) ) {
        return USE;
    }

	if ( ( match = strstr ( cpy, CREATE_STR ) ) != NULL
		&& ( &match[ 0 ] == &cpy[ 0 ] ) ) {
		return CREATE;
	}

    if ( ( match = strstr ( cpy, DROP_STR ) ) != NULL
        && ( &match[ 0 ] == &cpy[ 0 ] ) ) {
        return DROP;
    }

    if ( ( match = strstr ( cpy, SELECT_STR ) ) != NULL
        && ( &match[ 0 ] == &cpy[ 0 ] ) ) {
        return SELECT;
    }

    if ( ( match = strstr ( cpy, INSERT_STR ) ) != NULL
        && ( &match[ 0 ] == &cpy[ 0 ] ) ) {
        return INSERT;
    }

    if ( ( match = strstr ( cpy, UPDATE_STR ) ) != NULL
        && ( &match[ 0 ] == &cpy[ 0 ] ) ) {
        return UPDATE;
    }

    if ( ( match = strstr ( cpy, DELETE_STR ) ) != NULL
        && ( &match[ 0 ] == &cpy[ 0 ] ) ) {
        return DELETE;
    }

	return INVALID_SYNTAX;
}


void exec_query ( MYSQL* connection, int query_type, char query_string[] )
{
	MYSQL_RES* result = NULL;

	if ( mysql_query ( connection, query_string ) )
	{

		fprintf ( stderr, "Query error: %s\n", mysql_error ( connection ) );

	}
	else
	{
		switch ( query_type )
		{

			case USE:
				fprintf ( stdout, "%s\n", "database changed" );
				break;
			case CREATE:
                fprintf ( stdout, "%s\n", "created successfully" );
                break;

			case DROP:
                fprintf ( stdout, "%s\n", "dropped successfully" );
                break;

			case INSERT:
                fprintf ( stdout, "%s\n", "inserted successfully" );
                break;

			case UPDATE:
                fprintf ( stdout, "%s\n", "updated successfully" );
                break;

			case SELECT:
				result = mysql_store_result ( connection );
				if ( result == NULL )
				{
					fprintf ( stderr, "%s\n", mysql_error ( connection ) );
				}
				else
				{
					display_select_result ( result );
				}
				break;

		}
	}
}


void display_select_result ( MYSQL_RES* result )
{
	const char* separator = "--------------------------------------------------";
	int num_fields = mysql_num_fields ( result );
	MYSQL_ROW row;
	MYSQL_FIELD *field;

	fprintf ( stdout, "%d result(s)\n", num_fields );

	fprintf ( stdout, "%s\n", separator );
	while ( field = mysql_fetch_field ( result ) )
	{
		fprintf ( stdout, "%s\t\t", field->name );
	}
	putchar ( '\n' );
	fprintf ( stdout, "%s\n", separator );


	while ( row = mysql_fetch_row ( result ) )
	{
		for ( int iii = 0; iii < num_fields; iii++ )
		{
			printf ( "%s\t\t", row[ iii ] ? row[ iii ] : "NULL" );
		}
		putchar ( '\n' );
	}


	mysql_free_result ( result );

}


void exit_with_error ( MYSQL* connection )
{

	fprintf ( stderr, "%s\n", mysql_error ( connection ) );
	exit ( 1 );

}
