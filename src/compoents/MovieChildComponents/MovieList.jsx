
import React from 'react'
import fetchJsonp from 'fetch-jsonp'
import { Spin,Alert } from 'antd'
import MovieListEevery from './MovieListEvery.jsx'
import '../../assets/sass/movieListStyle.scss'

export default class TopList extends React.Component {
	constructor (props) {
		super(props) 
		// + state init 
		this.state = {
			movies: [],
			loading: true,
			pageSize: 24,
			prevMovieType: window.location.hash.split('#')[1]
		}
	}
	// dataLoading
	loadingData () { 
		var pageDigit = this.props.match.params.pageDigit  ?  this.props.match.params.pageDigit : 1
		var start = this.pageSize * (this.props.match.params.pageDigit - 1)   
		var movieRequestUrl = `https://douban.uieee.com/v2/movie/${ this.props.match.params.requestType }?start=${ start }&count=${this.state.pageSize }`
		fetchJsonp(movieRequestUrl, {
  	})
	  .then(response => {
	  	return response.json()
	  })
	  .then((response) => {
	  		this.setState({ movies: response})
	  		this.setState({ loading: false })
	  })
	  .catch(ex => {  
	    	this.setState({ loading: false })
		})
	}
	static getDerivedStateFromProps (props, state) {
		// 参数错误时重定向
		return state 
	}
	componentDidMount () { 
		this.loadingData()
	}
	render () {
		return <div className={['moviesContainer']}>
			 <div>
			 		<Spin className="loadingPrompt"  tip="Loading..." spinning={ this.state.loading  }>
			 		</Spin>
			 		<Alert 
	 					style={{ display: this.state.movies.subjects ? 'none' : 'block' }}
        		message="正在疯狂加载中~请稍等"
        		description="精彩内容马上呈现~"
        		type="info"
         	/>
			 </div>
			<ul>
			 {
					this.state.movies.subjects ? this.state.movies.subjects.map(item => {
						return <MovieListEevery item={ item } key={ item.id } />
					}) : null
				} 
			</ul>
		</div>
	}
	shouldComponentUpdate (nextProps, nextState) {
		return true
	}
	getSnapshotBeforeUpdate (props, state) {
		return null
	}
	componentDidUpdate (prevProps, prevState) {
		// 如果不是更新的路由就不发新的请求
		if (prevProps.match.params !== this.props.match.params) {
			this.loadingData()
		}
	}
}