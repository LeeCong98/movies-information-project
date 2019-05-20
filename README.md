# 基于豆瓣API打造的React电影项目

## 技术栈

### 前端

- 业务框架
  - React
- UI
  - Ant Design React
- Route
  - react-router-dom
- stylesheet
  - sass
- build cli
  - webpack 4.4.x
  - webpack-cli 4.x
- 数据渲染
  - 客户端渲染

### 后端

- 是基于豆瓣的v 2`version` API
  - 因为官方API已经不能在请求了（404），这里的请求地址为私人搭建的nginx代理API
  - 因为代理API有限制次数，几个搭建者都在使用这套API，希望珍惜它人劳动资源，节省使用次数

## 基本使用

![product](https://github.com/icongL/movies-information-Projuct/blob/master/images/movies.png)

### 应用类型

- **single application page**

### 项目布局

- 使用最基本的『上-中-下』布局。

### 基本路由

- `/home`

- `/movie`
- `/about`

#### 路由LInk

- 你不能在Link中直接渲染组件

  ```javascript
  <Link to="index"><Menu.Item key="2"></Menu.Item key="2"></Link>
  ```

- 记录路由状态

  - 在刷新的时候，你可以通过纪录window.location.hash中的hash值，通过split分割参数，将初始化的绑定值进行操作

```javascript
// 在后面纪录hash值，进行初始化纪录状态初始化
defaultSelectedKeys={ [window.location.hash.split('')[0]]}
```

### 针对设计改造布局

- 删除面包屑的导航
- 删除主要内容的的padding
- 增加侧边栏以及内容区

### 侧边栏

- 使用部分的官网侧边栏组件
- 注意需要删除不需要的参数

### 电影分页

- 路由改造
- Link改造
- 内容区改造

##### 路由改造

- 将侧边栏的内容改造为Link并传递默认参数

```javascript
<Link to="/movie/in_theaters/1">
 正在热映
</Link>
```

##### 路由组件共用原则

- 在一个开发领域，需要是一些路由切换的UI完全相同，或者部分不同，我们就可以使用路由组件复用的原则

  - 也就是说共用一个组件，通过传递不同的参数做不同的数据渲染和稍微调整一下UI布局

- codeing

  ```javascript
  <Route path="/movie/:RequestType/:pageDigit" component={ MovieList }></ Route>
  ```

### 电影列表展示

#### 加载提示

- 在使用前端后分离的项目中，一定会使用到这类加载提示，他不仅让你的程序更加人性化，从根据上来说，解决你产品用户体验

- 这里使用ant Design的Spin组件
  - 删减了部分的内容

### fetch数据请求

- 这里涉及到了跨域问题，需要使用fetch-jsonp

- 这里使用一个包，fetch-jsonp

  - 安装

    - `npm i fetch-jsonp -S`

  - 使用

    - 一个简单地jsonp请求

    ```javascript
    fetchJsonp('/users.jsonp', {
        jsonpCallback: 'custom_callback',
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
    ```

- 注意因为电影列表共用一个组件，你即需要在

### 解决在React中更新数据导致的数据重复请求

- 因为我们在电影列表中，使用了三个侧边栏，每个菜单都指向一个组件，组件根据不同的参数做不一样的渲染
- 此时因为根据数据不同做渲染，但是每一次数据的更新都会触发React的运行周期函数，如果单纯在页面初始化的时候和数据更新的时候，进行数据请求，就会造成钩子的递归

#### 解决方案

- 参数对比（该方案存在bug(参数更新两次的问题)，进行了优化）

  - 这里没有使用参数变化的对比，因为用户如果重新点击该链接，我们也应当为其更新数据，所以这个方法虽然从维护性来说比较差，但是解决了问题
  - 使用对比参数屏蔽,在我们的组件中，一共会有三个数据变化会触发我们的钩子函数，此时我们需要作判断，使得只有我们需要变化的数据产生了变化，我们才启用数据请求
  - 这里利用了引用类型的指针对比，在一个引用类型中，即使其中的简单类型发生了变化，其实对其地址的引用已经变化

  ```javascript
  if (prevProps.match.params !== this.props.match.params) { // 这里需要对对比是否更新了路由以及是否参数更新完毕，更新完成则发起新的请求
  	this.loadingData()
  }
  ```

- 为三个按钮注册事件并指定一个handlerEvent，然后用户点击时，在请求数据

  - 但是该方法依然不是最优化，他不能依靠组件单独工作，这并不是我想要的

- 组件强制重载

### 分页

- 使用ant Design 的分页组件

  ```javascript
  import { Pagination } from 'antd'
  
  ReactDOM.render(<Pagination defaultCurrent={6} total={500} />, mountNode)
  ```

- 通过分页的onChange事件实现分页跳转

  - 通过点击change事件点击的页码然后重新数据请求

- 注意

  - 一定要严格验证请求的页码，不要向服务器发送错误请求！

  - 验证最大页码

    ```javascript
    
    ```

  - 验证最小页码

    ```javascript
    
    ```

### 解决豆瓣图片加载 `403`问题

- 使用隐藏域

  ```javascript
  <meta name="referrer" content="never">
  ```

- 使用图片缓存地址

  ```javascript
  https://images.weserv.nl/?url=[需要存在的图片地址]
  ```

### 影片详情页

- 通过点击列表影片项来实现路由参数跳转

  ```javascript
  toDetails = () => {
    this.props.history.push('/movies/details/' + this.props.item.id)
  }
  ```

- 注意开启前个路由的严格路由匹配，否则匹配两个Route

### 解决非Route组件props中没有history的问题

- 在Rect中，如果不是由route路由规则匹配的对象，那么组件的props中没有match或者history这三个对象，

#### 解决方案

- 如果有上一级组件是Route匹配组件，那么向需要的组件传递history

  ```javascript
  history={ this.props.history }
  ```

- 使用withRouter为组件对象props添加路由对象

  ```javascript
  import { WithRouter } from './react-router-dom'
  export default withRouter(YourComponent)
  ```

- 使用withRouter和connect进行添加

  ```javascript
  export default withRouter(connect(mapStateToProps)(YourComponent))
  ```

### 使用switch解决路由匹配规则相近路由组件重叠问题

- Demo的路由
  - 电影列表路由为 `/movies/:requestType/:count`
  - 电影详情路由为`/movies/details/:movieId:`
- 此时两个路由就会产生组件重叠问题
  - 即使你使用exact严格匹配，因为 `/movies/:requestType/:count也认为details是一个参数而非一个规则
  - `不要觉得这样的路由设计比较没有水准，为了就是突出某些问题，这样的路由我相信你会遇到很多`

#### 解决方案

- 使用React-Router的Switch嵌套唯一匹配路由

  ```javascript
   <Switch>
     <Route path="/movies/details/:id/" exact component={ MovieDetails } />
     <Route path="/movies/:requestType/:pageDigit"  exact component={ MovieList } />
   </Switch> 
  ```

  - 有<Switch>标签，则其中的<Route>在路径相同的情况下，只匹配第一个，这个可以避免重复匹配；

  - 无<Switch>标签，则其中的<Route>在路径相同的情况下全都会匹配。更严重的是，还会匹配上级路径的

- <Switch>将会开始寻找相匹配的<Route>。<Route path="/about" />将会被匹配到，紧接着 <Switch>会停止继续匹配并且渲染<About>。同理，如果URL是/michael，那么<User>将会被渲染。

## 阻止一切非法的页面请求

- 对于错误的参数的url，在请求之前就应当拦截

  ```javascript
  var itemId = parseInt(this.props.item.id)
  if (itemId < 0 || isNaN(itemId)) {
      return false
  }
  this.props.history.push('/movies/details/' + itemId)
  ```

- 即使在路由中匹配到了该路由也应当去检查参数合理性

  