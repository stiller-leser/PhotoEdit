function setupUi(editor){
	// prepare UI
	$("#preview").css("display","none");
	$("#startup").css("display","none");
	$("#photo-container").css("display","block");
	$("#editor-container").css("display","block");
	
	//Animate and configure menu
	$("#methods").accordion({
		collapsible: true,
		heightStyle: "content"
	});
	
	//Animate and configure saturation
	$("#brightness-slider").slider({
		range: "max",
		min: -128,
		max: 128,
		value: 0,
		start: function(event, ui){
			editor.setupPreview();
			eD.history.push(cD.imageData);
		},
		slide: function(event, ui){
			$("#brightness").val(ui.value);
			imageClass.brightness(ui.value);
		},
		stop: function(event, ui){
			editor.removePreview();
			$("#brightness-slider").slider("value","0");
			$("#brightness").val($("#brightness-slider").slider("value"));
		}
	});
	
	//Animate and configure predefined filters
	$("#pre-filter-container button").button().click(function(event){
		event.preventDefault();
		var currentButton = $(this).val(); //Gets content of value=""
		if(currentButton === "red"){
			imageClass.red();
		}
		if(currentButton === "green"){
			imageClass.green();
		}
		if(currentButton === "blue"){
			imageClass.blue();
		}
		if(currentButton === "negativ"){
			imageClass.negative();
		}
	});
	
	//Animate and configure controls
	$("#control-container button").button().click(function(event){
		event.preventDefault();
		var currentButton = $(this).val();
		if(currentButton === "undo"){
			editor.undo();
		}
	});
}