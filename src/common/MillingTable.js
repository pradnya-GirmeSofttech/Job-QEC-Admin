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

function MillingTable({
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
  displayToolingMilling,
  handleValidation,
}) {
  console.log("displayToolingMilling", displayToolingMilling);
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
              <TableRow
                key={rowIndex}
                // style={{
                //   color: "#fff",
                //   backgroundColor:
                //     row.actualCT >= row.estimatedCT
                //       ? "#78cc9f"
                //       : row.actualCT < row.estimatedCT
                //       ? "#c34266"
                //       : "inherit",
                // }}
              >
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
                      style={{
                        color: "#1D5393",
                      }}
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
                          "Milling"
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
                          "Milling"
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
                      name={`toolingUsed-${rowIndex}`}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "toolingUsed",
                          containerIndex,
                          "Milling"
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
                      {displayToolingMilling.length === 0 ? (
                        <MenuItem disabled>No items found</MenuItem>
                      ) : (
                        displayToolingMilling.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
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
                {/* 
            <TableCell align="center">
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
                    "Milling"
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
                    "Milling"
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
                    "Milling"
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
                    "Milling"
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
                    "Milling"
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
            {/* <TableCell align="center">
                <TextField
                  label="idleCode"
                  size="small"
                  className="fixed-width-input"
                  name={`idleCode-${rowIndex}`}
                  value={row.idleCode}
                  onChange={(e) =>
                    handleTextFieldChange(
                      e,
                      rowIndex,
                      "idleCode",
                      containerIndex
                    )
                  }
                />
              </TableCell> */}
                {/* <TableCell align="center">
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
                    "Milling"
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
                    "Milling"
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
                    "Milling"
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
                    "Milling"
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
                    "Milling"
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
                    "Milling"
                  )
                }
              >
                {userName.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>  */}

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

export default MillingTable;
