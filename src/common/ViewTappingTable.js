import React from "react";
import {
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "../component/pages/Job/ProcessTable.css";
import { formattedDate } from "./formattedDate";

function ViewTappingTable({ processTableData }) {
  return (
    <>
      <Table sx={{ minWidth: 2800 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1D5393" }}>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Sr.No
            </TableCell>

            <TableCell align="center" sx={{ color: "#fff" }}>
              Process
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Description
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Machine Name
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Tooling Used
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              DIA
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              RPM
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Length
            </TableCell>

            <TableCell align="center" sx={{ color: "#fff" }}>
              Feed(MM/MIN)
            </TableCell>

            <TableCell align="center" sx={{ color: "#fff" }}>
              NOH
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              EST.HRS
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Estimated CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Actual CT(min)
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Ideal Code
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Start Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Start Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              End Date
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              End Time
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              User Name
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Remark
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processTableData &&
            processTableData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  color: "#fff",
                  backgroundColor:
                    !isNaN(row.estimatedCT) && row.estimatedCT !== 0
                      ? row.actualCT >= row.estimatedCT
                        ? "#a7f3d0"
                        : "#FE8A96"
                      : "inherit",
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>

                <TableCell align="center">{row.process}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.machineName}</TableCell>
                <TableCell align="center">{row.toolingUsed}</TableCell>
                <TableCell align="center">{row.dia}</TableCell>
                <TableCell align="center">{row.rpm}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
                <TableCell align="center">{row.feed}</TableCell>
                <TableCell align="center">{row.noh}</TableCell>

                <TableCell align="center">
                  {row.estimatedHrs ? row.estimatedHrs : "-"}
                </TableCell>
                <TableCell align="center">
                  {row.estimatedCT ? row.estimatedCT : "-"}
                </TableCell>
                <TableCell align="center">
                  {row.actualCT ? row.actualCT : "-"}
                </TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate)}
                </TableCell>
                <TableCell align="center">
                  {row.startTime ? row.startTime : "-"}
                </TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate)}
                </TableCell>
                <TableCell align="center">
                  {row.endTime ? row.endTime : "-"}
                </TableCell>
                <TableCell align="center">
                  {row.idleCode.length > 0
                    ? row.idleCode.map((item) => {
                        return <ListItem>{item}</ListItem>;
                      })
                    : "-"}
                </TableCell>
                <TableCell align="center">
                  {formattedDate(row.startDate1)}
                </TableCell>
                <TableCell align="center">
                  {row.startTime1 ? row.startTime1 : "-"}
                </TableCell>
                <TableCell align="center">
                  {formattedDate(row.endDate1)}
                </TableCell>
                <TableCell align="center">
                  {row.endTime1 ? row.endTime1 : "-"}
                </TableCell>
                <TableCell align="center">
                  {row.userName ? row.userName : "-"}
                </TableCell>
                <TableCell align="center" className="cell-width">
                  {row.remark ? row.remark : "-"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ViewTappingTable;
