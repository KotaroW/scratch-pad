#include <iostream>
#include <cstring>

/***************
Just for fun.
***************/

class String
{
private:
	int strLength;
	char* myStr;

public:
	String ( void )
	{
		myStr = NULL;
		strLength = 0;
	}

	String ( const char* str )
	{
		setString ( str );
	}

	String ( String& strInstance )
	{
		setString ( strInstance.getString () );
	}


	~String ( void )
	{
		delete[] myStr;
		myStr = 0;
	}

	void setString ( const char* str )
	{
		strLength = strlen ( str );
		myStr = new char[ strLength + 1 ];
		strcpy ( myStr, str );

	}

	int getLength ( void )
	{
		return strLength;
	}

	char* getString ( void )
	{
		return myStr;
	}

	void operator= ( const char* str )
	{
		setString ( str );
	}

	String& operator= ( String& strInstance )
	{
		setString ( strInstance.getString () );
		return *this;
	}

	String& operator+ ( const char* str )
	{
		char* cpy = new char[ strLength + 1 ];
		strcpy ( cpy, myStr );
		strLength += strlen ( str );
		myStr = new char[ strLength ];
		strcpy ( myStr, cpy );
		strcat ( myStr, str );

		delete[] cpy;
		cpy = 0;

		return *this;
	}

	String& operator+ ( String& strInstance )
	{
		*this + strInstance.getString ();
		return *this;
	}

	String& operator+= ( const char* str )
	{
		*this + str;
		return *this;
	}

	String operator+= ( String& strInstance )
	{
		*this + strInstance.getString ();
		return *this;
	}

	friend std::ostream& operator<< ( std::ostream& out, const String& strInstance );

};

std::ostream& operator<< ( std::ostream& out, const String& strInstance )
{
	out << strInstance.myStr;
	return out;
}

/* test */
int main ()
{
	using namespace std;
	String mystr ( "mystring" );
	String yourstr ( "yourstring" );

	mystr += yourstr;

	std::cout << mystr << std::endl;

	return 0;
}
