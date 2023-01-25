import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";
import './outboundnotans.css';


const data = [
    { name: "Group A", value: 100 ,fill:'#39B5E0'},
    { name: "Group B", value: 300 ,fill :'#0081B4'},
  ];


export const OutboundnotAns = () => {
  return (
    <div className="container-header">
      <div
        className="pie-chart"
        style={{ width: "250px", height: "500px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data}  label />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="call-ans">
        <h6>Outbound Call(Not Answered)</h6>
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
  )
}
