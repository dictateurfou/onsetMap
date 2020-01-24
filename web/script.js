var step = {
	x:64.3,
	y:64.28
}

var assets = {}
var miniMapOpen = true
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var player = {position:{x:126703.0,y:78276.5703125},rotation:0}
var mapScale = 1;
var lastRender = 0
var onDrag = false;
var lastCursorPosition;
var canvasScreenPosition = {x:0,y:0};
var playerMarker = null;

/*load assets*/
var mapImg = new Image();
var dynamicBlips = {}
var assetsCount = 0;
mapImg.addEventListener('load', function() {
	loadAssets();
});
mapImg.src = 'OnsetMapLayout_latest.png';

function loadAssets(){
	for(let [k,v] of Object.entries(types)){
		let img = new Image();
		img.addEventListener('load', function(){
			let baseWidth = this.width;
			this.width = 40;
			this.height = this.width * baseWidth / this.height;
			assets[k] = this;
			assetsCount++;
			if(assetsCount == Object.keys(types).length){
				loadFinish();
			}
		});
		img.src = 'img/' + v.img;
	}
}

function loadFinish(){
	console.log("load finish")
	canvas.width = minimapWidth;
	canvas.height = minimapHeight;
	canvas.classList.add(miniMapClass);
	mapScale = baseScale;
	canvas.style.display = "block";
	window.requestAnimationFrame(loop)
}
/**************************************/

/* infinite loop */
function loop(timestamp) {
	lastRender = timestamp
	drawMap();
	window.requestAnimationFrame(loop)
}
/********************************/

/* all Function for draw */
function drawMap(){
	/*for rotation*/
	let rotationAngle = Math.PI / 180 * (player.rotation);
	let convertedPos = {x:(player.position.x/step.x) * mapScale,y:(player.position.y/step.y) * mapScale};
	let originalPointAngle = Math.atan2(convertedPos.y, convertedPos.x);
	let rotatedTopLeftAngle = originalPointAngle + rotationAngle;
	let radius = Math.sqrt(convertedPos.x*convertedPos.x+convertedPos.y*convertedPos.y);
	let rx = radius*Math.cos(rotatedTopLeftAngle);
	let ry = radius*Math.sin(rotatedTopLeftAngle);
	/*clear canvas*/
	ctx.beginPath();
	ctx.clearRect(-10000, -20000, canvas.width*100, canvas.height*100)

	if(miniMapOpen){
		ctx.setTransform(1,0,0,1,(canvas.width/2 - rx),(canvas.height/playerScreenDividende - ry));
		ctx.rotate(rotationAngle)
		ctx.scale(mapScale, mapScale);
	}
	else{
		ctx.setTransform(1,0,0,1,canvas.width/2 - (canvasScreenPosition.x*mapScale),canvas.height/2 - (canvasScreenPosition.y * mapScale));
		ctx.scale(mapScale, mapScale);
	}
	
	ctx.drawImage(mapImg,-mapImg.width / 2, -mapImg.height / 2);
	drawAllBlips();
	drawCirclePlayer(player.position.x,player.position.y);
	
}

