import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie} from "recharts";
import './inboundcall.css';

const data = [
  { name: 'Group A', value: 400, fill: '#0081B4' },
  { name: 'Group B', value: 300, fill: '#39B5E0' },
];


export const InboundCall = () => {
  return (
    <div className="Container_head">
      <div
        className="chart-container1"
        style={{ width: "250px", height: "500px" }}>
        <ResponsiveContainer>
          <PieChart>
          
            {/* fill="#0081B4" */}
            <Pie dataKey="value" data={data}   label />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="call-type1">
        <h6>Inbound Call(Not Answered)</h6>
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
