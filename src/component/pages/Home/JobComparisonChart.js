import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const JobComparisonBarChart = ({ jobs }) => {
  const jobLabels = jobs?.map((job) => job.jobName);
  const actualCTData = jobs?.map((job) => job.actualtotalCT);
  const estimatedCTData = jobs?.map((job) => job.estimatedtotalCT);

  const data = jobs?.map((job, index) => {
    return {
      timeSlot: jobLabels[index],
      actualCTData: actualCTData[index],
      estimatedTotalCT: estimatedCTData[index],
    };
  });
  console.log(data);

  return (
    <ResponsiveContainer width="80%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timeSlot" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="actualCTData"
          fill="#8884d8"
          name="Actual Total CT"
          barSize={20}
        />
        <Bar
          dataKey="estimatedTotalCT"
          fill="#82ca9d"
          name="Estimated Total CT"
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default JobComparisonBarChart;
