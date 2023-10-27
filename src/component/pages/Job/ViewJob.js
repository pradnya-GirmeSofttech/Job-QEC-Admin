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
import { formattedDate } from "./formattedDate";
import { ArrowBack } from "./BackArrow";
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
              <TableBody>
                {jobs[0]?.processTable?.map((container, containerIndex) => (
                  <TableContainer
                    key={containerIndex}
                    component={Paper}
                    sx={{ marginTop: 3 }}
                  >
                    <TableRow
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <div>
                        <TableCell>{containerIndex + 1}</TableCell>
                        <TableCell>{container.processName}</TableCell>
                      </div>
                    </TableRow>
                    {/* Add ProcessTable component with appropriate props */}
                    <ViewProcessTable
                      key={containerIndex}
                      data={container.processTableData}
                      containerIndex={containerIndex}
                      selectedProcessName={container.processName}
                      // ... other props you may need
                    />
                  </TableContainer>
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
