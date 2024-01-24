import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Autocomplete,
  TextField,
  IconButton,
  FormHelperText,
  Button,
  Tooltip,
} from "@mui/material";
import "../component/pages/Job/ProcessTable.css";

import ClearIcon from "@mui/icons-material/Clear";

import { machineData, processList, toolListDrilling } from "./Data";

function DrillingTable({
  handleDeleteRow,
  processTableData,
  handleTextFieldChange,
  processTableErrors,
  containerIndex,
  handleAddRow,
  handleValidation,
}) {
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
            <TableCell align="center">DIA</TableCell>
            <TableCell align="center">RPM</TableCell>
            <TableCell align="center">Feed(MM/MIN)</TableCell>
            <TableCell align="center">Length</TableCell>
            <TableCell align="center">NOH</TableCell>
            <TableCell align="center">Estimated CT(min)</TableCell>
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
                        "Drilling"
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
                        "Drilling"
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
                        "Drilling"
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
                    options={toolListDrilling}
                    getOptionLabel={(option) => option}
                    value={row.toolingUsed}
                    onChange={(e, newValue) =>
                      handleTextFieldChange(
                        { target: { value: newValue } },
                        rowIndex,
                        "toolingUsed",
                        containerIndex,
                        "Drilling"
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
                    label="dia"
                    className="fixed-width-input"
                    size="small"
                    name={`dia-${rowIndex}`}
                    value={row.dia}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "dia",
                        containerIndex,
                        "Drilling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.dia}
                    helperText={
                      processTableErrors[rowIndex]?.dia
                        ? "This field is required"
                        : ""
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="rpm"
                    className="fixed-width-input"
                    size="small"
                    name={`rpm-${rowIndex}`}
                    value={row.rpm}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "rpm",
                        containerIndex,
                        "Drilling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.rpm}
                    helperText={
                      processTableErrors[rowIndex]?.rpm
                        ? "This field is required"
                        : ""
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
                        "Drilling"
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
                        "Drilling"
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    label="noh"
                    className="fixed-width-input"
                    size="small"
                    name={`noh-${rowIndex}`}
                    value={row.noh}
                    onChange={(e) =>
                      handleTextFieldChange(
                        e,
                        rowIndex,
                        "noh",
                        containerIndex,
                        "Drilling"
                      )
                    }
                    error={processTableErrors[rowIndex]?.noh}
                    helperText={
                      processTableErrors[rowIndex]?.noh
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
                        "Drilling"
                      )
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

export default DrillingTable;
