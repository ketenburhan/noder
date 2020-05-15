class ExampleNode extends Node { // extends is important
	w = 8; // width
    h = 8; // heigth
    
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
    
    /* constructor can be added
     * but not need in this case */
    /*
    constructor(x, y) {
        super(x, y);

        // do something...
    }
    */
}