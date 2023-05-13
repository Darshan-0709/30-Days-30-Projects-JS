const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const effects = document.querySelectorAll('[data-effect]');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }) 
    .then(localMediaStream => {        
        //  DEPRECIATION : 
        //       The following has been depreceated by major browsers as of Chrome and Firefox.
        //       video.src = window.URL.createObjectURL(localMediaStream);
        //       Please refer to these:
        //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
        //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
        
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.log('Maybe allow the permision to accsess Cemara', err);
    })
    
}
getVideo();

// we need to put the video on the canvas
function paintOnCanvas(){
    const widht = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = widht;
    canvas.height = height;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, widht, height);
        let pixels = ctx.getImageData(0, 0, widht, height);
            // pixels = redEffect(pixels);

            // pixels = rgbSplit(pixels);

            pixels = greenScreen(pixels);
            ctx.putImageData(pixels, 0, 0);
        // console.log(pixels);
    }, 10);
}

// we need to take picutre
function takePhoto(){
    snap.currentTime = 0
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', 'handsome boy');
    link.innerHTML = `<img src="${data}" alt="handsome boy" />`
    strip.insertBefore(link, strip.firstChild);
}

// we need to add filter

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i + 0]  + 100; // RED
        pixels.data[i + 1] = pixels.data[i + 1]  - 100; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2]  - 100; // Blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }

function greenScreen(pixels) {
const levels = {};

document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
});

for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
    && green >= levels.gmin
    && blue >= levels.bmin
    && red <= levels.rmax
    && green <= levels.gmax
    && blue <= levels.bmax) {
    // take it out!
    pixels.data[i + 3] = 0;
    }
}

return pixels;
}

video.addEventListener('canplay', paintOnCanvas);