<?php
/************************************************************
 * mysqli test
************************************************************/

class Database {

	private $conn;

	public function __construct ( $host, $usr, $pwd, $db ) {
		$this->conn = @new mysqli ( $host, $usr, $pwd, $db );
	}

	public function checkConnection () {
		if ( $this->conn->connect_errno > 0 ) {
			return false;
		}
		return true;
	}

	public function query ( $queryString ) {
		if ( $this->checkConnection () ) {
			$result = $this->conn->query ( $queryString );
			return $result;
		}
	}

	public function close () {
		if ( $this->checkConnection () )
			@$this->conn->close ();
	}
}

?>
