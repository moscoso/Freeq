$("document").ready(function(){
    $("#create-room-btn").on("click", function(){
        window.location.href = "/create";    
    });
    
    $("#create-btn").on("click", function(){
        var name = $("room-name").val();
        var description = $("room-description").val();
        //Use these to create the room in the data base and return a room ID.
        window.location.href = "/room";
    })
    
    $(".search-music-btn").on("click", function(){
        window.location.href = "/search";
    });
});