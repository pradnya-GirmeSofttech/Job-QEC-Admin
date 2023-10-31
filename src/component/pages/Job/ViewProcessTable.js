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

              <TableCell align="center">Length</TableCell>
              <TableCell align="center">Width</TableCell>
              <TableCell align="center">DC</TableCell>
              <TableCell align="center">MR</TableCell>
              <TableCell align="center">NOP</TableCell>
              <TableCell align="center">FPP</TableCell>
              <TableCell align="center">Feed</TableCell>
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
                            ? "red"
                            : row.actualCT < row.estimatedCT
                            ? "green"
                            : "inherit",
                      }}
                    />
                  </TableCell>
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
                  <TableCell align="center">{row.startTime}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate)}
                  </TableCell>
                  <TableCell align="center">{row.endTime}</TableCell>
                  <TableCell align="center">{row.idleCode}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.startDate1)}
                  </TableCell>
                  <TableCell align="center">{row.startTime1}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate1)}
                  </TableCell>
                  <TableCell align="center">{row.endTime1}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
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
            {" "}
            {processTableData &&
              processTableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell align="center">{rowIndex + 1}</TableCell>
                  <TableCell align="center">
                    <ModeStandbyOutlinedIcon
                      style={{
                        color:
                          row.actualCT > row.estimatedCT
                            ? "red"
                            : row.actualCT < row.estimatedCT
                            ? "green"
                            : "inherit",
                      }}
                    />
                  </TableCell>
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
                  <TableCell align="center">{row.startTime}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate)}
                  </TableCell>
                  <TableCell align="center">{row.endTime}</TableCell>
                  <TableCell align="center">{row.idleCode}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.startDate1)}
                  </TableCell>
                  <TableCell align="center">{row.startTime1}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate1)}
                  </TableCell>
                  <TableCell align="center">{row.endTime1}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                </TableRow>
              ))}
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
              <TableCell align="center">DIA</TableCell>
              <TableCell align="center">RPM</TableCell>
              <TableCell align="center">Length</TableCell>

              <TableCell align="center">Feed(MM/MIN)</TableCell>

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
                            ? "red"
                            : row.actualCT < row.estimatedCT
                            ? "green"
                            : "inherit",
                      }}
                    />
                  </TableCell>
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
                  <TableCell align="center">{row.startTime}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate)}
                  </TableCell>
                  <TableCell align="center">{row.endTime}</TableCell>
                  <TableCell align="center">{row.idleCode}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.startDate1)}
                  </TableCell>
                  <TableCell align="center">{row.startTime1}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate1)}
                  </TableCell>
                  <TableCell align="center">{row.endTime1}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
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
              <TableCell align="center">DIA</TableCell>
              <TableCell align="center">RPM</TableCell>
              <TableCell align="center">Length</TableCell>

              <TableCell align="center">Feed(MM/MIN)</TableCell>

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
            {" "}
            {processTableData &&
              processTableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell align="center">{rowIndex + 1}</TableCell>
                  <TableCell align="center">
                    <ModeStandbyOutlinedIcon
                      style={{
                        color:
                          row.actualCT > row.estimatedCT
                            ? "red"
                            : row.actualCT < row.estimatedCT
                            ? "green"
                            : "inherit",
                      }}
                    />
                  </TableCell>
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
                  <TableCell align="center">{row.startTime}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate)}
                  </TableCell>
                  <TableCell align="center">{row.endTime}</TableCell>
                  <TableCell align="center">{row.idleCode}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.startDate1)}
                  </TableCell>
                  <TableCell align="center">{row.startTime1}</TableCell>
                  <TableCell align="center">
                    {formattedDate(row.endDate1)}
                  </TableCell>
                  <TableCell align="center">{row.endTime1}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
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
    </TableContainer>
  );
};
