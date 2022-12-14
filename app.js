const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const score = document.querySelector('#score');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
    static width = 40;
    static height = 40;
    constructor({position, image}) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
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

class Pellet {
    constructor({position}) {
        this.position = position
        this.radius = 3
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }
}

const pellets = [];
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
let scores = 0;

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ]

function createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol) {
            case '-':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    image: createImage('./img/pipeHorizontal.png')
                  })
                )
                break
              case '|':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    image: createImage('./img/pipeVertical.png')
                  })
                )
                break
              case '1':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner1.png')
                  })
                )
                break
              case '2':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner2.png')
                  })
                )
                break
              case '3':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner3.png')
                  })
                )
                break
              case '4':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner4.png')
                  })
                )
                break
              case 'b':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.width * j,
                      y: Boundary.height * i
                    },
                    image: createImage('./img/block.png')
                  })
                )
                break
              case '[':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/capLeft.png')
                  })
                )
                break
              case ']':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/capRight.png')
                  })
                )
                break
              case '_':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/capBottom.png')
                  })
                )
                break
              case '^':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/capTop.png')
                  })
                )
                break
              case '+':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/pipeCross.png')
                  })
                )
                break
              case '5':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorTop.png')
                  })
                )
                break
              case '6':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorRight.png')
                  })
                )
                break
              case '7':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    color: 'blue',
                    image: createImage('./img/pipeConnectorBottom.png')
                  })
                )
                break
              case '8':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: j * Boundary.width,
                      y: i * Boundary.height
                    },
                    image: createImage('./img/pipeConnectorLeft.png')
                  })
                )
                break
                case '.':
                    pellets.push(
                      new Pellet({
                        position: {
                          x: j * Boundary.width + Boundary.width / 2,
                          y: i * Boundary.height + Boundary.height / 2
                        },
                        image: createImage('./img/pipeConnectorLeft.png')
                      })
                    )
                    break
        }
    });
});

function collideWithWalls({
    player,
    walls
}) {
    return (player.position.y - player.radius + player.velocity.y <= walls.position.y + walls.height &&
        player.position.x + player.radius + player.velocity.x >= walls.position.x &&
        player.position.y + player.radius + player.velocity.y >= walls.position.y && 
        player.position.x - player.radius + player.velocity.x <= walls.position.x + walls.width);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    if(keys.z.pressed && lastKey === 'z'){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collideWithWalls({
                player: {...player, velocity: {
                    x: 0,
                    y: -5
                }},
                walls: boundary
            })){
                player.velocity.y = 0;
                break
            } else {
                player.velocity.y = -5;
            }
        }
    
    } else if(keys.s.pressed && lastKey === 's'){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collideWithWalls({
                player: {...player, velocity: {
                    x: 0,
                    y: 5
                }},
                walls: boundary
            })){
                player.velocity.y = 0;
                break
            } else {
                player.velocity.y = 5;
            }
        }
    
    } else if(keys.q.pressed && lastKey === 'q'){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collideWithWalls({
                player: {...player, velocity: {
                    x: -5,
                    y: 0
                }},
                walls: boundary
            })){
                player.velocity.x = 0;
                break
            } else {
                player.velocity.x = -5;
            }
        }
    
    } else if(keys.d.pressed && lastKey === 'd'){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(collideWithWalls({
                player: {...player, velocity: {
                    x: 5,
                    y: 0
                }},
                walls: boundary
            })){
                player.velocity.x = 0;
                break
            } else {
                player.velocity.x = 5;
            }
        }
    }

    for(let i = pellets.length - 1; 0 < i; i--)
    {
        const pellet = pellets[i];
        pellet.draw()

        if(Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius){
            pellets.splice(i, 1);
            scores += 1;
            score.innerHTML = scores;
        }
    }


    boundaries.forEach((boundary) => {
        boundary.draw();
        if(collideWithWalls({
            player: player,
            walls: boundary
        })){
                player.velocity.x = 0;
                player.velocity.y = 0;
        }
    });
    
    player.update();
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