import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import YouTube from 'react-youtube';	
//모달을 이용한 유튜브 팝업
const Trailer = ({ item, reviews }) => {
	const [show, setShow] = useState(false);

	const _onReady = (e)=>{
    // access to player in all event handlers via event.target
    e.target.playVideo();
  }

	// "Official trailer"가 있을 때
	const trailer = item.results?.find((item) => {
		if (item.name === 'Official Trailer') {
			return item
		}
	});
	
	// type에 trailer가 있을 때
	const trailer2 = item.results?.find((item) => {
		if (item.type === 'Trailer') {
			return item;
		}
	});

	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	return (
		<div>
			<p onClick={() => setShow(true)} className='trailer_btn'>
				🎬 트레일러 보기 →
			</p>

			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName='modal-90w'
        >
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<YouTube videoId={ trailer?.key ? trailer?.key : trailer2?.key } opts={opts} onReady={_onReady} />
				</Modal.Body>
			</Modal>
		</div>
	);
};
// item.results[0].key - 무조건 첫번째 유튜브 영상을 보여줌
// "Official Trailer"가 있을때
export default Trailer;
