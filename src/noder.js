class Noder {
	ctx = null;
	canvas = null;
	nodes = [];
	wires = [];
	tileSize = 20;
	selectedObjects = [];
	select(node) {
		if (this.getSelectedIndex(node) === -1) {
			this.selectedObjects.push(node);
		}
		this.update();
	}
	unselect(node) {
		let index = this.getSelectedIndex(node);
		if (index !== -1) {
			this.selectedObjects.splice(index, 1);
		}
		this.update();
	}
	toggleSelect(node) {
		let index = this.getSelectedIndex(node);
		if (this.getSelectedIndex(node) === -1) {
			this.selectedObjects.push(node);
		}
		else {
			this.selectedObjects.splice(index, 1);
		}
		this.update();
	}
	getSelectedIndex(node) {
		return this.selectedObjects.findIndex(o=> o == node);
	}
	moving = false;
	wiring = {
		bool: false,
		pin: null,
	};
	cursor = {
		x: 0,
		y: 12,
		object: null,
	};
	get cursorX() {
		return this.cursor.x;
	}
	set cursorX(value) {
		let cursor = this.cursor;
		if (this.moving) {
			for (let object of this.selectedObjects) {
				object.x += value - cursor.x;
			}
		}
		cursor.x = value;
		this.update();
	}
	get cursorY() {
		return this.cursor.y;
	}
	set cursorY(value) {
		let cursor = this.cursor;
		if (this.moving) {
			for (let object of this.selectedObjects) {
				object.y += value - cursor.y;
			}
		}
		cursor.y = value;
		this.update();
	}
	getTile(x, y) {
		for (let node of this.nodes) {
			if (x >= node.gx && x < node.gx+node.w && y >= node.gy && y < node.gy+node.h) {
				return {node, pin: node.getPinByPos(x, y)};
			}
		}
		return false;
	}
	cursorIsOn() {
		return this.getTile(this.cursor.x, this.cursor.y);
	}
	offset = {
		x: 0,
		y: 0,
	}
	get offsetX() {
		return this.offset.x;
	}
	set offsetX(value) {
		this.cursor.x += this.offset.x - value;
		if (this.cursor.x < 0) {
			this.cursor.x = 0;
		} else if (this.cursor.x >= this.width) {
			this.cursor.x = this.width-1;
		}
		this.offset.x = value;
		this.update();
	}
	get offsetY() {
		return this.offset.y;
	}
	set offsetY(value) {
		this.cursor.y += this.offset.y - value;
		if (this.cursor.y < 0) {
			this.cursor.y = 0;
		} else if (this.cursor.y >= this.height) {
			this.cursor.y = this.height-1;
		}
		this.offset.y = value;
		this.update();
	}
	backgrundColor = "#194256";
	tileLineColor = "#fff3"
	cursorColor = "#fffa";
	selectedIndicatorColor = "#fff";
	selectedIndicatorMovingColor = "#f93";
	key = { // keycodes and means
		37: { // left arrow
			down(noder, e) {
				if (e.ctrlKey) {
					let cursorIsOn = noder.cursorIsOn() 
					if (cursorIsOn.node && cursorIsOn.node.x !== noder.cursor.x) {
						noder.cursorX = cursorIsOn.node.x;
					}
					else {

						let x = noder.cursor.x;
						let y = noder.cursor.y;
						if (x == 0) {
							return;
						}
						let nextTile = noder.getTile(--x, y);
						while (!nextTile.node) {
							nextTile = noder.getTile(--x, y);

							if (x == 0) {
								break;
							}
						}
						noder.cursorX = x;
						return;
					}
				}
				else {
					if (noder.cursorX == 0) {
						noder.offsetX--;
					}
					noder.cursorX--;
				}
			}
		},
		40: { // down arrow
			down(noder, e) {
				if (e.ctrlKey) {
					let cursorIsOn = noder.cursorIsOn() 
					if (cursorIsOn.node && cursorIsOn.node.y+cursorIsOn.node.h-1 !== noder.cursor.y) {
						noder.cursorY = cursorIsOn.node.y+cursorIsOn.node.h-1;
					}
					else {

						let x = noder.cursor.x;
						let y = noder.cursor.y;
						if (y == noder.height-1) {
							return;
						}
						let nextTile = noder.getTile(x, ++y);
						while (!nextTile.node) {
							nextTile = noder.getTile(x, ++y);

							if (y == noder.height-1) {
								break;
							}
						}
						noder.cursorY = y;
						return;
					}
				}
				else {
					if (noder.cursorY+1 == noder.height) {
						noder.offsetY++;
					}
					noder.cursorY++;
				}
			}
		},
		38: { // up arrow
			down(noder, e) {
				if (e.ctrlKey) {
					let cursorIsOn = noder.cursorIsOn() 
					if (cursorIsOn.node && cursorIsOn.node.y !== noder.cursor.y) {
						noder.cursorY = cursorIsOn.node.y;
					}
					else {

						let x = noder.cursor.x;
						let y = noder.cursor.y;
						if (y == 0) {
							return;
						}
						let nextTile = noder.getTile(x, --y);
						while (!nextTile.node) {
							nextTile = noder.getTile(x, --y);

							if (y == 0) {
								break;
							}
						}
						noder.cursorY = y;
						return;
					}
				}
				else {
					if (noder.cursorY == 0) {
						noder.offsetY--;
					}
					noder.cursorY--;
				}
			}
		},
		39: { // right arrow
			down(noder, e) {
				if (e.ctrlKey) {
					let cursorIsOn = noder.cursorIsOn() 
					if (cursorIsOn.node && cursorIsOn.node.x+cursorIsOn.node.w-1 !== noder.cursor.x) {
						noder.cursorX = cursorIsOn.node.x+cursorIsOn.node.w-1;
					}
					else {

						let x = noder.cursor.x;
						let y = noder.cursor.y;
						if (x == noder.width-1) {
							return;
						}
						let nextTile = noder.getTile(++x, y);
						while (!nextTile.node) {
							nextTile = noder.getTile(++x, y);

							if (x == noder.width-1) {
								break;
							}
						}
						noder.cursorX = x;
						return;
					}
				}
				else {
					if (noder.cursorX+1 == noder.width) {
						noder.offsetX++;
					}
					noder.cursorX++;
				}
			}
		},
		72: { // h
			down(noder) {
				noder.offsetX--;
			}
		},
		75: { // j
			down(noder) {
				noder.offsetY--;
			}
		},
		74: { // k
			down(noder) {
				noder.offsetY++;
			}
		},
		76: { // l
			down(noder) {
				noder.offsetX++;
			}
		},
		77: { // m (move)
			down(noder) {
				noder.moving = !noder.moving;
				noder.update();
			}
		},
		83: { // s (toggle select)
			down(noder) {
				let cursorIsOn = noder.cursorIsOn();
				if (cursorIsOn.node) {
					noder.toggleSelect(cursorIsOn.node);
				}
			}
		},
		65: { // a (select/unselect all)
			down(noder) {
				if (noder.selectedObjects.length !== 0) {
					noder.selectedObjects.length = 0;
				}
				else {
					noder.selectedObjects = [...noder.nodes];
				}
				noder.update();
			}
		},
		87: { // w (wiring)
			down(noder) {
				let wiring = noder.wiring;
				let cursorIsOn = noder.cursorIsOn();
				if (cursorIsOn.pin) {
					if (!wiring.bool && !cursorIsOn.pin.wire) {
						wiring.bool = true;
						wiring.pin = cursorIsOn.pin;
					}
					else {
						wiring.bool = false;
						if (!cursorIsOn.pin.wire) {
							noder.addWire(wiring.pin, cursorIsOn.pin);
						}
					}
				}
			}
		},
		68: { // d (disconnect pin)
			down(noder) {
				let cursorIsOn = noder.cursorIsOn();
				if (cursorIsOn.pin && cursorIsOn.pin.wire) {
					cursorIsOn.pin.disconnect();
					noder.update();
				}
			}
		},
	}

	constructor(targetCanvas, width=40, height=30) { // pretify
		let ok = false;
		if (targetCanvas) {
			if (targetCanvas instanceof HTMLCanvasElement) {
				this.canvas = targetCanvas;
				ok = true;
			} else if (typeof targetCanvas == "string") {
				let newcanvas = document.querySelector(targetCanvas);
				if (newcanvas instanceof HTMLCanvasElement) {
					this.canvas = newcanvas;
					ok = true;
				} else {
					console.error(new Error("'Noder' invalid paramater"));
				}
			}
		} else {
			console.error(new Error("'Noder' invalid paramater"));
		}
		if (ok) {
			this.ctx = this.canvas.getContext("2d");
			this.width = width;
			this.height = height;
			this.resizeCanvas();

			document.addEventListener("keydown", e=>{this.keydown(e)}, false);
			document.addEventListener("keyup", e=>{this.keyup(e)}, false);
		}
	}
	keydown(e) {
		let newkey = this.key[e.keyCode];
		if (newkey && newkey.down) {
			newkey.down(this, e);
		}
	}
	keyup(e) {
		let newkey = this.key[e.keyCode];
		if (newkey && newkey.up) {
			newkey.up(this, e);
		}
	}
	addWire(pin1, pin2) { // pin1: Pin, pin2: Pin
		let wire = new Wire(pin1, pin2);
		pin1.wire = wire;
		pin2.wire = wire;
		this.wires.push(wire);
		this.update();
	}
	removeWire(info) {
		if (info instanceof Wire) {
			let index = this.wires.findIndex(w => w == info);
			this.removeWire(index);
		} else if (typeof info == "number") {
			let wire = this.wires[info];
			wire.pin1.wire = null;
			wire.pin2.wire = null;
			this.wires.splice(info, 1);
		}
	}
	addNode(nodeConstructor, ...args) {
		let newnode = new nodeConstructor(...args);
		newnode.noder = this;
		this.nodes.push(newnode);
		this.update();
		return newnode;
	}
	addNodes(...nodes) {
		for (let node of nodes) {
			node.noder = this;
			this.nodes.push(node);
		}
		this.update();
	}
	removeNode(info) {
		if (info instanceof Node) {
			let index = this.nodes.findIndex(n => n == info);
			this.removeNode(index);
		} else if (typeof info == "number") {
			this.nodes.splice(info, 1);
		}
	}
	drawTileLines = true;
	update() {
		this.drawBackground();
		this.drawNodes();
		if (this.drawTileLines) {
			this.drawTiles();
		}
		// draw wires
		this.drawSelectedIndicator();
		this.drawWires();
		this.drawCursor();
		this.drawWiring();
	}
	drawBackground() {
		let c = this.ctx;
		c.save();
		c.fillStyle = this.backgrundColor;
		c.fillRect(0,0,this.computedWidth,this.computedHeight);
		c.restore();
	}
	drawNodes() {
		let c = this.ctx;
		for (let node of this.nodes) {
			c.save();
			node.draw();
			c.restore();
		}
	}
	drawTiles() {
		let c = this.ctx;
		c.save();
		c.beginPath();
		c.strokeStyle = this.tileLineColor;
		for (let i = 1; i < this.width; i++) {
			c.moveTo(i*this.tileSize,0);
			c.lineTo(i*this.tileSize,this.computedHeight);
		}
		for (let i = 1; i < this.height; i++) {
			c.moveTo(0, i*this.tileSize);
			c.lineTo(this.computedWidth, i*this.tileSize);
		}
		c.stroke();
		c.closePath();
		c.restore();
	}
	drawSelectedIndicator() {
		let c = this.ctx;
		c.save();
		c.setLineDash([this.tileSize/2.5, this.tileSize*0.6]);
		c.lineDashOffset = this.tileSize/5;
		c.strokeStyle = this.moving ? this.selectedIndicatorMovingColor : this.selectedIndicatorColor;
		for (let node of this.selectedObjects) {
			c.strokeRect(node.gx*this.tileSize,node.gy*this.tileSize,node.w*this.tileSize,node.h*this.tileSize);
		}
		c.restore();
	}
	drawWires() {
		for (let wire of this.wires) {
			this.drawWire(...wire.pin1.position, ...wire.pin2.position);
		}
	}
	drawCursor() {
		let c = this.ctx;
		c.save();
		c.fillStyle = this.cursorColor;
		c.fillRect(this.cursor.x * this.tileSize, this.cursor.y * this.tileSize, this.tileSize, this.tileSize);
		c.restore();
	}
	drawWiring() {
		if (this.wiring.bool) {
			let pin = this.wiring.pin;
			this.drawWire(this.cursor.x, this.cursor.y, pin.gx, pin.gy);
		}
	}
	resizeCanvas() {
		this.canvas.width = this.width * this.tileSize;
		this.canvas.height = this.height * this.tileSize;
	}
	get computedWidth() {
		return this.width * this.tileSize;
	}
	get computedHeight() {
		return this.height * this.tileSize;
	}
	drawDot(x, y) {
		let c = this.ctx;
		c.save();
		c.beginPath();
		c.fillStyle = "red";
		c.arc(x, y, 2, 0, 2*Math.PI);
		c.fill();
		c.closePath();
		c.restore();
	}
	wireColor = "#fff";
	wireWidth = .2;
	drawWire(x1,y1, x2,y2) {
		let c = this.ctx,
			distX = x1 - x2,
			distY = y1 - y2,
			signX = Math.sign(distX),
			signY = Math.sign(distY),
			pts = (
				(Math.abs(distY) < Math.abs(distX)) ? // if
					[ x1, y1, x1, y1-distY/2-signY, x2, y1-distY/2+signY, x2, y2 ]
					: // else
					[ x1, y1, x1-distX/2-signX, y1, x1-distX/2+signX, y2, x2, y2 ]
			).map( a => (a+.5) * this.tileSize );
		
		c.save();
		c.beginPath();
		// this.drawDot(pts[0], pts[1]);
		// this.drawDot(pts[2], pts[3]);
		// this.drawDot(pts[4], pts[5]);
		// this.drawDot(pts[6], pts[7]);
		c.strokeStyle = this.wireColor;
		c.lineWidth = this.tileSize*this.wireWidth;
		c.lineCap = 'round';
		c.moveTo(pts[0], pts[1]);
		c.bezierCurveTo(pts[2], pts[3], pts[4], pts[5], pts[6], pts[7]);
		c.stroke();
		c.restore();
	}
}
class Node {
    constructor(x=0, y=0) {
        // top left position of node (in segments)
        this.x = x;
        this.y = y;
    }
	noder = null;
	
