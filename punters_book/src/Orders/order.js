import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import SideNavbar from "../SideNavbar/sidenavbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
export default function Orders() {
  return (
    <div>
      <SideNavbar />
      {/* Part-2 */}
      <br></br>
      <Box sx={{ width: "100%", paddingLeft: 40, marginTop: 4 }}>
        <div className="table">
          <div className="inputs px-3">
            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <h4 className="text-start">Oders</h4>
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
                            <TableCell>UserName</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell> Status</TableCell>
                            <TableCell> Price</TableCell>
                            <TableCell> Coins</TableCell>
                            <TableCell> Created</TableCell>
                            <TableCell> PaymentId</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {notifiValues.length > 0 ? (
                            notifiValues.map((entries) => ( */}
                          <TableRow key="">
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          {/* ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                style={{ textAlign: "center" }}
                              >
                                No results found.
                              </TableCell>
                            </TableRow>
                          )} */}
                        </TableBody>
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
}
