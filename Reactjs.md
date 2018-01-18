## Reactjs Notes
*use Reactjs + ReactNative to make web/app products*

[参考Reactjs中文教程](https://doc.react-china.org/)


    React的推荐开发方式:
    先解构你的web app页面,把一个页面拆分成各个组件对象(样式[css]+功能[js]的单个组件),
    然后使用JSX写法来实现各个组件本身(把一个组件需要的h5+css+js代码封装到一起,使其具有静态样式+动态功能,该组件的一切属性+行为都封装在该段JSX代码内)
    每个组件有自己的一套实现逻辑,都是独立而完整的对象,
    然后,使用这一个个组件拼出完整的页面.
    一般也是一个div就是一块区域,或者一个div一个组件,div内部各种h5组件摆放.
    react的这种设计/开发方式就是组件化+OOP.把复杂的东西拆分成一个个小而简单的东西,每个组件本身又简单而完整且实用.
    你可以使用JSX来封装出各种各样的你设计的组件,甚至写出个组件框架来,以后就直接使用自己封装的常用组件就行了...
    这就是扩展h5本身的组件啊!!比如基于<button>自己写个<MyButton>来用,但是是增强版的button...这样的开发方式太好用了太爽了!
    (比如react-router路由框架就是一系列牛人封装好的组件而已,让你直接使用其中的<HashRouter>组件等,带路由功能的button,哈哈)

#### 一个最简单的React例子如下
```javascript
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')  //react天生适合写SPA:靠js动态的修改页面内容,只请求一次页面文件,速度快体验好.
);
```

#### JSX简介: h5和js混写...
*JSX 本身其实也是一种表达式.在编译之后呢，JSX 其实会被转化为普通的 JavaScript 对象*
```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
//推荐在 JSX 代码的外面扩上一个小括号，这样可以防止 分号自动插入的bug.
const element = (
  <h1>Hello, {formatName(user)}!</h1>
);
ReactDOM.render(
  element,
  document.getElementById('root')
);

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;

const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

警告:
因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。
例如，class 变成了 className，而 tabindex 则对应着 tabIndex.
```

#### JSX原理: JSX代表js object,Babel转译器会把JSX转换成一个名为React.createElement()的方法调用:
*JSX就是封装了js的React.createElement()函数,是为了使得常用的js加h5的代码段写起来更简洁而已!!*
```javascript
//下面两种代码的作用是完全相同的：
const element = (
  <h1 className="greeting">
    Hello, world!                                 
  </h1>
);                                           //JSX写法

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);                                            //js写法
```

#### 将元素渲染到 DOM 中
```javascrpt
//要将React元素渲染到根DOM节点中，我们通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上：
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

#### React只会更新必要的部分,React DOM首先会比较元素内容先后的不同,而在渲染过程中只会更新改变了的部分(使用了diff dom tree算法)

----------------------------------------------------------------------------------------------------------
组件 & Props属性 & States状态
组件可以将UI切分成一些的独立的、可复用的部件，这样你就只需专注于构建每一个单独的组件对象本身。
组件从理解上看就类似是函数:它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。
就是说:写好组件后,使用组件时,传入属性值,返回react元素渲染到页面上去.
比如: <NavLink to="/stuff"> Stuff </NavLink> 在页面上就返回个导航按钮
----------------------------------------------------------------------------------------------------------

#### 组件的函数/类定义
```javascript
//函数定义 (props是个对象,里面存着使用组件时传进来的属性值,且props是只读的,不能修改它!!)
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

//类定义 (组件类名称必须以大写字母开头)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

//例如,这段代码会在页面上渲染出”Hello,Sara”:
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

#### 组件组合使用(但组件的返回值只能有一个根元素) 
'''javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
'''

----------------------------------------------------------------------------------------
无论是使用函数或是类来声明一个组件，它决不能修改它自己的props! -> props是只读的静态属性
若组件需要使用可修改的属性,则应该使用states! -> states是可读可改的动态状态值
----------------------------------------------------------------------------------------

#### 需要更新自身属性值的Clock实例(使用states)
'''javascript
//使用不可修改的props的做法:
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
function update_clock_time() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}
setInterval(update_clock_time, 1000);

//--------------------------------------------------------------------
//以上Clock设置一个定时器并且每秒更新UI应该是Clock组件的内部实现细节!
//我们应该只写一次Clock然后它能更新自身才行!!

//为了实现这个需求，我们需要为Clock组件添加状态.
//状态与属性十分相似,但状态使用states对象而属性使用props对象来存值.
//且状态是私有的,完全受控于当前组件(就是说属性props是从组件外部传进来的值,而状态states是组件自身的值.但states也可以使用props的值)
//--------------------------------------------------------------------

class Clock extends React.Component {
  constructor(props) {  //组件的类写法其实都有个构造函数,参数就是props
    super(props);       //调用父类的构造函数
    this.state = {date: new Date()};   //设置states状态的初始值
  }  //只有构造器里可以用this.state直接赋初值,后面修改都得用setState(),这里也可以看出states就是个js对象/json  
  //componentDidMount是组件被挂载进dom之后会执行的所谓"组件的生命周期钩子函数"
  componentDidMount() {
    this.timerID = setInterval(   //每次Clock组件挂载进dom后设置下定时器并保存定时器id留给后面清除使用
      () => this.tick(),
      1000
    );
  }
  //componentWillUnmount是组件被卸载出dom之前会执行的所谓"组件的生命周期钩子函数"
  componentWillUnmount() {
    clearInterval(this.timerID);  //每次Clock组件卸载出dom前清除定时器
  }
  tick() {
    this.setState({  //使用this.setState修改states的状态值
      date: new Date()  //这里states状态值被修改后会导致dom diff算法检测到变化从而重新render该组件!!
    });                 //*React会知道状态已经改变,并会再次调用render()方法来更新dom*
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
//到此,Clock组件实现了自身的静态属性的读取和动态状态的修改等完整的该clock组件自身的功能!!
'''

#### 正确地使用状态
'''javascript
1.不要直接更新状态
例如，此代码不会重新渲染组件：
this.state.comment = 'Hello';  // Wrong

应当使用 setState():
this.setState({comment: 'Hello'});  // Correct
且构造函数是唯一能够初始化 this.state 的地方。

2.状态更新可能是异步的
React 可以将多个setState() 调用合并成一个调用来提高性能。
因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

例如,此代码可能无法更新计数器：
this.setState({
  counter: this.state.counter + this.props.increment,  // Wrong
});

要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象作为setState()函数的参数: 
该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment   // Correct
  };
});

'''

#### 单向数据流,数据向下流动
'''javascript
父组件或子组件都不能知道某个组件是有状态还是无状态，这就是为什么状态通常被称为局部或封装切私有
除了拥有并设置它的组件外，其它组件不可访问。
//但组件可以选择将其states状态值作为props属性值传递给其子组件(就是可读取states值传给下个组件的props值)：
class Clock ...
    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    ...
//h2组件将在其属性中接收到date值,并且不知道它是来自Clock状态还是Clock的属性,亦或手工输入的.
//这通常被称为自顶向下或单向数据流:
//任何状态始终由某些特定组件所有,并且从该状态导出的任何数据或UI只能影响树中下方的组件.
'''

#### React组件的事件处理函数写法(基本和dom写法一样,稍有差别)
    React 元素的事件处理和 DOM元素的很相似。但是有一点点语法上的不同:
    React事件绑定属性的命名采用驼峰式写法，而不是小写。(class也被改为了className)
    如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
    React里不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault
    在组件class的构造函数里必须多加个该事件处理函数的binding才行.
'''javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary here to make `this` work in the callback !!
    this.handleClick = this.handleClick.bind(this);
    //你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的.
    //如果你忘记绑定this.handleClick并把它传入onClick,当你调用这个函数的时候this的值会是undefined
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (               
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

//-----------------------------------------------------------------------------------
//如果使用 bind 让你很困惑，这里有两种方式可以解决。
//1.如果你正在使用实验性的属性初始化器语法，你可以使用该写法来正确的绑定回调函数：
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {    //注意这里加了个 "= ()"
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

//2.如果你没有使用属性初始化器语法，你可以在回调函数中使用 箭头函数
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
'''

#### 向事件处理程序传递参数
'''javascript
//通常我们会为事件处理程序传递额外的参数。例如，若是 id 是一个内联 id，有2中写法:
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

//值得注意的是,通过bind方式向监听函数传参,在类组件中定义的监听函数,件对象e要排在所传递参数的后面:
class Popper extends React.Component{
    constructor(){
        super();
        this.state = {name:'Hello world!'};
    }   
    preventPop(name, e){      //事件对象e要放在参数的最后
        e.preventDefault();   //这里又是一个React组件的事件处理函数的写法?构造函数里不用binding了?
        alert(name);          //onclick={this.preventPop.bind(this,this.state.name)}
    }                         // SHIT...
    render(){
      return (
        <div>
          <p>hello</p>
          <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
        </div>
      );
    }
}
'''

#### 条件渲染
'''javascript

'''























