//redux tookit
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  loading: true,
  genreList: [],
  detailMovies: {},
  trailerVideo: {},
  movieReview: {},
};
// createSlice - 리듀서를 만들어 주는 객체를 매개 변수로
const movieSlice = createSlice({
  name: "movie", // 액션의 네임을 만들어줌
  initialState,
  reducers: {
    // 기존의 if else if, switch 역할, 함수(2개의 매개변수를 받음)
    //로딩 시작
    getMoviesRequest(state, action) {
      state.loading = true;
    },
    getMainMovies(state, action) {
      state.popularMovies = action.payload.popularMovies;
      state.topRatedMovies = action.payload.topRatedMovies;
      state.upcomingMovies = action.payload.upcomingMovies;
      state.genreList = action.payload.genreList;
      state.loading = false;
    },
    getMoviesFailure(state, action) {
      state.loading = true;
    },
    getDetailMovies(state, action) {
      state.detailMovies = action.payload.detailMovies;
      state.trailerVideo = action.payload.trailerVideo;
      state.movieReview = action.payload.movieReview;
      state.loading = false;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
