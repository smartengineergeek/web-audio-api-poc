import React from 'react';
// import './main.js';

const ctx = new AudioContext();

export default class  App extends React.Component {
    state = {
        audio: null,
        status: "play",
        link: ""
    }
    componentDidMount(){
        fetch("http://localhost:3001/api/v1/audio")
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            this.setState({audio : decodedAudio})
        });
    }
    playback = () => {
        const playSound = ctx.createBufferSource();
        playSound.buffer = this.state.audio;
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime);
        this.setState({link: playSound});
    }
    stop = () => {
        this.state.link.disconnect(ctx.destination);        
    }
    clickHandler = () => {
        if(this.state.status === "stop"){
            this.stop();
            this.setState({status: "play"})
        }else{
            this.playback();
            this.setState({status: "stop"})
        }
    }
    render(){
        return(<div>
            <button id="btn" onClick={this.clickHandler}>{this.state.status === "stop"? "Stop": "Play"}</button>
        </div>)
    }
}

