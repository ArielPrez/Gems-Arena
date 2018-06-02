// START OF THE GAME
window.onload = function(){
  measureBlockPage();
  drawPanel();
};
function startPresentation() {
  let num = Math.floor(Math.random()*6);
  while(num === 3 || num === 4 || num === 5){
    num = Math.floor(Math.random()*6);
  }
  // ASSIGNING IMAGE FIRST PLAYER
  if(document.getElementsByClassName("radioP1")[0].checked){
    myImage1.src = charactersMen[num].img;
    document.body.getElementsByClassName("character1")[0].appendChild(myImage1);
  }else if(document.getElementsByClassName("radioP1")[1].checked){
    myImage1.src = charactersWomen[num].img;
    document.body.getElementsByClassName("character1")[0].appendChild(myImage1);
  }
  num = Math.floor(Math.random()*6);
  while(num === 0 || num === 1 || num === 2){
    num = Math.floor(Math.random()*6);
  }
  // ASSIGNING IMAGE SECOND PLAYER
  if(document.getElementsByClassName("radioP2")[0].checked){
    myImage2.src = charactersMen[num].img;
    document.body.getElementsByClassName("character2")[0].appendChild(myImage2);
  }else if(document.getElementsByClassName("radioP2")[1].checked){
    myImage2.src = charactersWomen[num].img;
    document.body.getElementsByClassName("character2")[0].appendChild(myImage2);
  }
  
  p1 = document.getElementById("player1").getElementsByTagName("input")[0].value;
  p2 = document.getElementById("player2").getElementsByTagName("input")[0].value;
  document.getElementsByClassName("name1")[0].innerHTML = p1;
  document.getElementsByClassName("name2")[0].innerHTML = p2;
  document.getElementById("playerTurn").innerHTML = p1;
  p.style.display = 'none';
  presentation = false;
  startGame();
  
}
// THIS MODIFIED THE TIMER OF THE GAME EVERY SECOND
function timeToPlay() {
  if (combination) {
    if (player === true) { // ====> FIRST PLAYER'S TURN
      if(lifePercentage1.innerHTML < 100){
        lifePercentage1.innerHTML = Number(lifePercentage1.innerHTML) + 10;
        lifeBar1.style.width = Number(lifeBar1.style.width.split("px", 1)) + (life1*0.1)+"px";
      }
      lifePercentage2.innerHTML = lifePercentage2.innerHTML - 10;
      lifeBar2.style.width = (lifeBar2.style.width.split("px", 1) - (life2*0.1))+"px";
      player = false;
      document.getElementById("playerTurn").innerHTML = p2; // ==> UPDATE THE NAME OF THE CURRENT PLAYER
    }else{                // ====> SECOND PLAYER'S TURN
      if(lifePercentage2.innerHTML < 100){
        lifePercentage2.innerHTML = Number(lifePercentage2.innerHTML) + 10;
        lifeBar2.style.width = Number(lifeBar2.style.width.split("px", 1)) + (life2*0.1)+"px";
      }
      lifePercentage1.innerHTML = lifePercentage1.innerHTML - 10;
      lifeBar1.style.width = (lifeBar1.style.width.split("px", 1) - (life1*0.1))+"px";
      player = true;
      document.getElementById("playerTurn").innerHTML = p1; // ==> UPDATE THE NAME OF THE CURRENT PLAYER
    }
    // if(lifePercentage1.innerHTML < 100 && lifePercentage2.innerHTML < 100){
    //   lifePercentage1.innerHTML = Number(lifePercentage1.innerHTML) + 10;
    //   lifePercentage2.innerHTML = Number(lifePercentage2.innerHTML) + 10;
      
    //   lifeBar1.style.width = Number(lifeBar1.style.width.split("px", 1)) + (life1*0.1)+"px";
    //   lifeBar2.style.width = Number(lifeBar2.style.width.split("px", 1)) + (life2*0.1)+"px";
    // }
    time += 2;
    combination = false;
  }
  else {
    if(time > 0){
      time -=1;
    }else{
      if(lifePercentage1.innerHTML > 10 && lifePercentage2.innerHTML > 10){
        if (player === true) {
          // ====> FIRST PLAYER'S TURN
          lifePercentage1.innerHTML = lifePercentage1.innerHTML - 10;
          lifeBar1.style.width = (lifeBar1.style.width.split("px", 1) - (life1*0.1))+"px";            
        }else{                
          // ====> SECOND PLAYER'S TURN
          lifePercentage2.innerHTML = lifePercentage2.innerHTML - 10;
          lifeBar2.style.width = (lifeBar2.style.width.split("px", 1) - (life2*0.1))+"px";
        }
        time = 5;
      }else{
        lifePercentage1.innerHTML = lifePercentage1.innerHTML - 10;
        lifeBar1.style.width = (lifeBar1.style.width.split("px", 1) - (life1*0.1))+"px";
        lifePercentage2.innerHTML = lifePercentage2.innerHTML - 10;
        lifeBar2.style.width = (lifeBar2.style.width.split("px", 1) - (life2*0.1))+"px";
        console.log("GAME OVER!");
        clearInterval(end);
        end = "";
        presentation = true;
        time = 0;
        startGame();
      } 
    }
    combination = false;
  }
  document.getElementById("countdowntimer").innerHTML = time;
}

