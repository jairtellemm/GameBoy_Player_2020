let tracks = []
let playlist = []
let player = document.querySelector('#player');


let trackElements = [];

tracks.push("./assets/canciones/1.mp3");
tracks.push("./assets/canciones/2.mp3");
tracks.push("./assets/canciones/3.mp3");

var myAudioPlayer = new MultimediaPlayer('#player audio', tracks, {
    play: document.querySelector('#playpause'),
    next: document.querySelector('#next'),
    prev: document.querySelector('#prev'),
    title: document.querySelector('#title'),
    artist: document.querySelector('#artist'),
    album: document.querySelector('#album'),
    cover: document.querySelector('.pantalla'),
    curTime: document.querySelector('#time_played'),
    durTime: document.querySelector('#full_time'),
    playlistMenu: document.querySelector('#playlist'),
    progressBar: document.querySelector('#main .slider')
});

document.querySelectorAll('li').forEach( (li) => {

    li.addEventListener("click", () => {
        myAudioPlayer.changePlayingSong_next(li.id-1);
        // myAudioPlayer._DOMElements.play.onclick();
       
    } );
} );













