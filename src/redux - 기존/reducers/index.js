// 여러 리듀서를 하나로 모아주는
import {combineReducers} from 'redux'
import movieReducer from './movieReducer'

export default combineReducers({movie: movieReducer})
