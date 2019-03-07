let angle = 0;
let offset = 0.025;
let rotAngle = 0;

let radius = 150;		// Radius used to calculate position of tiles
let subDivisions = 5;	// Divide each edge of the icosohedron into this many segments
let tileWidth = 1.0;	// Add padding (1.0 = no padding; 0.1 = mostly padding)

let hexasphere;
let randArray = [];

function setup() {
	createCanvas(windowHeight, windowHeight, WEBGL);
	hexasphere = new Hexasphere(radius, subDivisions, tileWidth);
	randArray = shuffle([...Array(hexasphere.tiles.length).keys()]);
	smooth();
	textureMode(NORMAL); //necessary due to bug in p5.js v0.7.3
	colorMode(HSL, 360, 100, 100);
	noStroke();

	for (let i=0; i<hexasphere.tiles.length; i++) {
		let hexagon = hexasphere.tiles[i].boundary;
		for (let j=0; j<hexagon.length; j++) {
			let hp = hexagon[j];
			hexagon[j]['v'] = createVector(float(hp.x), float(hp.y), float(hp.z));
		}
	}
}

function draw() {
	rotateY(rotAngle);
	background(0);

	for (let i=0; i<hexasphere.tiles.length; i++){
		let h = map(sin(angle), -1, 1, 1, 1.5);
		let hue = map(sin(angle), -1, 1, 60, 2);
		let s = map(sin(angle), -1, 1, 75, 100);
		let l = map(sin(angle), -1, 1, 75, 35);
		fill(hue, s, l);

		// hexagonal pyramid
		beginShape(TRIANGLE_FAN);
		vertex(0, 0, 0);
		let hexagon = hexasphere.tiles[randArray[i]].boundary;
		for (let j=0; j<hexagon.length; j++) {
			let vhp = p5.Vector.mult(hexagon[j].v, h);
			vertex(vhp.x, vhp.y, vhp.z);
		}
		let vhp = p5.Vector.mult(hexagon[0].v, h);
		vertex(vhp.x, vhp.y, vhp.z);
		endShape(CLOSE);
		
		// hexagon
		beginShape();
		for (let j=0; j<hexagon.length; j++) {
			let vhp = p5.Vector.mult(hexagon[j].v, h);
			vertex(vhp.x, vhp.y, vhp.z);
		}
		endShape(CLOSE);

		angle += offset;
	}
	rotAngle += 0.003;
}