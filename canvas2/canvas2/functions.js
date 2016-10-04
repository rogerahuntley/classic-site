var DrawTile = function(x, y, color){
	ctx.fillStyle = color;
	ctx.fillRect(x, y, tile.size, tile.size);
	if(debug){
	ctx.fillStyle = "white"
	ctx.fillText(x/40 + ", " + y/40, x, y+10);
	};
};
//draw singular tile

var RenderScene = function(){
	for(var i = side.above;i < side.below+1; i++){
		//for every row around the player
		for(var a = side.left;a < side.right+1; a++) {
			//for every box in every row
			if(tilemap[i][a] === 0){
				DrawTile(a*tile.size, i*tile.size, "black");
			} else if(tilemap[i][a] == 1){
				DrawTile(a*tile.size, i*tile.size, "green");
			} else if(tilemap[i][a] == 2){
				DrawTile(a*tile.size, i*tile.size, "red");
			}
			//choose color and draw tile
		}
	}
};

var RenderFirst = function(){
	for(var c = 0;c < tilemap.length; c++){
		//for every row in the tilemap
		for(var d = 0;d < tilemap[c].length; d++) {
			//for every item in each row
			if(tilemap[c][d] === 0){
				DrawTile(d*tile.size, c*tile.size, "black");
			} else if(tilemap[c][d] == 1){
				DrawTile(d*tile.size, c*tile.size, "green");
			} else if(tilemap[c][d] == 2){
				DrawTile(d*tile.size, c*tile.size, "red");
			}
			//choose color and draw tile
		}
	}
};
//render scene

var EraseFirst = function(){
	ctx.clearRect(0,0, c.width, c.height);
	Draw();
};

var Collision = function(){
	var diff = corner.above - corner.below;
	for(var b = 0; b < Math.abs(diff)+1;b++){
	if(tilemap[(corner.above + b)][corner.left] == 2 || tilemap[(corner.above + b)][corner.right] == 2){
		return true;
	}
	}
};

var Renderplayer = function(){
	DrawTile(player.x, player.y-tile.size, "blue");
	DrawTile(player.x, player.y-tile.size*2, "blue");
	//draws 2 tiles for the player
};

var Draw = function(){
	RenderScene();
	//renders scene
	if(debug){
	Debug();
	};
	//checks if debug is turned on
	Renderplayer();
	//renders player
};

var Controls = function(){
  if (keydown.a) {
    player.x -= player.speed;
	Recalculate();
	if(Collision()){
		player.x += player.speed;
		Recalculate();
	}
	else {
	if(jump == false && falling == false)
	FallingCheck();
	}
  }
  /*
  if (keydown.s) {
    player.y += player.speed;
	Recalculate();
	if(Collision()){
		player.y -= player.speed;
		Recalculate();
	}
  }
  */
  if (keydown.d) {
    player.x += player.speed;
	Recalculate();
	if(Collision()){
		player.x -= player.speed;
		Recalculate();
	}
	else {
	if(jump == false && falling == false){
	FallingCheck();}
	}
	}
  if(keydown.space){
	  if(falling){
	  }
	  else {
		  jump=true;
	  }
  }
};
//controls

var Debug = function(){
  ctx.fillStyle = "orange";
  ctx.fillRect(side.left*40, side.above*40, 40, 40);
  ctx.fillRect(side.left*40, side.below*40, 40, 40);
  ctx.fillRect(side.right*40, side.above*40, 40, 40);
  ctx.fillRect(side.right*40, side.below*40, 40, 40);
  ctx.fillStyle = "pink";
  ctx.fillText(side.left + ", " + side.above, side.left*40, side.above*40+10);
  ctx.fillText(side.left + ", " + side.below, side.left*40, side.below*40+10);
  ctx.fillText(side.right + ", " + side.above, side.right*40, side.above*40+10);
  ctx.fillText(side.right + ", " + side.below, side.right*40, side.below*40+10);
  document.getElementById("x").innerHTML = "player.x = " + side.left + " & " + side.right;
  document.getElementById("y").innerHTML = "player.y = " + side.above + " & " + side.below;
  //adds squares around Collision areas
  ctx.fillStyle = "violet";
  ctx.fillRect(corner.left*40, corner.above*40, 40, 40);
  ctx.fillRect(corner.left*40, corner.below*40, 40, 40);
  ctx.fillRect(corner.right*40, corner.above*40, 40, 40);
  ctx.fillRect(corner.right*40, corner.below*40, 40, 40);
  ctx.fillStyle = "purple";
  ctx.fillText(corner.left + ", " + corner.above, corner.left*40, corner.above*40+10);
  ctx.fillText(corner.left + ", " + corner.below, corner.left*40, corner.below*40+10);
  ctx.fillText(corner.right + ", " + corner.above, corner.right*40, corner.above*40+10);
  ctx.fillText(corner.right + ", " + corner.below, corner.right*40, corner.below*40+10);
};

var Recalculate = function(){
	side = {left:Math.floor((player.x-40)/40), right:Math.ceil((player.x+40)/40), above:Math.floor((player.y-120)/40), below:Math.ceil(player.y/40)};
	corner = {left:Math.floor((player.x)/40), right:Math.ceil((player.x)/40), above:Math.floor((player.y-80)/40), below:Math.ceil((player.y-40)/40)};
};
Recalculate();

var Falling = function(){
	if(falling){
	player.y+=gravity;
	Recalculate();
		if(Collision()){
		player.y -= gravity;
		falling = false;
		Recalculate();
	}}
};

var FallingCheck = function(){
	if(tilemap[Math.floor(player.y/40)][corner.left] == 2)
	{falling=false;} else {falling = true;}
};

var Jumping = function(){
	if(jump){
		if(jumpcount > 4){
			falling = true;
			jump = false;
			jumpcount = 0;
		}
		else {
		jumpcount+=1;
		player.y-=10;
		}
	}
};