var keyState = {};
var currentdir;
var currentfor;
var turnspeed = 1;
var movespeed = 2;

var initcontrols = function(){
	
	//canvas.addEventListener("mousedown", click, false);
	
	window.addEventListener("keydown",function(e){
		keyState[e.keyCode] = true;
		
	if(String.fromCharCode(e.keyCode).toLowerCase() === "a"){
		if(currentdir != "right"){
		currentdir = "right";
		console.log(currentdir);
		}
	} else if(String.fromCharCode(e.keyCode).toLowerCase() === "d"){
		if(currentdir != "left"){
		currentdir = "left";
		console.log(currentdir);
		}
	}
	
	if(String.fromCharCode(e.keyCode).toLowerCase() === "w"){
		if(currentfor != "up"){
		currentfor = "up";
		console.log(currentfor);
		}
	} else if(String.fromCharCode(e.keyCode).toLowerCase() === "s"){
		if(currentfor != "down"){
		currentfor = "down";
		console.log(currentfor);
		}
	}
		//cheatCheck();
	}, true);
	
	window.addEventListener("keyup",function(e){
		keyState[e.keyCode] = false;
		
		
	if(String.fromCharCode(e.keyCode).toLowerCase() === "a"){
		if(keyState[68]){
		currentdir = "left";
		}
	} else if(String.fromCharCode(e.keyCode).toLowerCase() === "d"){
		if(keyState[65]){
		currentdir = "right";
		}
	}
	
	if(String.fromCharCode(e.keyCode).toLowerCase() === "w"){
		if(keyState[83]){
		currentfor = "up";
		}
	} else if(String.fromCharCode(e.keyCode).toLowerCase() === "s"){
		if(keyState[87]){
		currentfor = "down";
		}
	}
	
	
	},true);
	
	window.addEventListener("focus", function() {}, false);
	
	window.addEventListener("blur", function() { keyState = {}; currentdir = "none";}, false);
};

var keydown = function(){
		if((currentdir === "right") && keyState[65]){
		player.rotation-=5;
	}
		if((currentdir === "left") && keyState[68]){
		player.rotation+=5;
	}
		if((currentfor === "up") && keyState[87]){
			console.log(Math.sin(player.rotation)*movespeed);
		player.X += Math.cos(player.rotation*Math.PI/180)*movespeed;
		player.Y += Math.sin(player.rotation*Math.PI/180)*movespeed;
	}
		if((currentfor === "down") && keyState[83]){
		player.X -= Math.cos(player.rotation*Math.PI/180)*movespeed;
		player.Y -= Math.sin(player.rotation*Math.PI/180)*movespeed;
	}
};