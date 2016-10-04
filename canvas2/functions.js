var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var tile = {size:32};
//pixels per tile
var mapPosition = {x:0, y:0};
var player = {x:120, y:180, speed:4, jumpspeed:4, color: "blue"};
//player.x and .y are loctaion
var side = {left:0, right:0, above:0, below:0};
//calculates the surrounding blocks for collision
var corner = {left:0, right:0, above:0, below:0};
//calculates blocks the player is currently in
var breaktile = {left:0, right:0, above:0, below:0, pause:0};
//calculates blocks for breaking
var gravity = 3;
//how fast you fall
var debug = false;
var debug2 = false;
//debug mode
var render = true;
//load map before playing
var falling = true;
//used ingame to determine if you're falling
var jump = false;
//used ingame to determine is you're jumping
var jumpcount = 0;
//counter for jumping
var flipcheck = true;
var flipval = 0;
var scrolling = true;

function DrawTile(x, y, color){
	ctx.save();
	ctx.translate(mapPosition.x, mapPosition.y);
	ctx.fillStyle = color;
	//changes color
	ctx.fillRect(x, y, tile.size, tile.size);
	//builds tile
	if(debug){
	ctx.fillStyle = "white";
	ctx.fillText(x/tile.size + ", " + y/tile.size, x, y+(tile.size/4));
	}
	ctx.restore();
	//if debug mode is on, show coords
};
//draws singular tile

function DrawTileImage(x, y, id){
	ctx.save();
	ctx.translate(mapPosition.x, mapPosition.y);
	ctx.drawImage(id, x, y, tile.size, tile.size);
	//builds tile
	if(debug){
	ctx.fillStyle = "white";
	ctx.fillText(x/tile.size + ", " + y/tile.size, x, y+(tile.size/4));
	}
	ctx.restore();
	//if debug mode is on, show coords
};
//draws singular tile

function ShiftMap(dir, amnt){
	//dir = x or y
	switch(dir) {
		case x:
		mapPosition.x += amnt;
		break;
		case y:
		mapPosition.y += amnt;
		break;
	}
	RenderFirst();
	RenderPlayer();
	//renders player
	
	RenderCrosshairs();
}

function DrawSelectionBox(x, y, boy){
	ctx.save();
	ctx.translate(mapPosition.x, mapPosition.y);
	ctx.fillStyle = "gray";
	ctx.fillRect(x+(tile.size/9), y+tile.size/9, tile.size/10*9-tile.size/9, tile.size/9);
	ctx.fillRect(x+(tile.size/9), y+(tile.size-tile.size/9*2), tile.size/10*9-tile.size/9, tile.size/9);
	ctx.fillRect(x+(tile.size/9), y+(tile.size/9), tile.size/9, tile.size/10*9-tile.size/9);
	ctx.fillRect(x+(tile.size-tile.size/9*2), y+(tile.size/9), tile.size/9, tile.size/10*9-tile.size/9);
	ctx.fillStyle = "white";
	ctx.fillText(boy, x+tile.size/2, y+tile.size/2);
	ctx.restore();
};

function RenderScene(){
	for(var i = side.above;i < side.below+1; i++){
		//for every row around the player
		for(var a = side.left-1;a < side.right+2; a++) {
			if(tilemap1[i][a]==undefined){
				DrawTileImage(a*tile.size, i*tile.size, imagelist[2]);
			} else {
				DrawTileImage(a*tile.size, i*tile.size, imagelist[tilemap1[i][a]]);
			}
		}
	}
};
//renders area around the player

function RenderFirst(){
	for(var c = 0;c < tilemap1.length; c++){
		//for every row in the tilemap
		for(var d = 0;d < tilemap1[c].length; d++) {
			if(tilemap1[c][d]==undefined){
				DrawTileImage(d*tile.size, c*tile.size, imagelist[2]);
			} else {
				DrawTileImage(d*tile.size, c*tile.size, imagelist[tilemap1[c][d]]);
			}
		}
	}
};
//render total scene

function EraseFirst(){
	ctx.clearRect(0,0, c.width, c.height);
	Draw();
};
//reset loaded map

function RenderPlayer(){
	DrawTile(player.x, player.y-tile.size, player.color);
	DrawTile(player.x, player.y-tile.size*2, player.color);
};
//draws 2 tiles for the player

function RenderCrosshairs(){
	DrawSelectionBox(side.left*tile.size, (breaktile.above)*tile.size, "u");
	DrawSelectionBox(side.left*tile.size, (breaktile.below)*tile.size, "j");
	DrawSelectionBox(side.right*tile.size, (breaktile.above)*tile.size, "i");
	DrawSelectionBox(side.right*tile.size, (breaktile.below)*tile.size, "k");
	ctx.restore();
};

