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
							<span className='star'>โญ {item.vote_average}</span>
              <span> ๐คฉ {item.popularity}</span>
							<span className={item.adult ? 'r-rated' : 'g-rated'}>
								{item.adult ? '๐ซR-rated' : 'โ G-rated'}
							</span>
						</div>
            <div className='detail-overview'>
              {item.overview ?  item.overview : 'ํด๋น ์ธ์ด์ ์ค๊ฑฐ๋ฆฌ๊ฐ ์กด์ฌํ์ง ์์ต๋๋ค.'}
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
