
import React from 'react'
import fetchJsonp from 'fetch-jsonp'
import { Spin,Alert,Pagination,Modal } from 'antd'
import MovieListEevery from './MovieListEvery.jsx'
import '../../assets/sass/movieListStyle.scss'

/**
 * [handlerMaximum 验证是否超出页码]
 * @param  {[type]} pageDigit [页码数]
 * @return {[type]}           [boolean]
 */
function handlerMaximum (pageDigit) {
	var maximumPageDigit = Math.ceil(this.state.totalPage / this.state.pageSize)
	if (pageDigit > maximumPageDigit) {
	 	return this.alert('warning' ,'警告', '超出最大的页码数！',() => {
	 		this.props.history.push('/movies/' + this.props.match.params.requestType + '/' + maximumPageDigit) 
	 		this.setState({ loading: false, isShowPrompt: false })
	 	}) && false
	}
	return true 
}
/**
 * [handlerMinimum 验证是否非法页码]
 * @param  {[type]} pageDigit [页码数]
 * @return {[type]}           [boolean]
 */
function handlerMinimum (pageDigit) {
	if (pageDigit < 0 || isNaN(pageDigit) ){ 
		return this.alert('warning' ,'警告', '页码值非法!',() => {
			this.props.history.push('/movies/' + this.props.match.params.requestType + '/' + 1)
			this.setState({ loading: false, isShowPrompt: false })
		}) && false
	}
	return true
}

export default class TopList extends React.Component {
	constructor (props) {
		super(props) 
		// + state init 
		this.state = {
			movies: [],
			loading: true,
			pageSize: 24,
			prevMovieType: window.location.hash.split('#')[1],
			totalPage: null,
			isShowPrompt: true
		}
	}
	// ant design Warning 
	alert (type , title, content, callback) {
	  Modal[type]({
	    title,
	    content,
	    onOk: callback ? callback : null 
	  })
	}
	// page init dataLoading and again loading
	loadingData (requestType, pageDigit) {
		var flag = true
		// 最大页码校正
		if (this.state.totalPage) {
			flag = handlerMaximum.call(this, pageDigit)
		}
		if (!flag) return 

		// 最小页码校正
		flag = handlerMinimum.call(this, pageDigit)
		if (!flag) return 

		// 数据类型准换以及start换算
		var pageDigit = parseInt(pageDigit)
		var start = this.state.pageSize * (pageDigit - 1)   
		var movieRequestUrl = `https://douban.uieee.com/v2/movie/${ requestType }?start=${ start }&count=${this.state.pageSize }`

		// 请求数据
		fetchJsonp(movieRequestUrl)
	  .then(task => {
	  	return task.json()
	  })
	  .then((response) => {
	  		// 初次超出最大校正
	  		if (response.start > response.total) {
	  			return this.alert('info','警告', '获取数据失败或超过最大页码数!',() => {
	  				this.props.history.push('/movies/' + this.props.match.params.requestType + '/' + 1)
	  			}) && null
	  		}
	  		this.setState({ movies: response, loading: false, totalPage: response.total, isShowPrompt: false})
	  })
	  .catch(ex => {  
	    	this.setState({ loading: false, isShowPrompt: false })
		})
	}
	handlerChangePageDigit = (newDigit) => {
		this.props.history.push('/movies/' + this.props.match.params.requestType + '/' + newDigit)
	}
	static getDerivedStateFromProps (props, state) {
		return state
	}
	componentDidMount () { 
		this.loadingData(this.props.match.params.requestType, this.props.match.params.pageDigit)
	}
	render () {
		return <div className={['moviesContainer']}>
			 <div>
			 		<Spin className="loadingPrompt"  tip="Loading..." spinning={ this.state.loading  }>
			 		</Spin>
			 		<Alert 
	 					style={{ display: this.state.movies ? 'none' : 'block' }}
        		message="正在疯狂加载中~请稍等"
        		description="精彩内容马上呈现~"
        		type="info"
         	/>
			 </div>
			<ul>
			 {
					this.state.movies.subjects ? this.state.movies.subjects.map(item => {
						return <MovieListEevery  
							item={ item } 
							key={ item.id }
							history={ this.props.history }
							/>
					}) : null
				} 
			</ul>
			<div style={{ 'display': this.state.totalPage ? 'block' : 'none'}}>
				<Pagination 
					current={ parseInt(this.props.match.params.pageDigit) }
					onChange={ this.handlerChangePageDigit }
					pageSize={ this.state.pageSize }
				  total={ this.state.totalPage } />
			</div>
		</div>
	}
	shouldComponentUpdate (nextProps, nextState) {
		return true
	}
	getSnapshotBeforeUpdate (props, state) {
		return null
	}
	componentDidUpdate (prevProps, prevState) {
		// 先判断是否更新的是不是路由状态，然后在判断是否更新完了状态
		if (prevProps.match.params !== this.props.match.params) {
				if (prevProps.match.params.requestType === this.props.match.params.requestType && prevProps.match.params.pageDigit === this.props.match.params.pageDigit) {	
					this.loadingData(this.props.match.params.requestType, this.props.match.params.pageDigit)
				}	
		}
	}
}