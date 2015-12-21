function createResultsList(results_json){
	var results_list = $("<div class='results-list>'</div>");
	
	//Specify which fields you want to include in the results.
	var thumb = true, 
		title = true,
		date = false,
		desc = false;
	
	//Create .result div for each result from the query (json)
	for (var i=0; i<results_json.length; i++){
		var result = $("<div class='result'></div>")
		
		var thumb_html = "<div class='result-thumb'><a href='http://youtube.com/watch?v="+results_json[i].id+"'><img src='"+results_json[i].thumb_url+"'/></a></div>",
		title_html = "<div class='result-title' <div class='result-title'>"+results_json[i].title+"</div>" ,
		date_html = "<div class='result-date'>"+results_json[i].date+"</div>",
		desc_html = "<div class='result-description'>"+results_json[i].description+"</div>",
		button_html = "<button class='add-to-queue-btn primary-btn' data-json='"+JSON.stringify(results_json[i])+"'>Add</button>"
		 
		if(thumb){
			result.append(thumb_html);
		}
		
		if(title){
			result.append(title_html);
		}
		
		if(date){
			result.append(date_html);
		}
		
		if(desc){
			result.append(desc_html);
		}
		
		result.append(button_html);
		
		results_list.append(result);
	}
	
	return results_list;
}