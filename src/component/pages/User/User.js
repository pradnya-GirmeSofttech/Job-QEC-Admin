import React, { useEffect, useState } from "react";
import Dashboard from "../../dashboard/Dashboard";
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  IconButton,
  MenuItem,
  TablePagination,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";
import { fetchUsersWithUserRole, deleteUser } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ViewUserDetails from "./common/ViewUserDetails";
import DeleteUser from "./common/DeleteUser";
import EditUser from "./common/EditUser";

function User() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsersWithUserRole());
  }, [dispatch]);

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuId(userId);
  };

  const handleEditUser = (userId) => {
    setSelectedUser(userId);
    setIsEditModalOpen(true);
    handleMenuClose();
  };
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setIsConfirmationOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirmation = () => {
    dispatch(deleteUser(selectedUserId));
    setIsConfirmationOpen(false);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const filteredUsers = users?.filter((user) =>
    user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <Dashboard>
      <Grid container justifyContent="space-between" alignItems="center" m={2}>
        <Grid item>
          <div>User</div>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1d5393", color: "#fff" }}
            component={RouterLink}
            to="/dashboard/user/create-user"
          >
            Create User
          </Button>
        </Grid>
      </Grid>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          width: 400,
          m: "10px",
          justifyContent: "flex-end",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleSearch}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <TableContainer component={Paper} m={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.slice(startIndex, endIndex).map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <IconButton
                    aria-label="more"
                    aria-controls={`user-options-${user._id}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, user._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`user-options-${user._id}`}
                    anchorEl={anchorEl}
                    open={openMenuId === user._id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleEditUser(user._id)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleViewUser(user)}>
                      View
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={users?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isModalOpen && (
        <ViewUserDetails
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isConfirmationOpen && (
        <DeleteUser
          open={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleDeleteConfirmation}
          onDelete={handleDeleteUser}
        />
      )}
      {isEditModalOpen && (
        <EditUser
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditUser} // Close the edit modal
        />
      )}
    </Dashboard>
  );
}

export default User;
