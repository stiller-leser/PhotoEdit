$(document).ready(function(){
	if(window.File && window.FileList && window.FileReader){
		$("#fileUpload").bind("submit", function(event){
			
			event.preventDefault();			
			
			editor = new editorClass();
			editor.loadFile();						
						
			setupUi(editor);		
				
		});		
	} else {
		alert("Sorry, you're browser isn't supported yet. It might be too old");
	}		
});