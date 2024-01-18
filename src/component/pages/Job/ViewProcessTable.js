import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import "./ProcessTable.css";

import ModeStandbyOutlinedIcon from "@mui/icons-material/ModeStandbyOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { formattedDate } from "./formattedDate";

export const ViewProcessTable = ({
  data,

  containerIndex,

  selectedProcessName,
}) => {
  const processTableData = data || [];

  const millingTable = (
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
              Length
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Width
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              DC
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              MR
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              NOP
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              FPP
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Feed
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
                    row.actualCT >= row.estimatedCT ? "#78cc9f" : "#c34266",
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>

                <TableCell align="center">{row.process}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.machineName}</TableCell>
                <TableCell align="center">{row.toolingUsed}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
                <TableCell align="center">{row.width}</TableCell>
                <TableCell align="center">{row.dc}</TableCell>
                <TableCell align="center">{row.mr}</TableCell>
                <TableCell align="center">{row.nop}</TableCell>
                <TableCell align="center">{row.fpp}</TableCell>
                <TableCell align="center">{row.feed}</TableCell>
                <TableCell align="center">{row.estimatedHrs}</TableCell>
                <TableCell align="center">{row.estimatedCT}</TableCell>
                <TableCell align="center">{row.actualCT}</TableCell>
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
                  {row.idleCode ? row.idleCode : "-"}
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

  const boringTable = (
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
              Tooling Size
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              RPM
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Feed(MM/REV)
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Length
            </TableCell>

            <TableCell align="center" sx={{ color: "#fff" }}>
              DC
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              MR
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              NOP
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              FPP
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
                    row.actualCT >= row.estimatedCT ? "#78cc9f" : "#c34266",
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>

                <TableCell align="center">{row.process}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.machineName}</TableCell>
                <TableCell align="center">{row.toolingUsed}</TableCell>
                <TableCell align="center">{row.toolingSize}</TableCell>
                <TableCell align="center">{row.rpm}</TableCell>

                <TableCell align="center">{row.feed}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
                <TableCell align="center">{row.dc}</TableCell>
                <TableCell align="center">{row.mr}</TableCell>
                <TableCell align="center">{row.nop}</TableCell>
                <TableCell align="center">{row.fpp}</TableCell>
                <TableCell align="center">{row.estimatedHrs}</TableCell>
                <TableCell align="center">{row.estimatedCT}</TableCell>
                <TableCell align="center">{row.actualCT}</TableCell>
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
                  {row.idleCode ? row.idleCode : "-"}
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

  const drillingTable = (
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
                    row.actualCT >= row.estimatedCT ? "#78cc9f" : "#c34266",
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

                <TableCell align="center">{row.estimatedHrs}</TableCell>
                <TableCell align="center">{row.estimatedCT}</TableCell>
                <TableCell align="center">{row.actualCT}</TableCell>
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
                  {row.idleCode ? row.idleCode : "-"}
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

  const tappingTable = (
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
                    row.actualCT >= row.estimatedCT ? "#78cc9f" : "#c34266",
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

                <TableCell align="center">{row.estimatedHrs}</TableCell>
                <TableCell align="center">{row.estimatedCT}</TableCell>
                <TableCell align="center">{row.actualCT}</TableCell>
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
                  {row.idleCode ? row.idleCode : "-"}
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

  return (
    <>
      {selectedProcessName === "Milling" && millingTable}
      {selectedProcessName === "Drilling" && drillingTable}
      {selectedProcessName === "Boring" && boringTable}
      {selectedProcessName === "Tapping" && tappingTable}
    </>
  );
};
