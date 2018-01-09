import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// mixuse bootstrap grid layout here:
import './bootstrap/css/bootstrap.css' 

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';

const App = () => (

<div class="container">
  <div class="row">
    <div class="col-md-5">
      <MuiThemeProvider >
  	    <LinearProgress mode="indeterminate" />
      </MuiThemeProvider>
    </div>
    <div class="col-md-5">
        <button>haha</button>
    </div>
  </div>

  <div class="row">
  </div>

  <div class="row">
    <button>haha</button>
  </div>
</div>

)



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
