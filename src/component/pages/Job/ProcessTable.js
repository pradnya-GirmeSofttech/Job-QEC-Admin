import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
  Button,
} from "@mui/material";
import "./ProcessTable.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModeStandbyOutlinedIcon from "@mui/icons-material/ModeStandbyOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { formattedEditDate } from "./formattedDate";
import { idleCode, machineData, processList, toolList, userName } from "./Data";

export const ProcessTable = ({
  handleDeleteRow,
  data,
  handleTextFieldChange,
  processTableErrors,
  containerIndex,
  handleAddRow,
  selectedProcessName,
}) => {
  const processTableData = data || [];

  const millingTable = (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 2800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sr.No</TableCell>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Process</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Tooling Used</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Width</TableCell>
              <TableCell align="center">Length</TableCell>
              <TableCell align="center">Feed</TableCell>
              <TableCell align="center">DC</TableCell>
              <TableCell align="center">MR</TableCell>

              <TableCell align="center">NOP</TableCell>

              <TableCell align="center">FPP</TableCell>

              <TableCell align="center">Actual CT(min)</TableCell>

              <TableCell align="center">Estimated CT(min)</TableCell>
              <TableCell align="center">EST.HRS</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">Ideal Code</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">User Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processTableData &&
              processTableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell align="center">{rowIndex + 1}</TableCell>
                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      labelId={`process-label-${rowIndex}`}
                      size="small"
                      id={`process-${rowIndex}`}
                      value={row.process}
                      name={`process-${rowIndex}`}
                      className="fixed-width-input"
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
                      {processList.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.process}
                    >
                      {processTableErrors[rowIndex]?.process
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Description"
                      className="fixed-width-input"
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
                    <Select
                      labelId={`machineName-label-${rowIndex}`}
                      className="fixed-width-input"
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
                      {machineData.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.machineName}
                    >
                      {processTableErrors[rowIndex]?.machineName
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </TableCell>

                  <TableCell align="center">
                    <Select
                      labelId={`toolingUsed-label-${rowIndex}`}
                      className="fixed-width-input"
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
                      {toolList.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.toolingUsed}
                    >
                      {processTableErrors[rowIndex]?.toolingUsed
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
                      error={processTableErrors[rowIndex]?.toolingSize}
                      helperText={
                        processTableErrors[rowIndex]?.toolingSize
                          ? "This field is required"
                          : ""
                      }
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
                      error={processTableErrors[rowIndex]?.length}
                      helperText={
                        processTableErrors[rowIndex]?.length
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
                      disable
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "nop",
                          containerIndex,
                          "Milling"
                        )
                      }
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
                      label="actualCT"
                      className="fixed-width-input"
                      size="small"
                      name={`actualCT-${rowIndex}`}
                      value={row.actualCT}
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
                    <TextField
                      label="estimatedHrs"
                      className="fixed-width-input"
                      size="small"
                      name={`estimatedHrs-${rowIndex}`}
                      value={row.estimatedHrs}
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
                          containerIndex
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
                          containerIndex
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
                          containerIndex
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
                          containerIndex
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
                          containerIndex
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
                          containerIndex
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
                          containerIndex
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                          containerIndex
                        )
                      }
                    >
                      {userName.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteRow(containerIndex, rowIndex)}
                    >
                      <ClearIcon color="error" />
                    </IconButton>
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
      </TableContainer>
    </>
  );

  const boringTable = (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 2800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sr.No</TableCell>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Process</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Tooling Used</TableCell>
              <TableCell align="center">Tooling Size</TableCell>
              <TableCell align="center">RPM</TableCell>
              <TableCell align="center">Feed(MM/REV)</TableCell>
              <TableCell align="center">Length</TableCell>

              <TableCell align="center">DC</TableCell>
              <TableCell align="center">MR</TableCell>
              <TableCell align="center">NOP</TableCell>
              <TableCell align="center">FPP</TableCell>

              <TableCell align="center">Estimated CT(min)</TableCell>
              <TableCell align="center">Actual CT(min)</TableCell>

              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">Ideal Code</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">User Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processTableData &&
              processTableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell align="center">{rowIndex + 1}</TableCell>
                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      labelId={`process-label-${rowIndex}`}
                      size="small"
                      id={`process-${rowIndex}`}
                      value={row.process}
                      name={`process-${rowIndex}`}
                      className="fixed-width-input"
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "process",
                          containerIndex,
                          "Boring"
                        )
                      }
                      error={processTableErrors[rowIndex]?.process}
                    >
                      {processList.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.process}
                    >
                      {processTableErrors[rowIndex]?.process
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Description"
                      className="fixed-width-input"
                      size="small"
                      name={`description-${rowIndex}`}
                      value={row.description}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "description",
                          containerIndex,
                          "Boring"
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
                    <Select
                      labelId={`machineName-label-${rowIndex}`}
                      className="fixed-width-input"
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
                          "Boring"
                        )
                      }
                      error={processTableErrors[rowIndex]?.machineName}
                    >
                      {machineData.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.machineName}
                    >
                      {processTableErrors[rowIndex]?.machineName
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </TableCell>

                  <TableCell align="center">
                    <Select
                      labelId={`toolingUsed-label-${rowIndex}`}
                      className="fixed-width-input"
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
                          "Boring"
                        )
                      }
                      error={processTableErrors[rowIndex]?.toolingUsed}
                    >
                      {toolList.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.toolingUsed}
                    >
                      {processTableErrors[rowIndex]?.toolingUsed
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
                          "Boring"
                        )
                      }
                      error={processTableErrors[rowIndex]?.toolingSize}
                      helperText={
                        processTableErrors[rowIndex]?.toolingSize
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
                          "Boring"
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
                          "Boring"
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
                          "Boring"
                        )
                      }
                      error={processTableErrors[rowIndex]?.length}
                      helperText={
                        processTableErrors[rowIndex]?.length
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
                          "Boring"
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
                          "Boring"
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
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "nop",
                          containerIndex,
                          "Boring"
                        )
                      }
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
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "fpp",
                          containerIndex,
                          "Boring"
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
                          "Boring"
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
                    <TextField
                      label="actualCT"
                      className="fixed-width-input"
                      size="small"
                      name={`actualCT-${rowIndex}`}
                      value={row.actualCT}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "actualCT",
                          containerIndex,
                          "Boring"
                        )
                      }
                    />
                  </TableCell>
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
                          "Boring"
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
                          "Boring"
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
                          "Boring"
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
                          "Boring"
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
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
                          containerIndex,
                          "Boring"
                        )
                      }
                    />
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
                          "Boring"
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
                          "Boring"
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
                          "Boring"
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
                          "Boring"
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                          "Boring"
                        )
                      }
                    >
                      {userName.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteRow(containerIndex, rowIndex)}
                    >
                      <ClearIcon color="error" />
                    </IconButton>
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
      </TableContainer>
    </>
  );

  const drillingTable = (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 2800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sr.No</TableCell>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Process</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Tooling Used</TableCell>
              <TableCell align="center">Tooling Size</TableCell>
              <TableCell align="center">DIA</TableCell>
              <TableCell align="center">RPM</TableCell>
              <TableCell align="center">Feed(MM/MIN)</TableCell>
              <TableCell align="center">Length</TableCell>

              <TableCell align="center">NOH</TableCell>

              {/* <TableCell align="center">EST.HRS</TableCell> */}
              <TableCell align="center">Estimated CT(min)</TableCell>
              <TableCell align="center">Actual CT(min)</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">Ideal Code</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">User Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processTableData &&
              processTableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell align="center">{rowIndex + 1}</TableCell>
                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      labelId={`process-label-${rowIndex}`}
                      size="small"
                      id={`process-${rowIndex}`}
                      value={row.process}
                      name={`process-${rowIndex}`}
                      className="fixed-width-input"
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
                      {processList.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.process}
                    >
                      {processTableErrors[rowIndex]?.process
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Description"
                      className="fixed-width-input"
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
                    <Select
                      labelId={`machineName-label-${rowIndex}`}
                      className="fixed-width-input"
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
                      {machineData.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.machineName}
                    >
                      {processTableErrors[rowIndex]?.machineName
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </TableCell>

                  <TableCell align="center">
                    <Select
                      labelId={`toolingUsed-label-${rowIndex}`}
                      className="fixed-width-input"
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
                      {toolList.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.toolingUsed}
                    >
                      {processTableErrors[rowIndex]?.toolingUsed
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
                          "Drilling"
                        )
                      }
                      error={processTableErrors[rowIndex]?.toolingSize}
                      helperText={
                        processTableErrors[rowIndex]?.toolingSize
                          ? "This field is required"
                          : ""
                      }
                    />
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
                      error={processTableErrors[rowIndex]?.length}
                      helperText={
                        processTableErrors[rowIndex]?.length
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
                      label="estimatedHrs"
                      className="fixed-width-input"
                      size="small"
                      name={`estimatedHrs-${rowIndex}`}
                      value={row.estimatedHrs}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "estimatedHrs",
                          containerIndex,
                          "Drilling"
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
                    <TextField
                      label="actualCT"
                      className="fixed-width-input"
                      size="small"
                      name={`actualCT-${rowIndex}`}
                      value={row.actualCT}
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
                          containerIndex,
                          "Drilling"
                        )
                      }
                    />
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
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteRow(containerIndex, rowIndex)}
                    >
                      <ClearIcon color="error" />
                    </IconButton>
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
      </TableContainer>
    </>
  );

  const tappingTable = (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 2800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sr.No</TableCell>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Process</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Tooling Used</TableCell>
              <TableCell align="center">Tooling Size</TableCell>
              <TableCell align="center">DIA</TableCell>
              <TableCell align="center">RPM</TableCell>
              <TableCell align="center">Feed(MM/MIN)</TableCell>
              <TableCell align="center">Length</TableCell>

              <TableCell align="center">NOH</TableCell>
              <TableCell align="center">EST.HRS</TableCell>
              <TableCell align="center">Estimated CT(min)</TableCell>
              <TableCell align="center">Actual CT(min)</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">Ideal Code</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">User Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processTableData &&
              processTableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell align="center">{rowIndex + 1}</TableCell>
                  <TableCell align="center">
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
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      labelId={`process-label-${rowIndex}`}
                      size="small"
                      id={`process-${rowIndex}`}
                      value={row.process}
                      name={`process-${rowIndex}`}
                      className="fixed-width-input"
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "process",
                          containerIndex,
                          "Tapping"
                        )
                      }
                      error={processTableErrors[rowIndex]?.process}
                    >
                      {processList.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.process}
                    >
                      {processTableErrors[rowIndex]?.process
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      label="Description"
                      className="fixed-width-input"
                      size="small"
                      name={`description-${rowIndex}`}
                      value={row.description}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "description",
                          containerIndex,
                          "Tapping"
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
                    <Select
                      labelId={`machineName-label-${rowIndex}`}
                      className="fixed-width-input"
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
                          "Tapping"
                        )
                      }
                      error={processTableErrors[rowIndex]?.machineName}
                    >
                      {machineData.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.machineName}
                    >
                      {processTableErrors[rowIndex]?.machineName
                        ? "This field is required"
                        : ""}
                    </FormHelperText>
                  </TableCell>

                  <TableCell align="center">
                    <Select
                      labelId={`toolingUsed-label-${rowIndex}`}
                      className="fixed-width-input"
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
                          "Tapping"
                        )
                      }
                      error={processTableErrors[rowIndex]?.toolingUsed}
                    >
                      {toolList.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText
                      error={processTableErrors[rowIndex]?.toolingUsed}
                    >
                      {processTableErrors[rowIndex]?.toolingUsed
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
                          "Tapping"
                        )
                      }
                      error={processTableErrors[rowIndex]?.toolingSize}
                      helperText={
                        processTableErrors[rowIndex]?.toolingSize
                          ? "This field is required"
                          : ""
                      }
                    />
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
                          "Tapping"
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
                          "Tapping"
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
                          "Tapping"
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
                          "Tapping"
                        )
                      }
                      error={processTableErrors[rowIndex]?.length}
                      helperText={
                        processTableErrors[rowIndex]?.length
                          ? "This field is required"
                          : ""
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
                          "Tapping"
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
                      label="estimatedHrs"
                      className="fixed-width-input"
                      size="small"
                      name={`estimatedHrs-${rowIndex}`}
                      value={row.estimatedHrs}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "estimatedHrs",
                          containerIndex,
                          "Tapping"
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
                          "Tapping"
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
                    <TextField
                      label="actualCT"
                      className="fixed-width-input"
                      size="small"
                      name={`actualCT-${rowIndex}`}
                      value={row.actualCT}
                      onChange={(e) =>
                        handleTextFieldChange(
                          e,
                          rowIndex,
                          "actualCT",
                          containerIndex,
                          "Tapping"
                        )
                      }
                    />
                  </TableCell>
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
                          "Tapping"
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
                          "Tapping"
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
                          "Tapping"
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
                          "Tapping"
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
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
                          containerIndex,
                          "Tapping"
                        )
                      }
                    />
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
                          "Tapping"
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
                          "Tapping"
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
                          "Tapping"
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
                          "Tapping"
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                          "Tapping"
                        )
                      }
                    >
                      {userName.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteRow(containerIndex, rowIndex)}
                    >
                      <ClearIcon color="error" />
                    </IconButton>
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
      </TableContainer>
    </>
  );

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      {selectedProcessName === "Milling" && millingTable}
      {selectedProcessName === "Drilling" && drillingTable}
      {selectedProcessName === "Boring" && boringTable}
      {selectedProcessName === "Tapping" && tappingTable}
      {/* Add conditional rendering for other process tables as needed */}
    </TableContainer>
  );
};
