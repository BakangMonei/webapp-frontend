import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const LoginChart = () => {
  // Sample data (replace with your actual data)
  const data = [
    { name: "Jan", logins: 400 },
    { name: "Feb", logins: 300 },
    { name: "Mar", logins: 200 },
    { name: "Apr", logins: 278 },
    { name: "May", logins: 189 },
    { name: "Jun", logins: 239 },
    { name: "Jul", logins: 349 },
    { name: "Aug", logins: 480 },
    { name: "Sep", logins: 310 },
    { name: "Oct", logins: 210 },
    { name: "Nov", logins: 278 },
    { name: "Dec", logins: 189 },
  ];

  return (
    <div>
      
      <LineChart
        className="border p-3 rounded-xl border-gray-50"
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="logins" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LoginChart;
