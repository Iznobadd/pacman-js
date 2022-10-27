const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
    static width = 50;
    static height = 50;
    constructor({position}) {
        this.position = position
        this.width = 50
        this.height = 50
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Player {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const boundaries = [];

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    z: {
        pressed: false
    },
    q: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey = '';

const map = [
    ['-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-'],
];

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol) {
            case '-':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    }
                }))
            break;
        }
    });
});

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    boundaries.forEach((boundary) => {
        boundary.draw();
    });
    
    player.update();

    player.velocity.x = 0;
    player.velocity.y = 0;

    if(keys.z.pressed && lastKey === 'z'){
        player.velocity.y = -1;
    } else if(keys.s.pressed && lastKey === 's'){
        player.velocity.y = 1;
    } else if(keys.q.pressed && lastKey === 'q'){
        player.velocity.x = -1;
    } else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1;
    }
}

animate();


addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'z':
            keys.z.pressed = true;
            lastKey = 'z';
        break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
        break;
        case 'q':
            keys.q.pressed = true;
            lastKey = 'q';
        break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
        break;
    }
    console.log(lastKey);
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'z':
            keys.z.pressed = false;
        break;
        case 's':
            keys.s.pressed = false;
        break;
        case 'q':
            keys.q.pressed = false;
        break;
        case 'd':
            keys.d.pressed = false;
        break;
    }
})