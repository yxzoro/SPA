import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css'

//must add material-ui componets inside <MuiThemeProvider> like a container ?! SHIT...
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

class App extends React.Component {
  constructor(props) { 
    super(props);     
    this.state = {messages: ['welcome to chatroom! -_-']};
    this.onKeyDown = this.onKeyDown.bind(this);
    
    // websocket connect:
    this.ws = new WebSocket("ws://139.196.99.113:80/");
    this.ws.onmessage = function (event) {
        console.log('reveived message: ', event.data);
        this.setState({messages: this.state.messages.concat(event.data)});
    };
    this.ws.onmessage = this.ws.onmessage.bind(this);
  }

  onKeyDown(e){
    if(e.keyCode == 13){
      if (this.state.messages.length >= 16){
        this.state.messages.shift();  
      }
      this.setState({messages: this.state.messages.concat(e.target.value)});
      this.ws.send(e.target.value);
      e.target.value = null;
      }
    }

  render(){ 
    const Items = this.state.messages.map((number) =>
      <li >{number}</li> 
    );
    return (
      <div className='root_div'>
      <MuiThemeProvider>
      <div className='second_div'>

          <div className='message_field_clss'>
            <ul>{Items}</ul>
          </div>

          <TextField className='text_field_clss' onKeyDown={this.onKeyDown}
            id="your_text"
            hintText="Text here"
            fullWidth={true}
          />

      </div>
      </MuiThemeProvider>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

