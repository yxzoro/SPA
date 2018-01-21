## Reactjs Notes
*use Reactjs + ReactNative to make web/app products*

[参考Reactjs中文教程](https://doc.react-china.org/)

----------------------------------------------------------------------
    React使用OOP的思想来写前端页面上的各种组件,
    先从OOP角度思考解构页面成各组件对象,再挨个实现组件对象,最后组合起来.
----------------------------------------------------------------------

    React的推荐开发方式:
    先解构你的web app页面,把一个页面拆分成各个组件对象(样式[css]+功能[js]的单个组件),
    然后使用JSX写法来实现各个组件本身:
    (把一个组件需要的h5+css+js代码封装到一起,使其具有静态样式+动态功能,该组件的一切属性+行为都封装在该段JSX代码内)
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

###### React只会更新必要的部分,React DOM首先会比较元素内容先后的不同,而在渲染过程中只会更新改变了的部分(使用了diff dom tree算法)

## 组件 & Props属性 & States状态
    组件可以将UI切分成一些的独立的、可复用的部件，这样你就只需专注于构建每一个单独的组件对象本身。
    组件从理解上看就类似是函数:它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。
    就是说:写好组件后,使用组件时,传入属性值,返回react元素渲染到页面上去.
    比如: <NavLink to="/stuff"> Stuff </NavLink> 在页面上就返回个导航按钮

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
```javascript
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
```

    无论是使用函数或是类来声明一个组件，它决不能修改它自己的props! -> props是只读的静态属性
    若组件需要使用可修改的属性,则应该使用states! -> states是可读可改的动态状态值

#### 需要更新自身属性值的Clock实例(使用states)
```javascript
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
```

#### 正确地使用状态
```javascript
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

```

#### 单向数据流,数据向下流动
```javascript
父组件或子组件都不能知道某个组件是有状态还是无状态，这就是为什么状态通常被称为局部或封装切私有
除了拥有并设置它的组件外，其它组件不可访问。
//但组件可以选择将其states状态值作为props属性值传递给其子组件(就是可读取states值传给下个组件的props值)：
class Clock ...
    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    ...
//h2组件将在其属性中接收到date值,并且不知道它是来自Clock状态还是Clock的属性,亦或手工输入的.
//这通常被称为自顶向下或单向数据流:
//任何状态始终由某些特定组件所有,并且从该状态导出的任何数据或UI只能影响树中下方的组件.
```

#### React组件的事件处理函数写法(基本和dom写法一样,稍有差别)
    React 元素的事件处理和 DOM元素的很相似。但是有一点点语法上的不同:
    React事件绑定属性的命名采用驼峰式写法，而不是小写。(class也被改为了className)
    如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
    React里不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault
    在组件class的构造函数里必须多加个该事件处理函数的binding才行.
```javascript
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
```

#### 向事件处理程序传递参数
```javascript
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
```

#### 条件渲染
```javascript
//在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。
//React中的条件渲染写法和JavaScript中的一致，直接使用JavaScript操作符if或条件运算符来判断并创建当前状态的元素,然后让React根据它们来更新UI.
//例如: 我们将创建一个 Greeting 组件，它会根据用户是否登录来显示不同的内容：
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

#### 你可以使用变量来直接储存元素(写法更灵活)
```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

#### 使用与运算符&&
```javascript
//在JavaScript中,true && expression总是返回expression,而false && expression总是返回false
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

#### 使用三目运算符
```javascript
//使用JavaScript 的三目运算符 condition ? true : false
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}

render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

#### 阻止组件渲染/隐藏组件
```javascript
//隐藏组件，即使它被其他组件渲染。只需让该组件的render方法返回null而不是它的渲染结果即可实现。
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <div className="warning">
      Warning!
    </div>
  );
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}
ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

#### 使用列表的map函数 & Keys
```javascript
//先看如下的js代码,我们使用map()函数让数组中的每一项翻倍,我们得到了一个新的数列doubled
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
//在React的JSX中,把数组转化为数列元素的写法是类似的!

//下面,我们使用Js的map()方法遍历numbers数组.对数组中的每个元素返回<li>标签,最后我们得到一个数组listItems
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
//再把整个listItems插入到ul元素中，然后渲染进DOM:
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);

```

#### 封装基础列表组件
```javascript
//你会经常需要渲染一个列表到组件中.所以我们就可以把前面的常用代码封装成一个组件.
//我们让这个组件接收numbers数组作为参数,输出一个无序列表
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

