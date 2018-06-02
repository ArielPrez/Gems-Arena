// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// addEventListener('resize', () => {
//     canvas.width = innerWidth
//     canvas.height = innerHeight

//     init()
// })

// // Utility Functions
// function randomIntFromRange(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min)
// }

// function randomColor(colors) {
//     return colors[Math.floor(Math.random() * colors.length)]
// }

// function distance(x1, y1, x2, y2) {
//     const xDist = x2 - x1
//     const yDist = y2 - y1

//     return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
// }

let particles;
let linePoints = [];
let clickCounter = 1;
let animationID;
let randomColor;
let cycle = 0;

// Objects
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = 0;
    this.velocity = 0.4;


    this.update = function() {
      // MOVE POINTS OVER TIME
        const lastPoint = {x: this.x, y: this.y};
        linePoints.push({x: this.x, y: this.y});
        this.radians += this.velocity;
        this.x = x + Math.cos(this.radians) * 50;
        this.y = y + Math.sin(this.radians) * 50;
        this.draw(lastPoint);
    };
    

    this.draw = function(lastPoint) {
      if(cycle != 1){
        c.beginPath();
        c.strokeStyle = randomColor;
        c.lineWidth = 5;
        c.moveTo(lastPoint.x,lastPoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.fillStyle = this.color;
        // c.fill();
        c.closePath();
        if(linePoints.length > 1){
          for(let i = 1; i < linePoints.length; i++){
            c.beginPath();
            c.strokeStyle = 'rgba(255,255,250,0.03)';
            c.lineWidth = 5;
            if(linePoints[i+1] !== undefined){
              c.moveTo(linePoints[i].x,linePoints[i].y);
              c.lineTo(linePoints[i+1].x,linePoints[i+1].y);  
            }
            c.stroke();
            c.closePath();
          }
        }
      }
    };
}
// Implementation
function init() {
    particles = [];

    for (let i = 0; i < 1; i++) {
        particles.push(new Particle(canvas.width/2,canvas.height/2,5,'blue'));
    }
    // console.log(particles);
}
function myColor(){
  var r,g,b = 0;
  r = Math.floor(Math.random()*100);
  g = Math.floor(Math.random()*100);
  b = Math.floor(Math.random()*100);
  // COLOR =>   # 00 00 00
  return '#'+r+g+b;
}

// Animation Loop
function animate() {
    animationID = requestAnimationFrame(animate);
    if(cycle > 50){
        // c.createLinearGradient(linePoints[1].x,linePoints[2].y,linePoints[2].x,linePoints[1].y);
        // c.clearRect(linePoints[1].x,linePoints[2].y,linePoints[2].x,linePoints[1].y);
        // c.clearRect(linePoints[2].x,linePoints[1].y,linePoints[1].x,linePoints[2].y);
        linePoints = linePoints.slice(1,linePoints.length);
    }else{
      cycle++;
    }
    // c.fillText('=> circle.js', mouse.x, mouse.y);
    particles.forEach(particle => {
     particle.update();
    });
}

canvas.addEventListener('click',function(event){
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
  randomColor = myColor();
  if(clickCounter === 1){
    init();
    animate();
    clickCounter++;
  }else{
    // c.fillRect(0,0,canvas.width,canvas.height);
    // document.body.style.backgroundImage = "url('../images/fantasy-background.jpg')";
    var bkGround = new Image();
    bkGround.src = "../images/fantasy-background.jpg";
    bkGround.onload = () => {
      c.drawImage(bkGround,0,0,canvas.width,canvas.height);   
    }​;
    
    cycle = 0;
    particles = [];
    clickCounter = 1;
    cancelAnimationFrame(animationID);
  }
});
