import React from "react";

import "./ProcessTable.css";

import ViewMillingTable from "../../../common/ViewMillingTable";
import ViewDrillingTable from "../../../common/ViewDrillingTable";
import ViewBoringTable from "../../../common/ViewBoringTable";
import ViewTappingTable from "../../../common/ViewTappingTable";

export const ViewProcessTable = ({
  data,

  selectedProcessName,
}) => {
  const processTableData = data || [];

  return (
    <>
      {selectedProcessName === "Milling" && (
        <ViewMillingTable processTableData={processTableData} />
      )}
      {selectedProcessName === "Drilling" && (
        <ViewDrillingTable processTableData={processTableData} />
      )}
      {selectedProcessName === "Boring" && (
        <ViewBoringTable processTableData={processTableData} />
      )}
      {selectedProcessName === "Tapping" && (
        <ViewTappingTable processTableData={processTableData} />
      )}
    </>
  );
};