function drawCirclePlayer(x,y){
	ctx.beginPath();
	ctx.arc((x/step.x), (y/step.y), 5, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fillStyle = 'red';
	ctx.fill();
}

function drawAllBlips(){
	let rotationAngle = Math.PI / 180 * (-player.rotation);
	let reverseScale = 1
	let savedTransform = ctx.getTransform();
	if(mapScale < 0.8){
		reverseScale = getReverseScale(0.7);
	}
	//config blips
	blips.forEach(blip => {
		let newWidth = (assets[blip.type].width * reverseScale);
		ctx.beginPath()
		if(miniMapOpen){
			ctx.translate((blip.pos.x / step.x),(blip.pos.y / step.y))
			ctx.rotate(rotationAngle)
			ctx.drawImage(assets[blip.type], 0 - (newWidth) / 2, 0 - (assets[blip.type].height / 2) * reverseScale, newWidth, assets[blip.type].height * reverseScale);
			ctx.setTransform(savedTransform)
		}
		else{
			ctx.drawImage(assets[blip.type],(blip.pos.x / step.x) - (newWidth) / 2,(blip.pos.y / step.y) - (assets[blip.type].height / 2) * reverseScale, newWidth, assets[blip.type].height * reverseScale);
		}
	});

	//dynamic blip
	for(let [k,v] of Object.entries(dynamicBlips)){
		let asset = assets[v.type]
		let newWidth = (asset.width * reverseScale);
		ctx.beginPath()
		if(miniMapOpen){
			ctx.translate((v.pos.x / step.x),(v.pos.y / step.y))
			ctx.rotate(rotationAngle)
			ctx.drawImage(asset,0 - newWidth / 2 ,0 - (asset.height * reverseScale) / 2, asset.width * reverseScale, asset.height * reverseScale);
			ctx.setTransform(savedTransform)
		}
		else{
			ctx.drawImage(asset,(v.pos.x / step.x) - (newWidth / 2) , (v.pos.y / step.y) - ((asset.height * reverseScale) / 2), asset.width * reverseScale, asset.height * reverseScale);
		}
	}

	//draw playerMarker (draw in bottom for more precision)
	if (playerMarker != null){
		let asset = assets["playerMarker"]
		let newWidth = (asset.width * reverseScale);
		ctx.beginPath()
		if(miniMapOpen){
			ctx.translate((playerMarker.pos.x / step.x),(playerMarker.pos.y / step.y))
			ctx.rotate(rotationAngle)
			ctx.drawImage(asset, 0 - newWidth / 2, 0 - (asset.height * reverseScale), asset.width * reverseScale, asset.height * reverseScale);
			ctx.setTransform(savedTransform)
		}
		else{
			ctx.drawImage(asset,(playerMarker.pos.x / step.x) - (newWidth / 2) , (playerMarker.pos.y / step.y) - (asset.height * reverseScale), asset.width * reverseScale, asset.height * reverseScale);
		}
	}
}

function dot(x,y,radius,fill){
  ctx.beginPath();
  ctx.arc(x,y,radius,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fillStyle=fill;
  ctx.fill();
}

/*OTHER*/
function changePlayerPosition(x,y,rotation){
	player.rotation = -rotation;
	player.position.x = x;
	player.position.y = y;
}

function ShowFullScreenMap(){
	miniMapOpen = false;
	canvasScreenPosition.x = player.position.x / step.x;
	canvasScreenPosition.y = player.position.y / step.y;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.classList.remove(miniMapClass);
}

function returnToMiniMap(){
	miniMapOpen = true;
	mapScale = baseScale;
	canvas.width = minimapWidth;
	canvas.height = minimapHeight;
	canvas.classList.add(miniMapClass);
}

function getReverseScale(mult){
	return ((1 - mapScale) * 10) * mult;
}

/*function for get cursor position in canvas*/
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return {x:x,y:y}
}


/*function for call in lua*/
function createBlip(uniqueIdentifier,type,pos){
	if(assets[type] != undefined){
		dynamicBlips[uniqueIdentifier] = {
			type:type,
			pos:pos
		}
	}
}

function removeBlip(identifier){
	if(dynamicBlips[identifier] != undefined){
		delete dynamicBlips[identifier];
	}
}

/*Event*/
window.addEventListener("wheel", function(event) {
	if(!miniMapOpen){
		let delta = Math.sign(event.deltaY);
		let newScale = mapScale - (delta/20);
		if(delta == 1 && mapScale >= 0.1){
			mapScale = newScale
		}
		else if(delta == -1){
			mapScale = newScale
		}
	}
});

canvas.addEventListener('mousedown', function(e) {
	if (e.button == 0){//left click
		lastCursorPosition = getCursorPosition(canvas,e);
		onDrag = true
	}
	else if(e.button == 2){//create or remove player marker
		let reverseScale = 1
		if(mapScale < 0.8){
			reverseScale = getReverseScale(0.7);
		}
		let transform = ctx.getTransform();
		let pos = getCursorPosition(canvas, e)
		let x = ((pos.x - transform.e) * step.x) / mapScale;
		let y = ((pos.y - transform.f) * step.y) / mapScale;
		if(playerMarker != null){
			playerMarker = null;
		}
		else{
			playerMarker = {type:"playerMarker",pos:{x:x, y:y}};
		}
	}
})

//remove right click (for nav)
document.addEventListener('contextmenu', event => event.preventDefault()); 

canvas.addEventListener('mouseup', function(e) {
	if (e.button == 0){
		onDrag = false
	}
})

canvas.onmousemove = event => {
	if(onDrag && !miniMapOpen){
		let newPosition = getCursorPosition(canvas,event);
		let speed = 1
		if(mapScale < 0.8){
			speed = ((1 - mapScale) * 10) / 2;
		}
		canvasScreenPosition.x = canvasScreenPosition.x + ((lastCursorPosition.x - newPosition.x) * speed)
		canvasScreenPosition.y = canvasScreenPosition.y + ((lastCursorPosition.y - newPosition.y) * speed)
		lastCursorPosition = getCursorPosition(canvas,event);
	}
}

function switchMap(){
	if(miniMapOpen){
		if(typeof(ue) != 'undefined'){
			ue.game.callevent("onsetMap:focus",[]);
		}
		ShowFullScreenMap()
	}
	else{
		returnToMiniMap()
		if(typeof ue != 'undefined'){
			ue.game.callevent("onsetMap:unfocus",[]);
		}
	}
}

if (typeof(ue) === 'undefined'){
	window.onkeydown = function(e){
		if(e.key == "m"){
			switchMap()
		}
	};
}


