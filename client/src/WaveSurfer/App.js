import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { peaks } from './peaks.js';
import './App.css';

export default class App extends Component {
    componentDidMount(){
        const aud = document.querySelector("#audio-container");

        this.wavesurfer = WaveSurfer.create({
            barWidth: 1,
            cursorWidth: 1,
            conatiner: "#waveform-container",
            backend: "MediaElement",
            height: 80,
            progressColor: '#4a74a5',
            responsive: true,
            waveColor: '#ccc',
            cursorColor: '#4a74a5'
        });
        this.wavesurfer.load(aud, peaks);
    }
    playPause = () => {
        this.wavesurfer.playPause();
    }
    render = () => {
        return (
            <React.Fragment>
                <button onClick={this.playPause}>Play/Pause</button>
                <div id="waveform-container" />
                <audio id="audio-container" src="http://localhost:3001/api/v1/audio" />
            </React.Fragment>
        );
    }
}