import React, { useState, useMemo } from "react";
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
import ClearIcon from "@mui/icons-material/Clear";
import { machineData, processList, toolListBoring } from "./Data";

function BoringTable({
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
            <TableCell align="center">Tooling Size</TableCell>
            <TableCell align="center">RPM</TableCell>
            <TableCell align="center">Feed(MM/REV)</TableCell>
            <TableCell align="center">Length</TableCell>
            <TableCell align="center">DC</TableCell>
            <TableCell align="center">MR</TableCell>
            <TableCell align="center">NOP</TableCell>
            <TableCell align="center">FPP</TableCell>
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
                        "Boring"
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
                        "Boring"
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
                    options={toolListBoring}
                    getOptionLabel={(option) => option}
                    value={row.toolingUsed}
                    onChange={(e, newValue) =>
                      handleTextFieldChange(
                        { target: { value: newValue } },
                        rowIndex,
                        "toolingUsed",
                        containerIndex,
                        "Boring"
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
                    label="Tooling Size"
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
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                        "Boring"
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

export default BoringTable;
