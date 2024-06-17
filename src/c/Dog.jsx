import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dog.css";
import ReactECharts from "echarts-for-react";

const Dog = () => {
  const [dogsData, setDogsData] = useState([]);
  const [trainabilityCounts, setTrainabilityCounts] = useState([0, 0, 0, 0, 0]);
  const [protectivenessCounts, setProtectivenessCounts] = useState([0, 0, 0, 0, 0,]);
  const [selectedTrainability, setSelectedTrainability] = useState(null);
  const [selectedProtectiveness, setSelectedProtectiveness] = useState(null);

  const [averageHeights, setAverageHeights] = useState([]);

  const options = {
    method: "GET",
    headers: { "X-Api-Key": "2R2zEcJ6PBnKGUAEOf/tyg==PqGaGAn22v6G5vI4" },
  };

  const random = Math.floor(Math.random() * 10) + 1;

  const url = `https://api.api-ninjas.com/v1/dogs?name=a&offset=${random}`;

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        setDogsData(data);

        // 訓練難易度的圖表
        const trainabilityCounts = [0, 0, 0, 0, 0];
        data.forEach((dog) => {
          const trainabilityLevel = dog.trainability;
          if (trainabilityLevel >= 1 && trainabilityLevel <= 5) {
            trainabilityCounts[trainabilityLevel - 1]++;
          }
        });
        setTrainabilityCounts(trainabilityCounts);

        // 保護性的圖表
        const protectivenessCounts = [0, 0, 0, 0, 0];
        data.forEach((dog) => {
          const protectivenessLevel = dog.protectiveness;
          if (protectivenessLevel >= 1 && protectivenessLevel <= 5) {
            protectivenessCounts[protectivenessLevel - 1]++;
          }
        });
        setProtectivenessCounts(protectivenessCounts);

        // 平均身高的圖表 (好像有點問題)
        const avgHeights = [];
        data.forEach((dog) => {
          const maleAvgHeight = (dog.min_height_male + dog.max_height_male) / 2;
          const femaleAvgHeight =
            (dog.min_height_female + dog.max_height_female) / 2;
          avgHeights.push({ name: dog.name, maleAvgHeight, femaleAvgHeight });
        });
        setAverageHeights(avgHeights);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // 篩選功能
  const filteredDogs = dogsData.filter((dog) => {
    if (
      selectedTrainability !== null &&
      dog.trainability !== selectedTrainability
    ) {
      return false;
    }
    if (
      selectedProtectiveness !== null &&
      dog.protectiveness !== selectedProtectiveness
    ) {
      return false;
    }
    return true;
  });

  const handleTrainabilityClick = (params) => {
    const level = parseInt(params.name, 10);
    setSelectedTrainability(selectedTrainability === level ? null : level);
  };


  const handleProtectivenessClick = (params) => {
    const level = parseInt(params.name, 10);
    setSelectedProtectiveness(selectedProtectiveness === level ? null : level);
  };
  
  const averageHeightsChartData = {
    xAxisData: averageHeights.map((dog) => dog.name),
    maleAvgHeight: averageHeights.map((dog) => dog.maleAvgHeight),
    femaleAvgHeight: averageHeights.map((dog) => dog.femaleAvgHeight),
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/">首頁</Link>
        <Link to="/dog">狗</Link>
        <Link to="/cat">貓</Link>
      </nav>
      <h1>狗的不同品種資訊</h1>
      <div className="card-container">
        {filteredDogs.map((dog, index) => (
          <div className="card" key={index}>
            <img src={dog.image_link} alt={dog.name} className="card-image" />
            <div className="card-content">
              <h2>{dog.name}</h2>
              <p>
                <strong>男性身高:</strong> {dog.min_height_male} -{" "}
                {dog.max_height_male} "
              </p>
              <p>
                <strong>男性體重:</strong> {dog.min_weight_male} -{" "}
                {dog.max_weight_male} 磅
              </p>
              <p>
                <strong>女性身高:</strong> {dog.min_height_female} -{" "}
                {dog.max_height_female} "
              </p>
              <p>
                <strong>女性體重:</strong> {dog.min_weight_female} -{" "}
                {dog.max_weight_female} 磅
              </p>
              <p>
                <strong>壽命:</strong> {dog.min_life_expectancy} -{" "}
                {dog.max_life_expectancy} 年
              </p>
              <p>
                <strong>訓練難易度:</strong> {dog.trainability}
              </p>
              <p>
                <strong>保護性:</strong> {dog.protectiveness}
              </p>
            </div>
          </div>
        ))}
      </div>


      <div className="chart-container">
        <ReactECharts
          option={{
            title: {
              text: "訓練難易度",
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
                data: trainabilityCounts,
              },
            ],
          }}
          onEvents={{
            click: handleTrainabilityClick,
          }}
        />
      </div>


      <div className="chart-container">
        <ReactECharts
          option={{
            title: {
              text: "保護性",
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
                data: protectivenessCounts,
              },
            ],
          }}
          onEvents={{
            click: handleProtectivenessClick,
          }}
        />
      </div>

      <div className="chart-container">
        <ReactECharts
          option={{
            title: {
              text: "平均身高",
              left: "center",
            },
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["男性平均身高", "女性平均身高"],
              left: "left",
            },
            xAxis: {
              type: "category",
              data: averageHeightsChartData.xAxisData,
            },
            yAxis: {
              type: "value",
              name: "數值",
            },
            series: [
              {
                name: "男性平均身高",
                type: "line",
                data: averageHeightsChartData.maleAvgHeight,
              },
              {
                name: "女性平均體重",
                type: "line",
                data: averageHeightsChartData.femaleAvgHeight,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Dog;
