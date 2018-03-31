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
    this.fetchdata = this.fetchdata.bind(this);
  }

  fetchdata(last_time) {
    if (last_time == '0'){
      last_time = (new Date()).valueOf();
    }
    var url = "http://139.196.99.113:80/get_messages?last_time=" + last_time;
    fetch(url, {
        method: "get",
        headers: {"Connection": "keep-alive"},
    }).then( (response) => {
          if (response.status != 200){
            console.log('get messages fail');
          }
          return response.text();
      }).then( (data) => {
          console.log("get messages success: " + data); 
        if (this.state.messages.length + data.length >= 16){
         this.state.messages = this.state.messages.slice(this.state.messages.length + data.length - 16);  
          }
          // data = "[u'hi', u'hello', u'1234450']"
          data = eval(data.replace(/u'/g, "'"));
          if (data.length == 0) {
            last_time = (new Date()).valueOf();
          }else{
            last_time = data.pop();
          }
          this.setState({messages: this.state.messages.concat(data)});
          setTimeout(() => this.fetchdata(last_time), 0);
      }).catch( (err) => {
          console.log("get messages ERROR: ");
          console.log(err);
          setTimeout(() => this.fetchdata(last_time), 0);
      });
  }

  postdata(message) {
    var url = "http://139.196.99.113:80/post_messages?last_time=" + (new Date()).valueOf() + "&&message=" + message;
    fetch(url, {
        method:"get",
    }).then( (response) => {
          if (response.status == 200){
            console.log('post data success');
          }
          else{
            console.log('post data fail');
          }
      }).catch( (err) => {
          console.log(err);
      });
  }

  componentDidMount() {
    this.fetchdata('0');
  }

  onKeyDown(e){
    if(e.keyCode == 13){
      if (this.state.messages.length >= 16){
        this.state.messages.shift();  
      }
      this.setState({messages: this.state.messages.concat(e.target.value)});
      this.postdata(e.target.value);
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

