import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
// import App from './youtubeTheCodeCreative/Oscillator';
// import './youtubeTheCodeCreative/main2';
import App from './WebAudioAPI/App'
// const App = () => <div>App</div>;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
