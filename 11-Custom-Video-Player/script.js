const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle');
const skipBtn = player.querySelectorAll('button[data-skip]');
const ranges = player.querySelectorAll('input[type="range"]')

console.log(ranges);

progressBar.style.widht = '100%'
console.log(progressBar.style.height)
function setProgress() {
}

function togglePlay(){
    const methos = video.paused ? 'play' : 'pause';
    video[methos]();
    // if(video.paused){
    //     video.play()
    // }else {
    //     video.pause()
    // }
}
function updateButton(){
    const text = this.paused ? " ▶" : "▐▐"
    toggle.innerText = text;
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRange(){
    video[this.name] = this.value
}
function displayProgress(){
    let percent = (video.currentTime  / video.duration) * 100;
    console.log(percent)
    progressBar.style.flexBasis = `${percent}%`
}
function scrub(e){
    let percent = (e.offsetX / this.offsetWidth) * 100;
    video.currentTime =( video.duration / 100) * percent;
}

toggle.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', displayProgress)

skipBtn.forEach(button => {
    button.addEventListener('click', skip)
});
ranges.forEach(range => {
    range.addEventListener('change', handleRange);
    range.addEventListener('mousemove', handleRange);
    // range.addEventListener('mousemove', handleRange);
});
progress.addEventListener('click', scrub);
