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
                window.location.href = "/room/" + encodeURI(result);
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
        $.ajax({
            type: "GET",
            url: "/search_yt/" + searchText,
            success: function(result){
                //Clear results list
                $(".results-list").html("");
                //Fetch results from youtube
                var results = JSON.parse(result);
                for (var i=0; i<results.length; i++){
                    $(".results-list").append("<div class='result-thumb'><img src='"+results[i].url+"'/></div><div class='result' <div class='result-title'>"+results[i].title+"</div>"+
                                             "<!--<div class='result-date'>"+results[i].date+"</div>"+
                                             "<div class='result-description'>"+results[i].description+"</div>--></div>");    
                }
            }
        });
    });
});