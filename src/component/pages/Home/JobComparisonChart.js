import React, { useState } from "react";
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
import { Box, TextField } from "@mui/material";
const JobComparisonBarChart = ({ jobs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Filter data based on the search term in prodOrderNo
  const filteredData = jobs?.filter((job) =>
    job.soWo.toString().includes(searchTerm)
  );
  const jobLabels = filteredData?.map((job) => job.jobName);
  const actualCTData = filteredData?.map((job) => job.actualtotalCT);
  const estimatedCTData = filteredData?.map((job) => job.estimatedtotalCT);
  const data = filteredData?.map((job, index) => ({
    timeSlot: jobLabels[index],
    actualCTData: actualCTData[index],
    estimatedTotalCT: estimatedCTData[index],
  }));
  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <TextField
          label="Search by So / Wo number"
          id="outlined-size-small"
          size="small"
          sx={{ width: "270px" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <ResponsiveContainer width="80%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeSlot" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="actualCTData"
              fill="#eb0e14"
              name="Actual Total CT"
              barSize={20}
            />
            <Bar
              dataKey="estimatedTotalCT"
              fill="#1D5393"
              name="Estimated Total CT"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
export default JobComparisonBarChart;