// FUNCTION TO START THE GAME AND CLICS CONTROL OVER THE CANVAS/PANEL 
function startGame(){
  
  if (presentation === true) {
    if (p.style.display === 'none') {
      p.style.display = 'block';
    } 
    var h = document.createElement("H1");
    var text = document.createTextNode("- GAME OVER -");
    if(lifePercentage1.innerHTML < 10){
      text = document.createTextNode("- " + p2 + " WON! -");
    }else if(lifePercentage2.innerHTML < 10){
      text = document.createTextNode("- " + p1 + " WON! -");
    }
    
    h.appendChild(text);
    document.body.getElementsByClassName("image")[0].appendChild(h);
    // presentation = false;
  }else{ // ====>  presentation IS FALSE, SO START THE GAME
    // CALL THE FUNCTION "timeToPlay()" EVERY SECOND TO MODIFIED THE TIMER
    end = setInterval(timeToPlay,1000);
    
  
    // ADD EVENT LISTENER FOR CLICK EVENTS
    canvas.addEventListener('click',function(event){
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
        init(gemSelected.positionX,gemSelected.positionY);
        animate();
        clickCounter++;
        // circle(gemSelected.positionX,gemSelected.positionY);
      }else{
        particles = [];
        init(gemSelected.positionX,gemSelected.positionY);
        cycle = 0;
        
        // circle(gemSelected.positionX,gemSelected.positionY);
        if((gemIndex+1 === indexToChange || gemIndex-1 === indexToChange || gemIndex+x_dimention === indexToChange || gemIndex-x_dimention === indexToChange) && 
          ((((gemIndex + 1) % x_dimention !== 0 && (gemIndex - 1) % x_dimention !== x_dimention - 1) ||
              (gemIndex+x_dimention === indexToChange || gemIndex-x_dimention === indexToChange)
          ) ||
          (((indexToChange + 1) % x_dimention !== 0 && (indexToChange - 1) % x_dimention !== x_dimention - 1) ||
             (gemIndex+x_dimention === indexToChange || gemIndex-x_dimention === indexToChange)))){
                moveGems(panel,gemSelected,gemToChange,gemIndex,indexToChange);
                checkGems(panel,gemSelected,gemIndex);
        }else{
          setTimeout(() => {
            drawPanel();
          }, 300);
        }
        clickCounter = 0;
        
        cancelAnimationFrame(animationID);
      }
      
    },false);  
  
  }
}

