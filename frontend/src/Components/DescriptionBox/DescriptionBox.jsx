import React from 'react';
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className='description-container'>
        <div className="desc-review-cont">
          <div className="desc">
            Description
          </div>
          <div className="review">
            Review (122)
          </div>
        </div>
        <div className="desc-matter">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem ratione amet quis quaerat deserunt inventore ipsam ad unde ullam illo tempore, fuga blanditiis facere perferendis maxime dolores? Veritatis, pariatur rem?
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, sed quam. Optio necessitatibus neque similique molestias vitae non ex mollitia?
        </div>
    </div>
  )
}

export default DescriptionBox