import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ item }) => {
	const { genreList } = useSelector((state)=>state.movie);
  const navigate = useNavigate();
  // 카드 클릭시 디테일 페이지로 전환
	const goToDetail = ()=>{
    navigate(`/movies/${item.id}`)
  }
  // console.log(item)
  return (
		<div onClick={goToDetail}
			className='slide-card'
			style={{
				backgroundImage: `url('https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/${item.backdrop_path}')`,
			}}>
			<div className='card-info'>
				<h5>{item.title}</h5>
				<div>
					{item.genre_ids.map((id) => (
						<Badge key={id} bg='danger'>{genreList.find((item)=> item.id === id)?.name}</Badge>
					))}
				</div>
				<div className='card-infoSub'>
					<span className='star'>⭐ {item.vote_average}</span>
					<span className={item.adult ? 'r-rated' : 'g-rated'}>
						{item.adult ? 'R-rated' : 'G-rated'}
					</span>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
