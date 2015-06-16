/********************************************************************************
* file: king-fisher.js
* date: 11 February, 2013
* description:
*     king fisher? Yes. They dive into the water! Oh yes, this is a photo slide
      show.
********************************************************************************/

/* Needless to say ... */
function $ ( elemId )
{
	return document.getElementById ( elemId );
}


/* and this */
function $$ ( tagName )
{
	return document.getElementsByTagName ( tagName );
}


/* Ponyo, Ponyo, Ponyo, a child of fish. */
var Ponyo = {
	curImg : 0,
	funcInterval : 5000,		/* between the current img and the next img */
	imgElems : new Array (),
	lovelyProjs : new Array (),		/* lovely project names */
	numImgs : null,
	opaAmount : 2,
	opaIn : 0,		/* opacity amount for the emergin img */
	opaInterval : 50, 	/* opacity value for the emerging/fading effect */
	opaOut : 100,	/* for the img fading out */
	spotlights : new Array (),		/* DOM elements for lovelyProjs */
	playMode : true,		/* show is getting under way or paused? */
	timer : null,		/* the coordinator! */
	uriToReturn : null,

	applyOpacity : function ( elem, opaVal ) {
		elem.style.opacity = opaVal / 100;
		elem.style.filter = "alpha(opacity=" + opaVal + ")";
	},

	constructControls : function () {
		var target = $ ( "blue-man" ).querySelector ( "ul" ), outp = "";
		outp += "<li id='prevB' title='Previous' onclick='Ponyo.goWest ();'>&lsaquo;</li>";

		for ( var i = 0; i < this.numImgs; i++ )  {
			outp += "<li id='lj" + i.toString () + "' class='" + ( i == 0 ? "spark" : "" ) + "' onclick='Ponyo.jumpTo(" + i + ");'>" + ( i + 1 ) + "</li>";
		} 
		outp += "<li id='nextB' title='Next' onclick='Ponyo.goEast();'>&rsaquo;</li>";
		outp += "<li id='pauseB' title='Pause' onclick='Ponyo.pause();'>";
		outp += "<span class='squeeze'>&#x2590;</span>";
		outp += "<span class='squeeze'>&#x2590;</span>";
		outp += "</li>";
		outp += "<li id='playB' title='Play' onclick='Ponyo.play();'>&#9654;</li>";
		outp += "<li id='closeB' title='Close'><a href='" + this.uriToReturn + "'>&#10007;</a></li>";

		target.innerHTML = outp;

		$ ( "lj0" ).style.color = "#0a146e";
		$ ( "playB" ).style.display = "none";

	},

	embedCodeNames : function () {
		var target = $ ( "code-name" ), span;

		for ( var i = 0; i < this.numImgs; i++ ) {
			span = document.createElement ( "span" );
			if ( i == 0 ) {
				span.className = "tsuchinoko";
			} else if ( i == ( this.numImgs - 1 ) ) {
				span.className = "tsuchinoko yeti";
			} else {
				span.className = "yeti";
			}
			span.innerHTML = this.lovelyProjs[ i ];
			target.appendChild ( span );
		}
		this.spotlights = $ ( "code-name" ).getElementsByTagName ( "span" );
	},

	/* the inigition */
	init : function ( uri ) {
		this.uriToReturn = uri;
		this.imgElems = $$ ( "img" );
		this.numImgs = this.imgElems.length;

		/* get code names */
		for ( var i = 0; i < this.numImgs; i++ ) {
			this.lovelyProjs.push ( this.imgElems[ i ].alt );
		}

		/* embed code names */
		this.embedCodeNames ();

		/* construct the controls */
		this.constructControls ();

		this.timer = window.setTimeout ( "Ponyo.rocketDive ()", this.funcInterval );
	},

	goEast : function () {
		var nextImg = ( ( this.curImg + 1 ) < this.numImgs ) ? ( this.curImg + 1 ) : 0;
		this.jumpTo ( nextImg );
	},

	goWest : function () {
		var prevImg = ( ( this.curImg - 1 ) >= 0 ) ? ( this.curImg - 1 ) : ( this.numImgs - 1 );
		this.jumpTo ( prevImg );
	},

	jumpTo : function ( imgNum ) {
		window.clearTimeout ( this.timer );
		this.opaIn = 0;
		this.opaOut = 100;

		this.resetAll ( imgNum );
		this.trackNumber ( this.curImg, imgNum );
		this.curImg = imgNum;

		if ( this.playMode )
			this.timer = window.setTimeout ( "Ponyo.rocketDive () ", this.funcInterval );
	},

	pause : function () {
		this.playMode = false;
		window.clearTimeout ( this.timer );
		$ ( "pauseB" ).style.display = "none";
		$ ( "playB" ).style.display = "inline-block";

	},

	play : function () {
		this.playMode = true;
		this.timer = window.setTimeout ( "Ponyo.rocketDive ()", this.opaInterval );
		$ ( "pauseB" ).style.display = "inline-block";
		$ ( "playB" ).style.display = "none";
	},

	resetAll : function ( exemption ) {
		for ( var iii = 0; iii < this.numImgs; iii++ ) {
			if ( iii == exemption ) {
				this.applyOpacity ( this.imgElems[ iii ], 100 );
				this.applyOpacity ( this.spotlights[ iii ], 100 );
			} else {
				this.applyOpacity ( this.imgElems[ iii ], 0 );
				this.applyOpacity ( this.spotlights[ iii ], 0 );
			}
		}
	},

	rocketDive : function () {
		var nextImg = ( ( this.curImg + 1 ) < this.numImgs ) ? this.curImg + 1 : 0;
		var opaMax = 100;

		this.opaIn += this.opaAmount;
		this.opaOut -= this.opaAmount;

		this.applyOpacity ( this.imgElems[ this.curImg ], this.opaOut );
		this.applyOpacity ( this.spotlights[ this.curImg ], this.opaOut );
		this.applyOpacity ( this.imgElems[ nextImg ], this.opaIn );
		this.applyOpacity ( this.spotlights[ nextImg ], this.opaIn );

		if ( this.opaIn == opaMax ) {
			this.opaIn = 0;
			this.opaOut = 100;
			this.trackNumber ( this.curImg, nextImg );
			this.curImg = nextImg;
			this.timer = window.setTimeout ( "Ponyo.rocketDive ()", this.funcInterval );
		} else {
			this.timer = window.setTimeout ( "Ponyo.rocketDive ()", this.opaInterval );
		}
	},

	trackNumber : function ( curImg, nextImg ) {
		$ ( "lj" + curImg.toString () ).style.color = "#555";
		$ ( "lj" + nextImg.toString () ).style.color = "#0a146e";
	},
};	