	// sizes of node (in segments)
	w = 4; // width
	h = 4; // heigth

	// angle of node
	// 'angle' can get 0-3 numeric values
	// 0: 0deg, 1: 90deg, 2:180deg, 3:270deg
	// angle = 0;

	// pins of node
	pins = {};
	getPinData(name) {
		return this.pins[name].data;
	}
	readPin(name) {
		return this.pins[name].read();
	}
	writePin(name, value) {
		return this.pins[name].write(value);
	}
	pinUpdate(index, value) {
		// HERE
		console.log("pin updated: ", index, ",value :", value);
	}
	// get
	getPinByPos(x, y) {
		x = x-this.gx;
		y = y-this.gy;
		for (let pin of Object.values(this.pins)) {
			if (pin.x == x && pin.y == y) {
				return pin;
			}
		}
		return;
	}
	getPinName(pin) {
		for (let name in this.pins) {
			if (this.pins[name] == pin) {
				return name;
			}
		}
		return;
	}


	drawPinsFirst = false;
	draw() {
		this.drawBody();
		if (this.drawPinsFirst) {
			this.drawPins();
			this.drawExtras(this.noder.ctx, this.noder.tileSize);
		}
		else {
			this.drawExtras(this.noder.ctx, this.noder.tileSize);
			this.drawPins();
		}
	}
	
