function imageClass(editor){

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };
}
	
}

imageClass.prototype.checkPixel = function(current){
	if (current > 255){
		current = 255;
	} else if (current < 0){
		current = 0;
	}
	return current;
};

/*
 * Color
 */

imageClass.prototype.brightness = function(pixels, brightness){
	for (index = 0; index < pixels.length; index += 4) {
		var r = pixels[index + eD.offset["r"]];
		var g = pixels[index + eD.offset["g"]];
		var b = pixels[index + eD.offset["b"]];
		
		var ycs = 0.299*r + 0.587*g + 0.144*b;
		var cb = -0.168736*r - 0.331264*g + 0.5*b;
		var cr = 0.5*r - 0.418688*g - 0.081312*b;
		
		ycs = ycs + brightness;
		
		pixels[index + eD.offset["r"]] = ycs + 1.402*cr;
		pixels[index + eD.offset["g"]] = ycs - 0.3441*cb - 0.7141*cr;
		pixels[index + eD.offset["b"]] = ycs + 1.722*cb;
	}
	return pixels;
};

imageClass.prototype.contrast = function(pixels, contrast){
	for (index = 0; index < pixels.length; index += 4) {
		var r = pixels[index + eD.offset["r"]];
		var g = pixels[index + eD.offset["g"]];
		var b = pixels[index + eD.offset["b"]];
		
		var ycs = 0.299*r + 0.587*g + 0.144*b;
		var cb = -0.168736*r - 0.331264*g + 0.5*b;
		var cr = 0.5*r - 0.418688*g - 0.081312*b;
		
		ycs = contrast*(ycs-128)+128;
		
		pixels[index + eD.offset["r"]] = ycs + 1.402*cr;
		pixels[index + eD.offset["g"]] = ycs - 0.3441*cb - 0.7141*cr;
		pixels[index + eD.offset["b"]] = ycs + 1.722*cb;
	}
	return pixels;	
};

imageClass.prototype.saturation = function(pixels, saturation){
	for (index = 0; index < pixels.length; index += 4) {
		var r = pixels[index + eD.offset["r"]];
		var g = pixels[index + eD.offset["g"]];
		var b = pixels[index + eD.offset["b"]];
		
		var ycs = 0.299*r + 0.587*g + 0.144*b;
		var cb = -0.168736*r - 0.331264*g + 0.5*b;
		var cr = 0.5*r - 0.418688*g - 0.081312*b;
		
		cb = saturation * cb;
		cr = saturation * cr;
		
		pixels[index + eD.offset["r"]] = ycs + 1.402*cr;
		pixels[index + eD.offset["g"]] = ycs - 0.3441*cb - 0.7141*cr;
		pixels[index + eD.offset["b"]] = ycs + 1.722*cb;
	}
	return pixels;	
};

imageClass.prototype.hue = function(pixels, hue){
	
	var angleRadians = hue.toRad();
	var coshue = Math.cos(angleRadians);
	var sinhue = Math.sin(angleRadians);
	
	for (index = 0; index < pixels.length; index += 4) {
		var r = pixels[index + eD.offset["r"]];
		var g = pixels[index + eD.offset["g"]];
		var b = pixels[index + eD.offset["b"]];
						
		var ycs = 0.299*r + 0.587*g + 0.144*b;
		var cb = -0.168736*r - 0.331264*g + 0.5*b;
		var cr = 0.5*r - 0.418688*g - 0.081312*b;
		
		var oldcr = cr;
		
		cr = coshue*cr - sinhue*cb;
		cb = sinhue*oldcr + coshue*cb;
		
		pixels[index + eD.offset["r"]] = ycs + 1.402*cr;
		pixels[index + eD.offset["g"]] = ycs - 0.3441*cb - 0.7141*cr;
		pixels[index + eD.offset["b"]] = ycs + 1.722*cb;
	}
	return pixels;	
};

imageClass.prototype.grey = function(pixels, shades){
	for (index = 0; index < pixels.length; index += 4) {
		var r = pixels[index + eD.offset["r"]];
		var g = pixels[index + eD.offset["g"]];
		var b = pixels[index + eD.offset["b"]];
												
		var luminance = (r + 2*g + b) / 4; //Calculate luminance by taking average of r,g,b-values
						
		var h = 255 / (shades - 1);
		var a = 255 / shades;
							
		var shadesOfGrey = Math.floor(Math.floor(luminance/a)*h);		
		
		if(shadesOfGrey < 25){
			shadesOfGrey = 0; //To keep real black	
		} 
		if(shadesOfGrey > 230){
			shadesOfGrey = 255; //To keep real white	
		} 
				
		pixels[index + eD.offset["r"]] = shadesOfGrey;
		pixels[index + eD.offset["g"]] = shadesOfGrey;
		pixels[index + eD.offset["b"]] = shadesOfGrey;
	}
	return pixels;	
};

