// var gems = [];  ====> ARRAY DE GEMAS
var gems = [
  { name: 'blue',         img: 'images/gems/blue.jpg' },
  { name: 'pink',         img: 'images/gems/pink.jpg' },
  { name: 'green',        img: 'images/gems/green.jpg' },
  { name: 'yellow',        img: 'images/gems/yellow.jpg'},
  ];
// ARRAY DE CHARACTERS
var charactersMen = [
  { name: 'mage1',           img: 'images/characters/mage-left1.jpg',           side:'left'},
  { name: 'mage2',           img: 'images/characters/mage-left2.jpg',           side:'left'},      
  { name: 'mage3',           img: 'images/characters/mage-left3.jpg',           side:'left'},
  { name: 'mage4',           img: 'images/characters/mage-right1.jpg',          side:'right'},
  { name: 'mage5',           img: 'images/characters/mage-right2.jpg',          side:'right'},
  { name: 'mage6',           img: 'images/characters/mage-right3.jpg',          side:'right'},
];
var charactersWomen = [
  { name: 'sorcerer1',       img: 'images/characters/sorcerer-left1.jpg',       side:'left'},
  { name: 'sorcerer2',       img: 'images/characters/sorcerer-left2.jpg',       side:'left'},
  { name: 'sorcerer3',       img: 'images/characters/sorcerer-left3.jpg',       side:'left'},
  { name: 'sorcerer4',       img: 'images/characters/sorcerer-right1.jpg',      side:'right'},
  { name: 'sorcerer5',       img: 'images/characters/sorcerer-right2.jpg',      side:'right'},
  { name: 'sorcerer6',       img: 'images/characters/sorcerer-right3.jpg',      side:'right'},
];

// DIFFERENT VARIABLES AND ARRAY
  let panel = []; // ====> ARRAY OF GEMS DRAWINGS IN THE CANVAS
  let gemSelected = []; // ====> SECOND GEM SELECTED IN THE PANEL EACH TURN
  let gemToChange = []; // ====> FIRST GEM SELECTED IN THE PANEL EACH TURN
  let gemDelete = [];
  let gemIndex;
  let indexToChange;
  let clickCounter = 0;
  let particles;
  let linePoints = [];
  let animationID;
  let randomColor;
  let cycle = 0;
  let time=11;
  let combination = false;
  let life1,life2;
  let presentation = true;
  let end = "";
  let player = true; // ====> FIRST PLAYER START THE GAME
  //          [ COMB OF 3],[COMB OF 4],[COMB OF 5]
  let combinationQuantity = [0,0,0]; // => THIS SAVE THE NUMBER OF COMBINATIONS MADE EACH TIME AND THE QUANTITY OF EACH COMBINATION.

// PANEL GRAPHIC DIMENTION - ALSO x_dimention IS USED AS A PATTERN OR REFERENCE FOR CALCULATIONS IN MANY ALGORITHM IN THE CODE
  const x_dimention = 5;
  // const y_dimention = 5;

  const calculation = Math.floor(Math.floor(document.getElementById('myBody').offsetWidth / 3)/x_dimention);
  
  


var mouse = {
  x: undefined,
  y: undefined,
};

// HTML ELEMENTS FOR A DYNAMIC SIZE
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var image = document.getElementsByClassName("image")[0];
  var player1 = document.getElementsByClassName("character1")[0];
  var player2 = document.getElementsByClassName("character2")[0];
  var lifeChar1 = document.getElementsByClassName("life1")[0];
  var lifeChar2 = document.getElementsByClassName("life2")[0];
  var lifeBar1 = document.getElementsByClassName("lifeChar1")[0];
  var lifeBar2 = document.getElementsByClassName("lifeChar2")[0];
  var lifePercentage1 = document.getElementsByClassName("lifePercentage1")[0];
  var lifePercentage2 = document.getElementsByClassName("lifePercentage2")[0];
  var p = document.getElementsByClassName("presentation")[0];
  var p1 = document.getElementById("player1").getElementsByTagName("input")[0].value;
  var p2 = document.getElementById("player2").getElementsByTagName("input")[0].value;
  var myImage1,myImage2;


// MEASURE THE ELEMENTS OF THE SCREEN
function measureBlockPage() {
  // mage-left2.jpg
  // sorcerer-right3.jpg

  // image.width = Math.floor((document.getElementById('myBody').offsetWidth / 3));
  image.height = Math.floor(window.innerHeight / 1.5)+10; //Math.floor((document.getElementById('myBody').offsetWidth / 3)+50);
  image.style.width = (Math.floor((document.getElementById('myBody').offsetWidth)) - Math.floor((document.getElementById('myBody').offsetWidth) * 0.07)+20)+"px";
  image.style.height = image.height+"px";
  image.getElementsByTagName("img")[0].style.width = image.style.width;
  image.getElementsByTagName("img")[0].style.height = image.style.height;

  canvas.width = Math.floor((document.getElementById('myBody').offsetWidth / 3));
  canvas.height = Math.floor((document.getElementById('myBody').offsetWidth / 3));

  player1.width = Math.floor(document.getElementById('myBody').offsetWidth / 4) + 20;
  player1.style.width = player1.width+"px";
  player1.height = Math.floor(window.innerHeight / 1.5);
  player1.style.height = player1.height+"px";
  // player1.getElementsByTagName("img")[0].style.width = player1.width+"px";
  // player1.getElementsByTagName("img")[0].style.height = player1.height+"px";
  
  player2.width = Math.floor(document.getElementById('myBody').offsetWidth / 4) + 20;
  player2.style.width = player2.width+"px";
  player2.height = Math.floor(window.innerHeight / 1.5);
  player2.style.height = player2.height+"px";
  // player2.getElementsByTagName("img")[0].style.width = player2.width+"px";
  // player2.getElementsByTagName("img")[0].style.height = player2.height+"px";
  
  lifeBar1.style.width = Math.floor(document.getElementById('myBody').offsetWidth / 5)+"px";
  lifeChar1.style.width = lifeBar1.style.width;
  life1 = lifeBar1.style.width.split("px", 1);

  lifeBar2.style.width = Math.floor(document.getElementById('myBody').offsetWidth / 5)+ "px";
  lifeChar2.style.width = lifeBar2.style.width;
  life2 = lifeBar2.style.width.split("px", 1);

  myImage1 = new Image(player1.width, player1.height);
  myImage2 = new Image(player2.width, player2.height);
  // var gender = Math.floor(Math.random());
  
}