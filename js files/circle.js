// DRAW A CIRCLE ON THE SELECTED GEM
// function circle(x,y){
//   ctx.beginPath();
//   ctx.arc(x+calculation/2,y+calculation/2,calculation/2+5,0,Math.PI *2,false);
//   ctx.lineWidth=calculation/12;
//   ctx.strokeStyle = 'blue';
//   ctx.stroke();
//   ctx.closePath();
// }


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
        this.x = x + Math.cos(this.radians) * (calculation/2+6);
        this.y = y + Math.sin(this.radians) * (calculation/2+6);
        this.draw(lastPoint);
    };
    

    this.draw = function(lastPoint) {
      if(cycle != 1){
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.moveTo(lastPoint.x,lastPoint.y);
        ctx.lineTo(this.x,this.y);
        ctx.stroke();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.fillStyle = this.color;
        // c.fill();
        ctx.closePath();
        if(linePoints.length > 1){
          for(let i = 1; i < linePoints.length; i++){
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(3,169,244,0.02)';
            ctx.lineWidth = 1;
            if(linePoints[i+1] !== undefined){
              ctx.moveTo(linePoints[i].x,linePoints[i].y);
              ctx.lineTo(linePoints[i+1].x,linePoints[i+1].y);  
            }
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    };
}

// Implementation
function init(x,y) {
  particles = [];

  for (let i = 0; i < 1; i++) {
      particles.push(new Particle(x+calculation/2,y+calculation/2,5,'blue'));
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
      //  ctx.createLinearGradient(linePoints[1].x,linePoints[2].y,linePoints[2].x,linePoints[1].y);
      //  ctx.clearRect(linePoints[1].x,linePoints[2].y,linePoints[2].x,linePoints[1].y);
      //  ctx.clearRect(linePoints[2].x,linePoints[1].y,linePoints[1].x,linePoints[2].y);
      linePoints = linePoints.slice(1,linePoints.length);
  }else{
    cycle++;
  }
  // c.fillText('=> circle.js', mouse.x, mouse.y);
  particles.forEach(particle => {
   particle.update();
  });
}