function Draw(){
	RenderScene();
	//renders scene
	
	if(debug){
	Debug();
	}
	if(debug2){
	Debug2();
	}
	//checks if debug is turned on
	
	RenderPlayer();
	//renders player
	
	RenderCrosshairs();
};
//draws player and surrounding map

function Collision(){
	var vdiff = Math.abs(corner.above - corner.below);
	var hdiff = Math.abs(corner.left - corner.right);
	//calculate how tall the player is
	for(var b = 0; b < vdiff+1;b++){
		if(hdiff == 1){
		//for as many times as blocks tall the player is
			if(tilemap1[(corner.above + b)][corner.left] == 2 || tilemap1[(corner.above + b)][corner.right] == 2){
				//check underneath both blocks player is in
				return true;
			}
		} else {
			if(tilemap1[(corner.above + b)][corner.left] == 2){
				//check directly underneath
				return true;
			}
		}
	}
};
//checks collision

function Controls(){
  if (keydown.a) {
    player.x -= tile.size/player.speed;
	Recalculate();
	if(Collision()){
		var diff = Math.abs(tile.size*(player.x/tile.size-Math.ceil(player.x/tile.size)));
		player.x += diff;
		Recalculate();
	}
	else {
	if(jump === false && falling === false)
	FallingCheck();
	}
  }
  //if a is held, move left, check collision, reverse if colliding, check for floating
  if (keydown.d) {
    player.x += tile.size/player.speed;
	Recalculate();
	if(Collision()){
		var diff = Math.abs(tile.size*(player.x/tile.size-Math.floor(player.x/tile.size)));
		player.x -= diff;
		Recalculate();
	}
	else {
	if(jump === false && falling === false){
	FallingCheck();}
	}
	}
  //if d is held, move right, check collision, reverse if colliding, check for floating
  if(keydown.space){
	if(falling === false){
	jump=true;
  }}
  //if space pressed, start jump
  if(keydown.u){
	Breaking("u");
  }
  if(keydown.i){
	Breaking("i");
  }
  if(keydown.j){
	Breaking("j");
  }
  if(keydown.k){
	Breaking("k");
  }
  if(keydown.shift){
	  if(flipcheck){
	  flipcheck = false;
	  flipval++;
	  if(flipval >= colorlist.length){
		  flipval = 0;
	  }
	  }
  }else{
	  flipcheck= true;
  }
};
//controls

function Debug(){
  ctx.fillStyle = "orange";
  ctx.fillRect(side.left*tile.size, side.above*tile.size, tile.size, tile.size);
  ctx.fillRect(side.left*tile.size, side.below*tile.size, tile.size, tile.size);
  ctx.fillRect(side.right*tile.size, side.above*tile.size, tile.size, tile.size);
  ctx.fillRect(side.right*tile.size, side.below*tile.size, tile.size, tile.size);
  ctx.fillStyle = "pink";
  ctx.fillText(side.left + ", " + side.above, side.left*tile.size, side.above*tile.size+tile.size/4);
  ctx.fillText(side.left + ", " + side.below, side.left*tile.size, side.below*tile.size+tile.size/4);
  ctx.fillText(side.right + ", " + side.above, side.right*tile.size, side.above*tile.size+tile.size/4);
  ctx.fillText(side.right + ", " + side.below, side.right*tile.size, side.below*tile.size+tile.size/4);
  document.getElementById("x").innerHTML = "player.x = " + side.left + " & " + side.right;
  document.getElementById("y").innerHTML = "player.y = " + side.above + " & " + side.below;
  //adds squares around Collision areas
  ctx.fillStyle = "violet";
  ctx.fillRect(corner.left*tile.size, corner.above*tile.size, tile.size, tile.size);
  ctx.fillRect(corner.left*tile.size, corner.below*tile.size, tile.size, tile.size);
  ctx.fillRect(corner.right*tile.size, corner.above*tile.size, tile.size, tile.size);
  ctx.fillRect(corner.right*tile.size, corner.below*tile.size, tile.size, tile.size);
  ctx.fillStyle = "purple";
  ctx.fillText(corner.left + ", " + corner.above, corner.left*tile.size, corner.above*tile.size+tile.size/4);
  ctx.fillText(corner.left + ", " + corner.below, corner.left*tile.size, corner.below*tile.size+tile.size/4);
  ctx.fillText(corner.right + ", " + corner.above, corner.right*tile.size, corner.above*tile.size+tile.size/4);
  ctx.fillText(corner.right + ", " + corner.below, corner.right*tile.size, corner.below*tile.size+tile.size/4);
};

