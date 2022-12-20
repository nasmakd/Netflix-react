import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import MovieExplain from '../components/MovieExplain';
import Reviews from '../components/Reviews';
import { movieAction } from '../redux/action/movieAction';

const MovieDetail = () => {
  const {id} = useParams()
	const { detailMovies, loading, trailerVideo, movieReview } = useSelector((state) => state.movie);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(movieAction.getMoviesDetail(id));
    window.scrollTo(0,0)  // 화면 제일 위로 올라간 상태로 열리게
	}, [dispatch, id]);

  if (loading) {
		return (
			<div className='loader-container'>
				<SyncLoader color='#F30F20' size={10} margin={4} loading={loading} aria-label='Loading Spinner' data-testid='loader' />
			</div>
		);
	}
	return (
    <div>
      <MovieExplain item={detailMovies} videoId={trailerVideo} />
      <Reviews reviews={movieReview} />
    </div>
  );
};

export default MovieDetail;
