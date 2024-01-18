import React, { useCallback, useState } from "react";
import {
  Card,
  Typography,
  Divider,
  CardActions,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import RadianTooltip from "../../../common/RadianToolTip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const JobAnalysisCard = ({
  jobs,
  countOfJobsWithMoreActualTime,
  countOfJobsWithLessActualTime,
}) => {
  const totalJobs = jobs.length;

  // Calculate the percentage of jobs done
  const percentageJobsDone =
    ((totalJobs -
      countOfJobsWithMoreActualTime -
      countOfJobsWithLessActualTime) /
      totalJobs) *
    100;

  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  // Sample data for the chart with different colors
  const chartData = [
    {
      name: "Exceeded Time",
      value: countOfJobsWithMoreActualTime,
      color: "#eb0e14",
    },
    {
      name: "Accurate Time",
      value: countOfJobsWithLessActualTime,
      color: "#1D5393",
    },
  ];

  const renderLabel = useCallback((piePiece) => {
    return piePiece.name;
  }, []);

  // Define colors array
  const colors = chartData.map((entry) => entry.color);

  return (
    <Card sx={{ margin: 2, width: 600 }}>
      <Typography variant="h6" m="3" style={{ padding: "20px" }}>
        Jobs Analysis
      </Typography>
      <Divider />
      <Typography variant="subtitle1" style={{ padding: "20px" }}>
        Total Jobs Done : {totalJobs}
      </Typography>
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
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <CardActions disableSpacing>
        <Button color="secondary">See More</Button>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography
          variant="subtitle2"
          gutterBottom
          style={{ padding: "10px" }}
        >
          Total number of Jobs done: {totalJobs}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          style={{ padding: "10px" }}
        >
          Total number of Jobs take exceed time: {countOfJobsWithMoreActualTime}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          style={{ padding: "10px" }}
        >
          Total number of Jobs take accurate time:{" "}
          {countOfJobsWithLessActualTime}
        </Typography>
      </Collapse>
    </Card>
  );
};

export default JobAnalysisCard;
