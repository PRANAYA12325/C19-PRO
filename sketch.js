var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(300,300,20,60);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5

}


function draw() {
  background(200);

  if (gameState === "play") {
    if(tower.y > 400){
      tower.y = 300
    }
    
    spawnDoors();

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x-10;
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x+10;
    }
    
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }  
    
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600 ) {
      ghost.destroy();
      gameState = "end"
    }
  }
  
if (gameState === "end") {
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("GAME OVER",250,300);
}

  drawSprites();
}

function spawnDoors() {
  if (frameCount%150===0) {
    door = createSprite(10,-50);
    door.addImage("door",doorImg);

    climber = createSprite(10,10);
    climber.addImage("climber",climberImg);

    invisibleBlock= createSprite(10,15);
    invisibleBlock.width = climber.width ;
    invisibleBlock.height = 3;
  
   door.x = Math.round(random(150,450));
    climber.x = door.x ;
    invisibleBlock.x = door.x

    door.velocityY = 5;
    climber.velocityY = 5;
    invisibleBlock.velocityY = 5;

   door.depth = ghost.depth;
   ghost.depth = ghost.depth+1 ;

    door.lifetime = 150;
    climber.lifetime = 150;
    invisibleBlock.lifetime = 150;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
















