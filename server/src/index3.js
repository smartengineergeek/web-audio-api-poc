let url = "myuri.org/auth/sources/37";

// create context
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create source
let source = audioCtx.createBufferSource();

// route source
source.connect(audioCtx.destination);

// prepare request
let request = new XMLHttpRequest();
request.open('GET', url, true /* async */ );
request.responseType = 'arraybuffer';

request.onload = function () {
    // on load callback

    // get audio data
    let audioData = request.response;

    // try to decode audio data
    audioCtx.decodeAudioData(audioData,
        function (buffer) {
            // on success callback
            console.log("Successfully decoded");

            // set source
            source.buffer = buffer;

            // .. do whatever you want with the source
            // e.g. play it
            source.start(0);
            // or stop
            source.stop();
        },
        function (e) {
            // on error callback
            console.log("An error occurred");
            console.log(e);
        });
};

request.setRequestHeader("Authorization", `Bearer ${authenticationToken}`);
request.send();