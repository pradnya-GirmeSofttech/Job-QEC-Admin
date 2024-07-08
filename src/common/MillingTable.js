import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  FormHelperText,
  Button,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import "../component/pages/Job/ProcessTable.css";
import { machineData, processList, toolListMilling } from "./Data";
import ClearIcon from "@mui/icons-material/Clear";

function MillingTable({
  handleDeleteRow,
  processTableData,
  handleTextFieldChange,
  processTableErrors,
  containerIndex,
  handleAddRow,
  processSearch,
  handleValidation,
}) {
  console.log("process search", processSearch);
  // const filterOptions = (options, { inputValue }) => {
  //   const filteredOptions = options.filter(option =>
  //     option.toLowerCase().includes(inputValue.toLowerCase())
  //   );
    
  //   filteredOptions.sort((a, b) => {
  //     if (a.toLowerCase().startsWith(inputValue.toLowerCase())) return -1;
  //     if (b.toLowerCase().startsWith(inputValue.toLowerCase())) return 1;
  //     return 0;
  //   });

  //   return filteredOptions;
  // };
  return (
    <>
      <Table sx={{ minWidth: 1500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr.No</TableCell>

            <TableCell align="center">Process</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Machine Name</TableCell>
            <TableCell align="center">Tooling Used</TableCell>
            <TableCell align="center">Tooling Size</TableCell>
            <TableCell align="center">Width</TableCell>
            <TableCell align="center">Length</TableCell>
            <TableCell align="center">Feed</TableCell>
            <TableCell align="center">DC</TableCell>
            <TableCell align="center">MR</TableCell>
            <TableCell align="center">NOP</TableCell>
            <TableCell align="center">FPP</TableCell>
            <TableCell align="center">Estimated CT(min)</TableCell>
            <TableCell align="center">EST.HRS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processTableData &&
            processTableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="center">{rowIndex + 1}</TableCell>
                <TableCell align="center">
                  <Autocomplete
                    disablePortal
                    className="input"
                    id={`process-${rowIndex}`}
                    options={processList}
                    getOptionLabel={(option) => option}
                    value={row.process}
                    onChange={(e, newValue) =>
                      handleTextFieldChange(
                        { target: { value: newValue } },
                        rowIndex,
                        "process",
                        containerIndex,
                        "Milling"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Process"
                        size="small"
                        name={`process-${rowIndex}`}
                        className="input"
                        error={processTableErrors[rowIndex]?.process}
                      />
                    )}
                  />
                  <FormHelperText error={processTableErrors[rowIndex]?.process}>
                    {processTableErrors[rowIndex]?.process
                      ? "This field is required"
                      : ""}
                  </FormHelperText>
                </TableCell>

                <TableCell align="center">
                  <TextField
                    label="Description"
                    className="input"
                    size="small"
                    name={`description-${rowIndex}`}
                    value={row.description}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "description",
                        containerIndex,
                        "Milling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.description}
                    helperText={
                      processTableErrors[rowIndex]?.description
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Autocomplete
                    disablePortal
                    className="input"
                    id={`machineName-${rowIndex}`}
                    options={machineData}
                    getOptionLabel={(option) => option}
                    value={row.machineName}
                    onChange={(e, newValue) =>
                      handleTextFieldChange(
                        { target: { value: newValue } },
                        rowIndex,
                        "machineName",
                        containerIndex,
                        "Milling"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Machine Name"
                        size="small"
                        name={`machineName-${rowIndex}`}
                        className="input"
                        error={processTableErrors[rowIndex]?.process}
                      />
                    )}
                  />
                  <FormHelperText error={processTableErrors[rowIndex]?.process}>
                    {processTableErrors[rowIndex]?.process
                      ? "This field is required"
                      : ""}
                  </FormHelperText>
                </TableCell>
                <TableCell align="center">
                  <Autocomplete
                    disablePortal
                    className="input"
                    id={`toolingUsed-${rowIndex}`}
                    options={toolListMilling}
                    getOptionLabel={(option) =>option }
                    // filterOptions={filterOptions}
                    value={row.toolingUsed}
                    onChange={(e, newValue) =>
                      handleTextFieldChange(
                        { target: { value: newValue } },
                        rowIndex,
                        "toolingUsed",
                        containerIndex,
                        "Milling"
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tooling Used"
                        size="small"
                        name={`toolingUsed-${rowIndex}`}
                        className="input"
                        error={processTableErrors[rowIndex]?.process}
                      />
                    )}
                  />
                  <FormHelperText error={processTableErrors[rowIndex]?.process}>
                    {processTableErrors[rowIndex]?.process
                      ? "This field is required"
                      : ""}
                  </FormHelperText>
                </TableCell>

                <TableCell align="center">
                  <TextField
                    label="toolingSize"
                    className="fixed-width-input"
                    size="small"
                    name={`toolingSize-${rowIndex}`}
                    value={row.toolingSize}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "toolingSize",
                        containerIndex,
                        "Milling"
                      )
                    }
                    onBlur={(e) => handleValidation(e, rowIndex)}
                    error={processTableErrors[rowIndex]?.toolingSize}
                    helperText={
                      processTableErrors[rowIndex]?.toolingSize
                        ? "This field is required"
                        : ""
                    }
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*", // Regex pattern to allow only numbers
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="width"
                    className="fixed-width-input"
                    size="small"
                    name={`width-${rowIndex}`}
                    value={row.width}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "width",
                        containerIndex,
                        "Milling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.width}
                    helperText={
                      processTableErrors[rowIndex]?.width
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="length"
                    className="fixed-width-input"
                    size="small"
                    name={`length-${rowIndex}`}
                    value={row.length}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "length",
                        containerIndex,
                        "Milling"
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="feed"
                    className="fixed-width-input"
                    size="small"
                    name={`feed-${rowIndex}`}
                    value={row.feed}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "feed",
                        containerIndex,
                        "Milling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.feed}
                    helperText={
                      processTableErrors[rowIndex]?.feed
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="dc"
                    className="fixed-width-input"
                    size="small"
                    name={`dc-${rowIndex}`}
                    value={row.dc}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "dc",
                        containerIndex,
                        "Milling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.dc}
                    helperText={
                      processTableErrors[rowIndex]?.dc
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="mr"
                    className="fixed-width-input"
                    size="small"
                    name={`mr-${rowIndex}`}
                    value={row.mr}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "mr",
                        containerIndex,
                        "Milling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.mr}
                    helperText={
                      processTableErrors[rowIndex]?.mr
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="nop"
                    className="fixed-width-input"
                    size="small"
                    name={`nop-${rowIndex}`}
                    value={row.nop}
                    disabled
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "nop",
                        containerIndex,
                        "Milling"
                      )
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={processTableErrors[rowIndex]?.nop}
                    helperText={
                      processTableErrors[rowIndex]?.nop
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="fpp"
                    className="fixed-width-input"
                    size="small"
                    name={`fpp-${rowIndex}`}
                    value={row.fpp}
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "fpp",
                        containerIndex,
                        "Milling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.fpp}
                    helperText={
                      processTableErrors[rowIndex]?.fpp
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="EstimatedCT"
                    className="fixed-width-input"
                    size="small"
                    name={`actualCT-${rowIndex}`}
                    value={row.actualCT}
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "actualCT",
                        containerIndex,
                        "Milling"
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="estimatedHrs"
                    className="fixed-width-input"
                    size="small"
                    name={`estimatedHrs-${rowIndex}`}
                    value={row.estimatedHrs}
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "estimatedHrs",
                        containerIndex,
                        "Milling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.estimatedHrs}
                    helperText={
                      processTableErrors[rowIndex]?.estimatedHrs
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Delete Row" arrow placement="top">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteRow(containerIndex, rowIndex)}
                    >
                      <ClearIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          <Button
            color="primary"
            sx={{
              backgroundColor: "#1d5393",
              color: "#fff",
              width: 100,
              margin: 3,
              "&:hover": {
                backgroundColor: "#245BA1", // Adjust the color for hover effect
              },
              "&:active": {
                backgroundColor: "#1d5393", // Keep the same color as the initial state
              },
            }}
            onClick={() => handleAddRow(containerIndex)}
          >
            Add Row
          </Button>
        </TableBody>
      </Table>
    </>
  );
}

export default MillingTable;
