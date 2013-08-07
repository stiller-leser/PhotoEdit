function imageClass(editor){
	
}

function channel(omit1, omit2) {
	return (function() {
		editor.createCanvas();
		editor.getPixels();
		for ( index = 0; index < iD.pixelsLength; index += 4) {
			iD.pixels[index + eD.offset[omit1]] = 0;
			iD.pixels[index + eD.offset[omit2]] = 0;
		}
		editor.draw();
	});
}

imageClass.prototype.red = channel("g", "b");
imageClass.prototype.green = channel("b", "r");
imageClass.prototype.blue = channel("r", "g");

imageClass.prototype.negative = function(){
	edtior.createCanvas();
	editor.getPixels();
	for (index = 0; index < iD.pixelsLength; index += 4) {
		var r = iD.pixels[index + eD.offset["r"]];
		var g = iD.pixels[index + eD.offset["g"]];
		var b = iD.pixels[index + eD.offset["b"]];
		
		iD.pixels[index + eD.offset["r"]] = 255 - r;
		iD.pixels[index + eD.offset["g"]] = 255 - g;
		iD.pixels[index + eD.offset["b"]] = 255 - b;		
	}
	editor.draw();
}
