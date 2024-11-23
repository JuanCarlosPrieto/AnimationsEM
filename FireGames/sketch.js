const gravity = 0.03;
let rockets = [];
let lilRockets = [];
const radio_rocket = 15;
const radio_little = radio_rocket / 3;
const radio_explosion = 12;

const colors = [[255, 0, 0],
                [0, 255, 0],
                [0, 0, 255],
                [255, 255, 255],
                [255, 255, 0],
                [252, 75, 8]]

function setup() {
    noStroke();
    createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight); 
    background(0); 
}
  

function draw() {
    background(0);

    update();
    for (let rocket of rockets) {
        fill(...rocket.color);
        ellipse(rocket.x, rocket.y, radio_rocket, radio_rocket);
    }

    for (let rocket of lilRockets) {
        fill(...rocket.color);
        ellipse(rocket.x, rocket.y, radio_little, radio_little);
    }
}


function update() {
    if (Math.random() < 0.02) {
        rockets.push(new Rocket(Math.random() * document.documentElement.clientWidth, document.documentElement.clientHeight, 0, -3 + Math.random() * (-2)));
    }

    for (let i = 0; i < rockets.length; i++) {
        rockets[i].fall();
        rockets[i].updatePosition();
        if (rockets[i].explode()) {
            const x = rockets[i].x;
            const y = rockets[i].y;
            const color_rocket = rockets[i].color;

            rockets[i] = rockets[rockets.length - 1];
            rockets.pop();
            i--;
            
            const number_little = Math.floor(Math.random() * 150) + 200;
            for (let i = 0; i < number_little; i++) {
                const radius = radio_explosion + gaussianRandom(5,0.5);
                const angle = Math.random() * Math.PI * 2;

                const lil_x = x + radius * Math.cos(angle);
                const lil_y = y + radius * Math.sin(angle);
                
                lilRockets.push(new Rocket(lil_x, lil_y, (lil_x - x)* Math.random() * 0.15, (lil_y - y)* Math.random() * 0.15, color_rocket));
            }
        }
    }

    for (let i = 0; i < lilRockets.length; i++) {
        lilRockets[i].fall();
        lilRockets[i].updatePosition();
        if (lilRockets[i].y > document.documentElement.clientHeight) {
            lilRockets[i] = lilRockets[lilRockets.length - 1];
            lilRockets.pop();
            i--;
        }
    }
}

function gaussianRandom(mean = 0, stdDev = 1) {
    let u1 = Math.random();
    let u2 = Math.random();
    
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    
    return z0 * stdDev + mean;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


class Rocket {
    constructor(x, y, speedx, speedy, color = colors[Math.floor(Math.random() * colors.length)]) {
        this.x = x;
        this.y = y;
        this.speedx = speedx;
        this.speedy = speedy;
        this.color = color;      
    }

    fall() {
        this.speedy = gravity + this.speedy;
    }

    updatePosition() {
        this.x += this.speedx;
        this.y += this.speedy;

        if (this.speedy > 3) {
            if (this.color[0] > 0) {
                this.color[0] -= 0.001;
            }
            if (this.color[1] > 0) {
                this.color[1] -= 0.001;
            }
            if (this.color[2] > 0) {
                this.color[2] -= 0.001;
            }
        }
    }

    explode() {
        return this.speedy > 0;
    }
}