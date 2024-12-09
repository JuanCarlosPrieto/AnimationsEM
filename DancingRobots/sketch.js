const backgroundColor = [213, 186, 152];
const footColor = [0, 0, 0];
const bodyColor = [120, 120, 120];
const jointColor = [255, 0, 0];

const shoeDimensions = [20, 5, 50];
const footDimensions = [20, 10, 30];
const bottomLegDimensions = [6, 35];
const topLegDimensions = [7.5, 25];
const bodyDimensions = [60, 60, 30]
const topHandDimensions = [6, 25];
const bottomHandDimensions = [5, 25];
const headDimensions = 15;
const jointDimensions = 10;

const legDistance = 30;

const rows = 10;
const cols = 10;

function setup() {
    createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight, WEBGL);
    noStroke();
}
  

function draw() {
    background(...backgroundColor);
    orbitControl();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            push();
            translate(i*300, 0, -j*150);
            drawRobot(0.5 * Math.sin(frameCount / 20) * Math.sin(frameCount / 20));
            pop();
        }
    }    
}

function drawRobot(angle) {
    //shoes
    push();
    fill(...footColor);
    translate(-legDistance / 2, 0, 0)
    box(width=shoeDimensions[0], height=shoeDimensions[1], depth=shoeDimensions[2]);
    pop();

    push();
    fill(...footColor);
    translate(legDistance / 2, 0, 0);
    box(width=shoeDimensions[0], height=shoeDimensions[1], depth=shoeDimensions[2]);
    pop();

    // feet
    push();
    fill(...footColor);
    translate(-legDistance / 2, - footDimensions[1] / 2, 0)
    box(width=footDimensions[0], height=footDimensions[1], depth=footDimensions[2]);
    pop();

    push();
    fill(...footColor);
    translate(legDistance / 2, - footDimensions[1] / 2, 0);
    box(width=footDimensions[0], height=footDimensions[1], depth=footDimensions[2]);
    pop();

    // bottom_leg
    push();
    fill(...bodyColor);
    translate(-legDistance / 2, - bottomLegDimensions[1] / 2, 0);
    rotateX(-angle);
    cylinder(radius=bottomLegDimensions[0], height=bottomLegDimensions[1]);
    pop();

    push();
    fill(...bodyColor);
    translate(legDistance / 2, - bottomLegDimensions[1] / 2, 0); 
    rotateX(-angle);  
    cylinder(radius=bottomLegDimensions[0], height=bottomLegDimensions[1]);
    pop(); 

    // joint_knee
    push();
    fill(...jointColor);
    translate(-legDistance / 2, - bottomLegDimensions[1] * Math.cos(angle), Math.sin(angle) * bottomLegDimensions[1] / 2);
    sphere(radius=jointDimensions);
    pop();

    push();
    fill(...jointColor);
    translate(legDistance / 2, - bottomLegDimensions[1] * Math.cos(angle), Math.sin(angle) * bottomLegDimensions[1] / 2);   
    sphere(radius=jointDimensions);
    pop(); 

    // top_leg
    push();
    fill(...bodyColor);
    translate(-legDistance / 2, - bottomLegDimensions[1] * Math.cos(angle) - topLegDimensions[1] * Math.cos(angle)/2 , 0);
    rotateX(angle);
    cylinder(radius=topLegDimensions[0], height=topLegDimensions[1]);
    pop();

    push();
    fill(...bodyColor);
    translate(legDistance / 2, - bottomLegDimensions[1] * Math.cos(angle) - topLegDimensions[1] * Math.cos(angle)/2, 0);
    rotateX(angle);  
    cylinder(radius=topLegDimensions[0], height=topLegDimensions[1]);
    pop();

    // joint_wrist
    push();
    fill(...jointColor);
    translate(-legDistance / 2, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle), - topLegDimensions[1] * Math.sin(angle) / 2);
    sphere(radius=jointDimensions)
    pop();

    push();
    fill(...jointColor);
    translate(legDistance / 2, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle), - topLegDimensions [1] * Math.sin(angle) / 2);   
    sphere(radius=jointDimensions)
    pop();
    
    // body
    push();
    fill(...jointColor);
    translate(0, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1]/2, 0);
    box(width=bodyDimensions[0], height=bodyDimensions[1], depth=bodyDimensions[2]);
    pop();

    // top_hand
    push();
    fill(...bodyColor);
    translate(-bodyDimensions[0]/2 - topHandDimensions[1]/2, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] + topHandDimensions[0] + 2 * topHandDimensions[0] * Math.sin(angle), 0);
    rotateZ(PI / 2 - angle);
    cylinder(radius=topHandDimensions[0], height=topHandDimensions[1]);
    pop();

    push();
    fill(...bodyColor);
    translate(bodyDimensions[0]/2 + topHandDimensions[1]/2, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] + topHandDimensions[0] + 2 * topHandDimensions[0] * Math.sin(angle), 0);
    rotateZ(- PI / 2 + angle);
    cylinder(radius=topHandDimensions[0], height=topHandDimensions[1]);
    pop();

    // joint_shoulder
    push();
    fill(...jointColor);
    translate(-bodyDimensions[0]/2, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] + jointDimensions/2 + jointDimensions * Math.sin(angle) / 2, 0);
    sphere(radius=jointDimensions)
    pop();

    push();
    fill(...jointColor);
    translate(bodyDimensions[0]/2, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] + jointDimensions/2 + jointDimensions * Math.sin(angle) / 2, 0);
    sphere(radius=jointDimensions);
    pop();

    // bottom_hand
    push();
    fill(...bodyColor);
    translate(-bodyDimensions[0]/2 - topHandDimensions[1] - bottomHandDimensions[1]/2, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] + topHandDimensions[0] + 2 * topHandDimensions[0] * Math.sin(angle), 0);
    rotateZ(PI / 2 + angle);
    cylinder(radius=bottomHandDimensions[0], height=bottomHandDimensions[1]);
    pop();

    push();
    fill(...bodyColor);
    translate(bodyDimensions[0]/2 + topHandDimensions[1] + bottomHandDimensions[1]/2, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] + topHandDimensions[0] + 2 * topHandDimensions[0] * Math.sin(angle), 0);
    rotateZ(- PI / 2 - angle);
    cylinder(radius=bottomHandDimensions[0], height=bottomHandDimensions[1]);
    pop();

    // joint_elbow
    push();
    fill(...jointColor);
    translate(-bodyDimensions[0]/2 - topHandDimensions[1], (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] + jointDimensions/2 + 2 * jointDimensions * Math.sin(angle), 0);
    sphere(radius=jointDimensions)
    pop();

    push();
    fill(...jointColor);
    translate(bodyDimensions[0]/2 + topHandDimensions[1], (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] + jointDimensions/2 + 2 * jointDimensions * Math.sin(angle) , 0);
    sphere(radius=jointDimensions);
    pop();
    
    // head
    push();
    fill(...bodyColor);
    translate(0, (- bottomLegDimensions[1] - topLegDimensions[1]) * Math.cos(angle) - bodyDimensions[1] - headDimensions, 0);
    sphere(radius=headDimensions);
    pop();    
}