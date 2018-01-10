import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';

const App = () => (
<div class='root_div'>
      <MuiThemeProvider >
        <LinearProgress mode="indeterminate" />
      </MuiThemeProvider>
</div>

)



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
