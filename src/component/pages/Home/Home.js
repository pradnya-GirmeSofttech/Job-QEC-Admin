import { Typography, Divider, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dashboard from "../../dashboard/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import JobComparisonChart from "./JobComparisonChart";
import { getAllJob } from "../../../actions/job";
import { fetchUsersWithUserRole } from "../../../actions/user";
import JobAnalysisCard from "./JobAnalysisCard";

function Home() {
  // const [reports, setReports] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const jobs = useSelector((state) => state.job?.jobs);
  const users = useSelector((state) => state.user.users);
  console.log(users);
  useEffect(() => {
    dispatch(getAllJob());
    dispatch(fetchUsersWithUserRole());
  }, [dispatch]);
  const jobsWithLessActualTime = jobs.filter(
    (job) => job.estimatedtotalCT >= job?.actualtotalCT
  );
  const countOfJobsWithLessActualTime = jobsWithLessActualTime.length;

  const jobsWithMoreActualTime = jobs.filter(
    (job) => job.estimatedtotalCT <= job?.actualtotalCT
  );
  const countOfJobsWithMoreActualTime = jobsWithMoreActualTime.length;

  return (
    <Dashboard>
      <Typography variant="button" display="block" gutterBottom fontSize={20}>
        Welcome , {user ? user.name : ""}
      </Typography>
      <Divider />
      <Card sx={{ margin: 2, width: 600, padding: 3 }}>
        <Typography
          variant="subtitle3"
          gutterBottom
          style={{
            padding: "10px",
          }}
        >
          Total number of current users : {users.length}
        </Typography>
      </Card>
      {/* <Card sx={{ margin: 2, width: 500 }}>
        <Typography
          variant="h6"
          style={{
            padding: "20px",
          }}
        >
          Jobs Analysis
        </Typography>
        <Divider />
        <Typography
          variant="subtitle2"
          gutterBottom
          style={{
            padding: "10px",
          }}
        >
          Total number of Jobs done : {jobs.length}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          style={{
            padding: "10px",
          }}
        >
          Total number of Jobs take exceed time :{" "}
          {countOfJobsWithMoreActualTime}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          style={{
            padding: "10px",
          }}
        >
          Total number of Jobs take accurate time :{" "}
          {countOfJobsWithLessActualTime}
        </Typography>
      </Card> */}
      <JobAnalysisCard
        jobs={jobs}
        countOfJobsWithMoreActualTime={countOfJobsWithMoreActualTime}
        countOfJobsWithLessActualTime={countOfJobsWithLessActualTime}
      />
      <Typography variant="h6">Job Comparison Chart</Typography>
      <Card sx={{ margin: 2, padding: 2, paddingTop: 5 }}>
        <JobComparisonChart jobs={jobs} />
      </Card>
    </Dashboard>
  );
}

export default Home;
