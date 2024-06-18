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
import PrintIcon from "@mui/icons-material/Print";

function ViewJob() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);

  const [isPrinting, setIsPrinting] = useState(false);

  // Function to handle the print action
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500); // Delay printing for smoother transition
  };

  return (
    <Dashboard>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box display={"flex"}>
            <ArrowBack />
            <h2>Job Details</h2>
            {/* {!isPrinting && ( // Render the print button only if not printing
              <Tooltip title="Print">
                <IconButton onClick={handlePrint}>
                  <PrintIcon />
                </IconButton>
              </Tooltip>
            )} */}
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
              sx={{
                marginTop: 3,
                "@media print": {
                  overflow: "hidden", // Hide scrollbars when printing
                },
              }}
            >
              <TableRow sx={{ display: "flex" }}>
                <div sx={{ justifyContent: "space-between" }}>
                  <TableCell>{containerIndex + 1}</TableCell>
                  <TableCell>{container.processName}</TableCell>
                  <TableCell>
                    Setting for All Process Admin have to add setting Time in
                    minutes
                  </TableCell>
                  <TableCell align="center">{container.setting}</TableCell>
                </div>
              </TableRow>
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
