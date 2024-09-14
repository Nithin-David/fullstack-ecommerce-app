import React, { useEffect, useState } from 'react';
import "./Popular.css";
import Item from '../Items/Item';

const Popular = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
    .then(res => res.json())
    .then(data => setData(data));
  },[])

  return (
    <div className='popular'>
        <p>POPULAR IN WOMEN</p>
        <hr />
        <div className="popular-items">
            {data.map((item, index) => {
                return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular