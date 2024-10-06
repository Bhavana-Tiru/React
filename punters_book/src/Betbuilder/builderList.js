import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  betAction,
  betConditionAction,
  conditionButton,
  getBetBuilders,
  sgmAction,
} from "../services/AllApiServices";
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

const Builder = () => {
  const [BetBuilders, setBuilders] = useState([]);
  //popover1
  const [anchorEl, setAnchorEl] = useState(null);
  //for id
  const [currentSGMId, setcurrentSGMId] = React.useState();
  //for status
  const [currentStatus, setcurrentStatus] = React.useState();

  //condition button
  //popover2
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  //conditionsList
  const [conditionList, setconditionsList] = useState([]);
  //condition id:
  const [conditionId, setconditionId] = React.useState();

  //popover condition button
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  //condition id:
  const [conditionId2, setconditionId2] = React.useState();
  //conditoion status
  const [conditionStatus2, setconditionStatus2] = React.useState();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const navigate = useNavigate();

  const fetchBuilders = React.useCallback(async () => {
    try {
      const response = await getBetBuilders();
      console.log(" Builders values:", response);
      const buildersWithStatus = response.betbuilders.map((sgm) => ({
        ...sgm,
        status: sgm.status || "UpComming",
      }));
      setBuilders(buildersWithStatus);

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
    fetchBuilders();
  }, [fetchBuilders]);

  const handleClick = (event, id, status) => {
    console.log("Clicked item ID:", id);
    console.log("Status is: ", status);
    // alert(" Are you sure you want to proceed?");
    setAnchorEl(event.currentTarget);
    setcurrentStatus(status);
    setcurrentSGMId(id);
  };

  // Close the Popover
  const handleNoClose = () => {
    notifyError();
    setAnchorEl(null);
  };

  const handleYesClose = async (id, status) => {
    if (BetBuilders !== null) {
      console.log("Confirmed Action for ID:", id);
      console.log("Status is: ", status);
      try {
        const response = await betAction(id, status);
        notifySuccess();
        setAnchorEl(null);
        await fetchBuilders();
        if (response.status === 200) {
        } else if (response.status === 429) {
          console.error("Too many requests, retrying...");
          await sleep(2000); // wait 2 seconds before retrying
          await handleYesClose(id, status); // retry the action
          notifyError("Please try after some time!");
        }
      } catch (err) {
        console.error("Error performing action:", err);
        notifyError();
      }
    }
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  /////////////////////////////////////////////////////////////////////
  //Popover 2
  const fetchConditions = React.useCallback(async (id) => {
    try {
      const response = await conditionButton(id);
      console.log(" Condition values:", response);
      const conditionWithStatus = response.conditions.map((condition) => ({
        ...condition,
        status: condition.status || "Void",
      }));
      console.log("conditionWithStatus: ", conditionWithStatus);
      setconditionsList(conditionWithStatus);
      console.log(conditionList);

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

  const handleConditionClick = (event, id) => {
    console.log("Clicked item ID:", id);
    setAnchorEl1(event.currentTarget);
    setconditionId(id);
  };

  const handleAddUpdateClick = (id) => {
    navigate(`/sgm/addcondition/${id}`, { state: id });
    console.log("sgm id: ", id);
  };

  const handleClose = () => {
    notifyError();
    setAnchorEl1(null);
    setconditionId(null); // Reset selected row when popover closes
  };

  const open3 = Boolean(anchorEl1);
  const popoverId3 = open3 ? "simple-popover" : undefined;

  ///////////////////////////////////////////////////////////
  // popover3
  const handleButtonConditionClick = (event, id, status) => {
    console.log("Clicked item ID:", id);
    setAnchorEl2(event.currentTarget);
    setconditionId2(id);
    setconditionStatus2(status);
  };
  const handleBetYesClose = async (id, status) => {
    if (BetBuilders !== null) {
      console.log("Bet ID:", id);
      console.log("Bet Status:", status);
      try {
        const response = await betConditionAction(id, status);
        await fetchConditions();
        notifySuccess();
        setAnchorEl2(null);

        if (response.status === 200) {
        } else if (response.status === 429) {
          console.error("Too many requests, retrying...");
          await sleep(2000); // wait 2 seconds before retrying
          await handleBetYesClose(id, status); // retry the action
          notifyError("Please try after some time!");
        }
      } catch (err) {
        console.error("Error performing action:", err);
        notifyError();
      }
    }
  };

  const handleBetNoClose = () => {
    notifyError();
    setAnchorEl2(null);
  };
  const open2 = Boolean(anchorEl2);
  const popoverId2 = open2 ? "simple-popover" : undefined;

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
                  <h4 className="text-start">SGM List</h4>
                </div>
                <div className="col">
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", fontSize: 15 }}
                    onClick={() => navigate("/predections/addpredictions")}
                  >
                    Create SGM
                  </Button>
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
                            <TableCell>Team1</TableCell>
                            <TableCell> Team2</TableCell>
                            <TableCell> Match time</TableCell>
                            <TableCell> Rating</TableCell>
                            <TableCell> Odds</TableCell>
                            <TableCell> Value</TableCell>
                            <TableCell> Status</TableCell>
                            <TableCell> Conditions</TableCell>
                            <TableCell> Action</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {BetBuilders.length > 0 ? (
                            BetBuilders.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.category.name}</TableCell>
                                <TableCell>{row.team1.name}</TableCell>
                                <TableCell>{row.team2.name}</TableCell>
                                <TableCell>{row.start_at}</TableCell>
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

                                      height: "40px",
                                      //#ff5252
                                      border: "none",
                                      color: "white",
                                      backgroundColor: "#1976d2",
                                    }}
                                    onClick={(event) => {
                                      handleConditionClick(event, row.id);
                                      fetchConditions(row.id);
                                    }}
                                  >
                                    conditions
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  {row.status === "Upcoming" ? (
                                    <div className="row">
                                      {/* "Running" button  */}
                                      <div className="col">
                                        <Button
                                          style={{
                                            borderRadius: "15px",
                                            // width: "80px",
                                            // height: "30px",
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
                                      <div className="col">
                                        <Button
                                          style={{
                                            borderRadius: "15px",
                                            // width: "80px",
                                            // height: "30px",
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
                                        // height: "30px",
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
                                  id={popoverId}
                                  open={Boolean(anchorEl)}
                                  anchorEl={anchorEl}
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
                                          currentSGMId,
                                          currentStatus
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
                      id={popoverId3}
                      open={Boolean(anchorEl1)}
                      anchorEl={anchorEl1}
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
                      <Box p={2}>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {conditionList.length > 0 ? (
                                conditionList.map((condiValues, index) => (
                                  <TableRow key={condiValues.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                      {condiValues.bet_builder_id}
                                    </TableCell>
                                    <TableCell>{condiValues.title}</TableCell>
                                    <TableCell>{condiValues.rating}</TableCell>
                                    <TableCell>{condiValues.status}</TableCell>
                                    <TableCell>
                                      {condiValues.status === "Yes" ? (
                                        <div className="col">
                                          <Button
                                            variant="contained"
                                            style={{
                                              backgroundColor: "orange",
                                              color: "white",
                                              marginRight: "10px",
                                            }}
                                            onClick={(event) => {
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
                                                "No"
                                              );
                                            }}
                                          >
                                            No
                                          </Button>
                                        </div>
                                      ) : condiValues.status === "Idle" ? (
                                        <div className="col">
                                          <Button
                                            variant="contained"
                                            style={{
                                              backgroundColor: "orange",
                                              color: "white",
                                              marginLeft: "10px",
                                            }}
                                            onClick={(event) => {
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
                                                "No"
                                              );
                                            }}
                                          >
                                            No
                                          </Button>
                                        </div>
                                      ) : condiValues.status === "Void" ? (
                                        <div className="col">
                                          <Button
                                            variant="contained"
                                            style={{
                                              backgroundColor: "orange",
                                              color: "white",
                                              marginLeft: "10px",
                                            }}
                                            onClick={(event) => {
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
                                                "No"
                                              );
                                            }}
                                          >
                                            No
                                          </Button>
                                        </div>
                                      ) : condiValues.status === "No" ? (
                                        <div className="col">
                                          <Button
                                            variant="contained"
                                            style={{
                                              backgroundColor: "orange",
                                              color: "white",
                                              marginLeft: "10px",
                                            }}
                                            onClick={(event) => {
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                              handleButtonConditionClick(
                                                event,
                                                condiValues.id,
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
                                ))
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
                              handleAddUpdateClick(conditionId);
                            }}
                          >
                            Add/Update Conditions
                          </Button>
                        </Box>
                      </Box>
                    </Popover>
                    <Popover
                      id={popoverId2}
                      open={Boolean(anchorEl2)}
                      anchorEl={anchorEl2}
                      onClose={handleBetNoClose}
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
                            handleBetNoClose();
                          }}
                        >
                          No
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => {
                            // handleYesClose(currentId);
                            handleBetYesClose(conditionId2, conditionStatus2);
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
export default Builder;
