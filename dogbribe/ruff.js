var OneSecond = 1000;
var OneFrame = (1000 / 60);
var Money = 0;
var MoneyClick = 1;
var Puppy = {Count:0, Price:100, Interest:1.1, CPS:1, Menu:true, BuyT:"BuyPuppy", CountT:"Puppies", PriceT:"PuppiesCost", MenuT:"PuppyMenu"};
var Dog = {Count:0, Price:1000, Interest: 1.25, CPS:10, Menu:false, BuyT:"BuyDog", CountT:"Dogs", PriceT:"DogsCost", MenuT:"DogMenu"};
var Wolf = {Count:0, Price:10000, Interest: 1.56, CPS:100, Menu:false, BuyT:"BuyWolf", CountT:"Wolves", PriceT:"WolvesCost", MenuT:"WolfMenu"};
var animal = [Puppy, Dog, Wolf];
var Left = ["col1row1", "col1row2", "col1row3"];
var Right = ["col3row1", "col3row2", "col3row3"];

SetAll();
SetMenuDisplay();

function Click(){
	Money = Money + MoneyClick;
	SetMoney();
}

function SetAll() {
	for (i = 0; i < animal.length; i++) {
	document.getElementById(animal[i].CountT).innerHTML = animal[i].Count;
	document.getElementById(animal[i].PriceT).innerHTML = Math.round(animal[i].Price);
	}
	SetMoney();
}

function SetMoney() {
	document.getElementById("Money").innerHTML = Math.round(Money);
}

function buycheck() {
	for (i = 0; i < animal.length; i++) {
    if (animal[i].Price <= Money) {
		document.getElementById(animal[i].BuyT).disabled = "";
	} else {
		document.getElementById(animal[i].BuyT).disabled = "true";
	}
	}
	
}

function Buy(i){
	if (Money >= animal[i].Price) {
		animal[i].Count++;
		Money = Money - animal[i].Price;
		animal[i].Price = animal[i].Price * animal[i].Interest;
		SetAll();
	}
	else {
	}
	buycheck();
	document.getElementById(animal[i + 1].MenuT).style.display="block";
	animal[i + 1].Menu=true;
}

function resetleft(open){
	for (i = 0; i < Left.length; i++) {
	document.getElementById(Left[i]).style.display="none";
	}
	document.getElementById(open).style.display="table";
}

function resetright(open){
	for (i = 0; i < Right.length; i++) {
	document.getElementById(Right[i]).style.display="none";
	}
	document.getElementById(open).style.display="table";
}

var mainloop = function() {
	Money = (Money + (Puppy.Count * Puppy.CPS) / OneFrame);
	Money = (Money + (Dog.Count * Dog.CPS) / OneFrame);
	Money = (Money + (Wolf.Count * Wolf.CPS) / OneFrame);
	SetMoney();
	buycheck();
	document.getElementById("local").style.visibility = "hidden";
}


function SetMenuDisplay() {
  for (i=0; i< animal.length; i++) {
  if (animal[i].Menu){
    document.getElementById(animal[i].MenuT).style.display="block";
  } else {
    document.getElementById(animal[i].MenuT).style.display="none";
  }
  }
}

function save () {
	var save = {
		Money:Math.round(Money),
		Puppy:Puppy,
		Dog:Dog,
		Wolf:Wolf,
		PMenu:Puppy.Menu,
		DMenu:Dog.Menu,
		WMenu:Wolf.Menu
	}
	localStorage.setItem("save",JSON.stringify(save));
	alert("Successfully saved!");
}

function load () {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.Money !== "undefined") Money = savegame.Money;
	if (typeof savegame.Puppy.Price !== "undefined") Puppy.Price = savegame.Puppy.Price;
	if (typeof savegame.Puppy.Count !== "undefined") Puppy.Count = savegame.Puppy.Count;
	if (typeof savegame.Dog.Price !== "undefined") Dog.Price = savegame.Dog.Price;
	if (typeof savegame.Dog.Count !== "undefined") Dog.Count = savegame.Dog.Count;
	if (typeof savegame.Wolf.Price !== "undefined") Wolf.Price = savegame.Wolf.Price;
	if (typeof savegame.Wolf.Count !== "undefined") Wolf.Count = savegame.Wolf.Count;
  Puppy.Menu = savegame.PMenu;
  Dog.Menu = savegame.DMenu;
  Wolf.Menu = savegame.WMenu;
	SetAll();
	SetMenuDisplay();
	alert("Successfully loaded!");
}
var w;

function local(){
	setInterval( mainloop, 60);
	
}

w = new Worker("DogTick.js");

w.onmessage = function(event) {
	mainloop();
}