var Puppy = {Count:0, Price:75, Interest:1.1, CPS:1, BuyT:"BuyPuppy", CountT:"Puppies", PriceT:"PuppiesCost", MenuT:"PuppyMenu", CPST:"PuppyCPS"};
var Dog = {Count:0, Price:500, Interest: 1.25, CPS:10, BuyT:"BuyDog", CountT:"Dogs", PriceT:"DogsCost", MenuT:"DogMenu", CPST:"DogCPS"};
var Wolf = {Count:0, Price:2500, Interest: 1.56, CPS:100, BuyT:"BuyWolf", CountT:"Wolves", PriceT:"WolvesCost", MenuT:"WolfMenu", CPST:"WolfCPS"};
var animal = [Puppy, Dog, Wolf];

function BuyAnimal(i){
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
