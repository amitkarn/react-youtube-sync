//=====================================
//  video.js : Containing utils related to video objects
//-------------------------------------

export const videoUtils = {

	/**
	 * Return the video details in a specified format, based on the video source
	 * @param video
	 * @param videoSource
	 * @returns {{id, thumbnailSrc, title, description}}
	 */
	getVideoDetails: ( video, videoSource ) => {
		switch ( videoSource ) {

			case 'youtube':
				return getYoutubeVideoDetails ( video )

			default:
				break
		}
	},

	/**
	 * Construct & return a video url based on the videoSource
	 * @param videoSource
	 * @param videoId
	 * @returns {*}
	 */
	getVideoUrl: ( videoSource, videoId ) => {
		switch ( videoSource ) {
			case 'youtube':
				return `https://www.youtube.com/watch?v=${videoId}&origin=http://192.168.1.19`
			default:
				return null
		}
	},

	/**
	 * Get the amounts of seconds in a video corresponding to the x position of a mouseEvent in a DOM element
	 * effectively making it possible to turn any DOM element into a video-seekbar
	 * ( I.E. 342px X position in an element with a width of 1000px
	 * corresponds to 171 seconds into a video with a videoDuration of 500 seconds )
	 * @param clickEvent
	 * @param videoDuration
	 * @returns {*|number}
	 */
	getAmountOfSecondsAtXPos: (clickEvent, videoDuration) => {
		const parentWidth = clickEvent.target.getBoundingClientRect ().width
		const relativeMousePosition = {
			relativeX: clickEvent.clientX - clickEvent.target.getBoundingClientRect ().left,
			relativeY: clickEvent.clientY - clickEvent.target.getBoundingClientRect ().top
		}

		return videoUtils.pixelsToSeconds ( relativeMousePosition.relativeX, parentWidth, videoDuration )
	},

	/**
	 * Returns the number of seconds corresponding to the x-position in a video seek-bar element
	 * @param xPos
	 * @param elementWidth
	 * @param videoDuration
	 * @returns {number}
	 */
	pixelsToSeconds: ( xPos, elementWidth, videoDuration ) => {
		return ( xPos / elementWidth ) * videoDuration
	},

	/**
	 * Returns the amount of pixels in a seekbar element corresponding to a number of seconds in a video
	 * @param seconds
	 * @param elementWidth
	 * @param videoDuration
	 * @returns {number}
	 */
	secondsToPixels: ( seconds, elementWidth, videoDuration ) => {
		return ( seconds / videoDuration ) * elementWidth
	},

	/**
	 * Map Youtube player state to a human readable string
	 * @param event
	 * @returns {*}
	 */
	getYoutubePlayerState: ( event ) => {
		let state = ''
		switch ( event.data ) {
			case -1:
				state = 'unstarted'
				break;
			case 0:
				state = 'ended'
				break;
			case 1:
				state = 'playing'
				break;
			default:
			case 2:
				state = 'paused'
				break;
			case 3:
				state = 'buffering'
				break;
			case 5:
				state = 'video cued'
				break;
		}

		return state
	}
}

/**
 * Return Youtube video details in our defined video details format
 * @param video
 * @returns
 * {{id: string,
 * thumbnailSrc: (string),
 * title: (string),
 * description: (string)}}
 */
const getYoutubeVideoDetails = ( video ) => {
	const snippet = video.snippet

	return {
		id: video.id.videoId,
		thumbnailSrc: snippet.thumbnails.medium.url,
		title: snippet.title,
		description: snippet.description
	}
}