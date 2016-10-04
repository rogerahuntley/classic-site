var tilemap1 = [
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
[2,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,2],
[2,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,2],
[2,0,0,0,1,0,0,1,1,1,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,2],
[2,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2],
[2,0,0,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,2,2,2],
[2,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,2,2],
[2,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,2,2],
[2,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2],
[2,0,0,1,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2],
[2,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2],
[2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2],
[2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,2,2,2,2],
[2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2],
[2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2],
[2,0,0,0,0,0,0,0,1,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,0,0,0,0,2,2,2,2,2,2],
[2,0,0,0,0,0,2,2,1,2,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2],
[2,0,0,0,0,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2],
[2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];
//maps

colorlist = ["black", "green", "red"];

var air = new Image();
air.src = "air.bmp";
var dirt = new Image();
dirt.src = "dirt.bmp";
var grass = new Image();
grass.src = "grass.bmp";

imagelist = [air, grass, dirt];