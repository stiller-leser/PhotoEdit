function setupUi(editor){
	// prepare UI
	$("#startup").css("display","none");
	$("#photo-container").css("display","block");
	$("#editor-container").css("display","block");
	
	//Animate and configure menu
	$("#methods").accordion({
		collapsible: true,
		heightStyle: "content"
	});
	
	//Animate and configure saturation
	$("#saturation-slider").slider({
		range: "max",
		min: 0,
		max: 100,
		value: 0,
		slide: function(event, ui){
			$("#saturation").val(ui.value + "%");
			saturation(ui.value);
		}
	});
	
	$("#saturation").val($("#saturation-slider").slider("value") + "%");
	
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