//api 불러오기 위한 세팅
// 로딩스피너 사용 추가
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import MovieSlide from '../components/MovieSlide';
import { movieAction } from '../redux/action/movieAction';
import SyncLoader from 'react-spinners/SyncLoader';

const Home = () => {
	const dispatch = useDispatch();
	const { popularMovies, topRatedMovies, upcomingMovies, loading } = useSelector((state) => state.movie); //store에서 가져옴, loading 상태도 추가
	// console.log('현재 Home, ', popularMovies);
	useEffect(() => {
		dispatch(movieAction.getMovies());
	}, [dispatch]);
	// 창이 열리자마자 데이터가 불러와져야 함, 리덕스 미들웨어 이용

	// 로딩 true - 데이터 도착 전 로딩 스피너 보여줌
	// 로딩 false - 데이터 도착 후 , 에러 => 데이터 보여줌, 에러메세지
	if (loading) {
		return (
			<div className='loader-container'>
				<SyncLoader color='#F30F20' size={10} margin={4} loading={loading} aria-label='Loading Spinner' data-testid='loader' />
			</div>
		);
	}

	return (
		<div>
			{upcomingMovies.results && <Banner movie={popularMovies.results[0]} />}
			<div className="slide-container">
				<h2>Popular Movies</h2>
				<MovieSlide movie={popularMovies} />
				<h2>Top Rated Movies</h2>
				<MovieSlide movie={topRatedMovies} />
				<h2>Upcoming Movies</h2>
				<MovieSlide movie={upcomingMovies} />
			</div>

		</div>
	);
};
//조건부 렌더링을 걸지 않으면 데이터를 받아오기 전엔 에러라고 표시
export default Home;
