//Global player variables 
var cur_player;
var next_player;

//Global variable that keeps track of whether a song is playing or not
var playing = false;

//Global variable that keeps track of which div we are using as the next player
toRemove = 'player1';

// Resets the toRemove variable to the correct player
function setRemove(){
  if (toRemove == 'player2'){
    toRemove = 'player1';
  } else {
    toRemove = 'player2';
  }
}

//Instantiates a Youtube Player object with a specified song id
function makePlayer(song_id){
  var video = $('<video />', {
    src: 'http://youtube.com/watch?v='+song_id,
    controls: true
  });
  $('#'+toRemove).append(video);
  setRemove();
  return video[0];
}

$(document).ready(function(){
  startQueue();

});


//Instantiates current and next song players
function startQueue() {
  cur_player = makePlayer('M7lc1UVf-VE');
  // videoEnd(cur_player)
  // next_song = getNextSong()
  next_player = makePlayer('T_U6_u_yyro');
  // videoEnd(next_player)

  //Instantiates play button to start/stop current video
  $('#play-btn').on("click",function(){
    if (!playing){
      console.log("testing");
      cur_player.play();
      playing = true;
    } else {
      cur_player.pause();
      playing = false;
    }
  });
}

function getNextSong(){
  
}