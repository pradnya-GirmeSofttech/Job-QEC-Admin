import React, { useEffect, useState } from "react";
import Dashboard from "../../dashboard/Dashboard";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  TableRow,
  TablePagination,
  Modal,
  Divider,
  InputBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteJob, generatePDF, getAllJob } from "../../../actions/job";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Loader from "../../loader/Loader";
import { formattedDate } from "../../../common/formattedDate";

function Job() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.job);

  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the menu
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0); // Reset page to the first page when rows per page changes
  };
  // Calculate the start and end indices for the current page
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleMenuOpen = (event, jobId) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the clicked IconButton
    setOpenMenuId(jobId); // Set the ID of the open menu to the clicked job's ID
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu by clearing the anchor element
    setOpenMenuId(null); // Clear the open menu ID
  };

  const handleView = (id) => {
    navigation(`/dashboard/job/viewjob/${id}`);
  };

  const handleEdit = (id) => {
    navigation(`/dashboard/job/updatejob/${id}`);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedId(null);
    setOpen(false);
  };
  useEffect(() => {
    // Reset the page to 0 when searchQuery changes
    setPage(0);
  }, [searchQuery]);
  const handleDelete = () => {
    if (selectedId) {
      // Check if a job ID is selected
      dispatch(deleteJob(selectedId)); // Dispatch the delete action with the selected job ID
      handleClose(); // Close the modal after deletion
    }
  };
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    dispatch(getAllJob(token));
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const downloadPDF = (id) => {
    dispatch(generatePDF(id));
    console.log("id", id);
  };
  const handleClearSearch = () => {
    setSearchQuery(""); // Clear the searchQuery state
  };

  // Filter jobs based on job name or SO/WO number
  const filteredJobs = jobs
    ? jobs?.filter((job) => {
        // Check if the job object and its properties are defined
        if (job && job.jobName && job.soWo) {
          const jobNameMatch = job.jobName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const soWoMatch = job.soWo.toString().includes(searchQuery);
          return jobNameMatch || soWoMatch;
        }
        // Handle cases where job or its properties are undefined
        return false;
      })
    : [];

  const noJobsAvailable = filteredJobs.length === 0;

  const sortedJobs = [...filteredJobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Dashboard>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" gutterBottom>
              Jobs
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  height: "70%",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search SO/WO NO or Job Name"
                  inputProps={{ "aria-label": "search google maps" }}
                  onChange={handleSearch}
                  value={searchQuery}
                  size="small"
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={handleClearSearch}
                >
                  <ClearIcon />
                </IconButton>
              </Paper>
              <Button
                sx={{
                  backgroundColor: "#1d5393",
                  color: "#fff",
                  marginLeft: 2,
                  size: "small",
                  height: "70%",
                  "&:hover": {
                    backgroundColor: "#245BA1", // Adjust the color for hover effect
                  },
                  "&:active": {
                    backgroundColor: "#1d5393", // Keep the same color as the initial state
                  },
                }}
                onClick={() => {
                  navigation("/dashboard/job/create-job");
                }}
              >
                Add New Job
              </Button>
            </Box>
          </Container>
          {noJobsAvailable ? (
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2, // Add padding to create a card-like appearance
                boxShadow: 2,
                marginTop: 20, // Add a shadow for a raised effect
              }}
            >
              <Typography variant="body1">No jobs available</Typography>
            </Paper>
          ) : (
            <>
              <TableContainer component={Paper} sx={{ marginTop: 5 }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#1D5393" }}>
                      <TableCell sx={{ color: "#fff" }}>SO/WO No</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Estimated CT</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Actual CT</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Created At</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedJobs?.slice(startIndex, endIndex).map((job) => (
                      <TableRow
                        key={job._id}
                        style={{
                          color: "#fff",

                          background:
                            job.estimatedtotalCT >= job?.actualtotalCT ||
                            job.estimatedtotalCT >= job?.actualtotalCT
                              ? "#a7f3d0"
                              : "#FE8A96",
                        }}
                      >
                        <TableCell>{job.soWo}</TableCell>
                        <TableCell>{job.jobName}</TableCell>
                        <TableCell>{job.estimatedtotalCT}</TableCell>
                        <TableCell>{job?.actualtotalCT}</TableCell>
                        <TableCell>{formattedDate(job?.createdAt)}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="more"
                            aria-controls={`job-options-${job._id}`}
                            aria-haspopup="true"
                            onClick={(event) => handleMenuOpen(event, job._id)}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                          <Menu
                            id={`job-options-${job._id}`}
                            anchorEl={anchorEl}
                            open={openMenuId === job._id}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={() => handleEdit(job._id)}>
                              Edit
                            </MenuItem>
                            <MenuItem onClick={() => handleView(job._id)}>
                              View
                            </MenuItem>
                            <MenuItem onClick={() => handleOpen(job._id)}>
                              Delete
                            </MenuItem>
                            <MenuItem onClick={() => downloadPDF(job._id)}>
                              Download PDF
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    borderRadius: 5,
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Remove Job
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to remove this Job?
                  </Typography>
                  <Divider sx={{ my: 2, width: "100%" }} />
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "#eb0e14",
                        color: "#fff",
                      }}
                      onClick={handleDelete}
                    >
                      Confirm
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#e5e7eb",
                        color: "black",
                        marginLeft: 3,
                      }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Modal>
              {!searchQuery && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={jobs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </>
          )}
        </Box>
      )}
    </Dashboard>
  );
}

export default Job;
