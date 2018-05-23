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
  let gemDelete = [];
  let gemIndex;
  let indexToChange;
  let clickCounter = 0;
  let time=11;
  let combination = false;
    
// PANEL GRAPHIC DIMENTION - ALSO x_dimention IS USED AS A PATTERN OR REFERENCE FOR CALCULATIONS IN MANY ALGORITHM IN THE CODE
  const x_dimention = 5;
  const y_dimention = 5;

  const calculation = Math.floor(Math.floor(document.getElementById('myBody').offsetWidth / 3)/x_dimention);
  
  


var mouse = {
  x: undefined,
  y: undefined,
};

// HTML ELEMENTS FOR A DYNAMIC SIZE
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var player1 = document.getElementsByClassName("character1")[0];
  var player2 = document.getElementsByClassName("character2")[0];
  var lifeBar1 = document.getElementById("lifeChar1");
  var lifeBar2 = document.getElementById("lifeChar2");



// START OF THE GAME
window.onload = function(){
  // elemLeft = canvas.offsetLeft;
  // elemTop = canvas.offsetTop;

  startGame();

};
// FUNCTION TO START THE GAME AND CLICS CONTROL OVER THE CANVAS/PANEL 
function startGame(){
  measureBlockPage();
  drawPanel();

  function timeToPlay() {
    if (combination) {
      time += 3;
      combination = false;
    }
    else {
      if(time > 0){
        time -=1;
      }
      
    }
    document.getElementById("countdowntimer").innerHTML = time;
    }
    
    setInterval(timeToPlay,1000);
    
  

  // ADD EVENT LISTENER FOR CLICK EVENTS
  canvas.addEventListener('click',function(event){
    // console.log("PANEL", panel);
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
		
		if(
				(gemIndex+1 === indexToChange || gemIndex-1 === indexToChange || gemIndex+x_dimention === indexToChange || gemIndex-x_dimention === indexToChange) && 
				(
					(
						((gemIndex + 1) % x_dimention !== 0 && (gemIndex - 1) % x_dimention !== x_dimention - 1)
						 || (gemIndex+x_dimention === indexToChange || gemIndex-x_dimention === indexToChange)
					) 
					||  
					(
						((indexToChange + 1) % x_dimention !== 0 && (indexToChange - 1) % x_dimention !== x_dimention - 1)
						|| (gemIndex+x_dimention === indexToChange || gemIndex-x_dimention === indexToChange)
					)
				)
			)
			
		{
      	moveGems(panel,gemSelected,gemToChange,gemIndex,indexToChange);
        	checkGems(panel,gemSelected,gemIndex);
      }else{
        setTimeout(() => {
              drawPanel();
            }, 300);
      }
		
      clickCounter = 0;
    }
    
  },false);
}

// MEASURE THE ELEMENTS OF THE SCREEN
function measureBlockPage() {
  // mage-left2.jpg
  // sorcerer-right3.jpg

  canvas.width = Math.floor((document.getElementById('myBody').offsetWidth / 3));
  canvas.height = Math.floor((document.getElementById('myBody').offsetWidth / 3));

  player1.width = Math.floor(document.getElementById('myBody').offsetWidth / 4) + 20;
  player1.height = Math.floor(window.innerHeight / 1.5);
  player1.getElementsByTagName("img")[0].style.width = player1.width+"px";
  player1.getElementsByTagName("img")[0].style.height = player1.height+"px";
  
  player2.width = Math.floor(document.getElementById('myBody').offsetWidth / 4) + 20;
  player2.height = Math.floor(window.innerHeight / 1.5);
  player2.getElementsByTagName("img")[0].style.width = player2.width+"px";
  player2.getElementsByTagName("img")[0].style.height = player2.height+"px";
  
  lifeBar1.style.width = Math.floor(document.getElementById('myBody').offsetWidth / 3) / 2 +"px";
  // lifeBar1.getElementById("lifeChar1").style.width = lifeBar1.width+"px";

  lifeBar2.style.width = Math.floor(document.getElementById('myBody').offsetWidth / 3) / 2 + "px";
  // lifeBar2.getElementById("lifeChar2").style.width = lifeBar2.width+"px";

}

