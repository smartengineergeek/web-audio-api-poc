const ctx = new AudioContext();
let audio;

fetch("http://localhost:3001/api/v1/audio")
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
        audio = decodedAudio
    });

function playback(){
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
}

window.addEventListener("mousedown", playback);

