import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cat.css";
import ReactECharts from "echarts-for-react";

const Cat = () => {
  const [catsData, setCatsData] = useState([]);
  const [playfulnessCounts, setPlayfulnessCounts] = useState([0, 0, 0, 0, 0]);
  const [otherPetsFriendlyCounts, setOtherPetsFriendlyCounts] = useState([
    0, 0, 0, 0, 0,
  ]);
  const [selectedPlayfulness, setSelectedPlayfulness] = useState(null);
  const [selectedOtherPetsFriendly, setSelectedOtherPetsFriendly] =
    useState(null);

  const options = {
    method: "GET",
    headers: { "X-Api-Key": "2R2zEcJ6PBnKGUAEOf/tyg==PqGaGAn22v6G5vI4" },
  };

  const random = Math.floor(Math.random() * 10) + 1;

  const url = `https://api.api-ninjas.com/v1/cats?name=a&offset=${random}`;
  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCatsData(data);

        const playfulnessCounts = [0, 0, 0, 0, 0];
        data.forEach((cat) => {
          const playfulnessLevel = cat.playfulness;
          if (playfulnessLevel >= 1 && playfulnessLevel <= 5) {
            playfulnessCounts[playfulnessLevel - 1]++;
          }
        });
        setPlayfulnessCounts(playfulnessCounts);

        const otherPetsFriendlyCounts = [0, 0, 0, 0, 0];
        data.forEach((cat) => {
          const otherPetsFriendlyLevel = cat.other_pets_friendly;
          if (otherPetsFriendlyLevel >= 1 && otherPetsFriendlyLevel <= 5) {
            otherPetsFriendlyCounts[otherPetsFriendlyLevel - 1]++;
          }
        });
        setOtherPetsFriendlyCounts(otherPetsFriendlyCounts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCats =
    selectedPlayfulness !== null
      ? catsData.filter((cat) => cat.playfulness === selectedPlayfulness)
      : selectedOtherPetsFriendly !== null
      ? catsData.filter(
          (cat) => cat.other_pets_friendly === selectedOtherPetsFriendly
        )
      : catsData;

  const handlePlayfulnessClick = (params) => {
    const level = parseInt(params.name, 10);
    setSelectedPlayfulness((prev) => (prev === level ? null : level));
    setSelectedOtherPetsFriendly(null); 
  };

  const handleOtherPetsFriendlyClick = (params) => {
    const level = parseInt(params.name, 10);
    setSelectedOtherPetsFriendly((prev) => (prev === level ? null : level));
    setSelectedPlayfulness(null); 
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/">首頁</Link>
        <Link to="/dog">狗</Link>
        <Link to="/cat">貓</Link>
      </nav>
      <h1>貓的不同品種資訊</h1>
      <div className="card-container">
        {filteredCats.map((cat, index) => (
          <div className="card" key={index}>
            <img src={cat.image_link} alt={cat.name} className="card-image" />
            <div className="card-content">
              <h2>{cat.name}</h2>
              <p>
                <strong>長度:</strong>
                {cat.length}
              </p>
              <p>
                <strong>體重:</strong> {cat.min_weight} - {cat.max_weight} 磅
              </p>
              <p>
                <strong>壽命:</strong> {cat.min_life_expectancy} -{" "}
                {cat.max_life_expectancy} 年
              </p>
              <p>
                <strong>頑皮:</strong> {cat.playfulness}
              </p>
              <p>
                <strong>貓與家中其他寵物（例如狗）的相處情況:</strong>{" "}
                {cat.other_pets_friendly}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="chart-container">
        <ReactECharts
          option={{
            title: {
              text: "頑皮",
              left: "center",
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            xAxis: {
              type: "category",
              data: ["1", "2", "3", "4", "5"],
              axisLabel: {
                interval: 0,
              },
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "總數量",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  position: "inside",
                },
                data: playfulnessCounts,
              },
            ],
          }}
          onEvents={{
            click: handlePlayfulnessClick,
          }}
        />
      </div>

      <div className="chart-container">
        <ReactECharts
          option={{
            title: {
              text: "貓與家中其他寵物的相處情況",
              left: "center",
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            xAxis: {
              type: "category",
              data: ["1", "2", "3", "4", "5"],
              axisLabel: {
                interval: 0,
              },
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "總數量",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  position: "inside",
                },
                data: otherPetsFriendlyCounts,
              },
            ],
          }}
          onEvents={{
            click: handleOtherPetsFriendlyClick,
          }}
        />
      </div>
    </div>
  );
};

export default Cat;
