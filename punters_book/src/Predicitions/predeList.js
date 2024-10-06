import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SideNavbar from "../SideNavbar/sidenavbar";
import { Autocomplete } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Formik, Form, Field } from "formik";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { notifySuccess, notifyError } from "../tostify/msgtostify";
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import { getPrediction, preStatusUpdate } from "../services/AllApiServices";
// import { getUpdateVales, setUpdatePre } from "./updatepre";

const PredeList = () => {
  const [predictionValues, setPredictionValues] = useState([]);
  const [anchorEl8, setAnchorEl8] = useState(null);
  const [preStatus8, setpreStatus8] = useState("");
  const [preId8, setpreId8] = useState("");

  const navigate = useNavigate();

  const fetchPredictions = React.useCallback(async () => {
    try {
      const response = await getPrediction();
      console.log(" Prediction values:", response);
      const predictionWithStatus = response.predictions;
      setPredictionValues(predictionWithStatus);

      if (response && response.status === 200) {
        console.log("Prediction data  :", response);
      }
    } catch (err) {
      console.log(
        "Somethig went wrong",
        err.response ? err.response.data : err.message
      );
    }
  }, []);

  React.useEffect(() => {
    fetchPredictions();
  }, [fetchPredictions]);

  const handleUpdate = (id, prediction) => {
    console.log("Prediction clicked: ", id);
    console.log(" Predicition data: ", prediction);
    navigate(`/predections/updateprediction`, { state: prediction });
  };

  //popover
  const handlepreClick = (event, id, status) => {
    console.log("Clicked item ID:", id);
    console.log("Status is: ", status);
    // alert(" Are you sure you want to proceed?");
    setAnchorEl8(event.currentTarget);
    setpreStatus8(status);
    setpreId8(id);
  };

  const preNoClose = () => {
    notifyError();
    setAnchorEl8(null);
  };

  const preYesClose = async (id, status) => {
    if (predictionValues !== null) {
      console.log("Confirmed Action for ID and status :", id, status);
      try {
        const response = await preStatusUpdate(id, status);
        notifySuccess();
        setAnchorEl8(null);
        await fetchPredictions();
        if (response.status === 200) {
        } else if (response.status === 429) {
          console.error("Too many requests, retrying...");
          await sleep(2000); // wait 2 seconds before retrying
          await handleYesClose(id); // retry the action
          notifyError("Please try after some time!");
        }
      } catch (err) {
        console.error("Error performing action:", err);
        notifyError();
      }
    }
  };
  const open8 = Boolean(anchorEl8);
  const popoverId8 = open8 ? "simple-popover" : undefined;

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
                  <h4 className="text-start">Predictions</h4>
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
                            <TableCell>League</TableCell>
                            <TableCell>Match</TableCell>
                            <TableCell> Time</TableCell>
                            <TableCell> Team 1</TableCell>
                            <TableCell> Team 2</TableCell>
                            <TableCell> Category</TableCell>
                            <TableCell> Trending</TableCell>
                            <TableCell> Prediction</TableCell>
                            <TableCell> Status</TableCell>
                            <TableCell> Action</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {predictionValues.length > 0 ? (
                            predictionValues.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.league.name}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.start_at}</TableCell>
                                <TableCell>{row.team1.name}</TableCell>
                                <TableCell>{row.team2.name}</TableCell>
                                <TableCell>{row.category.name}</TableCell>
                                <TableCell>
                                  <h6>Trending</h6>
                                </TableCell>
                                <TableCell>
                                  <button
                                    style={{
                                      borderRadius: "15px",
                                      width: "80px",
                                      height: "40px",
                                      backgroundColor: "orange", //#ff5252
                                      border: "none",
                                      color: "white",
                                    }}
                                    onClick={(event) => {
                                      handleUpdate(row.id, row);
                                    }}
                                    // popovertarget
                                  >
                                    Update
                                  </button>
                                </TableCell>{" "}
                                <TableCell
                                  style={{
                                    color:
                                      row.status === "Upcoming"
                                        ? "orange"
                                        : row.status === "Running"
                                        ? "green"
                                        : "red",
                                    fontSize: "15px",
                                  }}
                                >
                                  {row.status}
                                </TableCell>
                                <TableCell>
                                  {row.status === "Upcoming" ? (
                                    <div className="row">
                                      {/* "Running" button  */}
                                      <div className="col">
                                        <button
                                          style={{
                                            borderRadius: "15px",
                                            width: "80px",
                                            height: "30px",
                                            backgroundColor: "green",
                                            border: "none",
                                            marginBottom: "10px",
                                            color: "white",
                                          }}
                                          onClick={(event) => {
                                            handlepreClick(
                                              event,
                                              row.id,
                                              "Running"
                                            );
                                          }}
                                        >
                                          Running
                                        </button>
                                      </div>
                                      {/* "Completed" button */}
                                      <div className="col">
                                        <button
                                          style={{
                                            borderRadius: "15px",
                                            width: "80px",
                                            height: "30px",
                                            backgroundColor: "orange",
                                            border: "none",
                                            color: "white",
                                          }}
                                          // onClick={(event) => {
                                          //   handlepreClick(
                                          //     event,
                                          //     row.id,
                                          //     "Completed"
                                          //   );
                                          // }}
                                        >
                                          Completed
                                        </button>
                                      </div>
                                    </div>
                                  ) : row.status === "Running" ? (
                                    // If status is "Running", show only "Completed" button
                                    <button
                                      style={{
                                        borderRadius: "15px",
                                        width: "80px",
                                        height: "30px",
                                        backgroundColor: "orange",
                                        border: "none",
                                        color: "white",
                                      }}
                                      // onClick={(event) => {
                                      //   handlepreClick(event, row.id, "Archive");
                                      // }}
                                    >
                                      Completed
                                    </button>
                                  ) : null}
                                </TableCell>{" "}
                                <Popover
                                  id={popoverId8}
                                  open={Boolean(anchorEl8)}
                                  anchorEl={anchorEl8}
                                  onClose={preNoClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                >
                                  <Box p={2}>
                                    <Typography variant="body1">
                                      Are you sure you want to proceed?
                                    </Typography>
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        preNoClose();
                                      }}
                                    >
                                      No
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        // handleYesClose(currentId);
                                        preYesClose(preId8, preStatus8);
                                      }}
                                    >
                                      Yes
                                    </Button>
                                  </Box>
                                </Popover>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                style={{ textAlign: "center" }}
                              >
                                No results found.
                              </TableCell>
                            </TableRow>
                          )}
                              
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
};

export default PredeList;
