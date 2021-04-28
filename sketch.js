var tower,towerImg;
var door,doorImg,doorGrp;
var railing,railingImg,railingGrp;
var block,blockGrp;
var ghost,ghostImg;
var gameState="play"

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  railingImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png")
  
}

function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=3;
  
  ghost=createSprite(300,200);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  doorGrp=new Group();
  railingGrp=new Group();
  blockGrp=new Group();
}

function draw(){
  background(0)
  drawSprites();
  
  if(gameState==="play"){
  ghost.collide(railingGrp);

  
  if(ghost.y>600||ghost.isTouching(blockGrp)){
  gameState="end";  
  }
  
  if(keyDown("space")){
  ghost.velocityY=-8;  
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(keyDown("LEFT_ARROW")){
  ghost.x=ghost.x-3;  
  }
  
  if(keyDown("RIGHT_ARROW")){
  ghost.x=ghost.x+3;  
  }
  
  if(tower.y>400){
    tower.y=300;
  }
  spawnDoors();
  }
  else if(gameState==="end"){
    tower.velocityY=0;
    railingGrp.setVelocityYEach(0);
    doorGrp.setVelocityYEach(0);
    blockGrp.setVelocityYEach(0);
    ghost.VelocityY=0;
    textSize(35);
    fill("red");
    text("GAME OVER",200,300);
  }
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(Math.round(random(120,400)),-50);
    door.velocityY=3;
    door.addImage(doorImg);
    doorGrp.add(door);
    
    railing=createSprite(200,20);
    railing.x=door.x;
    railing.velocityY=3;
    railing.addImage(railingImg);
    railingGrp.add(railing);
    
    block=createSprite(200,15);
    block.velocityY=3;
    block.x=door.x;
    block.width=railing.width;
    block.height=2;
    block.visible=false;
    blockGrp.add(block);
    
    ghost.depth=door.depth;
    ghost.depth+=1;
  }
  
}