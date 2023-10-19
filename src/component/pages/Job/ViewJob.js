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
  Chip,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import { getSingleJob } from "../../../actions/job";
import { formattedDate } from "./formattedDate";
import { ArrowBack } from "./BackArrow";
import Loader from "../../loader/Loader";

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
                  <TableCell align="center">SO/Wo No</TableCell>
                  <TableCell align="center">{jobs[0]?.soWo}</TableCell>
                  <TableCell align="center">Prod.Order No</TableCell>
                  <TableCell align="center">
                    {jobs[0]?.productionOrderNo}
                  </TableCell>
                  <TableCell align="center">WO Date</TableCell>
                  <TableCell align="center">
                    {formattedDate(jobs[0]?.woDate)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Job Name</TableCell>
                  <TableCell align="center">{jobs[0]?.jobName}</TableCell>
                  <TableCell align="center">PO No</TableCell>
                  <TableCell align="center">{jobs[0]?.poNo}</TableCell>
                  <TableCell align="center">Total CT</TableCell>
                  <TableCell align="center">{jobs[0]?.totalCT}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Drag No</TableCell>
                  <TableCell align="center">{jobs[0]?.dragNo}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table sx={{ minWidth: 3200 }} aria-label="simple table">
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
                {jobs[0]?.processTable &&
                  jobs[0]?.processTable.map((row, rowIndex) => (
                    <TableRow key={rowIndex} sx={{ fontSize: 12 }}>
                      <TableCell align="center">{rowIndex + 1}</TableCell>
                      <TableCell align="center">{row.process}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell width="200" align="center">
                        <Tooltip
                          title={row.machineName}
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <div
                            sx={{
                              width: 200,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {row.machineName}
                          </div>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {row.toolingUsed.map((tool, index) => (
                            <Tooltip key={index} title={tool}>
                              <Typography component="li" sx={{ fontSize: 14 }}>
                                {tool}
                              </Typography>
                            </Tooltip>
                          ))}
                        </Box>
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
        </>
      )}
    </Dashboard>
  );
}

export default ViewJob;
