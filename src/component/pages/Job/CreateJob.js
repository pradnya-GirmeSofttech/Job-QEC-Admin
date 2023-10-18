import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import Dashboard from "../../dashboard/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { ProcessTable } from "./ProcessTable";

import { useDispatch } from "react-redux";
import { createJob } from "../../../actions/job";
import { ArrowBack } from "./BackArrow";

function CreateJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    soWo: "",
    prodOrderNo: "",
    woDate: new Date().toISOString().split("T")[0],
    jobName: "",
    poNo: "",
    estimatedtotalCT: "",
    actualtotalCT: "",
    dragNo: "",
    processTable: [],
  });

  const [errors, setErrors] = useState({
    soWo: false,
    prodOrderNo: false,
    jobName: false,
    poNo: false,
    estimatedtotalCT: false,

    dragNo: false,
  });
  const [processTableErrors, setProcessTableErrors] = useState(
    formData.processTable.map(() => ({
      process: false,
      description: false,
      machineName: false,
      toolingUsed: false,
      dc: false,
      length: false,
      width: false,
      feed: false,
      estimatedCT: false,
    }))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "soWo",
      "prodOrderNo",
      "jobName",
      "poNo",
      "estimatedtotalCT",
      "dragNo",
    ];

    const ProcessrequiredFields = [
      "process",
      "description",
      "machineName",
      "toolingUsed",
      "dc",
      "length",
      "width",
      "feed",
      "estimatedCT",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    const processTableErrors = formData.processTable.map((row, rowIndex) => {
      const rowErrors = {};
      ProcessrequiredFields.forEach((field) => {
        if (field === "toolingUsed" && row[field].length === 0) {
          // Check if "toolingUsed" is an empty array
          rowErrors[field] = true;
        } else if (!row[field]) {
          rowErrors[field] = true;
        }
      });
      return rowErrors;
    });

    const hasProcessTableErrors = processTableErrors.some((rowErrors) => {
      return Object.values(rowErrors).some((error) => error);
    });
    console.log("process", processTableErrors);
    // If there are errors, display them and prevent submission
    if (Object.keys(newErrors).length > 0 || hasProcessTableErrors) {
      setErrors(newErrors);
      setProcessTableErrors(processTableErrors);
      return;
    }

    if (formData.processTable.length === 0) {
      alert("At least one row in the process table is required.");
      return;
    }

    dispatch(createJob(formData));

    navigate(-1); // This will navigate back to the previous screen
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  function calculateActualCycleTime(row) {
    const { startDate, startTime, endDate, endTime } = row;

    if (startDate && startTime && endDate && endTime) {
      const startDateTime = new Date(`${startDate} ${startTime}`);
      const endDateTime = new Date(`${endDate} ${endTime}`);

      // Ensure that the start and end times are valid dates
      if (!isNaN(startDateTime) && !isNaN(endDateTime)) {
        // Calculate the time difference in milliseconds
        const timeDifference = endDateTime - startDateTime;

        // Convert milliseconds to minutes
        const actualCT = timeDifference / (1000 * 60);

        // Update the 'actualCT' property of the row
        row.actualCT = actualCT;
        console.log("Actual", row.actualCT);
      }
    } else {
      // Handle the case where any of the date or time fields are empty
      row.actualCT = null; // or you can set it to 0 if you prefer
    }
  }

  function calculateTotalCycleTime(processTable) {
    let totalCT = 0;

    for (const row of processTable) {
      if (row.actualCT) {
        totalCT += row.actualCT;
      }
    }

    return totalCT;
  }

  const handleTextFieldChange = (event, rowIndex, fieldName) => {
    const updatedProcessTable = [...formData.processTable];
    updatedProcessTable[rowIndex][fieldName] = event.target.value;

    const updatedErrors = [...processTableErrors];
    updatedErrors[rowIndex][fieldName] = !event.target.value; // Set the error if the field is empty

    setProcessTableErrors(updatedErrors);
    if (
      fieldName === "startDate" ||
      fieldName === "startTime" ||
      fieldName === "endDate" ||
      fieldName === "endTime"
    ) {
      calculateActualCycleTime(updatedProcessTable[rowIndex]);
      const totalCT = calculateTotalCycleTime(updatedProcessTable);

      // Update both the totalCT and actualtotalCT
      setFormData((prevData) => ({
        ...prevData,
        processTable: updatedProcessTable,
        actualtotalCT: totalCT,
      }));
    } else {
      // Update only the processTable and not actualtotalCT
      setFormData((prevData) => ({
        ...prevData,
        processTable: updatedProcessTable,
      }));
    }
  };
  const handleAddRow = () => {
    const newRow = {
      process: "",
      description: "",
      machineName: "",
      toolingUsed: [],
      dc: "",
      length: "",
      width: "",
      feed: "",
      estimatedCT: "",
      actualCT: "",
      startDate: new Date().toISOString().split("T")[0],
      startTime: "",
      endDate: new Date().toISOString().split("T")[0],
      endTime: "",
      idleCode: "",
      startDate1: new Date().toISOString().split("T")[0],
      startTime1: "",
      endDate1: new Date().toISOString().split("T")[0],
      endTime1: "",
      userName: "",
    };

    const updatedErrors = [...processTableErrors, {}]; // Add an error object for the new row
    setProcessTableErrors(updatedErrors);
    // Update the state by creating a new array with the added row
    setFormData({
      ...formData,
      processTable: [...formData.processTable, newRow],
    });
  };
  console.log("error", errors);

  const handleDeleteRow = (rowIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      processTable: prevData.processTable.filter(
        (row, index) => index !== rowIndex
      ),
    }));
  };

  return (
    <Dashboard>
      <Box display={"flex"}>
        <ArrowBack />
        <h2>Create Job</h2>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="spanning table">
          <TableBody>
            <TableRow>
              <TableCell align="center">SO/Wo No</TableCell>
              <TableCell align="center">
                <TextField
                  label="So/Wo No"
                  id="outlined-size-small"
                  size="small"
                  variant="outlined"
                  name="soWo"
                  value={formData.soWo}
                  onChange={handleChange}
                  error={errors.soWo} // Set error prop based on the error state
                  helperText={errors.soWo ? "This field is required" : ""}
                />
              </TableCell>
              <TableCell align="center">Prod.Order No</TableCell>
              <TableCell align="center">
                <TextField
                  label="Prod.Order No"
                  id="outlined-size-small"
                  size="small"
                  name="prodOrderNo"
                  value={formData.prodOrderNo}
                  onChange={handleChange}
                  error={errors.prodOrderNo}
                  helperText={
                    errors.prodOrderNo ? "This field is required" : ""
                  }
                />
              </TableCell>
              <TableCell align="center">WO Date</TableCell>
              <TableCell align="center">
                <TextField
                  id="date"
                  label="WO Date"
                  type="date"
                  size="small"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  //   value={selectedDate.toISOString().split("T")[0]}
                  //   onChange={(e) => handleDateChange(new Date(e.target.value))}
                  name="woDate"
                  value={formData.woDate}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Job Name</TableCell>
              <TableCell align="center">
                <TextField
                  label="Job Name"
                  id="outlined-size-small"
                  size="small"
                  name="jobName"
                  value={formData.jobName}
                  onChange={handleChange}
                  error={errors.jobName}
                  helperText={errors.jobName ? "This field is required" : ""}
                />
              </TableCell>
              <TableCell align="center">PO No</TableCell>
              <TableCell align="center">
                <TextField
                  label="PO No"
                  id="outlined-size-small"
                  size="small"
                  name="poNo"
                  value={formData.poNo}
                  onChange={handleChange}
                  error={errors.poNo}
                  helperText={errors.poNo ? "This field is required" : ""}
                />
              </TableCell>
              <TableCell align="center">Total CT</TableCell>
              <TableCell align="center">
                <TextField
                  label="Total CT"
                  id="outlined-size-small"
                  size="small"
                  name="estimatedtotalCT"
                  value={formData.estimatedtotalCT}
                  onChange={handleChange}
                  error={errors.estimatedtotalCT}
                  helperText={
                    errors.estimatedtotalCT ? "This field is required" : ""
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Drag No</TableCell>
              <TableCell align="center">
                <TextField
                  label="Drag No"
                  id="outlined-size-small"
                  size="small"
                  name="dragNo"
                  value={formData.dragNo}
                  onChange={handleChange}
                  error={errors.dragNo}
                  helperText={errors.dragNo ? "This field is required" : ""}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ProcessTable
        formData={formData}
        handleDeleteRow={handleDeleteRow}
        handleTextFieldChange={handleTextFieldChange}
        processTableErrors={processTableErrors}
      />
      <IconButton size="large" onClick={handleAddRow}>
        <AddCircleIcon color="primary" />
      </IconButton>
      <Button
        color="primary"
        sx={{
          backgroundColor: "#1d5393",
          color: "#fff",
        }}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Dashboard>
  );
}

export default CreateJob;
