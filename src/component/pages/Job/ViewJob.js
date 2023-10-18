import React, { useEffect } from "react";
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
  Box,
} from "@mui/material";
import { getSingleJob } from "../../../actions/job";
import { formattedDate } from "./formattedDate";
import { ArrowBack } from "./BackArrow";

function ViewJob() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.jobs);

  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);

  return (
    <Dashboard>
      <Box display={"flex"}>
        <ArrowBack />
        <h2>Job Details</h2>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="center">SO/Wo No</TableCell>
                <TableCell>{job[0]?.soWo}</TableCell>
                <TableCell align="center">Prod.Order No</TableCell>
                <TableCell align="center">{job[0]?.prodOrderNo}</TableCell>
                <TableCell align="center">WO Date</TableCell>
                <TableCell align="center">
                  {formattedDate(job[0]?.woDate)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Job Name</TableCell>
                <TableCell align="center">{job[0]?.jobName}</TableCell>
                <TableCell align="center">PO No</TableCell>
                <TableCell align="center">{job[0]?.poNo}</TableCell>
                <TableCell align="center">Total CT</TableCell>
                <TableCell align="center">{job[0]?.estimatedtotalCT}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Drag No</TableCell>
                <TableCell align="center">{job[0]?.dragNo}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Sr.No</TableCell>
                <TableCell align="center">Process</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Machine Name</TableCell>
                <TableCell align="center">Tooling Used</TableCell>
                <TableCell align="center">DC</TableCell>
                <TableCell align="center">Length</TableCell>
                <TableCell align="center">Width</TableCell>
                <TableCell align="center">Feed</TableCell>
                <TableCell align="center">Estimated CT(min)</TableCell>
                <TableCell align="center">Actual CT(min)</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">Ideal Code</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">Start Time</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">End Time</TableCell>
                <TableCell align="center">User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {job[0]?.processTable &&
                job[0]?.processTable.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell align="center">{rowIndex + 1}</TableCell>
                    <TableCell align="center">{row.process}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.machineName}</TableCell>

                    <TableCell align="center">
                      {row.toolingUsed.map((tool) => {
                        return tool + ",";
                      })}
                    </TableCell>
                    <TableCell align="center">{row.length}</TableCell>
                    <TableCell align="center">{row.width}</TableCell>
                    <TableCell align="center">{row.dc}</TableCell>
                    <TableCell align="center">{row.feed}</TableCell>
                    <TableCell align="center">{row.estimatedCT}</TableCell>
                    <TableCell align="center">{row.actualCT}</TableCell>
                    <TableCell align="center">
                      {formattedDate(row.startDate)}
                    </TableCell>

                    <TableCell align="center">{row.startTime}</TableCell>
                    <TableCell align="center">
                      {formattedDate(row.endDate)}
                    </TableCell>
                    <TableCell align="center">{row.endTime}</TableCell>
                    <TableCell align="center">{row.idleCode}</TableCell>
                    <TableCell align="center">
                      {formattedDate(row.startDate1)}
                    </TableCell>
                    <TableCell align="center">{row.startTime1}</TableCell>
                    <TableCell align="center">
                      {formattedDate(row.endDate1)}
                    </TableCell>
                    <TableCell align="center">{row.endTime1}</TableCell>
                    <TableCell align="center">{row.userName}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Dashboard>
  );
}

export default ViewJob;