// DRAW A PANEL OF GEMS
function drawPanel() {
  let aux = 0;
  let drawPositions = true;
  

  if(panel.length != 0){
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    
    for (let i = 0, j = 0, q = 0; i < (x_dimention * y_dimention); i++) {
        if(i % x_dimention === 0){
          j = 0;
          if(i !== 0)
            q++;
        }else{
          j++;
        }
        const x = new Image();
        x.src = panel[i].img;
        
        x.onload = () =>
        {
          ctx.drawImage(x,j*calculation,q*calculation,calculation,calculation);
          // ctx.font = "15px Quicksand";
          // ctx.fillStyle = "black";
          // ctx.fillText(panel[i].positionX + "-" + panel[i].positionY,panel[i].positionX + 10,panel[i].positionY + 35);
      };
      
      aux++;
    }  
  }else{
    for (let i = 0, j = 0, q = 0; i < (x_dimention * y_dimention); i++) {
        if(i % x_dimention === 0){
          j = 0;
          if(i !== 0)
            q++;
        }else{
          j++;
        }
    // RETURN A RANDOM NUMBER TO CREATE A GEM ON THE PANEL, BUT DIFFERENT FROM THOSE THAT SURROUND THEM
        aux = generateNumGem(i);
        const x = new Image();
        x.src = gems[aux].img;
        // push into array
        panel.push({name:gems[aux].name, img:gems[aux].img, positionX:j*calculation, positionY:q*calculation});
        
        x.onload = () =>
        {
          ctx.drawImage(x,j*calculation,q*calculation,calculation,calculation);
            // ctx.font = "15px Quicksand";
            // ctx.fillStyle = "black";
            // ctx.fillText(panel[i].positionX + "-" + panel[i].positionY,panel[i].positionX + 10,panel[i].positionY + 35);
          
        };
    }
  }

}

 // CHOOSE A RANDOM NUMBER
function generateNumGem(i) {
  let num = Math.floor(Math.random()*4);
  
  while(panel.length > 1 &&  // 25 > 1 
    (panel.length + 2) % x_dimention !== 0 && // 25 +
      (panel[i + 1] !== undefined &&
        panel[i + 1].name === gems[num].name) && 
      (panel[i + 2] !== undefined &&
        panel[i + 2].name === gems[num].name) 
    ||
    (panel.length - 1) % x_dimention !== 0 && // 24 % 5 != 0
      (panel[i - 1] !== undefined &&
        panel[i - 1].name === gems[num].name) && 
      (panel[i - 2] !== undefined &&
        panel[i - 2].name === gems[num].name)
    ||
    panel.length >= (x_dimention * 2) && // 25 >= 10
      (panel[i + x_dimention] !== undefined &&
        panel[i + x_dimention].name === gems[num].name) ||
      (panel[i + (x_dimention * 2)] !== undefined &&
        panel[i + (x_dimention * 2)].name === gems[num].name)
    ||
    panel.length < Math.floor(panel.length - (x_dimention * 2)) && 
      (panel[i - x_dimention] !== undefined &&
        panel[i - x_dimention].name === gems[num].name) ||
      (panel[i - (x_dimention * 2)] !== undefined && 
        panel[i - (x_dimention * 2)].name === gems[num].name)
    )
    {
          
      num = Math.floor(Math.random()*4);
     console.log(num);
    }
    return num;

// OLD generateNumGem() 
  // while(panel.length > 1 &&
  //             (panel.length - 1) % 5 !== 0 &&
  //             panel[panel.length - 1].name === gems[num].name && 
  //             panel[panel.length - 2].name === gems[num].name 
  //             || 
  //         panel.length > ((x_dimention * 2) - 1) && 
  //             panel[panel.length - 5].name === gems[num].name && 
  //             panel[panel.length - (x_dimention * 2)].name === gems[num].name)
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
  // setTimeout(() => {
    drawPanel();
  // }, 300);
}

