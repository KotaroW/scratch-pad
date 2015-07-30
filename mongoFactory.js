function mongoFactory ( _database, _collection ) {
	var  OPERATIONS = {
		GET_DB_LIST : 0,
		GET_COLLECTION_LIST : 1,
		GET_DOCUMENTS : 2
	};

	var xhr = null;
	var databaseList = [];
	var currentDB = _database || null;
	var collectionList = [];
	var currentCollection = _collection || null;

	function callMongoAjax ( _operation,  arg ) {
		xhr = new XMLHttpRequest ();
		xhr.onload = function ( evt ) {
			switch ( _operation ) {
				case OPERATIONS.GET_DB_LIST:
					databaseList = eval ( '(' + xhr.responseText + ')' );
					displayDatabases ();
					break;
				case OPERATIONS.GET_COLLECTION_LIST:
					collectionList = eval ( '(' +  xhr.responseText + ')' );
					displayCollections ();
					break;
				case OPERATIONS.GET_DOCUMENTS:
					document.querySelector ( "#documents" ).innerHTML = xhr.responseText;
			}
		};
		
		xhr.open ( 'post', './mongoajax.php', true );
		xhr.setRequestHeader ( 'Content-type', 'application/x-www-form-urlencoded' );
		var query = "op=" + _operation + ( arg != undefined ? arg : "" );
		xhr.send ( query );
	}

	function displayDatabases () {
		var targetElement = document.querySelector ( "#dblist" );
		targetElement.innerHTML = "";

		if ( !databaseList.length ) {
			targetElement.innerHTML = "<p>no databases</p>";
			return;
		}

		var ulElement = document.createElement ( "ul" );
		
		for ( var i = 0, item; item = databaseList[ i ]; i++ ) {
			var liElement = document.createElement ( "li" );
			liElement.setAttribute ( "id", "database-" + item );
			liElement.setAttribute ( "data-dbname", item );
			liElement.setAttribute ( "class", "item" );
			liElement.addEventListener ( "click", selectDB, false );
			liElement.innerHTML = item;
			ulElement.appendChild ( liElement );
		}
		targetElement.appendChild ( ulElement );
	}

	function displayCollections () {
		var targetElement = document.querySelector ( "#collections" );
		targetElement.innerHTML = "";

		if ( !collectionList.length ) {
			targetElement.innerHTML = "<p>no collections</p>";
			return;
		}

		var ulElement = document.createElement ( "ul" );
		for ( var i = 0, item; item = collectionList[ i ]; i++ ) {
			var liElement = document.createElement ( "li" );
			liElement.setAttribute ( "id", "collection-" + item );
			liElement.setAttribute ( "data-collection", item );
			liElement.setAttribute ( "class", "item" );
			liElement.addEventListener ( "click", selectCollection, false );
			liElement.innerHTML = item;
			ulElement.appendChild ( liElement );
		}
		targetElement.appendChild ( ulElement );
	}

	function selectDB () {
		document.querySelector ( "#documents" ).innerHTML = "";

		if ( currentDB != null ) {
			document.querySelector ( "#database-" + currentDB ).innerHTML = currentDB;
		}

		currentDB = this.getAttribute ( "data-dbname" );
		this.innerHTML += " (selected)";
						
		callMongoAjax ( OPERATIONS.GET_COLLECTION_LIST, "&db=" + currentDB );					
	}

	function selectCollection () {
		if ( currentCollection != null ) {
			document.querySelector ( "#collection-" + currentCollection ).innerHTML = currentCollection;
		}

		currentCollection = this.getAttribute ( "data-collection" );
		this.innerHTML += " (selected)";
						
		callMongoAjax ( OPERATIONS.GET_DOCUMENTS, "&db=" + currentDB + "&collection=" + currentCollection );					
	}

	return {
		CurrentDB () { return currentDB; },
		set CurrentDB ( _database ) { currentDB = _database; },
		get CurrentCollection () { return collection; },
		set CurrentCollection ( _collection ) { currentCollection = _collection; },
		getDBList :function () {
			database =  callMongoAjax ( OPERATIONS.GET_DB_LIST );
		}
	};
}

var mongo = mongoFactory ();
mongo.getDBList ();
