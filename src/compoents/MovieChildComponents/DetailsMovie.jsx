
import React from 'react'
import { Button, Icon, notification, Alert } from 'antd'
import fetchJsonp from 'fetch-jsonp'
import './../../assets/sass/movieDetails.scss'

/**
 * [paramsiSLegal 页面请求id验证]
 * @param  {[type]} itemId [当前的请求id]
 * @return {[type]}        [boolean]
 */
function paramsiSLegal (itemId) {
		var itemId = parseInt(itemId)
		if (itemId < 0 || isNaN(itemId)) {
			return false
		}
		return true
}
/**
 * [getMovieDetails 请求电影数据]
 * @param  {[type]} movieId [电影id]
 * @return {[type]}         [callback]
 */
function getMovieDetails (movieId) {
	fetchJsonp('https://douban.uieee.com/v2/movie/subject/' + this.props.match.params.id)
	.then(task => task.json())
	.then(response => {
		this.setState({ movieInfo: response })
	})
	.catch(ex => {
		userPrompt('error', '额，获取电影详细失败', '正在返回电影列表....', this.props.history)

	})
}
function userPrompt (type , title, content, history) {
  notification[type]({
    message: title,
    description:
      content,
    duration: 2
  })
  // 返回上一级页码 
  history.goBack()
}


export default class MovieDetails extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			movieInfo: {}  // -> 电影数据对象
		} 
		paramsiSLegal(this.props.match.params.id) ? null : this.props.history.goBack() 
	}
	// back prev page 
	backMovieList = () => {
		this.props.history.go(-1)
	}
	static getDerivedStateFromProps (props ,state) {
		return state
	}
	componentDidMount () {
		getMovieDetails.call(this)
	}
	render () {
		if (this.state.movieInfo.images) {
			return <div className={['movie-details']}>
				<Button 
					type="primary" onClick={ this.backMovieList }
					style={{ marginTop: '10px'}}>
	        <Icon type="left" />
	        返回电影列表
	      </Button>
	     <div className={ ['detailsContent']}>
	     	 <h1>{ this.state.movieInfo.title }</h1>
	     	 <div>
	     	 		<img src={  this.state.movieInfo.images.large }  alt="" /> 	
	     	 		<div>
     	 				<ul>
			     	 		<li >演员表</li>
				     	 	{ this.state.movieInfo.casts.map(item => {
				     	 		return <li key={ item.id}>{ item.name }</li>
				     	 	})}
     	 				</ul>
     	 				<h4>地区：{ this.state.movieInfo.countries.join(' ')  }</h4>
     	 				<h5>语言：{ this.state.movieInfo.languages.join(' ')  }</h5>
     	 				<h6>电影类别：{ this.state.movieInfo.genres.join(' ')  }</h6>
     	 				<p>剧本： { this.state.movieInfo.writers.length ? this.state.movieInfo.writers.map(item => {
     	 									return item.name + ' '
     	 				}) : '暂无资料' }</p>
	     	 		</div>
	     	 </div>
	     	 <p><strong>剧情简介： </strong>{ this.state.movieInfo.summary }</p>
	     	 
	     </div>
			</div>
		} else {
			return <div className={['movie-details']}>
				<Alert 
 					style={{ display: this.state.movies ? 'none' : 'block' }}
      		message="正在疯狂加载中~请稍等"
      		description="精彩内容马上呈现~"
      		type="info"
        />
			</div>
		}
	}
	shouldComponentUpdate () {
		if (this.props.match !== this.props.match && !paramsiSLegal(this.props.match.params.id)) {
			this.props.history.goBack() 
			return false
		}
		return true
	}
}