// CHECK THE GEMS NEAR THE "gemSelected"
function checkGems(panel,gemSelected,gemIndex){
	let gemConsecutiveX = 1;
	let gemToChangeConsecutiveX = 1;
	let gemConsecutiveY = 1;
  let gemToChangeConsecutiveY = 1;
  let gemClicked = 0;
	
	// CHECK TO THE RIGHT
	for (let i = 1; i < 3; i++) {
		if( ( ((gemIndex + i) % x_dimention !== 0) && ((gemIndex + i) < panel.length) && gemConsecutiveX != 0 ) && panel[gemIndex+i].name === gemSelected.name){
			gemConsecutiveX++;
			findARow(i,(gemIndex + i),gemSelected);
		}
		if( ( ((indexToChange + i) % x_dimention !== 0) && ((indexToChange + i) < panel.length) && gemToChangeConsecutiveX != 0) && panel[indexToChange+i].name === gemToChange.name){
			gemToChangeConsecutiveX++;
			findARow(i,(indexToChange + i),gemToChange);
    }
    if(gemConsecutiveX === 1 && gemToChangeConsecutiveX === 1){
      i = 3;
    }else{
      if(gemConsecutiveX === 1){
        gemConsecutiveX = 0;  
      }
      else if(gemToChangeConsecutiveX === 1){
        gemToChangeConsecutiveX = 0;
      }
    }
		
  }

  // RESTART THE VALUES OF THESE COUNTERS FOR THE NEXT CHECK IN THE NEXT DIRECTION
  counterReset();
  
	// CHECK TO THE LEFT
	for(let i = 1; i < 3; i++){
		if( ( ((gemIndex - i) % x_dimention !== x_dimention - 1) && (panel[gemIndex-i] !== undefined) && gemConsecutiveX != 0) && panel[gemIndex-i].name === gemSelected.name){
			gemConsecutiveX++;
			findARow(i,(gemIndex - i),gemSelected);
		}
		if( ( ((indexToChange - 1) % x_dimention !== x_dimention - 1)  && (panel[indexToChange-i] !== undefined) && gemToChangeConsecutiveX != 0) && panel[indexToChange-i].name === gemToChange.name){
			gemToChangeConsecutiveX++;
			findARow(i,(indexToChange - i),gemToChange);
    }
    if(gemConsecutiveX === 1 && gemToChangeConsecutiveX === 1){
      i = 3;
    }else{
      if(gemConsecutiveX === 1){
        gemConsecutiveX = 0;  
      }
      else if(gemToChangeConsecutiveX === 1){
        gemToChangeConsecutiveX = 0;
      }
    }  
		
  }

  // RESTART THE VALUES OF THESE COUNTERS FOR THE NEXT CHECK IN THE NEXT DIRECTION
  counterReset();

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// AT THIS POINT gemDelete ONLY HAS THE POSSIBLE HORIZONTAL COMBINATIONS.
	// THIS DELETE ALL THE ARRAY IF DO NOT HAVE ANY COMBINATION YET
	if(gemDelete.length < 3){
		gemDelete = [];
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK TO DOWN
	for(let i = x_dimention, aux = 1; i <= 10; i+=x_dimention, aux++) {
		if( (gemIndex + i) < panel.length && gemConsecutiveY != 0 && panel[gemIndex+i].name === gemSelected.name){
			gemConsecutiveY++;
			findARow(aux,(gemIndex + i),gemSelected);
		} 
		if( (indexToChange + i) < panel.length && gemToChangeConsecutiveY !=0 && panel[indexToChange+i].name === gemToChange.name){
			gemToChangeConsecutiveY++;
			findARow(aux,(indexToChange + i),gemToChange);
    } 
    if(gemConsecutiveY === 1 && gemToChangeConsecutiveY === 1){
      i = panel.length;
    }else{
      if(gemConsecutiveY === 1){
        gemConsecutiveY = 0;  
      }
      else if(gemToChangeConsecutiveY === 1){
        gemToChangeConsecutiveY = 0;
      }
    }
    
  }
  // RESTART THE VALUES OF THESE COUNTERS FOR THE NEXT CHECK IN THE NEXT DIRECTION
  counterReset();
  
	// CHECK TO UP
	for(let i = x_dimention, aux = 1; i <= 10; i+=x_dimention, aux++){
		if( panel[gemIndex-i] !== undefined && gemConsecutiveY != 0 && panel[gemIndex-i].name === gemSelected.name){
			gemConsecutiveY++;
			findARow(aux,(gemIndex-i),gemSelected);
		}
		if( panel[indexToChange-i] !== undefined && gemToChangeConsecutiveY != 0 && panel[indexToChange-i].name === gemToChange.name){
			gemToChangeConsecutiveY++;
			findARow(aux,(indexToChange-i),gemToChange);
    }
    if(gemConsecutiveY === 1 && gemToChangeConsecutiveY === 1){
      i = panel.length;
    }else{
      if(gemConsecutiveY === 1){
        gemConsecutiveY = 0; 
      }
      else if(gemToChangeConsecutiveY === 1){
        gemToChangeConsecutiveY = 0;
      }
    }
		
  }
  // RESTART THE VALUES OF THESE COUNTERS FOR THE NEXT CHECK IN THE NEXT DIRECTION
  counterReset();
  
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	removeGem(); // now this function is removing the gems ...
						// from the array that donsn't make a combination of 3 or more.
  
	////////////////////////////////////////////////////////////////////////////////////////////////////
  
	// SAVE THE GEM TO DELETE IN AN ARRAY "gemDelete[]"
   function findARow(i,indexG,gemSel) {
		gemDelete.push({ name:panel[indexG].name, img:panel[indexG].img, positionX:panel[indexG].positionX, positionY:panel[indexG].positionY });
		// panel.push({name:gems[aux].name, img:gems[aux].img, positionX:j*calculation, positionY:i*calculation});
		// if(i >= 2){
		// 	// gemDelete.push({ name:gemSel.name, img:gemSel.img, positionX:gemSel.positionX, positionY:gemSel.positionY });
		// 	gemConsecutiveX = 1;
		// 	gemToChangeConsecutiveX = 1;
    // }
    if(i === 1 && gemClicked === 0 && gemDelete.length > 0){
      gemDelete.push({ name:gemSel.name, img:gemSel.img, positionX:gemSel.positionX, positionY:gemSel.positionY });
      gemClicked = 1;
    }
		//  return i;
  }

  // RESTART THE VALUES OF THESE COUNTERS FOR THE NEXT CHECK IN THE NEXT DIRECTION
  function counterReset() {
    gemConsecutiveX = 1;
    gemToChangeConsecutiveX = 1;
    gemConsecutiveY = 1;
    gemToChangeConsecutiveY = 1;
  }
  console.log(gemDelete);
  
  setTimeout(() => {
    gemDelete = [];  
  }, 1000);
  
}

function removeGem() {
	let colors = [0,0,0,0]; //=====>  "blue","pink","green","yellow"
	gemDelete.forEach(element => {
		switch (element.name) {
			case "blue":
				colors[0]++;
				break;
			case "pink":
				colors[1]++;
				break;
			case "green":
				colors[2]++;
				break;
			case "yellow":
				colors[3]++;
				break;
			default:
				break;
		}
	});
  var removeColor;
  for (var i = 0; i < colors.length; i++) {
    while (colors[i] < 3 && colors[i] > 0 ) {
      switch (i) {
        case 0:
                // gemDelete //DELETE THE BLUE
                removeColor = gemDelete.map(function(item){return item.name;}).indexOf("blue");      
                gemDelete.splice(removeColor,1);  
                colors[i] = colors[i] - 1;  
                
                break;	
        case 1:
        				// gemDelete //DELETE THE PINK
                removeColor = gemDelete.map(function(item){return item.name;}).indexOf("pink");      
                gemDelete.splice(removeColor,1);  
                colors[i] = colors[i] - 1;
        				break;
        case 2:
        				// gemDelete //DELETE THE GREEN
        				removeColor = gemDelete.map(function(item){return item.name;}).indexOf("green");      
                gemDelete.splice(removeColor,1);  
                colors[i] = colors[i] - 1;
                break;
        case 3:
        				// gemDelete //DELETE THE YELLOW
        				removeColor = gemDelete.map(function(item){return item.name;}).indexOf("yellow");      
                gemDelete.splice(removeColor,1);  
                colors[i] = colors[i] - 1;
                break;
        default:
      					break;
      }
    }				
      
  }

  console.log(gemDelete);

  // UPDATE: gemDelete[] => panel[]
  gemDelete.forEach(element => {
    let num = 0;

    for (let i = 0; i < panel.length; i++) {
      if(element.positionX === panel[i].positionX && element.positionY === panel[i].positionY){
        // RESET THE NAME TO FIND A NEW RANDOM GEMS
        panel[i].name = ""; 
        num = generateNumGem(i);
        // const x = new Image();
        // x.src = gems[num].img;
        panel[i].name = gems[num].name; // GEM COLOR 
        panel[i].img = gems[num].img;  // GEM ADDRESS
      }  
    }
    
  });

  drawPanel();

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
