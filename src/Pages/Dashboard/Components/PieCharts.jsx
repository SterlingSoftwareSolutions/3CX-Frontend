import React, { useState, useEffect, PureComponent } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import "./chart.css";

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const PieCharts = (props) => {
  return (
      <div className="chart-container">
      {/* <div style={{ width: '100%', height: 400 , }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div> */}
      <h2>Hello</h2>
      </div>
 )
};

export default PieCharts;
