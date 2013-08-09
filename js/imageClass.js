function imageClass(editor){
	
}

function channel(color1, color2) {
	return (function() {
		editor.getPixels();
		for ( index = 0; index < cD.pixelsLength; index += 4) {
			cD.pixels[index + eD.offset[color1]] = 0;
			cD.pixels[index + eD.offset[color2]] = 0;
		}
		editor.draw();
	});
}

imageClass.prototype.red = channel("g", "b");
imageClass.prototype.green = channel("b", "r");
imageClass.prototype.blue = channel("r", "g");

imageClass.prototype.negative = function(){
	editor.getPixels();
	for (index = 0; index < cD.pixelsLength; index += 4) {
		var r = cD.pixels[index + eD.offset["r"]];
		var g = cD.pixels[index + eD.offset["g"]];
		var b = cD.pixels[index + eD.offset["b"]];
		
		cD.pixels[index + eD.offset["r"]] = 255 - r;
		cD.pixels[index + eD.offset["g"]] = 255 - g;
		cD.pixels[index + eD.offset["b"]] = 255 - b;		
	}
	editor.draw();
}

imageClass.prototype.brightness = function(brightness){
	editor.getPixels();
	for (index = 0; index < cD.pixelsLength; index += 4) {
		var r = cD.pixels[index + eD.offset["r"]];
		var g = cD.pixels[index + eD.offset["g"]];
		var b = cD.pixels[index + eD.offset["b"]];
		
		var ycs = 0.299*r + 0.587*g + 0.144*b;
		var cb = -0.168736*r - 0.331264*g + 0.5*b;
		var cr = 0.5*r - 0.418688*g - 0.081312*b;
		
		ycs = ycs + brightness;
		
		cD.pixels[index + eD.offset["r"]] = ycs + 1.402*cr;
		cD.pixels[index + eD.offset["g"]] = ycs - 0.3441*cb - 0.7141*cr;
		cD.pixels[index + eD.offset["b"]] = ycs + 1.722*cb;
	}
	editor.draw();
}
