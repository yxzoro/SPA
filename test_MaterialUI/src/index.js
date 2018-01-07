import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';

const App = () => (
  <MuiThemeProvider>
  	<LinearProgress mode="indeterminate" />
  </MuiThemeProvider>
);






ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
