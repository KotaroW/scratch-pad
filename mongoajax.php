<?php

class MongoOperation extends MongoClient {

	const OP_GET_DB_LIST = 0;
	const OP_GET_COLLECTION_LIST = 1;
	const OP_GET_DOCUMENTS = 2;

	private $database;
	private $collection;

	public function __construct ( $operation, $database, $collection ) {
		parent::__construct ();
		$this->database = $database;
		$this->collection = $collection;
		$this->switchOperation ( $operation );
	}

	public function switchOperation ( $op ) {
		switch ( $op ) {
			case self::OP_GET_DB_LIST:
				$list = $this->getDatabases ();
				echo json_encode ( $list );
				break;
			case self::OP_GET_COLLECTION_LIST:
				$list = $this->getCollections ();
				echo json_encode ( $list );
				break;
			case self::OP_GET_DOCUMENTS:
				$documents = $this->getDocuments ();
				print_r ( $documents );
				break;
		}
	}

	private function getDatabases () {
		$databases = $this->listDBs ();
		$list = array ();
		foreach ( $databases[ 'databases' ] as $database ) {
			foreach ( $database as $key => $value ) {
				if ( $key == 'name' )
					$list[] = $value;
			}
		}
		sort ( $list );
		return $list;
	}

	private function getCollections () {
		return $this->selectDB ( $this->database )->getCollectionNames ();
	}

	private function getDocuments () {
		$cursor = $this->selectDB ( $this->database )->selectCollection ( $this->collection )->find ();
		$documents = array ();

		foreach ( $cursor as $doc )
			$documents[] = $doc;

		return $documents;
	}
}


/** test **/
$operation = htmlspecialchars ( $_POST[ 'op' ] );
$database = null;
$collection = null;

if ( isset ( $_POST[ 'db' ] ) ) {
	$database = htmlspecialchars ( $_POST[ 'db' ] );
}
if ( isset ( $_POST[ 'collection' ] ) ) {
	$collection = htmlspecialchars ( $_POST[ 'collection' ] );
}

$mongo = new MongoOperation ( $operation, $database, $collection );
?>
