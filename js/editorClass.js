function editorClass(){ //Named editorClass since there is a Image-Object in JS
}

//Introduce namespace for later
var iD = {
	//The original image source, can be used to restore original
	origImageSrc : "",
	//Everything concerning the new image, whatever that may be
	image : "",
	imageSrc : "",
	width : 0,
	height : 0,
	//Save the canvas in here
	canvas : "",
	context : "",
	content : "",
	//Pixels-Array is going to be saved here aswell as its length
	pixels : [],
	pixelsLength : 0,
	
};

var eD = {
	start : false,
	undo : false,
	offset : {r: 0, g: 1, b: 2, a: 3}	
}

var history = [];

editorClass.prototype.loadFile = function(){
	var file = $("#file").get(0).files[0];
	
	imageClass = new imageClass(this); //Let's the image know, which editor to work with
	//Necessary because imageClass is loaded before editorClass
	
	iD.imageSrc = URL.createObjectURL(file);
	
	//Save the original image src
	iD.origImageSrc = URL.createObjectURL(file);
	
	this.draw();
	eD.start = true;
};

editorClass.prototype.createCanvas = function(){
	var image = $("#image").get(0);
	// get image element from document tree
	iD.canvas = document.createElement("canvas");
	// create new canvas element

	iD.width = image.width; //Better to get these values again in case they changed somehow
	iD.height = image.height;

	iD.canvas.width = iD.width;
	// set canvas dimensions to image dimensions
	iD.canvas.height = iD.height;
	
	iD.context = iD.canvas.getContext("2d");
	// get the 2d context of the canvas
	iD.context.drawImage(image, 0, 0);
	// draw the image to the context, but not visible for the user
	iD.content = iD.context.getImageData(0, 0, iD.width, iD.height);
	// get the image data of the context and save them into namespace
}

editorClass.prototype.getPixels = function(){
	iD.pixels = iD.content.data;
	// get the pixels

	iD.pixelsLength = iD.width * iD.height * 4;
	// precompute the length of the pixel array
}

editorClass.prototype.draw = function(){
	if(eD.start){ //If it's not the first time draw is called
		iD.context.putImageData(iD.content, 0, 0);
		// set the new pixels to the context (canvas)
		iD.imageSrc = iD.canvas.toDataURL();
		//Store current canvas in history for possible undo
	}
	
	iD.image = new Image();
	iD.image.src = iD.imageSrc;
	iD.image.onload = function(){ //This changes scope in here and is now the Image-Object
		iD.width = this.width; //Still can access the iD-Namespace though
		iD.height = this.height;
		iD.image.id = "image"; //Set DOM-id of image
	
		history.push($("#image"));
		
		$("#image").replaceWith(iD.image); //Replace old image with new one
		$("#image").load("/ #image",""); //Reload #image to reapply css
	}
}

editorClass.prototype.undo = function(){
		$("#image").replaceWith(history.pop()); //Replace old image with new one
		$("#image").load("/ #image",""); //Reload #image to reapply css
}