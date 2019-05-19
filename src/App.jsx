
import React from 'react'
import { HashRouter, Route, Link, Redirect } from 'react-router-dom'
// import antd component
import { Layout, Menu, Icon } from 'antd'

import Home from './compoents/Home.jsx'
import Movie from './compoents/Movie.jsx'
import About from './compoents/About.jsx'
const { Header, Content, Footer, Sider } = Layout
// import own css
import './assets/sass/app.scss'


function DefaultComponent () {
	return <Redirect path="/" to="/home" />
}

export default class App extends React.Component {
	constructor (props) {
		super(props)
		var hashParam = window.location.hash.split('/')[1]
		this.state = { initSelectComponent: hashParam ? hashParam : 'home' }

	}
	static getDerivedStateFromProps (props, state) {
		return state
	}
	render () {
		return <HashRouter>
			<Layout className="layout" style={{ width: '100%'}}>
		    <Header >
		      <div className="logo" />
		      <Menu
		        theme="dark"
		        mode="horizontal"
		        defaultSelectedKeys={ [this.state.initSelectComponent] }
		        style={{ lineHeight: '64px' }}
		      >        
		        <Menu.Item key="home">
        	 		<Link to="/home">
        	 			首页
       				</Link>
		        </Menu.Item>
		        <Menu.Item key="movie">
		         	<Link to="/movie">
		      			 电影	
		        	</Link>
		        </Menu.Item>
		        <Menu.Item key="about"> 
		        	<Link to="/about"> 
		        		关于 
		        	</Link>
		       	</Menu.Item>
		      </Menu>
		    </Header>
		    <Content>
		    	<Route path="/" exact={true}  component={ DefaultComponent }></Route>
		      <Route path="/home" component={ Home } />
		      <Route path="/movie" component={ Movie  } />
		      <Route path="/about" component={ About } />
		    </Content>
		    <Footer style={{ textAlign: 'center' }}>that is learn React example</Footer>
	    </Layout>
		</HashRouter>
	}
	componentDidMount () {
	}
	componentWillUnmount (prev, props) {
	}
}
