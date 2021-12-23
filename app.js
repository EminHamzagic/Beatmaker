class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play')
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bar => {
           bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
           if (bar.classList.contains('active')){
               
           }
        });
        this.index++;
    }
    activePad(){
        this.classList.toggle('active')
    }
    start(){
        const interval = (60 / this.bpm) * 1000
        setInterval(() => {
            this.repeat();
        }, interval)
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
})