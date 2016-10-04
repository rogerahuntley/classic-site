var run = function(){

};
function init(){
	RenderMap();
	RenderSelect();
	OutputTilemap();
	
	canvas.addEventListener("mousedown", Click, false);
	cselect.addEventListener("mousedown", Clicks, false);
};



var go = setInterval(run, 1000/30);
//sets the run function on a timer