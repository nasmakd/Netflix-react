//middleware 부분 tookit

import api from "../api";
import { movieActions } from "../reducers/movieReducer";
const APIKey = process.env.REACT_APP_APIKEY;
// 받아온 key값을 노출 되지 않게 만든다. -> 루트에 .env파일

// 미들웨어는 함수가 함수를 리턴
//영화 데이터 가져오기
function getMovies() {
  return async (dispatch) => {
    try {
      dispatch(movieActions.getMoviesRequest()); // 로딩 전 던져줌
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${APIKey}&language=ko-KR&page=1`
      );
      const topRatedMovieApi = api.get(
        `/movie/top_rated?api_key=${APIKey}&language=ko-KR&page=1`
      );
      const upcomingMovieApi = api.get(
        `/movie/upcoming?api_key=${APIKey}&language=ko-KR&page=1`
      );
      const genreApi = api.get(
        `/genre/movie/list?api_key=${APIKey}&language=ko-KR`
      );

      let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedMovieApi,
          upcomingMovieApi,
          genreApi,
        ]);

      //데이터 도착 후
      dispatch(
        movieActions.getMainMovies({
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upcomingMovies: upcomingMovies.data,
          genreList: genreList.data.genres,
        })
      );
    } catch (error) {
      // error 핸들링
      dispatch(movieActions.getMoviesFailure());
    }
  };
}

// 디테일 데이터 가져오기
function getMoviesDetail(id) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.getMoviesRequest());

      const detailMovieApi = api.get(
        `/movie/${id}?api_key=${APIKey}&language=ko-KR`
      );
      const trailerVideoApi = api.get(
        `/movie/${id}/videos?api_key=${APIKey}&language=en-US`
      );
      const movieReviewApi = api.get(
        `/movie/${id}/reviews?api_key=${APIKey}&language=en-US&page=1`
      );
      let [detailMovies, trailerVideo, movieReview] = await Promise.all([
        detailMovieApi,
        trailerVideoApi,
        movieReviewApi,
      ]);
      console.log("movieReview data는?  ", movieReview);
      dispatch(
        movieActions.getDetailMovies({
          detailMovies: detailMovies.data,
          trailerVideo: trailerVideo.data,
          movieReview: movieReview.data,
        })
      );
    } catch (error) {
      dispatch(movieActions.getMoviesFailure());
    }
  };
}

export const movieAction = { getMovies, getMoviesDetail };
/*
  API 호출 하는 방법
  1. fetch  / 2. ajax  / 3. axios - 1보다 더 많은 기능, 라이브러리 형태
  https://axios-http.com/kr/docs/intro
*/
