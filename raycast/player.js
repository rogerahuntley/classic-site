var player = {X:60, Y:60, size:10, rotation:0, fov: 60};

var render2dplayer = function(){
	ctx.save();
	ctx.translate(player.X,player.Y);
	ctx.rotate((player.rotation-45)*Math.PI/180);
	
	circle(0, 0, player.size);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.rotate(1);
	ctx.lineTo(player.size/2+15,player.size/2+15);
	ctx.rotate(-1);
	ctx.moveTo(0,0);
	ctx.rotate(-1);
	ctx.lineTo(player.size/2+15,player.size/2+15);
	ctx.rotate(1);
	ctx.moveTo(0,0);
	ctx.lineTo(player.size/2+15,player.size/2+15);
	ctx.stroke();
		
	ctx.restore();
};