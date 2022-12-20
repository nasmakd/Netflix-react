//middleware 부분
// https://developers.themoviedb.org/3/movies/get-popular-movies
// 로딩 스피너 부분 추가
// 장르 추가
// 디테일 추가
// 유튜브 추가

import api from '../api';
const APIKey = process.env.REACT_APP_APIKEY;
// 받아온 key값을 노출 되지 않게 만든다. -> 루트에 .env파일

// 미들웨어는 함수가 함수를 리턴
//영화 데이터 가져오기
function getMovies() {
	return async (dispatch) => {
		try {
			dispatch({ type: 'GET_MOVIE_REQUEST' }); // 로딩 전 던져줌
			const popularMovieApi = await api.get(
				`/movie/popular?api_key=${APIKey}&language=ko-KR&page=1`
			);
			const topRatedMovieApi = await api.get(
				`/movie/top_rated?api_key=${APIKey}&language=ko-KR&page=1`
			);
			const upcomingMovieApi = await api.get(
				`/movie/upcoming?api_key=${APIKey}&language=ko-KR&page=1`
			);
			const genreApi = await api.get(
				`/genre/movie/list?api_key=${APIKey}&language=ko-KR`
			);

			// 3개의 데이터를 병렬로 동시에
			// let data = await Promise.all([popularMovieApi, topRatedMovieApi, upcomingMovieApi]);

			// 따로 받아옴
			let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
				await Promise.all([
					popularMovieApi,
					topRatedMovieApi,
					upcomingMovieApi,
					genreApi,
				]);
			//데이터 도착 후
			dispatch({
				type: 'GET_MOVIE_SUCCESS',
				payload: {
					popularMovies: popularMovies.data,
					topRatedMovies: topRatedMovies.data,
					upcomingMovies: upcomingMovies.data,
					genreList: genreList.data.genres,
				}, //data필드만 보내줌, axios는 받은 데이터를 data필드에 넣어서 줌
			});
		} catch (error) {
			// error 핸들링
			dispatch({ type: 'GET_MOVIE_FAIL' });
		}
	};
}

// 디테일 데이터 가져오기
function getDetailMovies(id) {
	return async (dispatch) => {
		try {
			dispatch({ type: 'GET_D_MOVIE_REQUST' });
			const detailMovieApi = await api.get(
				`/movie/${id}?api_key=${APIKey}&language=ko-KR`
			);
			const trailerVideoApi = await api.get(	
				`/movie/${id}/videos?api_key=${APIKey}&language=en-US`
			);
			const movieReviewApi = await api.get(
				`/movie/${id}/reviews?api_key=${APIKey}&language=en-US&page=1`
			);
			let [detailMovies, trailerVideo, movieReview] = await Promise.all([
				detailMovieApi,
				trailerVideoApi,
				movieReviewApi
			]);
			console.log('trailerVideo의 data는?  ', movieReview);
			dispatch({
				type: 'GET_D_MOVIE_SUCCESS',
				payload: {
					detailMovies: detailMovies.data,
					trailerVideo: trailerVideo.data,
					movieReview: movieReview.data,
				},
			});
		} catch (error) {
			dispatch({ type: 'GET_D_MOVIE_FAIL' });
		}
	};
}

export const movieAction = { getMovies, getDetailMovies };
/*
  API 호출 하는 방법
  1. fetch  / 2. ajax  / 3. axios - 1보다 더 많은 기능, 라이브러리 형태
  https://axios-http.com/kr/docs/intro
*/
