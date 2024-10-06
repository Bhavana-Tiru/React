import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SideNavbar from "../SideNavbar/sidenavbar";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { notifySuccess, notifyError } from "../tostify/msgtostify";
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
// import { useNavigate } from "react-router-dom";
import {
  conditionMultiButton,
  getParlays,
  MultiAction,
  parlayConditionAction,
} from "../services/AllApiServices";
import { ToastContainer, toast } from "react-toastify";

const Parlays = () => {
  const navigate = useNavigate();
  const [parlaysValues, setParlaysValues] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  //popover1 status
  const [anchorEl3, setAnchorEl3] = useState(null);
  //for id
  const [currentBetId3, setcurrentBEtId3] = React.useState();
  //for status
  const [currentStatus3, setcurrentStatus3] = React.useState();

  //condition button
  //popover2
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  //conditionsList
  const [conditionBetList, setconditionsBetList] = useState([]);
  //condition id:
  const [conditionId4, setconditionId4] = React.useState();

  //void, Idle, yes, no
  //popover

  const fetchParlays = React.useCallback(async () => {
    try {
      const response = await getParlays();
      console.log(" Parlays values:", response);
      const parlaysWithStatus = response.parlays;
      setParlaysValues(parlaysWithStatus);

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
    fetchParlays();
  }, [fetchParlays]);

  //popover 1 - Running
  const handleClick = (event, id, status) => {
    console.log("Clicked item ID:", id);
    console.log("Status is: ", status);
    // alert(" Are you sure you want to proceed?");
    setAnchorEl3(event.currentTarget);
    setcurrentStatus3(status);
    setcurrentBEtId3(id);
  };

  // Close the Popover
  const handleNoClose = () => {
    notifyError();
    setAnchorEl3(null);
  };

  const handleYesClose = async (id, status) => {
    if (parlaysValues !== null) {
      console.log("Confirmed Action for ID:", id);
      console.log("Status is: ", status);
      try {
        const response = await MultiAction(id, status);
        notifySuccess();
        setAnchorEl3(null);
        await fetchParlays();
        if (response.status === 200) {
        } else if (response.status === 429) {
          console.error("Too many requests, retrying...");

          await handleYesClose(id, status); // retry the action
          notifyError("Please try after some time!");
        }
      } catch (err) {
        console.error("Error performing action:", err);
        notifyError();
      }
    }
  };
  const open3 = Boolean(anchorEl3);
  const popoverId3 = open3 ? "simple-popover" : undefined;

  //fetching onClickconditions  details
  const fetchParlayConditions = React.useCallback(async (id) => {
    try {
      const response = await conditionMultiButton(id);
      console.log(" Condition values:", response);
      const conditionBetStatus = response.conditions.map((condition) => ({
        ...condition,
        status: condition.status || "Void",
      }));
      console.log("conditionWithStatus: ", conditionBetStatus);
      setconditionsBetList(conditionBetStatus);
      console.log(conditionBetStatus);
      console.log("conditionBetList: ", conditionBetList);

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

  const handleConditionParClick = (event, id) => {
    console.log("Clicked item ID:", id);
    setAnchorEl4(event.currentTarget);
    setconditionId4(id);
  };

  const handleClose = () => {
    notifyError();
    setAnchorEl4(null);
    setconditionId4(null); // Reset selected row when popover closes
  };

  const open1 = Boolean(anchorEl4);
  const popoverId1 = open1 ? "simple-popover" : undefined;

  //parlayConditionButtonClick conditionPopover
  ///update-parlay-condition-status //parlayConditionAction(AllApi)

  const [anchorEl5, setAnchorEl5] = React.useState(null);

  //condition id:
  const [conditionId5, setconditionId5] = React.useState();
  //conditoion status
  const [conditionStatus5, setconditionStatus5] = React.useState();

  const parlayConditionButtonClick = (event, id, status) => {
    console.log("parlay item clicked ID:", id);
    setAnchorEl5(event.currentTarget);
    setconditionId5(id);
    setconditionStatus5(status);
  };

  const handleParlayYesClose = async (id, status) => {
    if (parlaysValues !== null) {
      console.log("Parlay ID:", id);
      console.log("Parlay Status:", status);
      try {
        const response = await parlayConditionAction(id, status);
        await fetchParlayConditions();
        notifySuccess();
        setAnchorEl5(null);
        if (response.statusC >= 200 && response.status < 300) {
        } else {
          console.error("Response status:", response.status);
        }

        // if (response.ok) {
        //   await fetchParlayConditions();
        //   notifySuccess();
        //   setAnchorEl5(null);
        // } else if (response.status === 429) {
        //   console.error("Too many requests, retrying...");
        //   await sleep(2000); // wait 2 seconds before retrying
        //   await handleParlayYesClose(id, status); // retry the action
        //   notifyError("Please try after some time!");
        // }
      } catch (err) {
        console.error("Error performing action:", err);
        notifyError();
      }
    }
  };

  const handleParlayNoClose = () => {
    notifyError();
    setAnchorEl5(null);
  };
  const open5 = Boolean(anchorEl5);
  const popoverId5 = open5 ? "simple-popover" : undefined;

  //Update/Add parlay condition
  // parlayConditionAction
  const palayAddUpdateClick = (id) => {
    navigate(`/multi/addupdatecondition/${id}`, { state: id });
    console.log("multi id: ", id);
  };

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
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <div className="table">
          <div className="inputs px-3">
            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <h4 className="text-start">Multi List</h4>
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
                            <TableCell>Category</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell> Odds</TableCell>
                            <TableCell> Value</TableCell>
                            <TableCell> Status</TableCell>
                            <TableCell> Conditions</TableCell>
                            <TableCell> Action</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {parlaysValues.length > 0 ? (
                            parlaysValues.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.category.name}</TableCell>
                                <TableCell>{row.rating}</TableCell>
                                <TableCell>{row.odds}</TableCell>
                                <TableCell>{row.value}</TableCell>
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
                                  <b>{row.status}</b>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    style={{
                                      borderRadius: "15px",
                                      // width: "80px",
                                      // height: "40px",
                                      backgroundColor: "#1976d2", //#ff5252
                                      border: "none",
                                      color: "white",
                                    }}
                                    onClick={(event) => {
                                      handleConditionParClick(event, row.id);
                                      fetchParlayConditions(row.id);
                                    }}
                                  >
                                    Conditions
                                  </Button>
                                </TableCell>{" "}
                                <TableCell>
                                  {row.status === "Upcoming" ? (
                                    <div className="col">
                                      {/* "Running" button  */}
                                      <div className="row">
                                        <Button
                                          style={{
                                            borderRadius: "15px",
                                            width: "100px",
                                            height: "30px",
                                            backgroundColor: "green",
                                            border: "none",
                                            marginBottom: "10px",
                                            color: "white",
                                          }}
                                          onClick={(event) => {
                                            handleClick(
                                              event,
                                              row.id,
                                              "Running"
                                            );
                                          }}
                                        >
                                          Running
                                        </Button>
                                      </div>
                                      {/* "Completed" button */}
                                      <div className="row">
                                        <Button
                                          style={{
                                            borderRadius: "15px",
                                            width: "100px",
                                            height: "30px",
                                            backgroundColor: "orange",
                                            border: "none",
                                            color: "white",
                                          }}
                                          onClick={(event) => {
                                            handleClick(
                                              event,
                                              row.id,
                                              "Completed"
                                            );
                                          }}
                                        >
                                          Completed
                                        </Button>
                                      </div>
                                    </div>
                                  ) : row.status === "Running" ? (
                                    // If status is "Running", show only "Completed" button
                                    <Button
                                      style={{
                                        borderRadius: "15px",
                                        // width: "80px",
                                        height: "30px",
                                        backgroundColor: "orange",
                                        border: "none",
                                        color: "white",
                                      }}
                                      onClick={(event) => {
                                        handleClick(event, row.id, "Archive");
                                      }}
                                    >
                                      Completed
                                    </Button>
                                  ) : null}
                                </TableCell>{" "}
                                <Popover
                                  id={popoverId3}
                                  open={Boolean(anchorEl3)}
                                  anchorEl={anchorEl3}
                                  onClose={handleNoClose}
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
                                        handleNoClose();
                                      }}
                                    >
                                      No
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        handleYesClose(
                                          currentBetId3,
                                          currentStatus3
                                        );
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
                    {/* popover 2 */}
                    <Popover
                      id={popoverId1}
                      open={Boolean(anchorEl4)}
                      anchorEl={anchorEl4}
                      onClose={() => {
                        handleClose();
                      }}
                      anchorReference="anchorPosition" // Use anchorPosition to ignore element position
                      anchorPosition={{ top: 0, left: window.innerWidth / 2 }} // Center horizontally, top vertically
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      PaperProps={{
                        style: {
                          width: "80%", // Full width of the window
                          maxWidth: "80%", // Restrict to window's width
                          marginTop: 0, // Adjust position to top of the window
                        },
                      }}
                    >
                      {/* <div class="spinner-border text-primary" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div> */}
                      <Box p={2}>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Team 1</TableCell>
                                <TableCell>Team 2</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Option</TableCell>
                                <TableCell>Odd</TableCell>
                                <TableCell>Status</TableCell>

                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {conditionBetList.length > 0 ? (
                                conditionBetList.map(
                                  (condiBetValues, index) => (
                                    <TableRow key={condiBetValues.id}>
                                      <TableCell>{condiBetValues.id}</TableCell>
                                      <TableCell>
                                        {condiBetValues.team1.name}
                                      </TableCell>
                                      <TableCell>
                                        {condiBetValues.team2.name}
                                      </TableCell>
                                      <TableCell>
                                        {condiBetValues.title}
                                      </TableCell>
                                      <TableCell>
                                        {condiBetValues.option.name}
                                      </TableCell>
                                      <TableCell>
                                        {condiBetValues.odds}
                                      </TableCell>
                                      <TableCell>
                                        {condiBetValues.status}
                                      </TableCell>

                                      <TableCell>
                                        {condiBetValues.status === "Yes" ? (
                                          <div className="col">
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "orange",
                                                color: "white",
                                                marginRight: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "Void"
                                                );
                                              }}
                                            >
                                              Void
                                            </Button>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "blue",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "Idle"
                                                );
                                              }}
                                            >
                                              Idle
                                            </Button>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "red",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "No"
                                                );
                                              }}
                                            >
                                              No
                                            </Button>
                                          </div>
                                        ) : condiBetValues.status === "Idle" ? (
                                          <div className="col">
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "orange",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "Void"
                                                );
                                              }}
                                            >
                                              Void
                                            </Button>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "blue",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "Yes"
                                                );
                                              }}
                                            >
                                              Yes
                                            </Button>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "red",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "No"
                                                );
                                              }}
                                            >
                                              No
                                            </Button>
                                          </div>
                                        ) : condiBetValues.status === "Void" ? (
                                          <div className="col">
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "orange",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "Idle"
                                                );
                                              }}
                                            >
                                              Idle
                                            </Button>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "blue",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "Yes"
                                                );
                                              }}
                                            >
                                              Yes
                                            </Button>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "red",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "No"
                                                );
                                              }}
                                            >
                                              No
                                            </Button>
                                          </div>
                                        ) : condiBetValues.status === "No" ? (
                                          <div className="col">
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "orange",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "Void"
                                                );
                                              }}
                                            >
                                              Void
                                            </Button>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "blue",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "Idle"
                                                );
                                              }}
                                            >
                                              Idle
                                            </Button>
                                            <Button
                                              variant="contained"
                                              style={{
                                                backgroundColor: "red",
                                                color: "white",
                                                marginLeft: "10px",
                                              }}
                                              onClick={(event) => {
                                                parlayConditionButtonClick(
                                                  event,
                                                  condiBetValues.id,
                                                  "No"
                                                );
                                              }}
                                            >
                                              No
                                            </Button>
                                          </div>
                                        ) : null}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={6}
                                    style={{ textAlign: "center" }}
                                  >
                                    No results found.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Box mt={2} sx={{ textAlign: "center" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              palayAddUpdateClick(conditionId4);
                            }}
                          >
                            Add/Update Conditions
                          </Button>
                        </Box>
                      </Box>
                    </Popover>
                    <Popover
                      id={popoverId5}
                      open={Boolean(anchorEl5)}
                      anchorEl={anchorEl5}
                      onClose={handleParlayNoClose}
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
                            handleParlayNoClose();
                          }}
                        >
                          No
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => {
                            // handleYesClose(currentId);
                            handleParlayYesClose(
                              conditionId5,
                              conditionStatus5
                            );
                          }}
                        >
                          Yes
                        </Button>
                      </Box>
                    </Popover>
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
export default Parlays;
