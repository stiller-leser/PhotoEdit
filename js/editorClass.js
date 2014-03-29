function editorClass(){ //Named editorClass since there is a Image-Object in JS
}

//Introduce namespace for later
var cD = { //Normal canvas you are working with
	image : "",
	width : 0,
	height : 0,
	//Save the canvas in here
	canvas : "",
	context : "",
	imageData : "",
	//Pixels-Array is going to be saved here aswell as its length
	pixels : [],
	pixelsLength : 0
};

var pD = { //Preview canvas
	width: 0,
	height: 0,
	canvas : "",
	context : "",
	imageData : ""
};

var eD = {
	preview : false,
	offset : {r: 0, g: 1, b: 2, a: 3},
	history : []
};

editorClass.prototype.loadFile = function(){
	var file = $("#file").get(0).files[0];
	
	imageClass = new imageClass(this); //Let's the image know, which editor to work with
	//Necessary because imageClass is loaded before editorClass
	
	imageSrc = URL.createObjectURL(file);
	
	cD.image = new Image();
	cD.image.src = imageSrc;
	cD.image.onload = function(){ //This changes scope in here and is now the Image-Object
		cD.width = this.width; //Still can access the cD-Namespace though
		cD.height = this.height;
		cD.canvas = $('<canvas/>',{
                   id: 'canvas'                    
                }).prop({
                    width: cD.width,
                    height: cD.height
                });
	
		$('#photo-container').append(cD.canvas);
		$("#canvas").load("/ #canvas",""); //Reload canvas to reapply css
		cD.canvas = $("#canvas")[0];
		cD.context = cD.canvas.getContext("2d");
		// get the 2d context of the canvas
		cD.context.drawImage(cD.image, 0, 0);
		cD.imageData = cD.context.getImageData(0, 0, cD.width, cD.height);
		//eD.history.push(cD.imageData);
	};	
};

editorClass.prototype.getPixels = function(){
	eD.history.push(cD.imageData);
	cD.imageData = cD.context.getImageData(0, 0, cD.width, cD.height);
	var pixels = cD.imageData.data;
	
	return pixels;
};

editorClass.prototype.getPreviewPixels = function(){
	pD.imageData = pD.context.getImageData(0, 0, pD.width, pD.height);
	var pixels = pD.imageData.data;
	
	return pixels;
};

editorClass.prototype.draw = function(){
	if(eD.preview){ //If a slider is used fill preview to keep image data
		
		pD.imageData = pD.context.createImageData(pD.width, pD.height);
	
		for(var i = 0; i < pD.imageData.data.length; i += 4){ //Build imageData
    		pD.imageData.data[i + eD.offset["r"]] = pD.pixels[i + eD.offset["r"]];
    		pD.imageData.data[i + eD.offset["g"]] = pD.pixels[i + eD.offset["g"]];
    		pD.imageData.data[i + eD.offset["b"]] = pD.pixels[i + eD.offset["b"]];
    		pD.imageData.data[i + eD.offset["a"]] = pD.pixels[i + eD.offset["a"]];
		}
		
		pD.context.putImageData(pD.imageData, 0, 0);
		
	} else {
		cD.imageData = cD.context.createImageData(cD.width, cD.height);
	
		for(var i = 0; i < cD.imageData.data.length; i += 4){ //Build imageData
    		cD.imageData.data[i + eD.offset["r"]] = cD.pixels[i + eD.offset["r"]];
    		cD.imageData.data[i + eD.offset["g"]] = cD.pixels[i + eD.offset["g"]];
    		cD.imageData.data[i + eD.offset["b"]] = cD.pixels[i + eD.offset["b"]];
    		cD.imageData.data[i + eD.offset["a"]] = cD.pixels[i + eD.offset["a"]];
		}
			
		cD.context.putImageData(cD.imageData, 0, 0);
	}
};

editorClass.prototype.setupPreview = function(id, widthNew, heightNew){
	eD.preview = true;
	
	pD.width = widthNew;
	pD.height = heightNew;
	
	pD.canvas = $('<canvas/>',{
                   id: 'preview'                    
                }).prop({
                    width: pD.width,
                    height: pD.height
                });
	
   	$("#canvas").css("display","none");
    
	$('#photo-container').append(pD.canvas);
	$("#preview").load("/ #preview",""); //Reload #pDCanvas to reapply css
	
	pD.canvas = $("#preview")[0];
	pD.context = pD.canvas.getContext("2d");
	// get the 2d context of the canvas
	pD.context.drawImage($(id)[0], 0, 0, pD.width, pD.height);
	pD.imageData = pD.context.getImageData(0, 0, pD.width, pD.height);	
};

editorClass.prototype.savePreviewChanges = function(){
	editor.draw();
	$("#preview").remove();
	$("#canvas").css("display","block");
};

editorClass.prototype.undo = function(){
	if(eD.history.length > 0){
		cD.imageData = eD.history.pop();
		cD.context.putImageData(cD.imageData, 0, 0);
	}
};