// var gems = [];  ====> ARRAY DE GEMAS
var gems = [
  { name: 'blue',         img: 'images/gems/blue.jpg' },
  { name: 'pink',         img: 'images/gems/pink.jpg' },
  { name: 'green',        img: 'images/gems/green.jpg' },
  { name: 'yellow',        img: 'images/gems/yellow.jpg'},
  ];
// ARRAY DE CHARACTERS
var characters = [
  { name: 'mage1',       img: 'images/characters/mage-left1.jpg'},
  { name: 'mage2',       img: 'images/characters/mage-left2.jpg'},
  { name: 'mage3',       img: 'images/characters/mage-left3.jpg'},
  { name: 'mage4',       img: 'images/characters/mage-right1.jpg'},
  { name: 'mage5',       img: 'images/characters/mage-right2.jpg'},
  { name: 'mage6',       img: 'images/characters/mage-right3.jpg'},
  { name: 'sorcerer1',       img: 'images/characters/sorcerer-left1.jpg'},
  { name: 'sorcerer2',       img: 'images/characters/sorcerer-left2.jpg'},
  { name: 'sorcerer3',       img: 'images/characters/sorcerer-left3.jpg'},
  { name: 'sorcerer4',       img: 'images/characters/sorcerer-right1.jpg'},
  { name: 'sorcerer5',       img: 'images/characters/sorcerer-right2.jpg'},
  { name: 'sorcerer6',       img: 'images/characters/sorcerer-right3.jpg'},
];

// DIFFERENT VARIABLES
  let panel = [];
  let gemSelected = [];
  let gemToChange = [];
  let gemIndex;
  let indexToChange;
  let clickCounter = 0;
  const calculation = Math.floor(Math.floor(document.getElementById('myBody').offsetWidth / 3)/5);
  const x_dimention = 5;
  const y_dimention = 5;


var mouse = {
  x: undefined,
  y: undefined,
};

// HTML ELEMENTS FOR A DYNAMIC SIZE
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var player1 = document.getElementsByClassName("character1")[0];
  var player2 = document.getElementsByClassName("character2")[0];



// START OF THE GAME
window.onload = function(){
  // elemLeft = canvas.offsetLeft;
  // elemTop = canvas.offsetTop;

  startGame();

};

function startGame(params) {
  measureBlockPage();
  drawPanel();

  // ADD EVENT LISTENER FOR CLICK EVENTS
  canvas.addEventListener('click',function(event){
    console.log("PANEL", panel);
    // console.log('EVENT: X - ', event.offsetX + '   Y - ', event.offsetY );
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;

    panel.forEach(function(panel,i){
      
      if(mouse.x > panel.positionX &&
          mouse.y > panel.positionY){
            gemSelected = panel;
            gemIndex = i;
      }
          
    });
    if(clickCounter === 0){
      gemToChange = gemSelected;
      indexToChange = gemIndex;
      circle(gemSelected.positionX,gemSelected.positionY);
      clickCounter++;
    }else{
      circle(gemSelected.positionX,gemSelected.positionY);
      moveGems(panel,gemSelected,gemToChange,gemIndex,indexToChange);
      // var isARow = checkGems(panel,gemSelected,gemToChange,gemIndex,indexToChange);
      clickCounter = 0;
    }
    
  },false);
}

// MEASURE THE ELEMENTS OF THE SCREEN
function measureBlockPage() {
  canvas.width = Math.floor((document.getElementById('myBody').offsetWidth / 3));
  canvas.height = Math.floor((document.getElementById('myBody').offsetWidth / 3));

  player1.width = Math.floor(document.getElementById('myBody').offsetWidth / 3)-2;
  player1.height = Math.floor(window.innerHeight / 1.5);
  player1.getElementsByTagName("img")[0].style.width = player1.width+"px";
  player1.getElementsByTagName("img")[0].style.height = player1.height+"px";
  
  player2.width = Math.floor(document.getElementById('myBody').offsetWidth / 3)-2;
  player2.height = Math.floor(window.innerHeight / 1.5);
  player2.getElementsByTagName("img")[0].style.width = player2.width+"px";
  player2.getElementsByTagName("img")[0].style.height = player2.height+"px";
  
}

// DRAW A PANEL OF GEMS
function drawPanel() {
  let aux = 0;
  if(panel.length != 0){
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < x_dimention; i++) {
      for (let j = 0; j < y_dimention; j++) {

        const x = new Image();
        x.src = panel[aux].img;
        
        x.onload = () => 
        {
          ctx.drawImage(x,j*calculation,i*calculation,calculation,calculation);
        };
        aux++;
      }
    }
  }else{
    for (let i = 0; i < x_dimention; i++) {
      for (let j = 0; j < y_dimention; j++) {
        // let num = Math.floor(Math.random()*4);
  
        aux = generateNumGem();
  
        const x = new Image();
        x.src = gems[aux].img;
        // push into array
        panel.push({name:gems[aux].name, img:gems[aux].img, positionX:j*calculation, positionY:i*calculation});
        
        x.onload = () => 
        {
          ctx.drawImage(x,j*calculation,i*calculation,calculation,calculation);
        };
      }
    }
  }
  
}

 // CHOOSE A RANDOM NUMBER
