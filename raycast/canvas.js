var init = function(id) {
	canvas = document.getElementById(id);
	ctx = canvas.getContext("2d");
	initcontrols();
	var dorun = setInterval(function(){run();},1000/30);
};

var render2dmap = function(map) {
	var localheight = map.length;
	for(var a = 0; a < localheight; a++) {
		var localwidth = map[a].length;
		for(var b = 0; b < localwidth; b++) {
			var tileid = map[b][a];
			drawTile(a, b, tileid);
		}
	}
};

var circle = function(x, y, size){
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2*Math.PI);
	ctx.fillStyle="#FFFFFF";
	ctx.fill();
};

var ray = function(){
	
};



var run = function(){
	player.rotation = player.rotation % 360;
	
	render2dmap(tilemap1);
	render2dplayer();
	
	keydown();
};