//keys的重要性:
//Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化.因此你应当给数组中的每一个元素赋予一个确定的标识key
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);

//一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key:
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);

//当元素没有确定的id时，你可以使用他的序列号索引index作为key
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);

//----------------------------------------------------------------------------------------------
//使用key的示例1:
function ListItem(props) {
  // 对啦！这里不需要指定key.
  return <li>{props.value}</li>;
}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 又对啦！key应该在这里数组的上下文中被指定(也就是说: 应该在使用而不是定义的时候才指定key!)
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

//使用key的示例2:
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}
const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

## 写React一定要熟悉JSX的js-h5混合写法...!!
```javascript
//在上面的例子中，我们声明了一个单独的listItems变量并将其包含在JSX中
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
//JSX允许在大括号中嵌入任何表达式，所以我们可以在map()中这样使用：
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

#### 表单
```javascript
//HTML表单元素与React中的其他DOM元素有所不同,因为表单元素生来就保留一些内部状态。例如，下面这个表单只接受一个唯一的name。
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
//当用户提交表单时，HTML的默认行为会使这个表单跳转到一个新页面。在React中亦是如此。
//但大多数情况下，我们都会构造一个处理提交表单并可访问用户输入表单数据的函数!
//实现这一点的标准方法是使用一种称为“受控组件”的技术。
```

#### React的表单/受控组件的概念和value属性的用法
#### (表单的input和textarea和select类似,都是通过传入一个value属性来实现对组件的控制)
    在HTML当中，像<input>,<textarea>, 和 <select>这类表单元素会维持自身状态，并根据用户输入进行更新。
    但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState(). 方法进行更新.
    我们通过使react变成一种单一数据源的状态来结合二者。React负责渲染表单的组件仍然控制用户后续输入时所发生的变化。
    相应的，其值由React控制的输入表单元素称为“受控组件”。
```javascript
//例如，我们想要使上个例子中在提交表单时输出name,我们可以写成“受控组件”的形式:
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
//由于value属性是在我们的表单元素上设置的，因此显示的值将始终为React数据源上this.state.value的值。
//由于每次按键都会触发handleChange来更新当前React的state，所展示的值也会随着不同用户的输入而更新。
//使用”受控组件”,每个状态的改变都有一个与之相关的处理函数! 这样就可以直接修改或验证用户输入!
//例如，我们如果想限制输入全部是大写字母，我们可以将handleChange 写为如下：
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

#### textarea标签/value属性的使用
```javascript
//在HTML当中，<textarea> 元素通过子节点来定义它的文本内容
<textarea>
  Hello there, this is some text in a text area
</textarea>

//在React中，<textarea>会用value属性来代替。这样表单中的<textarea> 非常类似于使用单行输入的表单：
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
//注意this.state.value是在构造函数中初始化，这样文本区域就能获取到其中的文本。
```

#### select标签/value属性的使用
```javascript
//在HTML当中，<select>会创建一个下拉列表。例如这个HTML就创建了一个下拉列表的原型。
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>

//请注意，Coconut选项最初由于selected属性是被选中的。
//在React中，会在根select标签上而不是在当前的selected属性上使用value属性。
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### 多个输入的解决方法
```javascript
//当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    ar partialState = {};
    partialState[name] = value;
    this.setState(partialState);
  }
  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

#### 繁琐的受控组件的替代方法 ?
    有时使用受控组件可能很繁琐，因为您要为数据可能发生变化的每一种方式都编写一个事件处理程序，
    并通过一个组件来管理全部的状态。你或许应该看看非受控组件，这是一种表单的替代技术。

#### 状态提升(提取多个子组件的状态到父组件中)
    使用react经常会遇到几个组件需要共用状态数据的情况。
    这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。
    在React中,状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的.这就是所谓的状态提升
```javascript

```

#### 推荐组合,不推荐继承
    在Facebook网站上,我们的React使用了数以千计的组件,然而却还未发现任何需要推荐你使用继承的情况
    React的属性和组合为你提供了以清晰和安全的方式自定义组件的样式和行为所需的所有灵活性
    请记住,组件可以接受任意元素,包括基本数据类型、React元素或函数
```javascript
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

## React理念: 
    使用OOP的思想开发前端页面,一个页面是由各个灵活的组件对象组合而成的.
    每个组件对象本身都是"静态的外观+动态的功能"独立且完整的对象.
    对页面进行"拆分+组合"的架构设计思路.

#### React使用示例
[一个简单的使用React设计开发的示例](https://doc.react-china.org/docs/thinking-in-react.html)