function generateNumGem() {
  let num = Math.floor(Math.random()*4);
  while(panel.length > 2 && (panel.length - 1) % 5 !== 0 &&
              panel[panel.length - 1].name === gems[num].name && 
              panel[panel.length - 2].name === gems[num].name || 
            panel.length > 10 && 
              panel[panel.length - 5].name === gems[num].name && 
              panel[panel.length - (x_dimention * 2)].name === gems[num].name)
        {
          
          num = Math.floor(Math.random()*4);
          // if(panel.length > 10)
          // console.log("INSIDE LOOP = ", panel.length - x_dimention,panel.length - (x_dimention * 2));
        }
        return num;
}

// DRAW A CIRCLE ON THE SELECTED GEM
function circle(x,y){
  ctx.beginPath();
  ctx.arc(x+calculation/2,y+calculation/2,calculation/2+5,0,Math.PI *2,false);
  ctx.lineWidth=calculation/12;
  ctx.strokeStyle = 'blue';
  ctx.stroke();
}

// MOVE THE GEMS SELECTED ON THE ARRAY/BOARD
function moveGems(panel,gemSelected,gemToChange,gemIndex,indexToChange){
  let gem1 = gemSelected.name;
  let gem1img = gemSelected.img;
  let gem2 = gemToChange.name;
  let gem2img = gemToChange.img;

  panel[indexToChange].name = gem1;
  panel[indexToChange].img = gem1img;
  panel[gemIndex].name = gem2;
  panel[gemIndex].img = gem2img;
  setTimeout(() => {
    drawPanel();
  }, 300);
}

// CHECK THE GEMS NEAR THE "gemSelected"
function checkGems(panel,gemSelected,gemToChange,gemIndex){
  let gemConsecutiveX = 0;
  let gemConsecutiveY = 0;
  let isARow = "";

  console.log(gemSelected.name + " - " + gemIndex);
    console.log(gemSelected);
    // CHECK TO THE RIGHT
    for (let i = 1; i < 5; i++) {
      if( (gemIndex + i) < panel.length && panel[gemIndex+i].name === gemSelected.name){
          gemConsecutiveX++;
      }  
    }
    // CHECK TO THE LEFT
    for(let i = 1; i < 5; i++){
      if( (gemIndex - i) >= 0 && panel[gemIndex-i].name === gemSelected.name){
          gemConsecutiveX++;
      }
    }
    // CHECK TO DOWN
    for (let i = 5; i < panel.length; i+=5) {
      if( (gemIndex + i) < panel.length && panel[gemIndex+i].name === gemSelected.name){
          gemConsecutiveY++;
      }  
    }
    // CHECK TO UP
    for(let i = 5; i < panel.length; i+=5){
      if( (gemIndex - i) >= 0 && panel[gemIndex-i].name === gemSelected.name){
          gemConsecutiveY++;
      }
    }

      console.log("X: "+gemConsecutiveX +" and Y: "+gemConsecutiveY);
      if(gemConsecutiveX >= 2){
        console.log("Existen mas de 2 gemas horizontales consecutivas por puntuar.");

      }
      if(gemConsecutiveY >= 2){
        console.log("Existen mas de 2 gemas verticales consecutivas por puntuar.");
      }

      return isARow;
}


// CODE FOR CHECK THE GEMS
  // if( (gemIndex + 1) < panel.length && panel[gemIndex+1].name === gemSelected.name){
  //   gemConsecutiveX++;
  //   if( (gemIndex + 2) < panel.length && panel[gemIndex+2].name === gemSelected.name){
  //     gemConsecutiveX++;
  //     console.log("Hay 3 gemas hacia la derecha consecutivas por eliminar");
  //   }
  // }
  // if( (gemIndex - 1) >= 0 && panel[gemIndex-1].name === gemSelected.name){
  //   gemConsecutiveX++;
  //   if( (gemIndex - 2) >= 0 && panel[gemIndex-2].name === gemSelected.name){
  //     gemConsecutiveX++;
  //     console.log("Hay 3 gemas hacia la izquierda consecutivas por eliminar");
  //   }
  // }
  // if( (gemIndex - 5) >= 0 && panel[gemIndex-5].name === gemSelected.name){
  //   gemConsecutiveY++;
  //   if( (gemIndex - 10) >= 0 && panel[gemIndex-10].name === gemSelected.name){
  //     gemConsecutiveY++;
  //     console.log("Hay 3 gemas hacia arriba consecutivas por eliminar");
  //   }
  // } 
  // if( (gemIndex + 5) < panel.length && panel[gemIndex+5].name === gemSelected.name){
  //   gemConsecutiveY++;
  //   if( (gemIndex + 10) < panel.length && panel[gemIndex+10].name === gemSelected.name){
  //     gemConsecutiveY++;
  //     console.log("Hay 3 gemas hacia abajo consecutivas por eliminar");
  //   }
  // }

// GENERA UNA MATRIZ DE DIFERENTES COLORES
  // // ctx.fillRect(0,0,50,50);
  // var r,g,b = 0;
  // for (var i = 0; i < 5; i++) {
  //   for (var j = 0; j < 5; j++) {
  //     r = Math.floor(Math.random()*100);
  //     g = Math.floor(Math.random()*60);
  //     b = Math.floor(Math.random()*100);
  //     // COLOR =>     # 00 00 00
  //     ctx.fillStyle = '#'+r+g+b;
  //     console.log(ctx.fillStyle);
  //     ctx.fillRect(j*100,i*100,100,100);  

      
  //   }
  // }
