var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var tile = {size:40};
//pixels per tile
var player = {x:120, y:180, speed:10};
//player.x and .y are loctaion
var side = {left:0, right:0, above:0, below:0};
//calculates the surrounding blocks for collision
var corner = {left:0, right:0, above:0, below:0};
var gravity = 10;
var debug = false;
var render = true;
var falling=true;
var jump = false;
var jumpcount = 0;

var run = function(){
	Controls();
	//adds movement functionality
	Falling();
	
	Jumping();
	
	ctx.clearRect(40*corner.left, 40*corner.above, 40*Math.abs(corner.left - corner.right), 40*Math.abs(corner.above - corner.below));
	//clears canvas
  	Draw();
	//draws background and player
	
	Recalculate();
	
};
var go = setInterval(run, 1000/30);
//sets the run function on a timer