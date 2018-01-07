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

#### 函数定义/类定义组件
```javascript

```


#### 


























