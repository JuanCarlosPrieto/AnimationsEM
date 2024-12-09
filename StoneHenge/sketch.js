const colorSculpture = [176, 144, 111];

const numPilars = 30;
const pilarDimensions = [20, 60, 30];
const radius = 300;//Radio Externo o mayor radio de la estructura

const numBeams = 38;
const beamDimensions = [20, 10, 50];

const colorgreyColumns = [91,105,104];
let numgreyColumns=numPilars*1.7;
let radiusgreyColumns=radius*0.75;
const greyColumnsDimensions = [10, 40, 10];

let numcentergreyColumns = numgreyColumns/3;
let radiuscentergreyColumns=radius*0.4;
const centergreyColumnsDimensions = [5, 35, 5];


//Estructura entremedias → Especie de 5 Arcos
const archpilarDimensions = [20, 85, 30];
const intercolumnspace=6;
const archBeamsDimensions = [20, 10, archpilarDimensions[2]*2+intercolumnspace];
const numArches = 5;
const radiusArches = (radiuscentergreyColumns+radiusgreyColumns)/2;//Exactamente a la mitad de lo que los rodea


function setup() {
    createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight, WEBGL);     
}

function draw() {
    background(33, 170,64);
    stroke(82, 86, 83);
    orbitControl();
    drawColumns();        
    drawBeams();
    drawgreyColumns();
    drawcentergreyColumns();
  
    //Columna de la Mitad
    push();
    fill(...colorSculpture);
    rotateY(PI*0.75);
    translate(radiuscentergreyColumns*0.75,pilarDimensions[1]/2-pilarDimensions[1]/(1.3*2),0);
    box(pilarDimensions[0]/2,pilarDimensions[1]/1.15,pilarDimensions[2]/2);
    pop();
  
  
    //Arcos Grandes → 5
    drawArches();
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

function drawgreyColumns(){
  push();
  fill(...colorgreyColumns);
  translate(0,pilarDimensions[1]/2-greyColumnsDimensions[1]/2,0);
  for(let i=0; i<numgreyColumns;i++){
      push();
      translate(radiusgreyColumns,0,0);
      box(...greyColumnsDimensions);
      pop();
      rotateY(2*PI/numgreyColumns);
  }
  pop();
}

function drawcentergreyColumns(){
  push();
  fill(...colorgreyColumns);
  translate(0,pilarDimensions[1]/2-centergreyColumnsDimensions[1]/2,0);
  for(let i=0; i<numcentergreyColumns;i++){
      push();
      translate(radiuscentergreyColumns,0,0);
      box(...centergreyColumnsDimensions);
      pop();
      rotateY(2*PI/(numcentergreyColumns*1.3));//Semicirculo
  }
  pop();
}

function drawArches(){
    push();
    fill(...colorSculpture);
    rotateY(0.55);
    translate(0,+pilarDimensions[1]/2-archpilarDimensions[1]/2,0);
    for(let j=0; j<numArches; j++){
      push();
      translate(radiusArches,0,0);
      box(...archpilarDimensions);
      //Segunda Columna
      push();
      translate(0,0,-archpilarDimensions[2]-intercolumnspace);
      box(...archpilarDimensions);
      pop();
      //Techo
      push();
      //Trasladar lo suficiente en altura y en el ancho de la columna para que quede exactamente el borde del techo con el borde de la primera y segunda columna
      translate(0, -archpilarDimensions[1] / 2 - archBeamsDimensions[1] / 2,+archpilarDimensions[2]/2-archBeamsDimensions[2]/2);
      box(...archBeamsDimensions);
      pop();
      pop();
      rotateY(2*PI/(numArches*1.5));
    }
    pop();
}