    backgroudColor = "#333";
    drawBody() {
        let c = this.noder.ctx;
        let tilesize = this.noder.tileSize;
        c.beginPath();
		c.fillStyle = this.backgroudColor;
        c.fillRect(this.gx*tilesize, this.gy*tilesize, this.w*tilesize, this.h*tilesize);
        c.closePath();
	}

	pinWidth = .05; // relative to tilesize
    pinColor = "#ddd";
	pinSize = .25; // relative to tilesize
    drawPins() {
        let c = this.noder.ctx,
			ts = this.noder.tileSize,
			rectpos = (1 - this.pinSize)/2;
		
		for (let pin of Object.values(this.pins)) {
			c.beginPath();
            c.strokeStyle = this.pinColor;
            c.lineWidth = ts*this.pinWidth;
            c.strokeRect((pin.gx+rectpos)*ts, (pin.gy+rectpos)*ts, this.pinSize*ts, this.pinSize*ts);
            c.closePath();
		}
	}

	drawExtras() {}

    get gx() {
        return (this.x-this.noder.offset.x);
    }
    get gy() {
        return (this.y-this.noder.offset.y);
    }
	get position() {
		return [this.gx, this.gy];
	}
}
class Pin {
	wire = null;
	data;
	constructor(node, x, y) { // node: Node, x: Number, y: Number
		this.node = node;
		this.x = x;
		this.y = y;
	}
	get gx() {
		return this.node.gx + this.x;
	}
	get gy() {
		return this.node.gy + this.y;
	}
	get position() {
		return [this.gx, this.gy];
	}
	connect(wire) { // wire: Wire
		this.wire = wire;
		return this;
	}
	disconnect() {
		this.node.noder.removeWire(this.wire);
		return this;
	}
	read() {
		return this.wire ? this.wire.get(this) : undefined;
	}
	write(value) { // value: any
		this.data = value;
		if (this.wire) this.wire.send(this);
		return this;
	}
	update() {
		this.node.pinUpdate();
		return this;
	}
}
class Wire {
	constructor(pin1, pin2) { // pin1: Pin, pin2: Pin
		this.pin1 = pin1;
		this.pin2 = pin2;
	}

	get(receiver) { // receiver: Pin
		return this.other(receiver).data;
	}
	send(emitter) { // emitter: Pin
		this.other(emitter).update();
	}
	other(requester) { // requester: Pin
		return (requester === this.pin2) ? this.pin1 : this.pin2;
	}
}
