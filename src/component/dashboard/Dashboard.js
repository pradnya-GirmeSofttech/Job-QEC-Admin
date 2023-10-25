import React, { useState } from "react";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "../../utils/logo.png";
import WorkIcon from "@mui/icons-material/Work";
import { logout } from "../../actions/auth";

import UseProfileModal from "./common/UserProfileModal";
const drawerWidth = 240;
const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   async function fetchData() {
  //     try {
  //       if (token && !user) {
  //         await dispatch(userProfile(token));
  //       }
  //     } catch (error) {
  //       console.error("Error while fetching user data:", error);
  //     }
  //   }

  //   fetchData();
  // }, [dispatch, user]);

  // const listItemStyle = (path) => {
  //   return location.pathname === path ? "selected-item " : "list-item ";
  // };

  const listItemStyle = (path) => {
    if (location.pathname === path) {
      return "selected-item ";
    } else if (
      path === "/dashboard/job" &&
      location.pathname.startsWith("/dashboard/job")
    ) {
      return "selected-item ";
    } else if (
      path === "/dashboard/user" &&
      location.pathname.startsWith("/dashboard/user")
    ) {
      return "selected-item ";
    } else {
      return "list-item ";
    }
  };

  const handleUserModal = () => {
    setIsModalOpen(true);
  };

  const logoutHandler = () => {
    dispatch(logout())
      .then((resultAction) => {
        if (logout.fulfilled.match(resultAction)) {
          // Logout was successful, navigate to the login page
          window.location = "/"; // You can use any navigation method you prefer
        }
      })
      .catch((errorAction) => {
        console.log("error", errorAction);
      });
  };

  const drawer = (
    <div>
      <Toolbar sx={{ marginTop: 3 }}>
        <img src={logo} alt="logo" className="logo" />
      </Toolbar>
      {/* <Divider /> */}
      <List sx={{ marginTop: 4 }}>
        <ListItem
          component={Link}
          to="/dashboard"
          className={listItemStyle("/dashboard")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          component={Link}
          to="/dashboard/job"
          className={listItemStyle("/dashboard/job")}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Job" />
        </ListItem>
        <ListItem
          component={Link}
          to="/dashboard/user"
          className={listItemStyle("/dashboard/user")}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ffffff",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#1d5393" }}
          >
            Quality Engineering CO.
          </Typography>

          <div>
            <Button
              variant="outlined"
              component={Link}
              to="/"
              onClick={logoutHandler}
            >
              Logout
            </Button>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleUserModal}
              // disabled
              color="primary"
            >
              <AccountCircle sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {isModalOpen && (
        <UseProfileModal
          user={user}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <main>{children}</main>
      </Box>
    </Box>
  );
};

export default Dashboard;
