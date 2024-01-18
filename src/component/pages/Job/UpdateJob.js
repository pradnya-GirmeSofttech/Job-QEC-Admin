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
  Tooltip,
} from "@mui/material";
import Dashboard from "../../dashboard/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate, useParams } from "react-router-dom";
import { ProcessTable } from "./ProcessTable";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { editJob, getSingleJob } from "../../../actions/job";
import { ArrowBack } from "./BackArrow";
import { formattedEditDate } from "./formattedDate";
import Loader from "../../loader/Loader";

function UpdateJob() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.job);
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
    estimatedtotalCT: "",
    actualtotalCT: "",
    dragNo: "",
    processTable: [...containers],
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
    formData?.processTable?.map(() => ({
      process: false,
      description: false,
      machineName: false,
      toolingUsed: false,
      dc: false,
      length: false,
      width: false,
      feed: false,
      estimatedCT: false,
    })) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getSingleJob(id));
        setFormData(response.payload);
        setContainers(response.payload.processTable);
        // const initialProcessTableErrors =
        //   response.payload?.processTable?.map(() => ({
        //     process: false,
        //     description: false,
        //     machineName: false,
        //     toolingUsed: false,
        //     dc: false,
        //     length: false,
        //     width: false,
        //     feed: false,
        //     estimatedCT: false,
        //   })) || [];

        // setProcessTableErrors(initialProcessTableErrors);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);
  // ... Your existing code

  useEffect(() => {
    // Whenever 'containers' changes, update 'formData' to include the latest 'containers'
    setFormData((prevFormData) => ({
      ...prevFormData,
      processTable: containers,
    }));
  }, [containers]);

  // ... Rest of your component code

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the totalEstimatedCT as you did before
    // const totalEstimatedCT = containers.reduce((total, container) => {
    //   const containerEstimatedCT = container.processTableData.reduce(
    //     (containerTotal, data) => {
    //       if (!isNaN(data.estimatedCT)) {
    //         return containerTotal + data.estimatedCT;
    //       }
    //       return containerTotal;
    //     },
    //     0
    //   );
    //   return total + containerEstimatedCT;
    // }, 0);

    // Update the formData with the new totalEstimatedCT value
    // setFormData((prevData) => ({
    //   ...prevData,
    //   actualtotalCT: totalEstimatedCT, // Update the actualtotalCT here
    // }));

    const editFormData = {
      formData: {
        ...formData, // Make sure to include the updated formData
        // Update the actualtotalCT here as well
      },
      id,
    };

    // Use the dispatch function here to send the updated data to the backend
    try {
      await dispatch(editJob(editFormData));
      navigate(-1);
    } catch (error) {
      console.error("Error while sending data to the backend:", error);
    }
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

  const handleAddRow = (containerIndex) => {
    setContainers((prevContainers) => {
      const updatedContainers = [...prevContainers];
      const containerToUpdate = { ...updatedContainers[containerIndex] };

      // Create a new row with initial data
      const newRow = {
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
      };

      // Create a new array with the updated processTableData
      const updatedProcessTableData = [
        ...containerToUpdate.processTableData,
        newRow,
      ];

      // Update the container's processTableData with the new array
      containerToUpdate.processTableData = updatedProcessTableData;

      // Update the containers state with the modified container
      updatedContainers[containerIndex] = containerToUpdate;

      return updatedContainers;
    });
  };
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

  const calculateTotalCT = () => {
    // Calculate the totalEstimatedCT as you did before
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
    console.log("totalEstimatedCT", totalEstimatedCT);
    // Update the formData with the new totalEstimatedCT value
    setFormData((prevData) => ({
      ...prevData,
      actualtotalCT: totalEstimatedCT, // Update the actualtotalCT here
    }));
  };

  const handleTextFieldChange = (
    event,
    rowIndex,
    fieldName,
    containerIndex,
    processName
  ) => {
    // Make a copy of the containers state
    console.log("fieldsName", fieldName);
    setContainers((prevContainers) => {
      return prevContainers.map((element, index1) => {
        if (containerIndex === index1) {
          return {
            ...element,
            processTableData: element.processTableData.map((data, index) => {
              const updatedData = { ...data };
              // const prevValue = updatedData[fieldName];
              updatedData[fieldName] = event.target.value;

              if (processName === "Milling" && index === rowIndex) {
                // Create a new object to represent the updated data
                const updatedData = { ...data };

                // Store the previous value
                console.log(fieldName);
                const prevValue = updatedData[fieldName];

                // Update the field with the new value
                updatedData[fieldName] = event.target.value;

                // Update other fields based on the previous value
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
                  // updatedData.toolingSize = event.target.value;
                  updatedData.dia = updatedData.toolingSize * 0.9;

                  updatedData.nop = parseFloat(
                    (updatedData.width / updatedData.dia).toFixed(2)
                  );

                  updatedData.fpp = parseFloat(
                    (updatedData.length / updatedData.feed).toFixed(2)
                  );

                  updatedData.actualCT = parseFloat(
                    (
                      updatedData.nop *
                      updatedData.fpp *
                      (updatedData.mr / updatedData.dc) *
                      1.25
                    ).toFixed(2)
                  );
                  updatedData.estimatedHrs = parseFloat(
                    (updatedData.actualCT / 60).toFixed(2)
                  );
                } else if (
                  fieldName === "startTime" ||
                  fieldName === "endTime" ||
                  fieldName === "startTime1" ||
                  fieldName === "endTime1" ||
                  fieldName === "idleCode" ||
                  fieldName === "estimatedCT"
                ) {
                  const diff = calculateCT(updatedData);
                  updatedData.estimatedCT = diff;
                  // calculateTotal();
                }

                // Update the state with the modified data
                return updatedData;
              } else if (processName === "Boring" && index === rowIndex) {
                // Create a new object to represent the updated data
                const updatedData = { ...data };

                // Store the previous value
                const prevValue = updatedData[fieldName];

                // Update the field with the new value
                updatedData[fieldName] = event.target.value;

                // Update other fields based on the previous value
                if (
                  fieldName === "mr" ||
                  fieldName === "dc" ||
                  fieldName === "length" ||
                  fieldName === "feed" ||
                  fieldName === "rpm"
                ) {
                  updatedData.nop = parseFloat(
                    (updatedData.mr / updatedData.dc).toFixed(2)
                  );

                  updatedData.fpp = parseFloat(
                    updatedData.length /
                      (updatedData.rpm * updatedData.feed).toFixed(2)
                  );
                  updatedData.actualCT = parseFloat(
                    updatedData.nop * updatedData.fpp * (1.25).toFixed(2)
                  );
                } else if (
                  fieldName === "startTime" ||
                  fieldName === "endTime" ||
                  fieldName === "startTime1" ||
                  fieldName === "endTime1" ||
                  fieldName === "idleCode"
                ) {
                  const diff = calculateCT(updatedData);
                  updatedData.estimatedCT = diff;
                }
                // Update the state with the modified data
                return updatedData;
              } else if (processName === "Drilling" && index === rowIndex) {
                // Create a new object to represent the updated data
                const updatedData = { ...data };

                // Store the previous value
                const prevValue = updatedData[fieldName];

                // Update the field with the new value
                updatedData[fieldName] = event.target.value;

                // Update other fields based on the previous value
                if (
                  fieldName === "noh" ||
                  fieldName === "legnth" ||
                  fieldName === "feed"
                ) {
                  updatedData.actualCT = parseFloat(
                    (
                      ((updatedData.length * 1.05) / updatedData.feed) *
                      updatedData.noh
                    ).toFixed(2)
                  );
                  updatedData.estimatedHrs = parseFloat(
                    (updatedData.actualCT / 60).toFixed(2)
                  );
                } else if (
                  fieldName === "startTime" ||
                  fieldName === "endTime" ||
                  fieldName === "startTime1" ||
                  fieldName === "endTime1" ||
                  fieldName === "idleCode"
                ) {
                  const diff = calculateCT(updatedData);
                  updatedData.estimatedCT = diff;
                }

                // Update the state with the modified data
                return updatedData;
              } else if (processName === "Tapping" && index === rowIndex) {
                // Create a new object to represent the updated data
                const updatedData = { ...data };

                // Store the previous value
                const prevValue = updatedData[fieldName];

                // Update the field with the new value
                updatedData[fieldName] = event.target.value;

                // Update other fields based on the previous value
                if (
                  fieldName === "noh" ||
                  fieldName === "legnth" ||
                  fieldName === "rpm"
                ) {
                  updatedData.actualCT = parseFloat(
                    (updatedData.length / (updatedData.rpm * 1.5)) *
                      updatedData.noh *
                      (1.3).toFixed(2)
                  );
                  updatedData.estimatedHrs =
                    parseInt(updatedData.actualCT) / 60;
                } else if (
                  fieldName === "startTime" ||
                  fieldName === "endTime" ||
                  fieldName === "startTime1" ||
                  fieldName === "endTime1" ||
                  fieldName === "idleCode" ||
                  fieldName === "estimatedCT"
                ) {
                  const diff = calculateCT(updatedData);
                  updatedData.estimatedCT = diff;
                  // const total = calculateTotal(updatedData);
                }
                return updatedData;
              }

              return data;
            }),
          };
        }
        return element;
      });
    });

    // ... (rest of your handleTextFieldChange function)
  };

  const handleDeleteRow = (containerIndex, rowIndex) => {
    // Clone the containers array to avoid modifying the state directly
    const updatedContainers = [...containers];

    if (
      Array.isArray(updatedContainers) &&
      containerIndex >= 0 &&
      containerIndex < updatedContainers.length &&
      Array.isArray(updatedContainers[containerIndex].processTableData) &&
      rowIndex >= 0 &&
      rowIndex < updatedContainers[containerIndex].processTableData.length
    ) {
      // Check if the nested arrays are valid before trying to delete
      updatedContainers[containerIndex].processTableData.splice(rowIndex, 1);
    }

    // Update the state with the modified containers array
    setContainers(updatedContainers);
  };

  const addContainer = () => {
    // Create a new container with initial data
    const newContainer = {
      processName: "",
      processTableData: [],
    };

    // Update the containers state with the new container
    setContainers((prevContainers) => [...prevContainers, newContainer]);

    // Update the formData state to include the new containers
    setFormData((prevData) => ({
      ...prevData,
      processTable: [...prevData.processTable, newContainer],
    }));
  };

  const deleteContainer = (containerIndex) => {
    // Clone the containers array to avoid modifying the state directly
    const updatedContainers = [...containers];

    // Remove the container at the specified containerIndex
    updatedContainers.splice(containerIndex, 1);

    // Update the state with the modified containers array
    setContainers(updatedContainers);

    // Update the formData state to remove the deleted container
    setFormData((prevData) => ({
      ...prevData,
      processTable: prevData.processTable.filter(
        (_, index) => index !== containerIndex
      ),
    }));
  };

  const handleDropdownChange = (e, containerIndex) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].processName = e.target.value;

    // Update the state with the selected process name
    setContainers(updatedContainers);
  };

  return (
    <Dashboard>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box display={"flex"}>
            <ArrowBack />
            <h2>Update Job</h2>
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
                      value={formData?.soWo}
                      onChange={handleChange}
                      error={errors.soWo} // Set error prop based on the error state
                      helperText={errors.soWo ? "This field is required" : ""}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">Prod.Order No</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Prod.Order No"
                      id="outlined-size-small"
                      size="small"
                      name="prodOrderNo"
                      value={formData?.prodOrderNo}
                      onChange={handleChange}
                      error={errors.prodOrderNo}
                      helperText={
                        errors.prodOrderNo ? "This field is required" : ""
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      value={formattedEditDate(formData?.woDate)}
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
                      value={formData?.jobName}
                      onChange={handleChange}
                      error={errors.jobName}
                      helperText={
                        errors.jobName ? "This field is required" : ""
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">PO No</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="PO No"
                      id="outlined-size-small"
                      size="small"
                      name="poNo"
                      value={formData?.poNo}
                      onChange={handleChange}
                      error={errors.poNo}
                      helperText={errors.poNo ? "This field is required" : ""}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">Total CT</TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Total CT"
                      id="outlined-size-small"
                      size="small"
                      name="estimatedtotalCT"
                      value={formData?.estimatedtotalCT}
                      onChange={handleChange}
                      error={errors.estimatedtotalCT}
                      helperText={
                        errors.estimatedtotalCT ? "This field is required" : ""
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      value={formData?.dragNo}
                      onChange={handleChange}
                      error={errors.dragNo}
                      helperText={errors.dragNo ? "This field is required" : ""}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {containers?.map((container, containerIndex) => (
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
                  <TableCell>
                    <Select
                      value={container.processName}
                      label="processName"
                      className="input"
                      size="small"
                      onChange={(e) => handleDropdownChange(e, containerIndex)}
                      selectedProcessName={container.processName}
                    >
                      <MenuItem value="Milling">MILLING</MenuItem>
                      <MenuItem value="Boring">BORING</MenuItem>
                      <MenuItem value="Drilling">DRILLING</MenuItem>
                      <MenuItem value="Tapping">TAPPING</MenuItem>
                    </Select>
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
                // ... other props you may need
              />
            </TableContainer>
          ))}

          <Box display={"flex"} marginTop={5}>
            <div>
              <IconButton size="large" onClick={addContainer}>
                <AddCircleIcon color="primary" />
              </IconButton>
              <Button
                color="primary"
                sx={{
                  backgroundColor: "#1d5393",
                  color: "#fff",
                  marginRight: "10px",
                }}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Button
                color="primary"
                sx={{
                  backgroundColor: "#1d5393",
                  color: "#fff",
                  marginRight: 2,
                }}
                onClick={calculateTotalCT}
              >
                CalculateTotal CT
              </Button>
              <TextField
                label="Actual Total CT"
                id="outlined-size-small"
                size="small"
                name="actualtotalCT"
                value={formData?.actualtotalCT}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Box>
        </>
      )}
    </Dashboard>
  );
}

export default UpdateJob;
