import React from 'react';

class Oscillator extends React.Component{
    componentDidMount(){
        this.startStop();
    }
    componentDidUpdate(){
        // this.startStop();
    }
    startStop = () => {
        console.log("inside startStop()")
        // this creates a oscillator
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type="square";
        osc.connect(ctx.destination);
        osc.start();
        setTimeout(() => {
            osc.stop();
        }, 2000);
        // osc.frequency.value = this.state.freq;
        // osc.start(0);
        // osc.stop(1);        
        const frequencyRange = document.querySelector("input");
        frequencyRange.addEventListener("input", event => {
            console.log(event.target.value)
            osc.frequency.range = event.target.value;
        })
        // One-liner to resume playback when user interacted with the page.
        // document.querySelector('input').addEventListener('input', function() {
        //     ctx.resume().then(() => {
        //     console.log('Playback resumed successfully');
        //     });
        // });
    }
    render() {
        return(
            <input type="range" min="220" max="880" step="0.01" />
        )
    }
}

export default Oscillator;