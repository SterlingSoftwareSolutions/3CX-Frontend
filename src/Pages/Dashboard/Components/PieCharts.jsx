import React from "react";
import { ResponsiveContainer, PieChart, Pie, } from "recharts";
import "./chart.css";

const data = [
  { name: "Group A", value: 400 , fill:'#39B5E0'},
  { name: "Group B", value: 300, fill :'#0081B4'},
];

const PieCharts = (props) => {
  return (
    <div className="container-piechart">
      <h4></h4>
      <h5>Calls - Last 30 Days</h5>
      <div
        className="chart-container"
        style={{ width: "250px", height: "500px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} label />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="call-type">
        <h6>Inbound Call(Answered)</h6>
      </div>
      <div className="chart-value1">
        <h6>Abans</h6>
      </div>
      <div className="chart-value2">
        <h6>KoKo</h6>
      </div>

      <div className="chart-side-box1"></div>
      <div className="chart-side-box2"></div>
    </div>
  );
};

export default PieCharts;
