const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");
const click = document.querySelector(".click");
const strip = document.querySelector(".strip");
const ctx = canvas.getContext('2d'); 

async function getStream(){
  let stream = null;
  const constraints = {
    audio: false,
    video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
    }
};
  try{
    stream = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = stream;
    video.play();
    console.log(stream);
  }catch(err){
    console.log(err);
  }
}
getStream();

function drawVideo(){
  canvas.height = 720;
  canvas.width = 1080;
  setInterval(() => {
    ctx.drawImage(video, 0, 0, 1280, 720);
  }, 4);
}
drawVideo();

function captureImage(){
  let link = document.createElement('a');
  let data = canvas.toDataURL('image/png');
  link.href = data;
  link.innerHTML = `<img src="${data}"/>`;
  link.setAttribute('download', 'abcdef');
  strip.insertBefore(link , strip.firstChild);
}

click.addEventListener('click', captureImage);