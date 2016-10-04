	//draws map
	var drawTiles = function() {
		//ctx.fillStyle="#b6cef0";
		//ctx.fillRect(0,0,width,height);

		ctx.fillStyle = ctx.createPattern(Grass,"repeat");
		ctx.translate(mapPosition.ChangeX*zoom-zoom,mapPosition.ChangeY*zoom-zoom);
		ctx.fillRect(0,0,width+zoom*2,height+zoom*2);
		ctx.translate(-1*mapPosition.ChangeX*zoom+zoom,-1*mapPosition.ChangeY*zoom+zoom);
		ctx.translate(mapPosition.X*zoom,mapPosition.Y*zoom);
		for (var i = 0; i < map11.length; i++) {
			for (var a = 0; a < map11[i].length; a++) {
				var tileID = parseInt(map11[i][a]);
				if (tileID != 1){
				drawImageTile(a,i,tileID);
				}
					if(debug === true) {
					ctx.fillStyle="#000000";
					ctx.fillText(a + ", " + i, a*zoom+10, i*zoom+10);
				}
			}
		}
		ctx.translate(-1*mapPosition.X*zoom,-1*mapPosition.Y*zoom);
	};
	
	//draws player sprite
	var drawPlayer = function() {
		ctx.translate(1*mapPosition.X*zoom,1*mapPosition.Y*zoom);
		drawBlankTile(player.X, player.Y, "#FFFFFF");
		if(debug === true) {
			ctx.fillStyle="#000000";
			ctx.fillText((player.X) + ", " + (player.Y),player.X*zoom + 10, player.Y*zoom + 10);
		}
		ctx.translate(-1*mapPosition.X*zoom,-1*mapPosition.Y*zoom);
	};
	
	var checkMap = function(){
		
		if(player.X+mapPosition.X+anim.Dir <= edges.x1  && currentdir==="right"){
			editMap = 1;
			//mapPosition.X-=anim.Dir;
		}
		else if(player.X+mapPosition.X+anim.Dir >= edges.x2 && currentdir === "left") {
			editMap = 2;
			//mapPosition.X-=anim.Dir;
		}
		else if(player.Y+mapPosition.Y+anim.Dir <= edges.y1 && currentdir === "up") {
			editMap = 3;
			//mapPosition.Y-=anim.Dir;
		}
		else if(player.Y+mapPosition.Y+anim.Dir >= edges.y2 && currentdir === "down") {
			editMap = 4;
			//mapPosition.Y-=anim.Dir;
		}
	};
	
	//animates player moving
	var animate = function(axis,dir){
		if(moving.Go === true){
	  	moving.Go = false;
	    moving.Check = 0;
	    if(anim.XY===0){
	   		player.X=Math.round(player.XY);
	   	} else {
	   		player.Y=Math.round(player.XY);
	   	}
	   	//var time = window.setTimeout(function(){
	    moving.Is=false;//}, 50);
	    checkTrigger();
	 	}
	   else if(checkCollision(axis,dir)){
		anim.Dir = dir;
		anim.Sprint = moving.Sprint;
		checkMap();

		 	anim.XY=axis;
			if(axis===0){
				player.XY = player.X;
			}
			else {
				player.XY = player.Y;
			}
			moving.Go = true;
			moving.Is = true;
		}
	};
	
	//draws debug box is debug true
	var drawDebugBox = function(){

		var debugtext = [
			fps.getFPS(),
			"password letter #: " + passwords[0].complete,
			"currently pressed direction: " + currentdir,
			"second to last pressed key: " + String.fromCharCode(secondtolastletter).toLowerCase(),
			"last pressed key: " + String.fromCharCode(lastletter).toLowerCase(),
			"currently pressed key: " + String.fromCharCode(currentletter).toLowerCase(),
			"moving points: " + Math.round(moving.Check*100)/100,
			"map points: " + mapPosition.Change,
			"sprinting: " + moving.Sprint,
			"moving: " + moving.Is,
			"player grid position on grid: " + Math.round(player.X) + ", " + Math.round(player.Y),
			"player pixel position on grid: " + Math.round(player.X*zoom) + ", " + Math.round(player.Y*zoom),
			"player grid position on screen: " + Math.round(player.X+mapPosition.X) + ", " + Math.round(player.Y+mapPosition.Y),
			"player pixel position on screen: " + Math.round(player.X*zoom+zoom*mapPosition.X) + ", " + Math.round(player.Y*zoom+zoom*mapPosition.Y),
			"speed: " + anim.Speed,
			"map position: " + Math.round(mapPosition.X) + ", " + Math.round(mapPosition.Y),
			"map animation direction: " + editMap
		];
	
		ctx.fillStyle="#FFFFFF";
		ctx.fillRect(15,15,200, debugtext.length*11);
		ctx.fillStyle="#000000";
		for(var i = 0; i < debugtext.length; i++){
			ctx.fillText(debugtext[i], (15), i*(10)+(25));
		}
	};
	
	//checks if current player location activates anything
	var checkTrigger = function(){
		ctx.translate(1*mapPosition.X*zoom,1*mapPosition.Y*zoom);
		check.X = (player.X);
		check.Y = (player.Y);
		
		if(([map1tele[check.Y][check.X]]) > 0)
		{
			currentdir="none";
			pickFunction = map1tele[check.Y][check.X];
			trigger();
		}
		ctx.translate(-1*mapPosition.X*zoom,-1*mapPosition.Y*zoom);
	};
	
	//checks if the tile the player's about to move to is solid or not
	var checkCollision = function(axis, dir){
		var canWalk = false;
			if(axis===0){
				check.X = (player.X+dir);
				check.Y = (player.Y);
				canWalk = (walkItems[map11[check.Y][check.X]]);
			}
			else {
				check.Y = (player.Y+dir);
				check.X = (player.X);
				canWalk = (walkItems[map11[check.Y][check.X]]);
			}
		//checkEdge(axis, dir);
		return canWalk;
	};
	
	var setEdges = function(){
	edges.x1=edges.dist;
  	edges.y1=edges.dist;
		
  	edges.x2=(width-zoom)/zoom-edges.dist;
  	edges.y2=(height-zoom)/zoom-edges.dist;
	};