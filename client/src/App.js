import React from 'react';

import AudioAnalyser from './AudioAnalyser';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            audio: null
        }
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
    }

    async getMicrophone(){
        let au = document.createElement("audio");
        au.src = "../public/20200120_192201_RJWP.opus";
        fetch('http://localhost:3001/api/v1/track')
        .then(
            function(response){
                if(response.status !== 200){
                    console.log('Problem: Status code: '+ response.status);
                    return;
                }
                if(response.ok){
                    console.log(response)
                    this.setState({ audio: response.body });    
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
            this.getMicrophone();
        }
    }

    render(){
        this.state.audio && console.log(this.state.audio)
        return(
            <div className="App">
                <main>
                    {
                        this.state.audio ? 
                        <audio controls>
                            <source src={this.state.audio} type="audio/ogg" />
                        </audio>: null
                    }
                    <div className="controls">
                        <button onClick={this.toggleMicrophone}>
                            {this.state.audio ? 'Stop microphone': 'Get microphone input'}
                        </button>
                    </div>
                    {this.state.audio ? <AudioAnalyser audio={this.state.audio} />: ''}
                </main>
            </div>
        )
    }
}

export default App;