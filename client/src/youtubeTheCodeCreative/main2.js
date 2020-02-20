// this creates a oscillator
const ctx = new (window.AudioContext || window.webkitAudioContext)();

const osc = ctx.createOscillator();

osc.connect(ctx.destination);

osc.frequency.value = 440; // 440Hz concert pitch

osc.start(0);

osc.stop(1);