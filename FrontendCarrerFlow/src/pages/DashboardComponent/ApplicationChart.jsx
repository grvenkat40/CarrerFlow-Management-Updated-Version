import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    month: "Jan",
    applications: 4,
  },
  {
    month: "Feb",
    applications: 7,
  },
  {
    month: "Mar",
    applications: 5,
  },
  {
    month: "Apr",
    applications: 10,
  },
  {
    month: "May",
    applications: 8,
  },
];

const ApplicationChart = () => {
  return (
    <div className="chart-container">

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="applications"
            fill="#2563eb"
            barSize={45}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationChart;