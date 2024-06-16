import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cat.css';
import ReactECharts from 'echarts-for-react';

const Cat = () => {
    const [catsData, setCatsData] = useState([]);
    
    const options = {
        method: 'GET',
        headers: { 'X-Api-Key': '2R2zEcJ6PBnKGUAEOf/tyg==PqGaGAn22v6G5vI4' }
    };

    const url = 'https://api.api-ninjas.com/v1/cats?name=a';
    useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Output fetched data to console
                setCatsData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/dog">Dog</Link>
        <Link to="/cat">Cat</Link>
      </nav>
      <h1>Cat Page</h1>
      <div className="card-container">
        {catsData.map((cat, index) => (
          <div className="card" key={index}>
            <img src={cat.image_link} alt={cat.name} className="card-image" />
            <div className="card-content">
              <h2>{cat.name}</h2>
              {/* <p><strong>身高:</strong> {cat.min_height} - {cat.max_height} "</p> */}
              <p><strong>長度:</strong>{cat.length}</p>
              <p><strong>體重:</strong> {cat.min_weight} - {cat.max_weight} lb</p>
              <p><strong>壽命:</strong> {cat.min_life_expectancy} - {cat.max_life_expectancy} years</p>
              <p><strong>頑皮:</strong> {cat.playfulness}</p>
              <p><strong>貓與家中其他寵物（例如狗）的相處情況:</strong> {cat.other_pets_friendly}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cat;
