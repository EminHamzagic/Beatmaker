class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.currentKick = './allSounds/kick-classic.wav';
        this.snareKick = './allSounds/snare-analog.wav';
        this.hihatKick = './allSounds/hihat-analog.wav';
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bar => {
           bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
           if (bar.classList.contains('active')){
               if (bar.classList.contains('kick-pad')){
                   this.kickAudio.currentTime = 0;
                   this.kickAudio.play();
               }          
               if (bar.classList.contains('snare-pad')){
                   this.snareAudio  .currentTime = 0;
                   this.snareAudio.play();
               }          
               if (bar.classList.contains('hihat-pad')){
                   this.hihatAudio.currentTime = 0;
                   this.hihatAudio.play();
               }          
           }
        });
        this.index++;
    }
    activePad(){
        this.classList.toggle('active')
    }
    start(){
        const interval = (60 / this.bpm) * 1000
        if (!this.isPlaying){
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval)
        }
        else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn(){
        if (this.isPlaying){
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        }
        else {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const sleectionValue = e.target.value;
        switch(selectionName){
            case 'kick-select':
                this.kickAudio.src = sleectionValue;
                break;
            case 'snare-select':
                this.snarekAudio.src = sleectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = sleectionValue;
                break;
        }
    }
    Mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active')
        if (e.target.classList.contains('active')){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else {
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')){
            this.start();
        }
    }
}


const drumkit = new DrumKit();

drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad)
    pad.addEventListener('animationend', function(){
        this.style.animation = '';
    })
})

drumkit.playBtn.addEventListener('click', () => {
    drumkit.start();
    drumkit.updateBtn();
})

drumkit.selects.forEach(select => {
    select.addEventListener('change', (e) => {
        drumkit.changeSound(e);
    })
})

drumkit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumkit.Mute(e);
    })
})

drumkit.tempoSlider.addEventListener('input', (e) => {
    drumkit.changeTempo(e);
})

drumkit.tempoSlider.addEventListener('change', (e) => {
    drumkit.updateTempo(e);
})