/*
 * Filter
 */


//Build the array for the custom filter
imageClass.prototype.buildFilterArray = function(){
	var inputs = $("#cus-filter-form input[type='text']");
	var filter = [];
	var i = 0;
	jQuery.each(inputs, function(){
		var val = $(this).val().replace(/[^-()\d/*+.]/g, '');
		if(val === ""){
			filter[i] = 0;
		} else if (val.indexOf("/") != -1){
			filter[i] = eval(val);
		} else{
			filter[i] = Number(val);
		}
		i += 1;
	}); 
	return filter;
};

imageClass.prototype.channel = function(pixels, color1, color2) {
	for ( index = 0; index < pixels.length; index += 4) {
			pixels[index + eD.offset[color1]] = 0;
			pixels[index + eD.offset[color2]] = 0;
	}
	return pixels;
};

imageClass.prototype.negative = function(pixels){
	for (index = 0; index < pixels.length; index += 4) {
		var r = pixels[index + eD.offset["r"]];
		var g = pixels[index + eD.offset["g"]];
		var b = pixels[index + eD.offset["b"]];
		
		pixels[index + eD.offset["r"]] = 255 - r;
		pixels[index + eD.offset["g"]] = 255 - g;
		pixels[index + eD.offset["b"]] = 255 - b;		
	}
	return pixels;
};

imageClass.prototype.blur = function(pixels, value){
	var filter = [];
	
	for(var i=0; i<value; i += 1){
		filter[i] = 1 / value;
	}
	
	return this.calculateFilter(pixels, filter);
	
};

//Code is taken from http://www.html5rocks.com/en/tutorials/canvas/imagefilters/ and edited
imageClass.prototype.calculateFilter = function(pixels, filter, opaque){

	console.log(filter);

	var side = Math.round(Math.sqrt(filter.length));
	var halfSide = Math.floor(side/2);
	var src = pixels;
	var sw = cD.width;
	var sh = cD.height;
	// pad output by the convolution matrix
	var w = sw;
	var h = sh;
	var dst = [];
	// go through the destination image pixels
	var alphaFac = opaque ? 1 : 0;
	for (var y=0; y<h; y++) {
		for (var x=0; x<w; x++) {
			var sy = y;
			var sx = x;
			var dstOff = (y*w+x)*4;
			// calculate the weighed sum of the source image pixels that
			// fall under the convolution matrix
			var r=0, g=0, b=0, a=0;
			for (var cy=0; cy<side; cy++) {
				for (var cx=0; cx<side; cx++) {
					var scy = sy + cy - halfSide;
					var scx = sx + cx - halfSide;
					if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
						var srcOff = (scy*sw+scx)*4;
						var wt = filter[cy*side+cx];
						//console.log(wt);
						r += src[srcOff + eD.offset["r"]] * wt;
						//console.log("r: " + r);
						g += src[srcOff + eD.offset["g"]] * wt;
						b += src[srcOff + eD.offset["b"]] * wt;
						a += src[srcOff + eD.offset["a"]] * wt;
					}
				}
			}
			dst[dstOff + eD.offset["r"]] = this.checkPixel(r);
			dst[dstOff + eD.offset["g"]] = this.checkPixel(g);
			dst[dstOff + eD.offset["b"]] = this.checkPixel(b);
			dst[dstOff + eD.offset["a"]] = this.checkPixel(a) + alphaFac*(255-a);
		}
	}
	return dst;
};

imageClass.prototype.resize = function(id,widthNew, heightNew){
	var canvas = $(id)[0];
	
	cD.width = widthNew;
	cD.height = heightNew;
	
	$(canvas).remove();
	
	cD.canvas = $('<canvas/>',{
                   id: 'canvas'                    
                }).prop({
                    width: widthNew,
                    height: heightNew
                });
	    
	$('#photo-container').append(cD.canvas);
	$("#preview").load("/ #canvas",""); //Reload #pDCanvas to reapply css
	
	cD.canvas = $("#canvas")[0];
	cD.context = cD.canvas.getContext("2d");
	// get the 2d context of the canvas
	cD.context.drawImage(canvas, 0, 0, widthNew, heightNew);
	cD.imageData = cD.context.getImageData(0, 0, widthNew, heightNew);	
};

