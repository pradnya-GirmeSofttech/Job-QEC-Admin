import React, { useEffect, useState } from "react";
import Dashboard from "../../dashboard/Dashboard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { getSingleJob } from "../../../actions/job";
import { formattedDate } from "../../../common/formattedDate";
import { ArrowBack } from "../../../common/BackArrow";
import Loader from "../../loader/Loader";
import { ProcessTable } from "./ProcessTable";
import { ViewProcessTable } from "./ViewProcessTable";

function ViewJob() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);

  return (
    <Dashboard>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box display={"flex"}>
            <ArrowBack />
            <h2>Job Details</h2>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>SO/WO No</TableCell>
                  <TableCell align="center">{jobs[0]?.soWo}</TableCell>
                  <TableCell>Prod.Order No</TableCell>
                  <TableCell align="center">{jobs[0]?.prodOrderNo}</TableCell>
                  <TableCell>WO Date</TableCell>
                  <TableCell align="center">
                    {formattedDate(jobs[0]?.woDate)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Job Name</TableCell>
                  <TableCell align="center">{jobs[0]?.jobName}</TableCell>
                  <TableCell>PO No</TableCell>
                  <TableCell align="center">{jobs[0]?.poNo}</TableCell>
                  <TableCell>Estimated CT</TableCell>
                  <TableCell align="center">
                    {jobs[0]?.estimatedtotalCT}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Drawing No</TableCell>
                  <TableCell align="center">{jobs[0]?.dragNo}</TableCell>
                  <TableCell>Actual Total CT</TableCell>
                  <TableCell align="center">{jobs[0]?.actualtotalCT}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {jobs[0]?.processTable?.map((container, containerIndex) => (
            <TableContainer
              key={containerIndex}
              component={Paper}
              sx={{ marginTop: 3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  margin: 2,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" id="tableTitle" component="div">
                  {containerIndex + 1} {container.processName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography variant="h6" id="tableTitle" component="div">
                    Setting Time :
                  </Typography>
                  <Typography variant="h6" id="tableTitle" component="div">
                    {container.setting} {"min"}
                  </Typography>
                </Box>
              </Box>
              <ViewProcessTable
                key={containerIndex}
                data={container.processTableData}
                containerIndex={containerIndex}
                selectedProcessName={container.processName}
                // ... other props you may need
              />
            </TableContainer>
          ))}
        </>
      )}
    </Dashboard>
  );
}

export default ViewJob;
