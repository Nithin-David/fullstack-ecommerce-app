import React, { useEffect, useState } from 'react';
import "./NewCollection.css";
import Item from '../Items/Item';

const NewCollection = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
    .then(res => res.json())
    .then(data => setData(data));
  },[]);

  return (
    <div className="new-collection">
      <p>NEW COLLECTIONS</p>
      <hr />
      <div className="popular-items">
        {data.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewCollection