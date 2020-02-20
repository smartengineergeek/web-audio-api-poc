import React from 'react';
import Peaks from 'peaks.js';

import AudioAnalyser from '../AudioAnalyser';
// import segments from '../segments';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            audio: null
        }
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
    }
    hexToRgbA = (hex, alpha) => {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
          c = hex.substring(1).split('');
          if (c.length == 3) {
            c = [
              c[0],
              c[0],
              c[1],
              c[1],
              c[2],
              c[2]
            ];
          }
          c = '0x' + c.join('');
          return 'rgba(' + [
            c >> 16 & 255,
            c >> 8 & 255,
            c & 255
          ].join(',') + ',' + alpha + ')';
        }
        throw new Error('Bad Hex');
      };
    
    componentDidMount(){
        // this.toggleMicrophone();

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        const options = {
            // container: document.getElementById('peaks-container'),
            containers: {
                overview: document.getElementById('overview-container'),
                zoomview: document.getElementById('zoomview-container')
            },
            mediaElement: document.querySelector('#audio-container'),
            webAudio: {
                audioContext: audioContext
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
/*    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.audio !== nextProps.audio)
            return{ audio: nextProps.audio}
        
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextState.audio !== nextProps.audio;
    }
*/   

    

    async getMicrophone(){
        fetch('http://localhost:3001/api/v1/audio', { mode: 'no-cors' })
        .then(
            function(response){
                console.log(response)
                if(response.status !== 200){
                    console.log('Problem: Status code: '+ response.status);
                    return;
                }
                if(response.ok){
                    console.log(response)
                    this.setState({ audio: response });    
                }
            }
        )
        .catch(function(err){
            console.log('Fetch error:', err);
        })
        // const audio = await navigator.mediaDevices.getUserMedia({
        //     audio: true,
        //     video: false
        // });
    }

    stopMicrophone(){
        this.state.audio.getTracks().forEach(track => track.stop())
        this.setState({ audio: null });
    }
    toggleMicrophone(){
        if(this.state.audio){
            // this.stopMicrophone();
        }else{
            // this.getMicrophone();
        }
    }

    render(){
        this.state.audio && console.log(this.state.audio)
        return(
            <div className="App">
                <center>
                    <main>
                        <div className="app-container">
                            <audio id="audio-container" controls>
                                <source src="http://localhost:3001/api/v1/audio" type="audio/ogg" />
                            </audio>
                            <div id="peaks-container">
                                {/* <div id="zoomview-container"></div> */}
                                <div id="overview-container"></div>
                            </div>
                        </div>
                    </main>                
                </center>
            </div>
        )
    }
}

export default App;


{/* <div id="zoomview-container"></div>
<div id="overview-container"></div> */}
