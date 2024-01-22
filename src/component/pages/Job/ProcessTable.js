import React, { useState, useMemo } from "react";
import { TableContainer } from "@mui/material";
import "./ProcessTable.css";
import MillingTable from "../../../common/MillingTable";
import BoringTable from "../../../common/BoringTable";
import DrillingTable from "../../../common/DrillingTable";
import TappingTable from "../../../common/TappingTable";

export const ProcessTable = ({
  handleDeleteRow,
  data,
  handleTextFieldChange,
  processTableErrors,
  containerIndex,
  handleAddRow,
  selectedProcessName,
  handleValidation,
  machineNameSearch,
  setMachineNameSearch,
  processSearch,
  setProcessSearch,
  toolingSearch,
  setToolingSearch,
  displayMachineName,
  displayedProcess,
  displayToolingMilling,
  displayToolingDrilling,
  displayToolingBoring,
  displayToolingTapping,
}) => {
  const processTableData = data || [];
  return (
    <TableContainer>
      {selectedProcessName === "Milling" && (
        <MillingTable
          handleDeleteRow={handleDeleteRow}
          processTableData={processTableData}
          handleTextFieldChange={handleTextFieldChange}
          processTableErrors={processTableErrors}
          containerIndex={containerIndex}
          handleAddRow={handleAddRow}
          machineNameSearch={machineNameSearch}
          setMachineNameSearch={setMachineNameSearch}
          processSearch={processSearch}
          setProcessSearch={setProcessSearch}
          toolingSearch={toolingSearch}
          setToolingSearch={setToolingSearch}
          displayMachineName={displayMachineName}
          displayedProcess={displayedProcess}
          displayToolingMilling={displayToolingMilling}
          handleValidation={handleValidation}
        />
      )}
      {selectedProcessName === "Drilling" && (
        <DrillingTable
          handleDeleteRow={handleDeleteRow}
          processTableData={processTableData}
          handleTextFieldChange={handleTextFieldChange}
          processTableErrors={processTableErrors}
          containerIndex={containerIndex}
          handleAddRow={handleAddRow}
          machineNameSearch={machineNameSearch}
          setMachineNameSearch={setMachineNameSearch}
          processSearch={processSearch}
          setProcessSearch={setProcessSearch}
          toolingSearch={toolingSearch}
          setToolingSearch={setToolingSearch}
          displayMachineName={displayMachineName}
          displayedProcess={displayedProcess}
          displayToolingDrilling={displayToolingDrilling}
          handleValidation={handleValidation}
        />
      )}
      {selectedProcessName === "Boring" && (
        <BoringTable
          handleDeleteRow={handleDeleteRow}
          processTableData={processTableData}
          handleTextFieldChange={handleTextFieldChange}
          processTableErrors={processTableErrors}
          containerIndex={containerIndex}
          handleAddRow={handleAddRow}
          machineNameSearch={machineNameSearch}
          setMachineNameSearch={setMachineNameSearch}
          processSearch={processSearch}
          setProcessSearch={setProcessSearch}
          toolingSearch={toolingSearch}
          setToolingSearch={setToolingSearch}
          displayMachineName={displayMachineName}
          displayedProcess={displayedProcess}
          displayToolingBoring={displayToolingBoring}
          handleValidation={handleValidation}
        />
      )}
      {selectedProcessName === "Tapping" && (
        <TappingTable
          handleDeleteRow={handleDeleteRow}
          processTableData={processTableData}
          handleTextFieldChange={handleTextFieldChange}
          processTableErrors={processTableErrors}
          containerIndex={containerIndex}
          handleAddRow={handleAddRow}
          machineNameSearch={machineNameSearch}
          setMachineNameSearch={setMachineNameSearch}
          processSearch={processSearch}
          setProcessSearch={setProcessSearch}
          toolingSearch={toolingSearch}
          setToolingSearch={setToolingSearch}
          displayMachineName={displayMachineName}
          displayedProcess={displayedProcess}
          displayToolingTapping={displayToolingTapping}
          handleValidation={handleValidation}
        />
      )}
      {/* Add conditional rendering for other process tables as needed */}
    </TableContainer>
  );
};
