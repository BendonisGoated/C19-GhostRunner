var towerImg, tower;
var doorImg, door,doorGrp;
var climberImg, climber,climberGrp;
var ghost, ghostImg,spookySound;
var invisibleBlock, invisibleBlockGrp;
var gameState="play";
var score=0;

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  
  //Create Tower
  tower = createSprite(300,300,600,600);
  tower.addImage('towerImage',towerImg);
  
  //Create Ghost
  ghost = createSprite(250,100,10,10);
  ghost.addImage("ghostImage",ghostImg);
  ghost.scale=0.3 ;
  ghost.setCollider("rectangle", 0, 15, ghostImg.width-20,ghostImg.height-10);
  ghost.debug = true;

  //create groups
  doorGrp = new Group();
  climberGrp = new Group();
  invisibleBlockGrp = new Group();
  
  spookySound.play();
  
}

function draw()
{
  background(0);
  stroke("yellow");
  fill("yellow");
  
  if(gameState==="play"){
     tower.velocityY= 2;
     score = score + Math.round(frameRate()/60);
  
      if(tower.y>height){
         tower.y = height/2;
         }

      if(keyDown("space")){
         ghost.velocityY = -5;
         }

      ghost.velocityY= ghost.velocityY+0.3;

      if(keyDown(RIGHT_ARROW)){
         ghost.x = ghost.x+6;
         }

      if(keyDown(LEFT_ARROW)){
         ghost.x = ghost.x-6;
         }



      spawnDoor();
      
      if(climberGrp.isTouching(ghost)){
         ghost.velocityY = 0;
         }
    
      if(invisibleBlockGrp.isTouching(ghost) || ghost.y>height){
          gameState= "end";
      }
    
  }
  else if(gameState==="end"){  
          ghost.destroy();
          climberGrp.destroyEach();
          doorGrp.destroyEach();
          invisibleBlockGrp.destroyEach();
          tower.destroy();
    
          textSize(30);
          text("Game Over",width/2,height/2);   
          spookySound.stop();
   }
 
  drawSprites();
  textSize(20);
  text("score " + score,450,50);
}

function spawnDoor()
{
  if(frameCount % 150 === 0)
  {
    door = createSprite(200,50);
    climber = createSprite(200,110);
    invisibleBlock = createSprite(200,115);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY= 4;
    climber.velocityY = door.velocityY;
    invisibleBlock.velocityY = door.velocityY;
    
    invisibleBlock.debug = true;
    
    invisibleBlock.lifetime = 800;
    climber.Lifetime = 800;
    door.Lifetime = 800;
    
    doorGrp.add(door);
    climberGrp.add(climber);
    invisibleBlockGrp.add(invisibleBlock);
  }
}