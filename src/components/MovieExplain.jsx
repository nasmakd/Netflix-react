import React from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import Trailer from './Trailer';

const MovieExplain = ({ item, videoId }) => {
	return (
		<div className='movieExplain'>
			<Container>
				<Row>
					<Col sm>
						<img
							className='detail-img'
							src={`https://www.themoviedb.org/t/p/original/${item.poster_path}`}
							alt=''
						/>
					</Col>
					<Col className='detail_info'>
						<h1>{item.title}</h1>
						<p>{item.tagline}</p>
            <div className="genre">
              {item.genres?.map((item)=>(
                <Badge bg='danger' key={item.id}>{item.name}</Badge>
                ))}
            </div>
						<div className='rate_info'>
							<span className='star'>⭐ {item.vote_average}</span>
              <span> 🤩 {item.popularity}</span>
							<span className={item.adult ? 'r-rated' : 'g-rated'}>
								{item.adult ? '🚫R-rated' : '✔ G-rated'}
							</span>
						</div>
            <div className='detail-overview'>
              {item.overview ?  item.overview : '해당 언어의 줄거리가 존재하지 않습니다.'}
            </div>
            <div>
              <Trailer item={videoId} />
            </div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default MovieExplain;
