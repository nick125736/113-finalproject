import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dog.css';
import ReactECharts from 'echarts-for-react';

const Dog = () => {
  const [dogsData, setDogsData] = useState([]);
  const [trainabilityCounts, setTrainabilityCounts] = useState([0, 0, 0, 0, 0]);
  const [protectivenessCounts, setProtectivenessCounts] = useState([0, 0, 0, 0, 0]);
//   const [avgHeightMale, setAvgHeightMale] = useState([]);
//   const [avgHeightFemale, setAvgHeightFemale] = useState([]);
//   const [avgWeightMale, setAvgWeightMale] = useState([]);
//   const [avgWeightFemale, setAvgWeightFemale] = useState([]);

  const options = {
    method: 'GET',
    headers: { 'X-Api-Key': '2R2zEcJ6PBnKGUAEOf/tyg==PqGaGAn22v6G5vI4' }
  };

  const url = 'https://api.api-ninjas.com/v1/dogs?name=a';

  useEffect(() => {
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Output fetched data to console
        setDogsData(data);

        // Calculate counts of dogs for each trainability level
        const trainabilityCounts = [0, 0, 0, 0, 0];
        data.forEach(dog => {
          const trainabilityLevel = dog.trainability;
          if (trainabilityLevel >= 1 && trainabilityLevel <= 5) {
            trainabilityCounts[trainabilityLevel - 1]++;
          }
        });
        setTrainabilityCounts(trainabilityCounts);

        // Calculate counts of dogs for each protectiveness level
        const protectivenessCounts = [0, 0, 0, 0, 0];
        data.forEach(dog => {
          const protectivenessLevel = dog.protectiveness;
          if (protectivenessLevel >= 1 && protectivenessLevel <= 5) {
            protectivenessCounts[protectivenessLevel - 1]++;
          }
        });
        setProtectivenessCounts(protectivenessCounts);


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
      <h1>Dog Page</h1>
      <div className="card-container">
        {dogsData.map((dog, index) => (
          <div className="card" key={index}>
            <img src={dog.image_link} alt={dog.name} className="card-image" />
            <div className="card-content">
              <h2>{dog.name}</h2>
              <p><strong>男性身高:</strong> {dog.min_height_male} - {dog.max_height_male} "</p>
              <p><strong>男性體重:</strong> {dog.min_weight_male} - {dog.max_weight_male} lb</p>
              <p><strong>女性身高:</strong> {dog.min_height_female} - {dog.max_height_female} "</p>
              <p><strong>女性體重:</strong> {dog.min_weight_female} - {dog.max_weight_female} lb</p>
              <p><strong>壽命:</strong> {dog.min_life_expectancy} - {dog.max_life_expectancy} years</p>
              <p><strong>訓練難易度:</strong> {dog.trainability}</p>
              <p><strong>保護性:</strong> {dog.protectiveness}</p>
            </div>
          </div>
        ))}
      </div>
  
      {/* Render the trainability bar chart */}
      <div className="chart-container">
        <ReactECharts option={{
          title: {
            text: '訓練難易度',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5'],
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '總數量',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: 'inside'
            },
            data: trainabilityCounts
          }]
        }} />
      </div>
  
      {/* Render the protectiveness bar chart */}
      <div className="chart-container">
        <ReactECharts option={{
          title: {
            text: '保護性',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5'],
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '總數量',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: 'inside'
            },
            data: protectivenessCounts
          }]
        }} />
      </div>
    </div>
  );
  
  
};

export default Dog;
