
import React from 'react'
import '../assets/sass/home.scss'
export default class Index extends React.Component {
	constructor (props) {
		super(props)
		this.state = {}
	}
	render () {
		return <div className={['home']}>
			首页
		</div>
	}
}