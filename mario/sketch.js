var gamestate = "play"
var score = 0;
function preload(){
groundimg = loadImage("ground2.png")
bgimg = loadImage("bg.png");
marioimg = loadAnimation("mario00.png","mario03.png","mario02.png","mario01.png")
coinimg = loadAnimation("coin 1.png","coin 2.png","coin 3.png","coin 5.png","coin 6.png")
plantimg = loadAnimation("plant closed.png","plant open.png","plant open.png","plant open.png","plant open.png","plant open.png","plant open.png","plant open.png","plant open.png","plant open.png");
mstanding = loadAnimation("mario00.png");
overimg = loadImage("over.png");
resetimg = loadImage(" reset.png");
jump = loadSound("j.mp3")
ci = loadSound("c.mp3")
di = loadSound("die.mp3")
}

function setup(){
createCanvas(600,400);
ground = createSprite(200,380,400,20);
ground.addImage(groundimg)

ground.x = ground.width/2
mario = createSprite(50,320);
mario.addAnimation("running",marioimg);
mario.addAnimation("standing",mstanding)
mario.scale = 1.5
reset = createSprite(300,240);
over = createSprite(300,200);
reset.addImage(resetimg);
over.addImage(overimg);
reset.scale = 0.1
over.scale = 0.1
coingroup = new Group()
plantsgroup = new Group()
//coin = createSprite(300,200);
//coin.addAnimation("rotating",coinimg)
//mario.debug = true;
mario.setCollider("rectangle",0,0,20,mario.height);


}
function draw(){
  background(bgimg)
  fill("black");
  textSize(30)
  text("Score: "+ score,400,50);
  for(var i = 0;i<coingroup.length;i++){
    if(coingroup.get(i).isTouching(mario)){
      ci.play();
      coingroup.get(i).remove()
      score = score + 100
    }
  }
  if(gamestate==="play"){
    
    over.visible = false;
    reset.visible = false;
    ground.velocityX = -2;
    if(keyDown("space") && mario.y>300){
      mario.velocityY = -12
      jump.play();
    }
    mario.velocityY = mario.velocityY + 0.5;
  
    if(ground.x<0){
      ground.x = ground.width/2

    }
  if(plantsgroup.isTouching(mario)){
      di.play();
      gamestate = "end";
    }
    spawnplants();
    spc();
  }
  else if(gamestate === "end"){
    over.visible = true;
    reset.visible = true;
    ground.velocityX = 0;
    mario.velocityY = 0;
    plantsgroup.setVelocityXEach(0);
    coingroup.setVelocityXEach(0);
    mario.changeAnimation("standing",mstanding);
    if(mousePressedOver(reset)){
      restart();

    }

  }
   
  mario.collide(ground);
 drawSprites();

}
function spawnplants(){
  if(frameCount% 150 === 0){
    var plants = createSprite(600,325,10,30);
    plants.addAnimation("plants",plantimg);
    plants.scale = 0.2;
    plants.velocityX = -3;
    plantsgroup.add(plants);
  }
}

function spc(){
  if(frameCount% 200 === 0){
    var co = createSprite(600,200);
    co.addAnimation("coins",coinimg);
    co.velocityX = -3;
    co.y = Math.round(random(150,250))
    coingroup.add(co);
  }
  
}
function restart(){
  gamestate = "play"
  plantsgroup.destroyEach();
  coingroup.destroyEach();
  mario.changeAnimation("running",marioimg)
  score = 0;
}