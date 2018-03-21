import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecordById } from '../actions/loadRecordsActions'
import RecordInfo from './RecordInfo'

export class RecordItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			recordList: [''],
			clicked: false,
			currentID: '',
			hovering: false,
			current_youtube_video: null,
			videoList: []
		}
		
		this.handleRecordClick       					= this.handleRecordClick.bind(this)
		this.getYoutubeVideos        					= this.getYoutubeVideos.bind(this)
		// this.updateCurrentYoutubeVideos				= this.updateCurrentYoutubeVideos.bind(this)
		// this.openYoutubeVideo									= this.openYoutubeVideo.bind(this)

	}

	handleRecordClick(){
		this.getYoutubeVideos()
	}

	getYoutubeVideos(){
  	this.props.getYoutubeVideo(this.props.resource_url)
	}

	openYoutubeVideo(video){
		// var video = 
		var newTab = window.open(video, '_blank')
		newTab.focus()
	}


	handleMouseover(){
		this.setState({ hovering: true })
	}

	handleMouseOut(){
		this.setState({ hovering: false })
	}

	render() {
	  return (
	  	<div className='record-image-container col-sm-3' onClick={this.handleRecordClick} key={Math.random()}>
  			<div className='record-details-container'>
	  			<img className='record-image' 
	  				onMouseEnter={ this.handleMouseover.bind(this) } 
	  				onMouseLeave={ this.handleMouseOut.bind(this) } 
	  				src={ this.props.imgSrc } 
	  				alt='Record' 
	  				id={ this.props.id } 
	  				/>
					{
						this.state.hovering === true
							? <RecordInfo
									artistName={this.props.artistName}
									recordTitle={this.props.recordTitle}
									label={this.props.label}
									year={this.props.year}
									resource_url={this.props.resource_url}
									youtube_videos={this.props.youtube_videos_array}
								/>
							: null
					}
				</div>
	  	</div>

	  )
	}
}


function mapStateToProps(state) {
	return {
		app: state,
	}
}

export default connect(mapStateToProps, { getRecordById })(RecordItem)