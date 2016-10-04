	var c = document.getElementById("mainGame");
	var ctx = c.getContext("2d");
	var player = {X:9, Y:1, XY: 0};
	var check = {X:0,Y:0};
	var moving = {Check: 0, Is: false, Up: false, Down: false, Left: false, Right: false, Dir: 0, Sprint: false, Go: false};
	var speed = 2;
	var debug = false;
	var editMap = false;
	var zoom = 40;
	var anim = {Dir: 0, Speed: 0, XY: 0, Sprint: false};
	var keyState = {};
	var currentletter=67;
	var lastletter = 67;
	var currentdir="none";
	var secondtolastletter = 67;
	var pickFunction = 0;
	var edges = {x1:3,x2:17,y1:3,y2:13, dist: 3};
	var mapPosition = {X: 0, Y: 0, ChangeX: 0, ChangeY: 0};
	var editMap = false;
	var width = c.width;
	var height = c.height;
	var checkdebug = 0;
	var delta = 0;
	var lastTime = 0;

	
	//let document know it's clickable before asking to click
	document.addEventListener("DOMContentLoaded", init, false);
	
	//initializes input and starts canvas
	function init() {
		var c = document.getElementById("mainGame");
		window.addEventListener("mousedown", click, false);
		window.addEventListener("keydown",function(e){
			keyState[e.keyCode || e.which] = true;
			if(e.keyCode !== currentletter) {
				secondtolastletter= lastletter;
				lastletter= currentletter;
				currentletter= e.keyCode;
			}
			if(e.keyCode===37||38||39||40||65||87||68||83||16){
			if(e.keyCode===16){
				
			} else if(String.fromCharCode(e.keyCode).toLowerCase() === "a"){
				currentdir = "right";
			} else if(String.fromCharCode(e.keyCode).toLowerCase() === "w"){
				currentdir = "up";
			} else if(String.fromCharCode(e.keyCode).toLowerCase() === "d"){
				currentdir = "left";
			} else if(String.fromCharCode(e.keyCode).toLowerCase() === "s"){
				currentdir = "down";
			}
				
			}
			cheatCheck();
		}, true);
		window.addEventListener("keyup",function(e){
			keyState[e.keyCode || e.which] = false;
		},true);
		window.addEventListener("focus", function(event) {}, false);
		window.addEventListener("blur", function(event) { keyState = {}; currentdir = "none";}, false);
	}
	
	
	
	//what happens when/where mouse is clicked
	function click(event) {
		//var x = event.x;
		//var y = event.y;
		//var canvas = document.getElementById("mainGame");
		//x -= canvas.offsetLeft;
		//y -= canvas.offsetTop;
	}

	//what happens when buttons/what button is pressed
	var keyboard = function(){
		
		if(moving.Is === false) {
		//animate(0 or 1 = X or Y, -1 or 1 = direction)
		//move right
		if((currentdir === "right")  && keyState[65]){
			animate(0,-1);
		}
		//move up
		else if ((currentdir === "up") && keyState[87]) {
			animate(1,-1);
		}
		//move left
		else if((currentdir === "left")  && keyState[68]){
			animate(0,1);
		}
		//move down
		else if((currentdir === "down")  && keyState[83]){
			animate(1,1);
		}
		else if((lastletter === 65)  && keyState[65]){
			currentdir = "right";
			currentletter = 65;
			animate(0,-1);
		}
		else if ((lastletter === 87) && keyState[87]) {
			currentdir = "up";
			currentletter = 87;
			animate(1,-1);
		}
		else if((lastletter === 68)  && keyState[68]){
			currentdir = "left";
			currentletter = 68;
			animate(0,1);
		}
		else if((lastletter === 83)  && keyState[83]){
			currentdir = "down";
			currentletter = 83;
			animate(1,1);
		}
		}
		if(keyState[16]) {
			moving.Sprint = true;
		}
		else if(!keyState[16]){
			moving.Sprint = false;
		}
	};

	var run = function() {
		ctx.clearRect(0,0,width,height);
		drawTiles();
		drawPlayer();
		keyboard();
		
		if(anim.Sprint===true){
	   	anim.Speed = Math.round(speed/40*2*delta)/10;
	  }	else {
	  	anim.Speed = Math.round(speed/40*delta)/10;
	 	}
		
		
		if(debug === true) {
			drawDebugBox();
		}
	  
	  setEdges();
	  
		if(moving.Go === true) {
			
		  player.XY+=anim.Dir*Math.round(anim.Speed*10)/10;
		  checkdebug++;
		  if(anim.XY===0){
		  	player.X=Math.floor(player.XY*10)/10;
		  } else {
		  	player.Y=Math.round(player.XY*10)/10;
		  }
		  moving.Check+=anim.Speed;
		  
		  if(moving.Check >= 1){
		  checkdebug=0;
		  animate();
		  }
		}

			if(editMap === 1){
		  	mapPosition.X+=anim.Speed;
		  	mapPosition.ChangeX+=anim.Speed;
		  	if(mapPosition.ChangeX >= 1){
				mapPosition.X+=.001;
		  		mapPosition.X=Math.floor(mapPosition.X);
		  		mapPosition.ChangeX=0;
		  		editMap = 0;
		  	}
			}
			else if(editMap === 2){
		  	mapPosition.X-=anim.Speed;
		  	mapPosition.ChangeX-=anim.Speed;
		  	if(mapPosition.ChangeX <= -1){
				mapPosition.X-=.001;
		  		mapPosition.X=Math.ceil(mapPosition.X);
		  		mapPosition.ChangeX=0;
		  		editMap = 0;
		  	}
			}
			else if(editMap === 3){
		  	mapPosition.Y+=anim.Speed;
		  	mapPosition.ChangeY+=anim.Speed;
		  	if(mapPosition.ChangeY >= 1){
				mapPosition.Y+=.001;
		  		mapPosition.Y=Math.floor(mapPosition.Y);
		  		mapPosition.ChangeY=0;
		  		editMap = 0;
		  	}
			}
			else if(editMap === 4){
		  	mapPosition.Y-=anim.Speed;
		  	mapPosition.ChangeY-=anim.Speed;
		  	if(mapPosition.ChangeY <= -1){
				mapPosition.Y-=.001;
		  		mapPosition.Y=Math.ceil(mapPosition.Y);
		  		mapPosition.ChangeY=0;
		  		editMap = 0;
		  	}
			}
	};
	
	var startAnimFrame = function() {
		var time = Date.now();
		delta = time - lastTime;
		run();
		lastTime = time;
		requestAnimationFrame(startAnimFrame);
	};
	
	startAnimFrame();
