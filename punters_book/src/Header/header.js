import "./header.scss";
import * as React from "react";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { AuthContext } from "../auth";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Putheader = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  console.log("UseContext: ", useContext(AuthContext));
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   if (token !== null) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // Handle Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/admin/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="nav">
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              mr: {
                xs: 0, // No right margin on extra-small screens
                sm: 45, // Small right margin on small screens
                md: 100, // Medium right margin on medium screens
                lg: 130, // Larger margin on large screens
                xl: 250, // Original large margin on extra-large screens
              },
            }}
          >
            <b>PuntersBook</b>
          </Typography>
          {isLoggedIn ? (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              href="/admin/login"
              sx={{
                color: "white",
                textTransform: "none",
                fontSize: 15,
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#84adea",
                },
              }}
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Putheader;