function Debug2(){
	DrawTile(side.left*tile.size, (corner.below-1)*tile.size, "green");
	ctx.fillStyle = "pink";
	ctx.fillText("7", side.left*tile.size, (corner.below-1)*tile.size+tile.size/4);
	DrawTile(side.left*tile.size, (corner.below)*tile.size, "green");
	ctx.fillStyle = "pink";
	ctx.fillText("1", side.left*tile.size, (corner.below)*tile.size+tile.size/4);
	DrawTile(side.right*tile.size, (corner.below-1)*tile.size, "green");
	ctx.fillStyle = "pink";
	ctx.fillText("9", side.right*tile.size, (corner.below-1)*tile.size+tile.size/4);
	DrawTile(side.right*tile.size, (corner.below)*tile.size, "green");
	ctx.fillStyle = "pink";
	ctx.fillText("3", side.right*tile.size, (corner.below)*tile.size+tile.size/4);
};

function Recalculate(){
	side = {left:Math.floor((player.x-tile.size)/tile.size), right:Math.ceil((player.x+tile.size)/tile.size), above:Math.floor((player.y-tile.size*3)/tile.size), below:Math.ceil(player.y/tile.size)};
	corner = {left:Math.floor((player.x)/tile.size), right:Math.ceil((player.x)/tile.size), above:Math.floor((player.y-tile.size*2)/tile.size), below:Math.ceil((player.y-tile.size)/tile.size)};
	breaktile = {left:side.left, right:side.right, above:corner.above, below:corner.below};
};
Recalculate();

function Falling(){
	if(falling){
	player.y += tile.size/gravity;
	Recalculate();
		if(Collision()){
		var diff = Math.abs(tile.size*(player.y/tile.size-Math.floor(player.y/tile.size)));
		player.y -= diff;
		falling = false;
		Recalculate();
	}}
};

function FallingCheck(){
	Recalculate();
	if(tilemap1[Math.floor(player.y/tile.size)][corner.left] == 2 || tilemap1[Math.floor(player.y/tile.size)][corner.right] == 2)
	{falling=false;} else {falling = true;}
};

function Jumping(){
	Recalculate();
	if(jump){
		if(jumpcount >= 12){
			jump = false;
			pause = true;
				//if(keydown.space){
				//	jump=true;
				//} else {
				//	jump = false;
				//}
			jumpcount = 0;
		}
		else if(jumpcount == 6){
			falling = true;
			jumpcount+=1;
		}
		else if(jumpcount > 6){
			jumpcount+=1;
		} else {
			jumpcount+=1;
			player.y-=tile.size/player.jumpspeed;
			Recalculate();
			if(tilemap1[corner.above][corner.left] == 2 || tilemap1[corner.above][corner.right] == 2){
				var diff = Math.abs(tile.size*(player.y/tile.size-Math.ceil(player.y/tile.size)));
				player.y += diff;
				jump = false;
				falling = true;
				jumpcount = 0;
			}
		}
	}
	Recalculate();
};

function Breaking(press){
	if(press == "u"){
		BreakBlock(breaktile.above, breaktile.left);
	}
	if(press == "j"){
		BreakBlock(breaktile.below, breaktile.left);
	}
	if(press == "i"){
		BreakBlock(breaktile.above, breaktile.right);
	}
	if(press == "k"){
		BreakBlock(breaktile.below, breaktile.right);
	}
};

function BreakBlock(first, second){
	tilemap1[first][second] = flipval;
};

function Colors(){
	if(falling){
		player.color = "pink";
	} else if(jump){
		player.color = "purple";
	} else {
		player.color = "blue";
	}
};
var tilemap = [
	[2, 2, 2, 2, 2],
	[2, 1, 1, 1, 2],
	[2, 1, 1, 1, 2],
	[2, 1, 1, 1, 2],
	[2, 1, 1, 1, 2],
	[2, 2, 2, 2, 2]
	];
function GenerateTilemap(){

};

function Edge(){
	if(scrolling){
		if(player.x+mapPosition.x+tile.size*.5 >= c.width-tile.size*3 && mapPosition.x*-1+c.width < tilemap1[0].length*tile.size){
			ShiftMap(x, -tile.size/player.speed);
		} else if(player.x+mapPosition.x+tile.size*.5 <= 0+tile.size*3 && mapPosition.x != 0){
			ShiftMap(x, tile.size/player.speed);
		} else {
			Draw();
		}
	} else {
		if(player.x+mapPosition.x+tile.size*.5 >= c.width){
			ShiftMap(x, -tile.size*c.width/tile.size);
		} else if(player.x+mapPosition.x+tile.size*.5 <= 0){
			ShiftMap(x, tile.size*c.width/tile.size);
		} else {
		Draw();
		}
	}
};