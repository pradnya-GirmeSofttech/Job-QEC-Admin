import {
  Typography,
  Divider,
  Card,
  SvgIcon,
  CardContent,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dashboard from "../../dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import JobComparisonChart from "./JobComparisonChart";
import { getAllJob } from "../../../actions/job";
import { fetchUsersWithUserRole } from "../../../actions/user";
import JobAnalysisCard from "./JobAnalysisCard";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";

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
      <Typography
        variant="button"
        display="block"
        gutterBottom
        fontSize={20}
        sx={{ color: "rgb(0, 55, 104)" }}
      >
        Welcome , {user ? user.name : ""}
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Card
          sx={{
            display: "flex",
            borderRadius: 3,
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 300,
            background:
              "linear-gradient(135deg, rgba(97, 243, 243, 0.2), rgba(0, 184, 217, 0.2), rgb(255, 255, 255))",
            margin: 2,
            boxShadow:
              "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px",
          }}
        >
          <SvgIcon
            component={PersonIcon}
            sx={{ fontSize: 70, color: "rgb(0, 55, 104)", marginBottom: 2 }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ color: "rgb(0, 55, 104)" }}
            >
              Total Number Of Users
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              alignItems="center"
              sx={{ color: "rgb(0, 55, 104)", textAlign: "center" }}
            >
              {users.length}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 300,
            borderRadius: 3,
            background:
              "linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2), rgb(255, 255, 255))",
            margin: 2,
            boxShadow:
              "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px",
          }}
        >
          <SvgIcon
            component={WorkIcon}
            sx={{ fontSize: 70, color: "rgb(0, 55, 104)", marginBottom: 2 }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{ color: "rgb(0, 55, 104)", textAlign: "center" }}
            >
              Total Number Of Jobs
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              alignItems="center"
              sx={{ color: "rgb(0, 55, 104)", textAlign: "center" }}
            >
              {jobs.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <JobAnalysisCard
        jobs={jobs}
        countOfJobsWithMoreActualTime={countOfJobsWithMoreActualTime}
        countOfJobsWithLessActualTime={countOfJobsWithLessActualTime}
      />
      <Typography variant="h6">Job Comparison Chart</Typography>
      <Card
        sx={{
          margin: 2,
          padding: 2,
          paddingTop: 5,
          borderRadius: 3,
          // width: 600,
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px",
        }}
      >
        <JobComparisonChart jobs={jobs} />
      </Card>
    </Dashboard>
  );
}

export default Home;
