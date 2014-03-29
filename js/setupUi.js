function setupUi(editor){
	// prepare UI
	$("#preview").css("display","none");
	$("#startup").css("display","none");
	$("#photo-container").css("display","block");
	$("#editor-container").css("display","block");
	
	uivalue = 0;
	
	//Animate and configure controls
	$("#control-container button").button().click(function(event){
		event.preventDefault();
		var currentButton = $(this).val();
		if(currentButton === "undo"){
			editor.undo();
		}
	});
	
	//Animate and configure menu
	$("#methods").accordion({
		collapsible: true,
		heightStyle: "content"
	});
	
	//Animate and configure brightness
	$("#brightness-slider").slider({
		range: "max",
		min: -128,
		max: 128,
		value: 0,
		start: function(event, ui){
			editor.setupPreview("#canvas",200,200);
			eD.history.push(cD.imageData);
			copy = new Uint8ClampedArray(pD.imageData.data);
		},
		slide: function(event, ui){
			$("#brightness").val(ui.value);
			pD.pixels = imageClass.brightness(pD.imageData.data, ui.value);
			editor.draw();
			pD.imageData.data.set(copy);
		},
		stop: function(event, ui){
			eD.preview = false;
			cD.pixels = imageClass.brightness(editor.getPixels(), ui.value);
			editor.savePreviewChanges();			
			$("#brightness-slider").slider("value","0");
			$("#brightness").val($("#brightness-slider").slider("value"));
		}
	});
	
	//Animate and configure contrast
	$("#contrast-slider").slider({
		range: "max",
		min: 0,
		max: 100,
		value: 10,
		start: function(event, ui){
			editor.setupPreview("#canvas",200,200);
			eD.history.push(cD.imageData);
			copy = new Uint8ClampedArray(pD.imageData.data);
		},
		slide: function(event, ui){
			$("#contrast").val(ui.value/10);
			pD.pixels = imageClass.contrast(pD.imageData.data, ui.value/10);
			editor.draw();
			pD.imageData.data.set(copy);
		},
		stop: function(event, ui){
			eD.preview = false;
			cD.pixels = imageClass.contrast(editor.getPixels(), ui.value/10);
			editor.savePreviewChanges();			
			$("#contrast-slider").slider("value","10");
			$("#contrast").val($("#contrast-slider").slider("value"));
		}
	});	
	
	//Animate and configure saturation
	$("#saturation-slider").slider({
		range: "max",
		min: 0,
		max: 50,
		value: 10,
		start: function(event, ui){
			editor.setupPreview("#canvas",200,200);
			eD.history.push(cD.imageData);
			copy = new Uint8ClampedArray(pD.imageData.data);
		},
		slide: function(event, ui){
			$("#saturation").val(ui.value/10);
			pD.pixels = imageClass.saturation(pD.imageData.data, ui.value/10);
			editor.draw();
			pD.imageData.data.set(copy);
		},
		stop: function(event, ui){
			eD.preview = false;
			cD.pixels = imageClass.saturation(editor.getPixels(), ui.value/10);
			editor.savePreviewChanges();			
			$("#saturation-slider").slider("value","10");
			$("#saturation").val($("#saturation-slider").slider("value"));
		}
	});	
	
	//Animate and configure hue
	$("#hue-slider").slider({
		range: "max",
		min: 0,
		max: 360,
		value: 0,
		start: function(event, ui){
			editor.setupPreview("#canvas",200,200);
			eD.history.push(cD.imageData);
			copy = new Uint8ClampedArray(pD.imageData.data);
		},
		slide: function(event, ui){
			$("#hue").val(ui.value);
			pD.pixels = imageClass.hue(pD.imageData.data, ui.value);
			editor.draw();
			pD.imageData.data.set(copy);
		},
		stop: function(event, ui){
			eD.preview = false;
			cD.pixels = imageClass.hue(editor.getPixels(), ui.value);
			editor.savePreviewChanges();			
			$("#hue-slider").slider("value","0");
			$("#hue").val($("#hue-slider").slider("value"));
		}
	});	

	//Animate and configure shades of grey
	$("#grey-slider").slider({
		range: "max",
		min: 2,
		max: 255,
		value: 2,
		start: function(event, ui){
			editor.setupPreview("#canvas",200,200);
			eD.history.push(cD.imageData);
			copy = new Uint8ClampedArray(pD.imageData.data);
		},
		slide: function(event, ui){
			$("#grey").val(ui.value);
			pD.pixels = imageClass.grey(pD.imageData.data, ui.value);
			editor.draw();
			pD.imageData.data.set(copy);
		},
		stop: function(event, ui){
			eD.preview = false;
			cD.pixels = imageClass.grey(editor.getPixels(), ui.value);
			editor.savePreviewChanges();			
			$("#grey-slider").slider("value","2");
			$("#grey").val($("#grey-slider").slider("value"));
		}
	});	
	
	$("#grey-form button").button().click(function(event){
	event.preventDefault();
		cD.pixels =  imageClass.grey(editor.getPixels(), 5);
		editor.draw();
	});
	
	//Animate and configure predefined filters
	$("#pre-filter-container button").button().click(function(event){
		event.preventDefault();
		var currentButton = $(this).val(); //Gets content of value=""
		if(currentButton === "red"){
			cD.pixels = imageClass.channel(editor.getPixels(), "g", "b");
			editor.draw();
		}
		if(currentButton === "green"){
			cD.pixels = imageClass.channel(editor.getPixels(), "b", "r");
			editor.draw();
		}
		if(currentButton === "blue"){
			cD.pixels = imageClass.channel(editor.getPixels(), "r", "g");
			editor.draw();
		}
		if(currentButton === "negativ"){
			cD.pixels = imageClass.negative(editor.getPixels());
			editor.draw();
		}
	});
	
	$("#blur-slider").slider({
		range: "max",
		min: 1,
		max: 100,
		value: 10,
		start: function(event, ui){
			editor.setupPreview("#canvas",200,200);
			eD.history.push(cD.imageData);
			copy = new Uint8ClampedArray(pD.imageData.data);
		},
		slide: function(event, ui){
			$("#blur").val(ui.value);
			pD.pixels = imageClass.blur(pD.imageData.data, ui.value);
			editor.draw();
			pD.imageData.data.set(copy);
		},
		stop: function(event, ui){
			eD.preview = false;
			cD.pixels = imageClass.blur(editor.getPixels(), ui.value);
			editor.savePreviewChanges();			
			$("#blur-slider").slider("value","10");
			$("#blur").val($("#blur-slider").slider("value"));
		}
	});	
	
	//Configure and animate filters
	$("#cus-filter-form").bind("submit", function(event){
		event.preventDefault();
		cD.pixels = (imageClass.calculateFilter(editor.getPixels(), imageClass.buildFilterArray(), 0));
		editor.draw();
	});
	
	//Configure the resize-form
	$("#resize-form").bind("submit", function(event){
		event.preventDefault();
		var width = $("#width").val();
		var height = $("#height").val();
		
		imageClass.resize("canvas", width, height);
	});

}