// DRAW A PANEL OF GEMS
function drawPanel() {
  let aux = 0;
  // let drawPositions = true;
  

  if(panel.length != 0){
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    
    for (let i = 0, j = 0, q = 0; i < (x_dimention * x_dimention); i++) {
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
          // DRAW THE COORDINATES ABOVE EACH GEM
          // ctx.font = "15px Quicksand";
          // ctx.fillStyle = "black";
          // ctx.fillText(panel[i].positionX + "-" + panel[i].positionY,panel[i].positionX + 10,panel[i].positionY + 35);
      };
      
      aux++;
    }  
  }else{
    for (let i = 0, j = 0, q = 0; i < (x_dimention * x_dimention); i++) {
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
          // DRAW THE COORDINATES ABOVE EACH GEM
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
  
  while(panel.length > 1 &&  // MIENTRAS EL PANEL TENGA MAS DE UNA GEMA
    (panel[i + 2] !== undefined && // Y DOS GEMAS MAS ADELANTE EN EL ARRAY DE LA QUE ESTOY ACTUALMENTE NO SEA INDEFINIDO
      // panel[i + 2] % x_dimention !== 0 && // Y DOS GEMAS ADELANTE DE LA QUE ESTOY ACTUALMENTE EN EL ARRAY NO SEA DIVISIBLE POR 5 | ESTO EVITA COMPROBAR INNECESARIAMENTE
      panel[i + 1].name === gems[num].name && // Y UNA GEMA MAS ADELANTE EN EL ARRAY DE LA QUE ESTOY ACTUALMENTE SEA IGUAL A LA GEMA GENERADA ALEATORIAMENTE
      panel[i + 2].name === gems[num].name) || // Y DOS GEMA MAS ADELANTE EN EL ARRAY DE LA QUE ESTOY ACTUALMENTE SEA IGUAL A LA GEMA GENERADA ALEATORIAMENTE | AMBAS i+2 y i+1 DEBEN DE COINCIDIR PARA QUE EXISTA UNA POSIBLE COMBINACION Y SE NECESITE GENERAR OTRA GEMA
    //             O    SI NO HAY COINCIDENCIA COMPRUEBA EN LA SIGUIENTE DIRECCION.....
    (panel[i - 2] !== undefined && // Y DOS GEMAS HACIA ATRAS DE LA QUE ESTOY ACTUALMENTE EN EL ARRAY NO SEA INDEFINIDO
      // panel[i - 1] % x_dimention !== 0 && // Y UNA GEMA HACIA ATRAS DE LA QUE ESTOY ACTUALMENTE EN EL ARRAY NO ES DIVISIBLE POR 5 | ESTO EVITA COMPROBAR INNECESARIAMENTE
      panel[i - 1].name === gems[num].name && // Y UNA GEMA HACIA ATRAS DE LA QUE ESTOY ACTUALMENTE EN EL ARRAY SEA IGUAL A LA GEMA GENERADA ALEATORIAMENTE
      panel[i - 2].name === gems[num].name) || // Y DOS GEMAS HACIA ATRAS DE LA QUE ESTOY ACTUALMENTE EN EL ARRAY SEA IGUAL A LA GEMA GENERADA ALEATORIAMENTE
    //            O    SI NO HAY COINCIDENCIA COMPRUEBA EN LA SIGUIENTE DIRECCION.....
    (panel[i + (x_dimention * 2)] !== undefined &&
      panel[i + x_dimention].name === gems[num].name &&
      panel[i + (x_dimention * 2)].name === gems[num].name) ||
    //            O    SI NO HAY COINCIDENCIA COMPRUEBA EN LA SIGUIENTE DIRECCION.....
    (panel[i - (x_dimention * 2)] !== undefined && 
      panel[i - x_dimention].name === gems[num].name &&
      panel[i - (x_dimention * 2)].name === gems[num].name) ||
    //            O    SI NO HAY COINCIDENCIA COMPRUEBA LAS GEMAS OPUESTAS (+1 && -1) || (+5 && -5)
    ((panel[i + 1] && panel[i - 1]) !== undefined && (panel[i + 1] === panel[i - 1])) ||
    ((panel[i + x_dimention] && panel[i - x_dimention]) !== undefined && (panel[i + x_dimention] === panel[i - x_dimention]))
    )
    {
          
      num = Math.floor(Math.random()*4);
    }
    return num;

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
  }, 200);
}

