
import React from 'react'
import { Layout, Menu,Icon } from 'antd'
const { SubMenu } = Menu
const { Content,Sider } = Layout
import { Route, Link,Redirect,Switch } from 'react-router-dom'
// cite component 
import MovieList from './MovieChildComponents/MovieList.jsx'
// cite component
import MovieListEevery from './MovieChildComponents/MovieListEvery.jsx'
import MovieDetails from './MovieChildComponents/DetailsMovie.jsx'

function DefaultMovie () {
	return <Redirect to="/movies/in_theaters/1" />
}
export default class Movie extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			prevMovieType: this.props.location.pathname.split('/')[2] ? this.props.location.pathname.split('/')[2] : 'in_theaters'
		}
	}
	render () {
		return <div style={{ width: '100%', height: '100%'  }}>
		   	<Layout style={{  background: '#fff', width: '100%', height: '100%' }}>
    	     <Sider width={200} style={{ background: '#fff', borderRight: '1px solid #ccc' }}>
    	       <Menu
    	         mode="inline"
    	         defaultSelectedKeys={[this.state.prevMovieType]}
               selectedKeys={ [this.state. prevMovieType] }
    	         style={{ height: '100%' }}
    	       >
 							<Menu.Item key="in_theaters">
 								<Link to="/movies/in_theaters/1">
 									正在热映
 								</Link>
 							</Menu.Item>
              <Menu.Item key="coming_soon">
              	<Link to="/movies/coming_soon/1" >最近上映</Link>
              </Menu.Item>
              <Menu.Item key="top250" >
              	<Link to="/movies/top250/1">Top250</Link>
              </Menu.Item>
    	       </Menu>
    	     </Sider>
    	     <Content style={{ padding: '0 24px', minHeight: '800px' }}>
    	     	<Route path="/movies" exact component={ DefaultMovie } />
            <Switch>
              <Route path="/movies/details/:id/" exact component={ MovieDetails } />
              <Route path="/movies/:requestType/:pageDigit"  exact component={ MovieList } />
            </Switch>       
    	     </Content>
		  </Layout>
		</div>
	}
  static getDerivedStateFromProps (props, state) {
    return state
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevMovieType: nextProps.location.pathname.split('/')[2] ? nextProps.location.pathname.split('/')[2] : 'in_theaters'})
    }
    return true
  }
  getSnapshotBeforeUpdate (prevProps, prevState) {
      return null
  }
  componentDidUpdate () {
  }
}