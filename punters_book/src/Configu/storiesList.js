import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { notifySuccess, notifyError } from "../tostify/msgtostify";
import { ToastContainer, toast } from "react-toastify";

const StoriesList = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }} noValidate>
        <div className="table">
          <div className="inputs px-3">
            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <h4 className="text-start">Trending/WhatsNew Stories</h4>
                </div>
                <div>
                  <div style={{ padding: "20px" }}>
                    {/* Step 4: Render the search bar */}
                    <TextField
                      label="Search"
                      variant="outlined"
                      // value={searchQuery}
                      // onChange={handleSearch}
                      className="float-end"
                      style={{ marginBottom: "20px", width: "500px" }}
                    />

                    {/* Step 5: Render the table */}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell> Header</TableCell>
                            <TableCell> Image</TableCell>
                            <TableCell> Last Update</TableCell>
                            <TableCell> Status</TableCell>
                            <TableCell> Action</TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default StoriesList;
