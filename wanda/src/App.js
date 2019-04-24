import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.global = new Set([]);
    this.myf = this.myf.bind(this);
  }

 randomNum(min, max) {
   var r = Math.round(Math.random() * (max - min)) + min
  return r
}

  randomNum2() {
    while (true) {
      var pai = this.randomNum(3, 14)  // 排
      var zuo = this.randomNum(7, 26)  // 座
      var x = pai + "排" + zuo + "座"  
      if  (this.global.has(x)) {
        continue
      } else {
        this.global.add(x)
        break
      }      
    }  
    return x  
  }

  myf(e) {
    var l = []
    for (let i = 0; i < 10; i++) {
      var xx = this.randomNum2()      
      l.push(xx)
    }         
    // this.state.users.push(l)
    // this.setState({ users: this.state.users})
    // console.log(this.state.users)
    this.setState({ users: l })
  }

  render() {
    // const Items = this.state.users.map((number) =>
    //   <div ><li  className="zz"> {number} </li></div>
    // );
    return (
      <div className='myroot'>            
        <button className='login-button' onClick={this.myf}> 抽奖 </button>
        <div> 
          <ul className="xyz" >
            <div ><li className="zz0"> {this.state.users[0]} </li></div>
            <div ><li className="zz1"> {this.state.users[1]} </li></div>
            <div ><li className="zz2"> {this.state.users[2]} </li></div>
            <div ><li className="zz3"> {this.state.users[3]} </li></div>
            <div ><li className="zz4"> {this.state.users[4]} </li></div>
            <div ><li className="zz5"> {this.state.users[5]} </li></div>
            <div ><li className="zz6"> {this.state.users[6]} </li></div>
            <div ><li className="zz7"> {this.state.users[7]} </li></div>
            <div ><li className="zz8"> {this.state.users[8]} </li></div>
            <div ><li className="zz9"> {this.state.users[9]} </li></div>
          </ul>
        </div>

      </div>
    )
  } 
}

export default App;



