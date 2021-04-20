var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedTime;
var lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog=createButton("Feed The Dog");
  feedDog.position(650,95);
  feedDog.mousePressed(feedTheDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}
function feedTheDog(){
  dog.addImage(happyDog)
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref("lastFed")
  fedTime.on("value", function(data){
    lastFed = data.val();
  });
 fill("white");
 textSize(20);
  if(lastFed > 12){
    text("Last Fed: " + lastFed % 12 + "PM", 350,30);
}
  else if(lastFed == 0){
    text("Time: 12am", 350,30)
}
  else{
    text("Last Fed: " + lastFed + "AM", 350,30)
  }
  //write code to display text lastFed time here
  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedTheDog(){
  dog.addImage(happyDog);
  var food_Stock = foodObj.getFoodStock();
  if(food_Stock <= 0){
    foodObj.updateFoodStock(0)
  }
  else{
    foodObj.updateFoodStock(food_Stock - 1)
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    lastFed: hour()
  });
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
