/**********************************************************************
* file : hummingbird.js
* date: 20 November, 2012
* description:
*     It hums while waiting. A canvas-based progress indicator.
**********************************************************************/

var Bird = {
	angleOffset : 180,
	cvsCxt : null,
	cvsElem : null,
	maxAngle : 200,
	radius : 25,
	startAngle : 0,
	timer : null,
	xPos : 50,
	yPos : 50,

	init : function () {
		this.cvsElem = document.querySelector ( "canvas" );
		if ( this.cvsElem ) {
			this.cvsCxt = this.cvsElem.getContext ( "2d" );
			this.draw ();
		}
		else {
			return;
		}
	},

	draw : function () {
		this.cvsCxt.clearRect ( 0, 0, 100, 100 );		// 3rd and 4th arguments are arbitrary.
		this.cvsCxt.beginPath ();

		this.startAngle = ( this.startAngle == this.maxAngle ) ? 0 : ++this.startAngle;
		this.cvsCxt.arc ( this.xPos, this.yPos, this.radius, Math.PI * ( this.startAngle / 100 ), Math.PI * ( ( this.startAngle + this.angleOffset ) / 100 ), false );

		// Vidal Sassoon
		this.cvsCxt.lineWidth = 3;
		var gradient = this.cvsCxt.createLinearGradient ( 0, 0, 100, 100 );		// arbitrary values but should be as big as the canvas size
		gradient.addColorStop ( 0, "navy" );
		gradient.addColorStop ( 1, "#ccc" );

		this.cvsCxt.shadowBlur = 1;
		this.cvsCxt.shadowColor = "#fff";

		this.cvsCxt.strokeStyle = gradient;
		this.cvsCxt.stroke ();

		this.timer = window.setTimeout ( "Bird.draw ()", 15 );
	},

	goToNest : function () {
		window.clearTimeout ( this.timer );
	},

};

