/* Dependencies
	youtube-api-calls.js
	html-factory.js
*/


$("document").ready(function(){
	$("#create-room-btn").on("click", function(){
		window.location.href = "/create";    
	});

	$("#join-room-btn").on("click", function(){
        var room_id = $("#room-id").val();

        //Use these to create the room in the data base and return a room ID.
        window.location.href = '/room/' + encodeURI(room_id)
    })

	$("#create-btn").on("click", function(){
		var name = $("#room-name").val();
		var description = $("#room-description").val();

		//Use these to create the room in the data base and return a room ID.
		$.ajax({
			type : "GET",
			url : "/save_room/" + encodeURI(name) + '/' + encodeURI(description),
			success: function(result) {
				window.location.href = "/room/" + result;
			}
		});
	})

	$(".search-music-btn").on("click", function(){
		window.location.href = "/search";
	});

	$(".search-btn").on("click", function(){
		var searchText = $("#search").val();
		console.log("Search button pressed");
		//Execute youtube search
		var results_json = query_yt(searchText);
		//Generate html from youtube search fields
		$(".results-list").append(createResultsList(results_json))

		$(".add-to-queue-btn").on("click", function(){
			console.log("fire");
			console.log($(this));
			console.log($(this).attr("data-json"));
			
			var j = JSON.parse($(this).attr("data-json"));
			j["room_id"] = "E14fHo";
			
			
			$.ajax({
				type : "POST",
				url: "/add_video",
				data: JSON.stringify(j),
				contentType: 'application/json',
				success : function(result){
					console.log("ADDED TO QUEUE");	
				}
			});


		});


	});
});