import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  ListSubheader,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  Toolbar,
  Tooltip,
} from "@mui/material";
import "../component/pages/Job/ProcessTable.css";
import SearchIcon from "@mui/icons-material/Search";

import ClearIcon from "@mui/icons-material/Clear";

// import { machineData, processList, toolList } from "./Data";

function DrillingTable({
  handleDeleteRow,
  processTableData,
  handleTextFieldChange,
  processTableErrors,
  containerIndex,
  handleAddRow,
  machineNameSearch,
  setMachineNameSearch,
  processSearch,
  setProcessSearch,
  toolingSearch,
  setToolingSearch,
  displayMachineName,
  displayedProcess,
  displayToolingDrilling,
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

            {/* <TableCell align="center">EST.HRS</TableCell> */}

            <TableCell align="center">Estimated CT(min)</TableCell>
            {/* <TableCell align="center">Start Date</TableCell>
          <TableCell align="center">Start Time</TableCell>
          <TableCell align="center">End Date</TableCell>
          <TableCell align="center">End Time</TableCell>
          <TableCell align="center">Ideal Code</TableCell>
          <TableCell align="center">Start Date</TableCell>
          <TableCell align="center">Start Time</TableCell>
          <TableCell align="center">End Date</TableCell>
          <TableCell align="center">End Time</TableCell>
          <TableCell align="center">Estimated CT(min)</TableCell>
          <TableCell align="center">User Name</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {processTableData &&
            processTableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="center">{rowIndex + 1}</TableCell>
                {/* <TableCell align="center">
                <ModeStandbyOutlinedIcon
                  style={{
                    color:
                      row.actualCT > row.estimatedCT
                        ? "red" // Actual CT is more than Estimated CT + 10
                        : row.actualCT < row.estimatedCT
                        ? "green" // Actual CT is less than Estimated CT - 10
                        : "inherit", // Default background color
                  }}
                />
              </TableCell> */}
                <TableCell align="center">
                  <FormControl>
                    <InputLabel
                      id="demo-multiple-name-label"
                      style={{ color: "#1D5393" }}
                    >
                      ProcessName
                    </InputLabel>
                    <Select
                      labelId={`process-label-${rowIndex}`}
                      size="small"
                      id={`process-${rowIndex}`}
                      value={row.process}
                      name={`process-${rowIndex}`}
                      className="input"
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "process",
                          containerIndex,
                          "Drilling"
                        )
                      }
                      error={processTableErrors[rowIndex]?.process}
                    >
                      <ListSubheader>
                        <TextField
                          size="small"
                          // Autofocus on textfield
                          autoFocus
                          placeholder="Type to search..."
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setProcessSearch(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                              // Prevents autoselecting item while typing (default Select behaviour)
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {displayedProcess.length === 0 ? (
                        <MenuItem disabled>No items found</MenuItem>
                      ) : (
                        displayedProcess.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.process}
                    >
                      {processTableErrors[rowIndex]?.process
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </FormControl>
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
                  <FormControl>
                    <InputLabel
                      id="demo-multiple-name-label"
                      style={{ color: "#1D5393" }}
                    >
                      Machine Name
                    </InputLabel>
                    <Select
                      labelId={`machineName-label-${rowIndex}`}
                      className="input"
                      size="small"
                      id={`machineName-${rowIndex}`}
                      value={row.machineName}
                      name={`machineName-${rowIndex}`}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "machineName",
                          containerIndex,
                          "Drilling"
                        )
                      }
                      error={processTableErrors[rowIndex]?.machineName}
                    >
                      <ListSubheader>
                        <TextField
                          size="small"
                          // Autofocus on textfield
                          autoFocus
                          placeholder="Type to search..."
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setMachineNameSearch(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                              // Prevents autoselecting item while typing (default Select behaviour)
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>

                      {displayMachineName.length === 0 ? (
                        <MenuItem disabled>No items found</MenuItem>
                      ) : (
                        displayMachineName.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.machineName}
                    >
                      {processTableErrors[rowIndex]?.machineName
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </FormControl>
                </TableCell>

                <TableCell align="center">
                  <FormControl>
                    <InputLabel
                      id="demo-multiple-name-label"
                      style={{ color: "#1D5393" }}
                    >
                      ToolingUsed
                    </InputLabel>
                    <Select
                      labelId={`toolingUsed-label-${rowIndex}`}
                      className="input"
                      size="small"
                      id={`toolingUsed-${rowIndex}`}
                      value={row.toolingUsed} // Ensure that value is an array
                      // Enable multiple selection
                      name={`toolingUsed-${rowIndex}`}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "toolingUsed",
                          containerIndex,
                          "Drilling"
                        )
                      }
                      error={processTableErrors[rowIndex]?.toolingUsed}
                    >
                      <ListSubheader>
                        <TextField
                          size="small"
                          // Autofocus on textfield
                          autoFocus
                          placeholder="Type to search..."
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setToolingSearch(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                              // Prevents autoselecting item while typing (default Select behaviour)
                              e.stopPropagation();
                            }
                          }}
                        />
                      </ListSubheader>
                      {displayToolingDrilling.length === 0 ? (
                        <MenuItem disabled>No items found</MenuItem>
                      ) : (
                        displayToolingDrilling.map((name) => (
                          <MenuItem value={name}>{name}</MenuItem>
                        ))
                      )}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.toolingUsed}
                    >
                      {processTableErrors[rowIndex]?.toolingUsed
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </FormControl>
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
                    // error={processTableErrors[rowIndex]?.length}
                    // helperText={
                    //   processTableErrors[rowIndex]?.length
                    //     ? "This field is required"
                    //     : ""
                    // }
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
                {/* <TableCell align="center">
                <TextField
                  label="startDate"
                  className="fixed-width-input"
                  size="small"
                  type="date"
                  name={`startDate-${rowIndex}`}
                  value={formattedEditDate(row.startDate)}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "startDate",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  inputProps={{
                    min: new Date().toISOString().split("T")[0],
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  label="startTime"
                  size="small"
                  className="fixed-width-input"
                  type="time"
                  name={`startTime-${rowIndex}`}
                  value={row.startTime}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "startTime",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  label="endDate"
                  size="small"
                  type="date"
                  name={`endDate-${rowIndex}`}
                  className="fixed-width-input"
                  value={formattedEditDate(row.endDate)}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "endDate",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  inputProps={{
                    min: new Date().toISOString().split("T")[0],
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  label="endTime"
                  size="small"
                  type="time"
                  name={`endTime-${rowIndex}`}
                  className="fixed-width-input"
                  value={row.endTime}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "endTime",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Select
                  labelId={`idleCode-label-${rowIndex}`}
                  size="small"
                  id={`idleCode-${rowIndex}`}
                  value={row.idleCode}
                  name={`idleCode-${rowIndex}`}
                  className="fixed-width-input"
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "idleCode",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  error={processTableErrors[rowIndex]?.idleCode}
                >
                  {idleCode.map((name) => (
                    <MenuItem key={name.no} value={name.no}>
                      {name.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  error={processTableErrors[rowIndex]?.idleCode}
                >
                  {processTableErrors[rowIndex]?.idleCode
                    ? "This field is required"
                    : ""}
                </FormHelperText>
              </TableCell>
              <TableCell align="center">
                <TextField
                  label="startDate1"
                  size="small"
                  type="date"
                  name={`startDate1-${rowIndex}`}
                  value={formattedEditDate(row.startDate1)}
                  className="fixed-width-input"
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "startDate1",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  inputProps={{
                    min: new Date().toISOString().split("T")[0],
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  label="startTime1"
                  size="small"
                  type="time"
                  name={`startTime1-${rowIndex}`}
                  className="fixed-width-input"
                  value={row.startTime1}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "startTime1",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  label="endDate1"
                  className="fixed-width-input"
                  size="small"
                  type="date"
                  name={`endDate1-${rowIndex}`}
                  value={formattedEditDate(row.endDate1)}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "endDate1",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  inputProps={{
                    min: new Date().toISOString().split("T")[0],
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  label="endTime1"
                  className="fixed-width-input"
                  size="small"
                  type="time"
                  name={`endTime1-${rowIndex}`}
                  value={row.endTime1}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "endTime1",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  label="estimatedCT"
                  className="fixed-width-input"
                  size="small"
                  name={`estimatedCT-${rowIndex}`}
                  value={row.estimatedCT}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "estimatedCT",
                      containerIndex,
                      "Drilling"
                    )
                  }
                  error={processTableErrors[rowIndex]?.estimatedCT}
                  helperText={
                    processTableErrors[rowIndex]?.estimatedCT
                      ? "This field is required"
                      : ""
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Select
                  labelId={`userName-label-${rowIndex}`}
                  className="fixed-width-input"
                  size="small"
                  id={`userName-${rowIndex}`}
                  value={row.userName}
                  name={`userName-${rowIndex}`}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "userName",
                      containerIndex,
                      "Drilling"
                    )
                  }
                >
                  {userName.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell> */}

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