// CHECK THE GEMS NEAR THE "gemSelected"
function checkGems(panel,gemSelected,gemIndex){
	let gemConsecutiveX = 1;
	let gemToChangeConsecutiveX = 1;
	let gemConsecutiveY = 1;
  let gemToChangeConsecutiveY = 1;
  let gemSelectedClicked = 0;
  // let gemToChangeClicked = 0;
	
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
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// AT THIS POINT gemDelete ONLY HAS THE POSSIBLE HORIZONTAL COMBINATIONS.
	// THIS DELETE ALL THE ARRAY IF DO NOT HAVE ANY COMBINATION YET
	if(gemDelete.length < 3){
		gemDelete = [];
  }
  // RESTART THE VALUES OF THESE COUNTERS FOR THE NEXT CHECK IN THE NEXT DIRECTION
  counterReset();
  gemSelectedClicked = 0;
	////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK TO DOWN
	for(let i = x_dimention, aux = 1; aux < 3; i+=x_dimention, aux++) {
		if( (gemIndex + i) < panel.length && gemConsecutiveY != 0 && panel[gemIndex+i].name === gemSelected.name){
			gemConsecutiveY++;
			findARow(aux,(gemIndex + i),gemSelected);
		} 
		if( (indexToChange + i) < panel.length && gemToChangeConsecutiveY !=0 && panel[indexToChange+i].name === gemToChange.name){
			gemToChangeConsecutiveY++;
			findARow(aux,(indexToChange + i),gemToChange);
    } 
    if(gemConsecutiveY === 1 && gemToChangeConsecutiveY === 1){
      aux = 3;
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
	for(let i = x_dimention, aux = 1; aux < 3; i+=x_dimention, aux++){
		if( panel[gemIndex-i] !== undefined && gemConsecutiveY != 0 && panel[gemIndex-i].name === gemSelected.name){
			gemConsecutiveY++;
			findARow(aux,(gemIndex-i),gemSelected);
		}
		if( panel[indexToChange-i] !== undefined && gemToChangeConsecutiveY != 0 && panel[indexToChange-i].name === gemToChange.name){
			gemToChangeConsecutiveY++;
			findARow(aux,(indexToChange-i),gemToChange);
    }
    if(gemConsecutiveY === 1 && gemToChangeConsecutiveY === 1){
      aux = 3;
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
    if(i === 1 && gemSelectedClicked < 2 || gemSelectedClicked === 0){
      gemDelete.push({ name:gemSel.name, img:gemSel.img, positionX:gemSel.positionX, positionY:gemSel.positionY });
      gemSelectedClicked++;
    //   if(gemSelectedClicked === false)
    //     gemSelectedClicked = true;
    //   else if()
    //     gemToChangeClicked = true;
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
  
  // setTimeout(() => {
    gemDelete = [];  
  // }, 1000);
  
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

  // UPDATE: gemDelete[] => panel[]
  gemDelete.forEach(element => {
    let num = 0;

    for (let i = 0; i < panel.length; i++) {
      if(element.positionX === panel[i].positionX && element.positionY === panel[i].positionY){
        // RESET THE NAME TO FIND A NEW RANDOM GEMS
        panel[i].name = ""; 
        // const x = new Image();
        // x.src = gems[num].img;
        
      }  
    }
    
  });
  panel.forEach(function(element,index) {
    var num = 0;
    if(element.name === ""){
      num = generateNumGem(index);
      panel[index].name = gems[num].name; // GEM COLOR 
      panel[index].img = gems[num].img;  // GEM ADDRESS
    }
  });

  setTimeout( function() {
    drawPanel();
  }, 300);
  if(gemDelete.length !== 0){
    combination = true;
    timeToPlay();
  }
  
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
