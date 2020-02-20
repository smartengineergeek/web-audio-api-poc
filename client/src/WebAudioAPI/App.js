import React from 'react';
import Peaks from 'peaks.js';
import axios from "axios";

import segments from './segments';
import "./App.css";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

class App extends React.Component{
    state = {
        audio: null,
        status: null,
        playerStatus: "play",
        link: null
    }
    componentDidMount(){
        this.fetchApi2();
    }
    fetchApi = () => {
        axios.get("http://localhost:3001/api/v1/audio")
        .then((response) => {
            // console.log(response.data)
            // handle success
            if(response.status !== 200){
                console.log("Problem: Status Code: "+response.status);
                return;
            }else{
                console.log(response.data.length);
                let buffer = response.arrayBuffer();
                let decodedAudio = audioContext.decodeAudioData(buffer);
                console.log(decodedAudio)
                this.setState({status: response.status});
                this.setState({audio: decodedAudio }, () => { this.peaksInit(); });
            }
        })
        .catch(function(error){
            // handle error
            console.log(error);
        })
    }
    fetchApi2 = () => {
        fetch("http://localhost:3001/api/v1/audio")
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            this.setState({status: 200});
            this.setState({audio : decodedAudio},  () => { this.peaksInit(); })
        });
    }
    peaksInit = () => {
        const options = {
            containers: {
                overview: document.getElementById('overview-waveform'),
                // zoomview: document.getElementById('zoomview-waveform')
            },
            mediaElement: document.querySelector('audio'),
            webAudio:{
                audioContext: audioContext,
                audioBuffer: this.state.audio,
                multiChannel: false
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
            // overviewWaveformColor: hexToRgbA('#42a5f5', 0.75),
            overviewWaveformColor: '#cccccc',
            overviewHighlightColor: 'white',
            playheadColor: 'rgba(0, 0, 0, 1)',
            playheadTextColor: '#aaa',
            pointMarkerColor: '#ff0000',
            axisGridlineColor: '#ccc',
            axisLabelColor: '#aaa',
            randomizeSegmentColor: false,
            zoomAdapter: 'static',
            showPlayheadTime: true,
            segments: [...segments],
            // segments: [
            //     {
            //         startTime: 0,
            //         endTime: 10.5,
            //         labelText: '0 to 10.5 seconds non-editable demo segment'
            //     },
            //     {
            //         startTime: 3.14,
            //         endTime: 4.2,
            //         color: '#666'
            //     }
            // ],
            // Array of initial point objects
            // points: [{
            //     time: 150, 
            //     editable: true,
            //     color: "#00ff00",
            //     labelText: "A point"
            // },
            // {
            //     time: 160,
            //     editable: true,
            //     color: "#00ff00",
            //     labelText: "Another point"
            // }]
        };
        let peaksInstance = Peaks.init(options, function(err, peaks){
            if (err) {
                console.error('Failed to initialize Peaks instance: ' + err.message);
                return;
            }
        });
        peaksInstance.on("peaks.ready", function(){
            console.log("peaks.ready")
            console.log(peaksInstance)
            peaksInstance.player.seek(50);
            peaksInstance.player.play();
        })
    }
    //
    playback = () => {
        const playSound = audioContext.createBufferSource();
        playSound.buffer = this.state.audio;
        playSound.connect(audioContext.destination);
        playSound.start(audioContext.currentTime);
        this.setState({link: playSound});
    }
    stop = () => {
        this.state.link.disconnect(audioContext.destination);        
    }
    clickHandler = () => {
        if(this.state.playerStatus === "stop"){
            this.stop();
            this.setState({playerStatus: "play"})
        }else{
            this.playback();
            this.setState({playerStatus: "stop"})
        }
    }
    render(){
        return(
            <React.Fragment>
            {this.state.status == 200 ?
                <div className="app-audio">
                    <button id="btn" onClick={this.clickHandler}>{this.state.playerStatus === "stop"? "Stop": "Play"}</button>
                    <audio controls>
                    </audio>     
                    <div className="peaks-container">
                        {/* <div id="zoomview-waveform"></div> */}
                        <div id="overview-waveform"></div>
                    </div>         
                </div> : null  
             } 
            </React.Fragment>
        )
    }
}

export default App;