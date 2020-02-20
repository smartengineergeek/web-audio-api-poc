import React, { Component } from 'react';
import Peaks from 'peaks.js';

import { hexToRgbA } from './func';
import AudioVisualiser from './AudioVisualiser';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.audio)
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    const audioElement = document.querySelector('audio')
    this.source = this.audioContext.createMediaElementSource(audioElement);
    // console.log(this.source);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
    this.peaksInit();
  }

  peaksInit = () => {
    const options = {
        // container: document.getElementById('peaks-container'),
        containers: {
            overview: document.getElementById('overview-container'),
            zoomview: document.getElementById('zoomview-container')
        },
        mediaElement: document.querySelector('#audio-container'),
        webAudio: {
            audioContext: this.audioContext
        },
        // async logging function
        logger: console.error.bind(console),
        // default height of waveform canvases in pixels
        height: 85,
        // Array of zoom levels in samples per pixel
        nudgeIncrement: 0.01,
        zoomLevels: [512, 1024, 2048, 4096],
        //Bind keyboard controls
        keyboard: false,
        segmentStartMarkerColor: '#a0a0a0',
        segmentEndMarkerColor: '#a0a0a0',
        // zoomWaveformColor: this.hexToRgbA('#42a5f5', 0.75),
        // overviewWaveformColor: this.hexToRgbA('#42a5f5', 0.75),
        overviewWaveformColor: '#ff0000',
        overviewHighlightColor: 'white',
        playheadColor: 'rgba(0, 0, 0, 1)',
        playheadTextColor: '#aaa',
        pointMarkerColor: '#ff0000',
        axisGridlineColor: '#ccc',
        axisLabelColor: '#aaa',
        randomizeSegmentColor: false,
        zoomAdapter: 'static',
        // segments: [...segments],
        segments: [
            {
                startTime: 0,
                endTime: 10.5,
                labelText: '0 to 10.5 seconds non-editable demo segment'
            },
            {
                startTime: 3.14,
                endTime: 4.2,
                color: '#666'
            }
        ],
        // Array of initial point objects
        points: [{
            time: 150, 
            editable: true,
            color: "#00ff00",
            labelText: "A point"
        },
        {
            time: 160,
            editable: true,
            color: "#00ff00",
            labelText: "Another point"
        }]
    
    };
    Peaks.init(options, function(err, peaks){
    if (err) {
        console.error('Failed to initialize Peaks instance: ' + err.message);
        return;
    }
    console.log(peaks);
    })
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.source.disconnect();
    this.analyser.disconnect();
    // let element = document.getElementById("audio-container")
    // element.parentNode.removeChild(element)
  }

  render() {
    return <AudioVisualiser audioData={this.state.audioData} />;
  }
}

export default AudioAnalyser;
