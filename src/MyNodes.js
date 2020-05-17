class ExampleNode extends Node { // extends is important
	w = 8; // width
    h = 8; // heigth

    constructor(x, y) {
        super(x, y);
        this.pins["pin1"] = new Pin(this, 4,0);
        this.pins["pin2"] = new Pin(this, 0,1);
        this.pins["pin3"] = new Pin(this, 7,3);
        this.pins["pin4"] = new Pin(this, 0,4);
        this.pins["pin5"] = new Pin(this, 7,6);
        this.pins["pin6"] = new Pin(this, 0,7);
        this.pins["pin7"] = new Pin(this, 3,7);
        this.pins["pin8"] = new Pin(this, 6,7);
        // do something...
    }
    pinUpdate(index, value) {
        console.log(index, value);
    }
}
class ToggleButton extends Node {
    w = 2;
    h = 1;
    constructor(x, y) {
        super(x, y);
        this.pins["out"] = new Pin(this, 1,0);
        this.writePin("out", true);
    }
    onStateColor = "#9f9";
    offStateColor = "#f99";
    drawExtras(c, ts) {
        c.save();
        c.beginPath();
        c.fillStyle = this.getPinData("out") ? this.onStateColor : this.offStateColor;
        c.arc((this.gx+.5)*ts, (this.gy+.5)*ts, .2*ts, 0, Math.PI*2);
        c.fill();
        c.closePath();
        c.restore();
    }
}
class LampNode extends Node {
    w = 2;
    h = 1;
    constructor(x, y) {
        super(x, y);
        this.pins["in"] = new Pin(this, 0,0);
    }
    onStateColor = "#ff3";
    offStateColor = "#990";
    pinUpdate() {
        this.noder.update();
    }
    drawExtras(c, ts) {
        c.save();
        c.beginPath();
        c.fillStyle = this.readPin("in") ? this.onStateColor : this.offStateColor;
        c.arc((this.gx+1.5)*ts, (this.gy+.5)*ts, .2*ts, 0, Math.PI*2);
        c.fill();
        c.closePath();
        c.restore();
    }
}
