import React from 'react'
import { Container } from 'react-bootstrap'

const Reviews = ({reviews}) => {

  return (
    <div id='reviews'>
      <Container>
        <h2>리뷰</h2>
        <ul className='reviewList'>
          { reviews?.results.length === 0 ? <li className='review_none'>등록된 리뷰가 없습니다.</li> : 
            reviews?.results && reviews?.results.map((item)=>(
              <li key={item.id}>
                <div className='review_user'>
                  <div className="author">
                    <span className='review_round'>{item.author.substr(0,1)}</span>
                    <span>{item.author}</span>
                  </div>
                  <div className="review_date">
                    {item.created_at.substr(0,10)}
                  </div>
                </div>
                <div className='review_content'>
                  <p>{item.content}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </Container>
    </div>
  )
}

export default Reviews