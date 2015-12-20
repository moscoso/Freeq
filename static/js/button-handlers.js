$("document").ready(function(){
    $("#create-room-btn").on("click", function(){
        window.location.href = "/create";    
    });
    
    $("#create-btn").on("click", function(){
        console.log('testing');
        /*var name = $("#room-name").value;
        var description = $("#room-description").value;
        //Use these to create the room in the data base and return a room ID.
        console.log(name);
        console.log(description);
        $.ajax({
            type : "GET",
            url : "/save_room/" + String(name) + '/' + String(description),
            success: function(result) {
                window.location.href = "/room/" + result;
            }
        });*/
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