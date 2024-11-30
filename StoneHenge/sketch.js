const colorSculpture = [176, 144, 111];
const numPilars = 40;
const pilarDimensions = [10, 40, 20];
const radius = 250;
const numBeams = 40;
const beamDimensions = [20, 10, 50];

function setup() {
    createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight, WEBGL);     
}
  

function draw() {
    background(31, 124, 31);    
    orbitControl();
    drawColumns();
    drawBeams();
}

function drawColumns() {
    push();
    fill(...colorSculpture);
    for (let i = 0; i < numPilars; i++) {
        translate(radius, 0, 0);
        box(...pilarDimensions);
        translate(-radius, 0, 0);
        rotateY(2 * PI / numPilars);
    }
    pop();
}

function drawBeams() {
    push();
    fill(...colorSculpture);
    translate(0, -pilarDimensions[1] / 2 - beamDimensions[1] / 2, 0);
    for (let i = 0; i < numBeams; i++) {
        translate(radius, 0, 0);
        box(...beamDimensions);
        translate(-radius, 0, 0);
        rotateY(2 * PI / numBeams);
    }
    pop();
}