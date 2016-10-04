var cselect = document.getElementById("select");
var ctxs = cselect.getContext("2d");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var tile = {size:20};
var newblock = 2;
//pixels per tile

function DrawTile(x, y, color, context){
	if(context === undefined){canvas = ctx;}
	context.fillStyle = color;
	//changes color
	context.fillRect(x, y, tile.size, tile.size);
	//builds tile
	context.fillStyle = "white";
	context.font = "5px Arial";
	context.fillText(x/tile.size + ", " + y/tile.size, x, y+(tile.size/4));
	//if debug mode is on, show coords
}
//draws singular tile

function RenderMap(){
	for(var c = 0;c < tilemap1.length; c++){
		//for every row in the tilemap1
		for(var d = 0;d < tilemap1[c].length; d++) {
			DrawTile(d*tile.size, c*tile.size, colorlist[tilemap1[c][d]], ctx);
		}
	}
}
//render total scene

function RenderSelect(){
	for(var i = 0;i < colorlist.length; i++){
		DrawTile(i*tile.size, 0, colorlist[i], ctxs);
	}
}

function Click(event){
	var x=Math.floor((event.pageX - canvas.offsetLeft)/tile.size);
	var y=Math.floor((event.pageY - canvas.offsetTop)/tile.size);
	tilemap1[y][x] = newblock;
	RenderMap();
	OutputTilemap();
}

function Clicks(event){
	var x=Math.floor((event.pageX - cselect.offsetLeft)/tile.size);
	var y=Math.floor((event.pageY - cselect.offsetTop)/tile.size);
	newblock = Math.floor((event.pageX - cselect.offsetLeft)/tile.size);
	RenderSelect();
}

function OutputTilemap(){
	document.getElementById("tilemap").innerHTML = "[" + tilemap1[0] + "]," + "<br>";
	for(var i = 1;i < tilemap1.length;i++){
		if(i == tilemap1.length-1){
			document.getElementById("tilemap").innerHTML = document.getElementById("tilemap").innerHTML + "[" + tilemap1[i] + "]" + "<br>";
		} else {
			document.getElementById("tilemap").innerHTML = document.getElementById("tilemap").innerHTML + "[" + tilemap1[i] + "]," + "<br>";
		}
	}
}