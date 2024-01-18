import React, { useCallback, useState } from "react";
import { Card, Typography, Divider } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import RadianTooltip from "../../../common/RadianToolTip";
const JobAnalysisCard = ({
  jobs,
  countOfJobsWithMoreActualTime,
  countOfJobsWithLessActualTime,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  // Sample data for the chart with different colors
  const chartData = [
    { name: "Total Jobs", value: jobs.length, color: "#2196f3" },
    {
      name: "Exceeded Time",
      value: countOfJobsWithMoreActualTime,
      color: "#1D5393",
    },
    {
      name: "Accurate Time",
      value: countOfJobsWithLessActualTime,
      color: "#eb0e14",
    },
  ];

  const renderLabel = useCallback((piePiece) => {
    return piePiece.name;
  }, []);

  // Define colors array
  // Define colors array
  const colors = chartData.map((entry) => entry.color);

  return (
    <Card sx={{ margin: 2, width: 600 }}>
      <Typography variant="h6" style={{ padding: "20px" }}>
        Jobs Analysis
      </Typography>
      <Divider />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            labelLine={false}
            data={chartData}
            dataKey="value"
            outerRadius={80}
            label={RadianTooltip}
            paddingAngle={1}
            onMouseEnter={onPieEnter}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <Typography variant="subtitle2" gutterBottom style={{ padding: "10px" }}>
        Total number of Jobs done: {jobs.length}
      </Typography>
      <Typography variant="subtitle2" gutterBottom style={{ padding: "10px" }}>
        Total number of Jobs take exceed time: {countOfJobsWithMoreActualTime}
      </Typography>
      <Typography variant="subtitle2" gutterBottom style={{ padding: "10px" }}>
        Total number of Jobs take accurate time: {countOfJobsWithLessActualTime}
      </Typography>
    </Card>
  );
};

export default JobAnalysisCard;
