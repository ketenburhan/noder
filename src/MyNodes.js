class ExampleNode extends Node { // extends is important
	w = 8; // width
    h = 8; // heigth

    /* constructor can be added
     * but don't need in this case
    /*
    constructor(x, y) {
        super(x, y);

        // do something...
    }
    */
    
	pinLayout = [
		[4,0],
		[0,1],
		[7,3],
		[0,4],
		[7,6],
		[0,7],
		[3,7],
		[6,7]
    ];
    pinState = [
        "asd"
    ]
    pinUpdate(index, value) {
        console.log(index, value);
    }

    /*
    state = true;
    offStateColor = "#a00";
    onStateColor = "#0a0";
    drawExtras() {
        let c = this.noder.ctx;
        let tilesize = this.noder.tileSize;
        c.save();
        c.beginPath();


        c.fillStyle = (this.state) ? this.onStateColor : this.offStateColor;
        // (statement) ? true : false

        c.arc((this.gx+this.w/2)*tilesize, (this.gy+this.h/2)*tilesize, tilesize, 0, 2*Math.PI);
        c.fill();
        c.closePath();
        c.restore();
    }
    */
}
