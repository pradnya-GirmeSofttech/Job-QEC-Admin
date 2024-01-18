import React, { useState, useMemo } from "react";
import { TableContainer } from "@mui/material";
import "./ProcessTable.css";

import { machineData, processList, toolList } from "./Data";
import MillingTable from "../../../common/MillingTable";
import BoringTable from "../../../common/BoringTable";
import DrillingTable from "../../../common/DrillingTable";
import TappingTable from "../../../common/TappingTable";
const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
export const ProcessTable = ({
  handleDeleteRow,
  data,
  handleTextFieldChange,
  processTableErrors,
  containerIndex,
  handleAddRow,
  selectedProcessName,
  handleValidation,
}) => {
  const processTableData = data || [];
  console.log("processTable", processTableErrors);
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
          displayTooling={displayTooling}
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
          displayTooling={displayTooling}
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
          displayTooling={displayTooling}
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
          displayTooling={displayTooling}
          handleValidation={handleValidation}
        />
      )}
      {/* Add conditional rendering for other process tables as needed */}
    </TableContainer>
  );
};
