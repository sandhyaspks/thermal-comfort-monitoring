import React from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import "./ChartComponent.css";

const ChartComponent = ({ data }) => {
  const formattedData = data.map(d => ({
    time: new Date(d.created_at).toLocaleTimeString(),
    temperature: parseFloat(d.field1),
    humidity: parseFloat(d.field2)
  }));

  return (
    <div className="chart-container">
      <h2>Live Sensor Data</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature" />
          <Line type="monotone" dataKey="humidity" stroke="#387908" name="Humidity" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
