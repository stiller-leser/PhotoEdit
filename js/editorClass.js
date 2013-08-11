function editorClass(){ //Named editorClass since there is a Image-Object in JS
}

//Introduce namespace for later
var cD = {
	image : "",
	width : 0,
	height : 0,
	//Save the canvas in here
	canvas : "",
	context : "",
	imageData : "",
	//Pixels-Array is going to be saved here aswell as its length
	pixels : [],
	pixelsLength : 0,
}

var pD = {
	canvas : "",
	context : "",
	imageData : ""
}

var eD = {
	preview : false,
	offset : {r: 0, g: 1, b: 2, a: 3},
	history : []
}

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
	}	
};

editorClass.prototype.getPixels = function(){
	if(!eD.preview){ //If no slider is used
		eD.history.push(cD.imageData);
	}
	cD.imageData = cD.context.getImageData(0, 0, cD.width, cD.height);
	// get the image data of the context and save them into namespace
	cD.pixels = cD.imageData.data;
	// get the pixels

	cD.pixelsLength = cD.width * cD.height * 4;
	// precompute the length of the pixel array
}

editorClass.prototype.draw = function(){
	if(eD.preview){ //If a slider is used fill preview to keep image data
		pD.context.putImageData(cD.imageData, 0, 0);
	} else {
		cD.context.putImageData(cD.imageData, 0, 0);
	}
}

editorClass.prototype.setupPreview = function(){
	eD.preview = true;
	pD.canvas = $('<canvas/>',{
                   id: 'preview'                    
                }).prop({
                    width: cD.width,
                    height: cD.height
                });
	
	$('#photo-container').append(pD.canvas);
	$("#preview").load("/ #preview",""); //Reload #pDCanvas to reapply css
	pD.canvas = $("#preview")[0];
	pD.context = pD.canvas.getContext("2d");
	// get the 2d context of the canvas
}

editorClass.prototype.removePreview = function(){
	eD.preview = false;
	cD.context.putImageData(pD.context.getImageData(0, 0, cD.width, cD.height), 0, 0)
	$("#preview").remove();
}

editorClass.prototype.undo = function(){
	if(eD.history.length > 0){
		cD.imageData = eD.history.pop();
		cD.context.putImageData(cD.imageData, 0, 0);
	}
}