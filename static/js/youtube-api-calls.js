function query_yt(searchText) {
	var results_json;
    $.ajax({
		async: false,
        type: "GET",
        url: "/search_yt/" + searchText,
        success: function(result){
            //Fetch results from youtube and parse them into json
            results_json = JSON.parse(result);
        }
    });
	return results_json;
}