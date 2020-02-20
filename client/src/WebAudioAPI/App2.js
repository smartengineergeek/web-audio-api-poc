import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    // this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }
  componentDidMount(){
    this.getMicrophone();
  }

  async getMicrophone() {
    let thisRef = this;
    axios.get("http://localhost:3001/api/v1/audio")
    .then(function(response){
      // handle success
      if(response.status !== 200){
        console.log('Problem: Status code: '+ response.status);
        return;
      }else{
        console.log(response.data.length)
        thisRef.setState({ audio: response.data });    
      }
    })
    .catch(function(error){
      // handle error
      console.log(error)
    })
  }
/*
  stopMicrophone() {
    // var outputTracks = [];
    // outputTracks = outputTracks.concat(outputAudioStream.getTracks());
    // outputTracks.forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) 
      this.stopMicrophone();
    else 
      this.getMicrophone();
    
  }
*/
  render() {
    return (
      <div className="App">
        {/* <div className="controls" id="main-container">
            <button onClick={this.toggleMicrophone}>
                {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
            </button>
        </div> */}
        {this.state.audio ? 
            <React.Fragment>
                <audio controls  id="audio-container">
                    <source src="http://localhost:3001/api/v1/audio" type="audio/ogg" />
                </audio>     
                <div id="peaks-container">
                    {/* <div id="zoomview-container"></div> */}
                    <div id="overview-container"></div>
                </div>         
                <AudioAnalyser audio={this.state.audio} /> 
            </React.Fragment>
            : ''}
      </div>
    );
  }
}

export default App;
