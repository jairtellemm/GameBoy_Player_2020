class MultimediaPlayer extends DOMGui {

    constructor(audioTagSelector, tracks, guiParams = undefined) {
        super();

        this.audio = document.querySelector(audioTagSelector);
        this.tracks = tracks;
        this.audio.src = this.tracks[0];
        this.currentTrack = 0;
        

        this._DOMElements = {
            play: undefined,
            next: undefined,
            prev: undefined,
            title: undefined,
            artist: undefined,
            album: undefined,
            cover: undefined,
            currentTime: undefined,
            totalTime: undefined,
            timeBox: undefined,
            curTime: undefined,
            durTime: undefined,
            progressBar: undefined,
            playlistMenu: undefined
        }
        this.setDOMElements(guiParams);
        this.addListeners();
        this.setPlayerInfo();
        this.activeDraggableTracks();
    }
    
    addListeners() {
       
        // muestra la primera imagen de la portada en blur al iniciar el reproductor 
//        var path=`../assets/covers/1.jpg`;
//        document.querySelector('.blur').style.backgroundImage= `url(${path})`;

         // cambia el icono de play a pause 
        this.addButtonListener('play',
        () => {
            if (this.audio.paused) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
            this.startTimeUpdateListener();
            this._DOMElements.play.classList.toggle('fa-pause');
            this._DOMElements.play.classList.toggle('fa-play');
        });
        
        
        this.addButtonListener('next',
        () => {
            this.changePlayingSong_next(this.currentTrack + 1);
        });

        this.addButtonListener('prev',
        () => {
            this.changePlayingSong_prev(this.currentTrack - 1);
        });

        this.addButtonListener('progressBar',
        (e) => {
            let position = e.offsetX;
            let totalW = e.target.clientWidth;
            let progress = position / totalW;
            this.updateProgressBar(progress);
            this.audio.currentTime = this.audio.duration * progress;
        });
    }
    
     addButtonListener(btnName, callback){
        this._DOMElements[btnName].onclick = callback;
    }
    
    //======CANCION SIGUIENTE======
    changePlayingSong_next(index) {
       
        if ( index <= this.tracks.length - 1) {
            this.currentTrack = index++;
        }else{
            this.currentTrack = 0;
            index= this.currentTrack+1; 
        }

        this.audio.src = this.tracks[this.currentTrack];
        this.audio.play();
        let playing = this._DOMElements.playlistMenu.querySelector('.playing');
        playing.classList.remove('playing');
        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        element.classList.add('playing');
        this.setPlayerInfo();
        var path=`./assets/covers/${index}.jpg`;
        document.querySelector('.pantalla').style.backgroundImage= `url(${path})`;
        document.querySelector('.blur').style.backgroundImage= `url(${path})`;
    }
    
    //======CANCION ANTERIOR======
    changePlayingSong_prev(index) {
        if ( index >= this.tracks.length) {
            this.currentTrack = index--;           
        }else{
            this.currentTrack = index;
            index= this.currentTrack+1;
        }
      
        this.audio.src = this.tracks[this.currentTrack];
        this.audio.play();
        let playing = this._DOMElements.playlistMenu.querySelector('.playing');
        playing.classList.remove('playing');
        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        element.classList.add('playing');
        this.setPlayerInfo();
        var path=`./assets/covers/${index}.jpg`;
        document.querySelector('.pantalla').style.backgroundImage= `url(${path})`;
       document.querySelector('.blur').style.background= `url(${path})`;
    }
    
        setPlayerInfo() {
        let element = this._DOMElements.playlistMenu.children[this.currentTrack];
        this._DOMElements.title.innerHTML = element.querySelector('.title').innerHTML;
        this._DOMElements.artist.innerHTML = element.querySelector('.artist').innerHTML;
    }

    startTimeUpdateListener() {
        this.audio.ontimeupdate = () => {
            let total = this.audio.duration;
            let current = this.audio.currentTime;
            let progress = current / total;
            this.updateProgressBar(progress);
            this.timeUpdate();
        }
    }
    
        ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    timeUpdate() {

          let curMins = Math.floor(this.audio.currentTime / 60),
          curSecs = Math.floor(this.audio.currentTime - curMins * 60),
          mins = Math.floor(this.audio.duration / 60),
          secs = Math.floor(this.audio.duration - mins * 60);
        (curSecs < 10) && (curSecs = '0' + curSecs);
        (secs < 10) && (secs = '0' + secs);

        this._DOMElements.curTime.innerHTML = curMins + ':' + curSecs;
        this._DOMElements.durTime.innerHTML = mins + ':' + secs;
        
        if(curMins == mins && curSecs == secs){
            this.changePlayingSong_next(this.currentTrack + 1);
        }
      }
    
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    updateProgressBar(progress) {
    this._DOMElements.progressBar.querySelector('.fill').style.transform = `scaleX(${progress})`;
    }

    
}