function freeq_addVideo(json){
	$.ajax({
				type : "POST",
				url: "/add_video",
				data: JSON.stringify(json),
				contentType: 'application/json',
				success : function(result){
					console.log("ADDED TO QUEUE");	
				}
			});
}