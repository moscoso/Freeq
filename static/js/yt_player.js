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
function makePlayer(div, song_id){
  var player = new YT.Player(div, {
    height: '390',
    width: '640',
    videoId: song_id,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  return player
}

//Instantiates current and next song players
function onYouTubeIframeAPIReady() {
  cur_player = makePlayer('player1','M7lc1UVf-VE');
  // next_song = getNextSong()
  next_player = makePlayer('player2','T_U6_u_yyro');

  //Instantiates play button to start/stop current video
  $('#play-btn').on("click",function(){
    if (!playing){
      cur_player.playVideo();
      playing = true;
    } else {
      cur_player.pauseVideo();
      playing = false;
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

}

//The API calls this function when the player's state changes.
//The function indicates that when playing a video (state=1),
//the player should play for six seconds and then stop.
/* Here are different states you can use 
      YT.PlayerState.ENDED
      YT.PlayerState.PLAYING
      YT.PlayerState.PAUSED
      YT.PlayerState.BUFFERING
      YT.PlayerState.CUED
*/
function onPlayerStateChange(event) {
  
  //If video ends, paly the next video, instantiate the next player
  if (event.data == YT.PlayerState.ENDED){
    //Set current player to the next and start playing
    cur_player = next_player;
    cur_player.playVideo();
    
    //Remove iFrame and set new div to instantiate next player
    $('#'+toRemove).remove();
    $(document.body).append("<div id='" + toRemove + "'></div>");
    setRemove();

    //Get next song and instantiate next player
    // next_song_id = getNextSong()
    next_song_id = 'u81mFMbh-Ts';
    next_player = makePlayer(next_song_id);
  }
}

function stopVideo() {
  player.stopVideo();
}

function getNextSong(){
  
}