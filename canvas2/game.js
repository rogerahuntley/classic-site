function run(){
	Controls();
	//adds movement functionality
	
	Falling();
	//for falling
	
	Jumping();
	//for jumping
	
	Edge();
	//ctx.clearRect(40*corner.left, 40*corner.above, 40*Math.abs(corner.left - corner.right), 40*Math.abs(corner.above - corner.below));
	//clears area around player
	
	Recalculate();
	//for adjacent collisionas
	
	//GenerateTilemap();
	document.getElementById("jumpin").innerHTML = flipval + " but also " + (player.x+mapPosition.x) + " > " + c.width + " " + (mapPosition.x+c.width) + " " + tilemap1[0].length*tile.size;
};

function init(){

var go = setInterval(run, 1000/30);
//sets the run function on a timer
grass.onload = function(){if(render){RenderFirst()}};
GenerateTilemap();
};
function start(){
window.onload()= init();
};