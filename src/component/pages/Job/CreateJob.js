import React, { useEffect, useState, useMemo } from "react";
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
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import "./ProcessTable.css";
import Dashboard from "../../dashboard/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { ProcessTable } from "./ProcessTable";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { createJob } from "../../../actions/job";
import { ArrowBack } from "../../../common/BackArrow";
import { handleSelection } from "../../../utils/HandleBreadcrumb";
import CustomBreadcrumb from "../../../common/CustomBreadcrumb";
import MyModal from "../../../utils/Modal";
import { machineData, processList, toolList } from "../../../common/Data";
const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
function CreateJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
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
    estimatedtotalCT: null,
    actualtotalCT: 0,
    dragNo: "",
    processTable: containers,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [errors, setErrors] = useState({
    soWo: false,

    jobName: false,
    poNo: false,
    estimatedtotalCT: false,

    dragNo: false,
  });
  const [processTableErrors, setProcessTableErrors] = useState(() => {
    return containers.map((item) => {
      const dataLength = item.processTableData.length || 1; // Use 1 if the array is empty
      return Array(dataLength)
        .fill(null)
        .map(() => ({
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
    });
  });

  const [machineNameSearch, setMachineNameSearch] = useState("");
  const [processSearch, setProcessSearch] = useState("");
  const [toolingSearch, setToolingSearch] = useState("");

  const displayMachineName = useMemo(
    () =>
      machineData.filter((option) => containsText(option, machineNameSearch)),
    [machineNameSearch]
  );

  const displayedProcess = useMemo(
    () => processList.filter((option) => containsText(option, processSearch)),
    [processSearch]
  );

  const displayTooling = useMemo(
    () => toolList.filter((option) => containsText(option, toolingSearch)),
    [toolingSearch]
  );

  console.log(processTableErrors);

  const handleValidation = (event, rowIndex) => {
    const enteredValue = event.target.value;
    console.log("validation", enteredValue);
    if (!/^[0-9]*$/.test(enteredValue)) {
      // If the entered value is not a number, update the error state

      setProcessTableErrors((prevErrors) => ({
        ...prevErrors,
        [rowIndex]: {
          ...prevErrors[rowIndex],
          toolingSize: "Only numbers are allowed",
        },
      }));
    } else {
      // If the entered value is a number, clear the error state
      setProcessTableErrors((prevErrors) => ({
        ...prevErrors,
        [rowIndex]: {
          ...prevErrors[rowIndex],
          toolingSize: "",
        },
      }));
    }
  };

  const handleOpenModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

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
      // "dc",
      // "length",
      // "width",
      // "feed",
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

    const newProcessTableErrors = containers.map((container) => {
      return container.processTableData.map((data) => {
        const rowErrors = {};

        ProcessrequiredFields.forEach((field) => {
          if (!data[field]) {
            rowErrors[field] = true;
          }
        });

        return rowErrors;
      });
    });
    setProcessTableErrors(newProcessTableErrors);

    // Check for processTableErrors
    const hasProcessTableErrors = newProcessTableErrors.some(
      (containerErrors) =>
        containerErrors.some((rowErrors) =>
          Object.values(rowErrors).some((error) => error)
        )
    );
    console.log("errror", newProcessTableErrors);
    if (hasProcessTableErrors) {
      handleOpenModal("Fill all Process Table Data.");
      return;
    }
    const hasEmptyRow = containers.some(
      (item) => item.processTableData.length === 0
    );

    if (hasEmptyRow) {
      handleOpenModal("At least one row in the process table is required.");
      return;
    }

    if (containers.length === 0) {
      handleOpenModal("At least one row in the process table is required.");
      return;
    }
    containers.map((item) => {
      if (item.processTableData.length === 0) {
        handleOpenModal("At least one row in the process table is required.");
        return;
      }
    });

    dispatch(createJob(formData));
    navigate(-1); // This will navigate back to the previous screen
  };
  console.log(processTableErrors);

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

    setContainers(filteredData);
  };

  const handleAddRow = (containerIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].processTableData.push({
      process: "",
      description: "",
      machineName: "",
      toolingUsed: "",
      // dc: 0,
      // mr: 0,
      // length: 0,
      // width: 0,
      // feed: 0,
      // estimatedCT: 0,
      // actualCT: 0,
      startDate: new Date().toISOString().split("T")[0],
      startTime: "",
      endDate: new Date().toISOString().split("T")[0],
      endTime: "",
      // idleCode: "",
      startDate1: new Date().toISOString().split("T")[0],
      startTime1: "",
      endDate1: new Date().toISOString().split("T")[0],
      endTime1: "",
      userName: "",
      // nop: 0,
      // fpp: 0,
      // estimatedHrs: 0,
      // toolingSize: 0,
    });

    setMachineNameSearch("");
    setToolingSearch("");
    setProcessSearch("");
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

  const handleClick = (event, name) => {
    const newSelected = handleSelection(selected, name);
    setSelected(newSelected);
  };

  return (
    <Dashboard>
      <CustomBreadcrumb
        items={["Job", "Job/Create-job"]}
        onClick={handleClick}
      />
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
              <TableCell align="center">Drawing No</TableCell>
              <TableCell align="center">
                <TextField
                  label="Drawing No"
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
                <FormControl>
                  <InputLabel
                    id="demo-multiple-name-label"
                    style={{ color: "#1D5393" }}
                  >
                    ProcessName
                  </InputLabel>
                  <Select
                    value={container.processName}
                    label="processName"
                    className="input"
                    size="large"
                    onChange={(e) => handleDropdownChange(e, containerIndex)}
                  >
                    <MenuItem value="Milling">MILLING</MenuItem>
                    <MenuItem value="Boring">BORING</MenuItem>
                    <MenuItem value="Drilling">DRILLING</MenuItem>
                    <MenuItem value="Tapping">TAPPING</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </div>
            <Tooltip title="Delete Container" arrow placement="top">
              <IconButton size="small" sx={{ marginRight: 3 }}>
                <DeleteOutlineIcon
                  color="error"
                  onClick={() => deleteContainer(containerIndex)}
                />
              </IconButton>
            </Tooltip>
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
            handleValidation={handleValidation}
            machineNameSearch={machineNameSearch}
            setMachineNameSearch={setMachineNameSearch}
            processSearch={processSearch}
            setProcessSearch={setProcessSearch}
            toolingSearch={toolingSearch}
            setToolingSearch={setToolingSearch}
            displayMachineName={displayMachineName}
            displayedProcess={displayedProcess}
            displayTooling={displayTooling}
          />
        </TableContainer>
      ))}

      {/* <IconButton size="large" onClick={handleAddRow}>
        <AddCircleIcon color="primary" />
      </IconButton> */}
      <IconButton size="large" onClick={addContainer}>
        <AddCircleIcon color="primary" />
      </IconButton>
      <MyModal
        open={isModalOpen} // Use 'open' instead of 'isOpen'
        onClose={handleCloseModal}
        title="Error Message" // Set the title you want to display
        description={modalMessage} // Use 'description' instead of 'message'
        buttonText="OK" // Set the button text you want to display
        onButtonClick={handleCloseModal} // Set the button click handler
      />

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
