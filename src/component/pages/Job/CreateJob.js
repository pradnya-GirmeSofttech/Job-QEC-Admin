import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import "./ProcessTable.css";
import Dashboard from "../../dashboard/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { ProcessTable } from "./ProcessTable";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { createJob } from "../../../actions/job";
import { ArrowBack } from "./BackArrow";
import { processList } from "./Data";

function CreateJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [containers, setContainers] = useState([
    {
      processName: "", // Add any initial values you need
      processTableData: [],
    },
  ]);
  const [formData, setFormData] = useState({
    soWo: "",
    prodOrderNo: "",
    woDate: new Date().toISOString().split("T")[0],
    jobName: "",
    poNo: "",
    estimatedtotalCT: 0,
    actualtotalCT: 0,
    dragNo: "",
    processTable: containers,
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
    containers.map((item) => {
      item.processTableData.map(() => ({
        process: false,
        description: false,
        machineName: false,
        toolingUsed: false,
        dc: false,
        length: false,
        width: false,
        feed: false,
        estimatedCT: false,
      }));
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalEstimatedCT = containers.reduce((total, container) => {
      const containerEstimatedCT = container.processTableData.reduce(
        (containerTotal, data) => {
          if (!isNaN(data.estimatedCT)) {
            return containerTotal + data.estimatedCT;
          }
          return containerTotal;
        },
        0
      );
      return total + containerEstimatedCT;
    }, 0);

    // Update the formData state with the new totalEstimatedCT value
    setFormData((prevData) => ({
      ...prevData,
      actualtotalCT: totalEstimatedCT,
    }));

    // Rest of your code

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
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      //   setProcessTableErrors(processTableErrors);
      return;
    }
    if (containers.length === 0) {
      alert("At least one row in the process table is required.");
      return;
    }
    containers.map((item) => {
      if (item.processTableData.length === 0) {
        alert("At least one row in the process table is required.");
        return;
      }
    });

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

  // Maintain an array of containers
  const calculateCT = (updatedData) => {
    if (!updatedData.idleCode) {
      console.log(updatedData.startTime);
      const startDate = new Date(updatedData.startDate);
      const endDate = new Date(updatedData.endDate);
      const startTime = new Date(`1970-01-01T${updatedData.startTime}`);
      const endTime = new Date(`1970-01-01T${updatedData.endTime}`);
      const start =
        startDate.getTime() +
        startTime.getTime() -
        startDate.getTimezoneOffset() * 60 * 1000;
      const end =
        endDate.getTime() +
        endTime.getTime() -
        endDate.getTimezoneOffset() * 60 * 1000;
      const diff = (end - start) / (1000 * 60);
      console.log("diff", diff); // difference in hours
      return diff;
      // updatedData.estimatedCT = diff;
    } else {
      const startDate = new Date(updatedData.startDate);
      const endDate = new Date(updatedData.endDate);
      const startTime = new Date(`1970-01-01T${updatedData.startTime}`);
      const endTime = new Date(`1970-01-01T${updatedData.endTime}`);
      const start =
        startDate.getTime() +
        startTime.getTime() -
        startDate.getTimezoneOffset() * 60 * 1000;
      const end =
        endDate.getTime() +
        endTime.getTime() -
        endDate.getTimezoneOffset() * 60 * 1000;
      const diff1 = (end - start) / (1000 * 60);
      const startDate1 = new Date(updatedData.startDate1);
      const endDate1 = new Date(updatedData.endDate1);
      const startTime1 = new Date(`1970-01-01T${updatedData.startTime1}`);
      const endTime1 = new Date(`1970-01-01T${updatedData.endTime1}`);
      const start1 =
        startDate1.getTime() +
        startTime1.getTime() -
        startDate1.getTimezoneOffset() * 60 * 1000;
      const end1 =
        endDate1.getTime() +
        endTime1.getTime() -
        endDate1.getTimezoneOffset() * 60 * 1000;
      const diff2 = (end1 - start1) / (1000 * 60); // difference in hours
      const diff = diff1 + diff2;
      console.log(diff);
      return diff;
    }
  };

  const handleTextFieldChange = (
    event,
    rowIndex,
    fieldName,
    containerIndex,
    processName
  ) => {
    let filteredData = containers.map((element, index1) => {
      if (containerIndex === index1) {
        element.processTableData = element.processTableData.map(
          (data, index) => {
            if (processName === "Milling") {
              if (index === rowIndex) {
                data[fieldName] = event.target.value;
                if (
                  fieldName === "toolingSize" ||
                  fieldName === "dia" ||
                  fieldName === "width" ||
                  fieldName === "length" ||
                  fieldName === "feed" ||
                  fieldName === "nop" ||
                  fieldName === "fpp" ||
                  fieldName === "mr" ||
                  fieldName === "dc"
                ) {
                  data.dia = data.toolingSize * 0.9;

                  data.nop = parseFloat((data.width / data.dia).toFixed(2));
                  data.fpp = parseFloat((data.length / data.feed).toFixed(2));
                  data.actualCT = parseFloat(
                    (data.nop * data.fpp * (data.mr / data.dc) * 1.25).toFixed(
                      2
                    )
                  );
                  data.estimatedHrs = parseFloat(
                    (data.actualCT / 60).toFixed(2)
                  );
                }
              }
            } else if (processName === "Boring") {
              if (index === rowIndex) {
                data[fieldName] = event.target.value;
                if (
                  fieldName === "mr" ||
                  fieldName === "dc" ||
                  fieldName === "length" ||
                  fieldName === "feed" ||
                  fieldName === "rpm" ||
                  fieldName === "nop" ||
                  fieldName === "fpp"
                ) {
                  data.nop = parseFloat(data.mr / data.dc);

                  data.fpp = parseFloat(
                    data.length / (data.rpm * data.feed).toFixed(2)
                  );

                  data.actualCT = parseFloat(
                    data.nop * data.fpp * (1.25).toFixed(2)
                  );
                }
              }
            } else if (processName === "Drilling") {
              if (index === rowIndex) {
                data[fieldName] = event.target.value;
                if (
                  fieldName === "length" ||
                  fieldName === "feed" ||
                  fieldName === "noh"
                ) {
                  data.actualCT = parseFloat(
                    (((data.length * 1.05) / data.feed) * data.noh).toFixed(2)
                  );
                }
              }
            } else if (processName === "Tapping") {
              if (index === rowIndex) {
                data[fieldName] = event.target.value;
                if (
                  fieldName === "length" ||
                  fieldName === "rpm" ||
                  fieldName === "noh"
                ) {
                  data.actualCT = parseFloat(
                    (data.length / (data.rpm * 1.5)) *
                      data.noh *
                      (1.3).toFixed(2)
                  );
                }
              }
            }

            if (
              fieldName === "startTime" ||
              fieldName === "endTime" ||
              fieldName === "startTime1" ||
              fieldName === "endTime1" ||
              fieldName === "startDate1" ||
              fieldName === "endDate1" ||
              fieldName === "idleCode"
            ) {
              const diff = calculateCT(data);
              data.estimatedCT = diff;
            }

            return data;
          }
        );
      }
      return element;
    });
    console.log(filteredData);
    setContainers(filteredData);
  };

  const handleAddRow = (containerIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].processTableData.push({
      process: "",
      description: "",
      machineName: "",
      toolingUsed: "",
      dc: 0,
      mr: 0,
      length: 0,
      width: 0,
      feed: 0,
      estimatedCT: 0,
      actualCT: 0,
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
      nop: 0,
      fpp: 0,
      estimatedHrs: 0,
      toolingSize: 0,
    });

    setContainers(updatedContainers);

    setFormData((prevData) => ({
      ...prevData,
      processTable: updatedContainers,
    }));
  };

  const handleDeleteRow = (containerIndex, rowIndex) => {
    // Clone the containers array to avoid modifying the state directly
    const updatedContainers = [...containers];

    // Remove the row from the process table data for the specified container
    updatedContainers[containerIndex].processTableData.splice(rowIndex, 1);

    // Update the state with the modified containers array
    setContainers(updatedContainers);
  };

  const addContainer = () => {
    // Create a new container with initial data
    const newContainer = {
      dropdownValue: "",
      processTableData: [],
    };

    // Update the containers state with the new container
    setContainers((prevContainers) => [...prevContainers, newContainer]);
  };

  const deleteContainer = (containerIndex) => {
    // Clone the containers array to avoid modifying the state directly
    const updatedContainers = [...containers];

    // Remove the container at the specified containerIndex
    updatedContainers.splice(containerIndex, 1);

    // Update the state with the modified containers array
    setContainers(updatedContainers);
  };
  const handleDropdownChange = (e, containerIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].processName = e.target.value;

    // Update the state with the selected process name
    setContainers(updatedContainers);
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
      {containers.map((container, containerIndex) => (
        <TableContainer
          key={containerIndex}
          component={Paper}
          sx={{ marginTop: 3 }}
        >
          <TableRow sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <TableCell>{containerIndex + 1}</TableCell>
              <TableCell>
                <Select
                  value={container.processName}
                  label="processName"
                  className="fixed-width-input"
                  size="small"
                  onChange={(e) => handleDropdownChange(e, containerIndex)}
                >
                  <MenuItem value="Milling">MILLING</MenuItem>
                  <MenuItem value="Boring">BORING</MenuItem>
                  <MenuItem value="Drilling">DRILLING</MenuItem>
                  <MenuItem value="Tapping">TAPPING</MenuItem>
                </Select>
              </TableCell>
            </div>
            <IconButton size="small">
              <ClearIcon
                color="error"
                onClick={() => deleteContainer(containerIndex)}
              />
            </IconButton>
          </TableRow>
          {/* Add ProcessTable component with appropriate props */}
          <ProcessTable
            key={containerIndex}
            data={container.processTableData}
            handleTextFieldChange={handleTextFieldChange}
            handleDeleteRow={handleDeleteRow}
            processTableErrors={processTableErrors}
            containerIndex={containerIndex}
            handleAddRow={handleAddRow}
            selectedProcessName={container.processName}
            // ... other props you may need
          />
        </TableContainer>
      ))}
      {/* <IconButton size="large" onClick={handleAddRow}>
        <AddCircleIcon color="primary" />
      </IconButton> */}
      <IconButton size="large" onClick={addContainer}>
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
