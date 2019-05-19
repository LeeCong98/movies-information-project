
import React from 'react'
import { Rate } from 'antd'
import '../../assets/sass/movieListEvery.scss'

export default class MovieListEevery extends React.Component {
	constructor (props) {
		super(props)
		this.state = {}
	}
	render () {
		return <li className={['movieBox']}>
			<img src={ this.props.item.images.medium } />
			<h5 >
				电影名称: { this.props.item.title }
			</h5>
			<h5>
				上映时间： { this.props.item.year }
			</h5>
			<h5>
				电影类型： { this.props.item.genres.join() }
			</h5>
			<Rate allowHalf defaultValue={ this.props.item.rating.average / 2  } />
		</li>
	}
}