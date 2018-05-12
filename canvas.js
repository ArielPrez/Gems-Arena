window.onload = function(){

  
  var canvas = document.querySelector("canvas");
  
  elemLeft = canvas.offsetLeft;
  elemTop = canvas.offsetTop;

  var ctx = canvas.getContext("2d");
  
  canvas.width = Math.floor((document.getElementById('myBody').offsetWidth / 3));
  canvas.height = Math.floor((document.getElementById('myBody').offsetWidth / 3));

  var player1 = document.getElementsByClassName("character1")[0];
  var player2 = document.getElementsByClassName("character2")[0];

  player1.width = Math.floor(document.getElementById('myBody').offsetWidth / 3)-2;
  player1.height = Math.floor(window.innerHeight / 1.5);
  player1.getElementsByTagName("img")[0].style.width = player1.width+"px";
  player1.getElementsByTagName("img")[0].style.height = player1.height+"px";
  
  player2.width = Math.floor(document.getElementById('myBody').offsetWidth / 3)-2;
  player2.height = Math.floor(window.innerHeight / 1.5);
  player2.getElementsByTagName("img")[0].style.width = player2.width+"px";
  player2.getElementsByTagName("img")[0].style.height = player2.height+"px";
  
  

  
  // var gems = [];  ====> ARRAY DE GEMAS
  var gems = [
    { name: 'blue',         img: 'images/gems/blue.jpg' },
    { name: 'pink',         img: 'images/gems/pink.jpg' },
    { name: 'green',        img: 'images/gems/green.jpg' },
    { name: 'yellow',        img: 'images/gems/yellow.jpg'},
    ];

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

  let panel = [];
  let gemSelected = [];
  let gemToChange = [];
  let gemIndex;
  let clickCounter = 0;
  const calculation = Math.floor(Math.floor(document.getElementById('myBody').offsetWidth / 3)/5);
  const x_dimention = 5;
  const y_dimention = 5;
  
  var mouse = {
    x: undefined,
    y: undefined,
  };

  drawPanel();
  
  // DRAW A PANEL OF GEMS
  function drawPanel() {
    for (let i = 0; i < x_dimention; i++) {
      for (let j = 0; j < y_dimention; j++) {
        // let num = Math.floor(Math.random()*4);

        let num = generateNumGem();

        const x = new Image();
        x.src = gems[num].img;
        // push into array
        panel.push({name:gems[num].name, positionX:j*calculation, positionY:i*calculation});
        x.onload = () => 
        {
          ctx.drawImage(x,j*calculation,i*calculation,calculation,calculation);
        };
      }
    }
    
  }
    

  // CHOOSE A RANDOM NUMBER
  function generateNumGem(params) {
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
           
            // console.log(i + " <= I ");
          }
          
    });
    if(clickCounter === 0){
      gemToChange = gemSelected;
      circle(gemSelected.positionX,gemSelected.positionY);
      clickCounter++;
    }else{
      gemToChange = Move(panel,gemSelected,gemToChange,gemIndex);
      clickCounter = 0;
    }
    var isARow = checkGems(panel,gemSelected,gemIndex);
    
  },false);


};

function Move(panel,gemSelected,gemToChange,gemIndex){
  if((panel[gemIndex+1].name || panel[gemIndex-1].name || panel[gemIndex+5].name || panel[gemIndex-5].name) === gemToChange.name){
    console.log("Son dos gemas consecutivas");
  }


  if(gemSelected != gemToChange)
    gemToChange = gemSelected;


  return gemToChange;
}

function checkGems(panel,gemSelected,gemIndex){
  let gemConsecutiveX = 0;
  let gemConsecutiveY = 0;
  let isARow = "";

  console.log(gemSelected.name + " - " + gemIndex);
    console.log(gemSelected);
    if( (gemIndex + 1) < panel.length && panel[gemIndex+1].name === gemSelected.name){
      gemConsecutiveX++;
      if( (gemIndex + 2) < panel.length && panel[gemIndex+2].name === gemSelected.name){
        gemConsecutiveX++;
        console.log("Hay 3 gemas hacia la derecha consecutivas por eliminar");
      }
    }
    if( (gemIndex - 1) >= 0 && panel[gemIndex-1].name === gemSelected.name){
      gemConsecutiveX++;
      if( (gemIndex - 2) >= 0 && panel[gemIndex-2].name === gemSelected.name){
        gemConsecutiveX++;
        console.log("Hay 3 gemas hacia la izquierda consecutivas por eliminar");
      }
    }
    if( (gemIndex - 5) >= 0 && panel[gemIndex-5].name === gemSelected.name){
      gemConsecutiveY++;
      if( (gemIndex - 10) >= 0 && panel[gemIndex-10].name === gemSelected.name){
        gemConsecutiveY++;
        console.log("Hay 3 gemas hacia arriba consecutivas por eliminar");
      }
    } 
    if( (gemIndex + 5) < panel.length && panel[gemIndex+5].name === gemSelected.name){
      gemConsecutiveY++;
      if( (gemIndex + 10) < panel.length && panel[gemIndex+10].name === gemSelected.name){
        gemConsecutiveY++;
        console.log("Hay 3 gemas hacia abajo consecutivas por eliminar");
      }
    }
      console.log("X: "+gemConsecutiveX +" and Y: "+gemConsecutiveY);
      if(gemConsecutiveX >= 2){
        console.log("Existen 3 gemas horizontales consecutivas por puntuar.");

      }
      if(gemConsecutiveY >= 2){
        console.log("Existen 3 gemas verticales consecutivas por puntuar.");
      }

      return isARow;
}


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
