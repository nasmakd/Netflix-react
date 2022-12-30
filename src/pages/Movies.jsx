import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/action/movieAction';
import SyncLoader from 'react-spinners/SyncLoader';
import MovieCard from '../components/MovieCard';
import { Col, Row } from 'react-bootstrap';

const Movies = () => {
	const dispatch = useDispatch();
	const { popularMovies, topRatedMovies, upcomingMovies, loading } =
		useSelector((state) => state.movie);
	const [data, setData] = useState(popularMovies);
	const getFirstData = ()=>{
		const firstData = JSON.parse(sessionStorage.getItem("popularMovies"));
		setData(firstData);
		console.log(firstData)
	}
	useEffect(() => {
		dispatch(movieAction.getMovies());
		getFirstData();
	}, [dispatch]);
	if (loading) {
		return (
			<div className='loader-container'>
				<SyncLoader
					color='#F30F20'
					size={10}
					margin={4}
					loading={loading}
					aria-label='Loading Spinner'
					data-testid='loader'
				/>
			</div>
		);
	}
	return (
		<div className='movies'>
			<div className='sidebar'>
				<h3>Movies</h3>
				<ul className='moviesMenu'>
					<li onClick={() => setData(popularMovies)}>Popular</li>
					<li onClick={() => setData(topRatedMovies)}>Top Rated</li>
					<li onClick={() => setData(upcomingMovies)}>Upcoming</li>
				</ul>
			</div>
			<div className='movieContent'>
				<Row>
					{data.results &&
						data.results.map((item) => (
							<Col sm={4} md={3} xl={2} key={item.id} className='card-wrap'>
								<MovieCard item={item} />
							</Col>
						))}
				</Row>
			</div>
		</div>
	);
};

export default Movies;
