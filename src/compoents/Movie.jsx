
import React from 'react'
import { Layout, Menu,Icon } from 'antd'
const { SubMenu } = Menu
const { Content,Sider } = Layout
import { Route, Link,Redirect } from 'react-router-dom'
// cite component 
import MovieList from './MovieChildComponents/MovieList.jsx'
// cite component
import MovieListEevery from './MovieChildComponents/MovieListEvery.jsx'


function DefaultMovie () {
	return <Redirect to="/movie/in_theaters/1" />
}

export default class Movie extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			prevMovieType: window.location.hash.split('/')[2]
		}
	}
	render () {
		return <div style={{ width: '100%', height: '100%'  }}>
		   	<Layout style={{  background: '#fff', width: '100%', height: '100%' }}>
    	     <Sider width={200} style={{ background: '#fff', borderRight: '1px solid #ccc' }}>
    	       <Menu
    	         mode="inline"
    	         defaultSelectedKeys={[this.state.prevMovieType]}
    	         style={{ height: '100%' }}
    	       >
 							<Menu.Item key="in_theaters">
 								<Link to="/movie/in_theaters/1">
 									正在热映
 								</Link>
 							</Menu.Item>
 							<Menu.Item key="coming_soon">
              	<Link to="/movie/coming_soon/1">最近上映</Link>
              </Menu.Item>
              <Menu.Item key="top250">
              	<Link to="/movie/top250/1">Top250</Link>
              </Menu.Item>
    	       </Menu>
    	     </Sider>
    	     <Content style={{ padding: '0 24px', minHeight: '800px' }}>
    	     	<Route path="/movie" exact component={ DefaultMovie } />
    	     	<Route path="/movie/:requestType/:pageDigit" component={ MovieList }></ Route>
    	     </Content>
		  </Layout>
		</div>
	}
  shouldComponentUpdate () {
    return true
  }
}