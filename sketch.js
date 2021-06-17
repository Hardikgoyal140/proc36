//Create variables here
var dog,sadDog,happyDog,database;

var fedTime,lastFed,foodObj,addFood,feed;

var food,foodStock;

var foods;

function preload(){

	sadDog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png")



}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database();

  food = new Food();
foodObj = new Food();
 
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(45,140,85)
foodObj.display();

/*if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(happyDog);
}*/

  drawSprites();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


 fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 

}

function readStock(data){
  foods=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}
function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}

function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

