class Noder {
	ctx = null;
	canvas = null;
	nodes = [];
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
		let selected = this.selectedObjects.findIndex(o=> o == node);
		return selected;
	}
	moving = false;
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
				return node;
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
					if (cursorIsOn && cursorIsOn.x !== noder.cursor.x) {
						noder.cursorX = cursorIsOn.x;
					}
					else {

						let x = noder.cursor.x;
						let y = noder.cursor.y;
						if (x == 0) {
							return;
						}
						let nextTile = noder.getTile(--x, y);
						while (!nextTile) {
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
					if (cursorIsOn && cursorIsOn.y+cursorIsOn.h-1 !== noder.cursor.y) {
						noder.cursorY = cursorIsOn.y+cursorIsOn.h-1;
					}
					else {

						let x = noder.cursor.x;
						let y = noder.cursor.y;
						if (y == noder.height-1) {
							return;
						}
						let nextTile = noder.getTile(x, ++y);
						while (!nextTile) {
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
					if (cursorIsOn && cursorIsOn.y !== noder.cursor.y) {
						noder.cursorY = cursorIsOn.y;
					}
					else {

						let x = noder.cursor.x;
						let y = noder.cursor.y;
						if (y == 0) {
							return;
						}
						let nextTile = noder.getTile(x, --y);
						while (!nextTile) {
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
					if (cursorIsOn && cursorIsOn.x+cursorIsOn.w-1 !== noder.cursor.x) {
						noder.cursorX = cursorIsOn.x+cursorIsOn.w-1;
					}
					else {

						let x = noder.cursor.x;
						let y = noder.cursor.y;
						if (x == noder.width-1) {
							return;
						}
						let nextTile = noder.getTile(++x, y);
						while (!nextTile) {
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
				let node = noder.cursorIsOn();
				if (node) {
					noder.toggleSelect(node);
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
	addNode(nodeConstructor, ...args) {
		let newnode = new nodeConstructor(...args);
		newnode.noder = this;
		this.nodes.push(newnode);
		return newnode;
	}
	removeNode(info) {
		if (info instanceof Node) {
			let index = nodes.findIndex(info);
			this.removeNode(index);
		} else if (typeof info == "number") {
			this.nodes.splice(info, 1);
		}
	}
	update() {
		this.drawBackground();
		this.drawNodes();
		this.drawTiles();
		// draw wires
		this.drawSelectedIndicator();
		this.drawCursor();
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
	drawCursor() {
		let c = this.ctx;
		c.save();
		c.fillStyle = this.cursorColor;
		c.fillRect(this.cursor.x * this.tileSize, this.cursor.y * this.tileSize, this.tileSize, this.tileSize);
		c.restore();
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
	angle = 0;

	// pins of node
	// 'pinLayout' gets array [x,y]
	pinLayout = [];
    backgroudColor = "#333";
    pinColor = "#eee";
	pinSize = .4; // relative to tilesize
	

	draw() {
        this.drawBody();
        this.drawPins();
    }
    drawBody() {
        let c = this.noder.ctx;
        let tilesize = this.noder.tileSize;
        c.beginPath();
		c.fillStyle = this.backgroudColor;
        c.fillRect(this.gx*tilesize, this.gy*tilesize, this.w*tilesize, this.h*tilesize);
        c.closePath();
    }
    drawPins() {
        let c = this.noder.ctx;
        let tilesize = this.noder.tileSize;

        let rectpos = (1 - this.pinSize)/2;
        for (let pin of this.pinLayout) {
            let pos = {x: tilesize*(this.gx+rectpos+pin[0]), y: tilesize*(this.gy+rectpos+pin[1])};
            c.beginPath();
            c.strokeStyle = this.pinColor;
            // console.log(pos.x, pos.y, this.pinSize*tilesize, this.pinSize*tilesize);
            c.strokeRect(pos.x, pos.y, this.pinSize*tilesize, this.pinSize*tilesize);
            c.closePath();
        }
	}
	

    get gx() {
        return (this.x-this.noder.offset.x);
    }
    get gy() {
        return (this.y-this.noder.offset.y);
    }
}