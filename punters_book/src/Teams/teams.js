import * as React from "react";
import Box from "@mui/material/Box";
import SideNavbar from "../SideNavbar/sidenavbar";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormHelperText from "@mui/material/FormHelperText";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import teamValidations from "../FormikValidations/teamsSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { buttonTeam, getTeams, addTeam } from "../services/AllApiServices";
import Popover from "@mui/material/Popover";
import { ToastContainer, toast } from "react-toastify";
import { notifySuccess, notifyError } from "../tostify/msgtostify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import { fetchCategoryNames } from "../Categories/onlyCatName";

const VisuallyHiddenInputTeam = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Teams = () => {
  const [teamValues, setteamValues] = useState([]);
  const [teamCategoryNames, setteamCategoryNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTeam, setCurrentTeam] = React.useState(null);
  const [error, setError] = useState(null);
  const [currentId, setcurrentId] = React.useState();
  let cat_id;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchteams = React.useCallback(async () => {
    try {
      const response = await getTeams();
      console.log(" Team values:", response);
      const teamsWithStatus = response.teams.map((team) => ({
        ...team,
        status: team.status || "enable", // Set initial status
      }));
      setteamValues(teamsWithStatus);

      if (response && response.status === 200) {
        console.log("team data  :", response);
      }
    } catch (err) {
      console.log(
        "Somethig went wrong",
        err.response ? err.response.data : err.message
      );
    }
  }, []);

  React.useEffect(() => {
    fetchteams();
    loadCategoryNames();
  }, [fetchteams]);

  const handleClick = (event, id, category) => {
    console.log("Clicked item ID:", id);
    // alert(" Are you sure you want to proceed?");
    setAnchorEl(event.currentTarget);
    setCurrentTeam(category);
    setcurrentId(id);
  };

  const handleNoClose = () => {
    notifyError();
    setAnchorEl(null);
  };

  const loadCategoryNames = async () => {
    try {
      const names = await fetchCategoryNames();
      setteamCategoryNames(names);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleYesClose = async (id) => {
    if (teamValues !== null) {
      console.log("Confirmed Action for ID:", id);
      try {
        const response = await buttonTeam(id);
        notifySuccess();
        setAnchorEl(null);
        await fetchteams();

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
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <article>
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
        <div className="inputs px-3">
          <h4>Add Team</h4>
          <Formik
            initialValues={{
              teamName: "",
              teamcategoryDetails: "",
              teamLogo: null,
              category_id: null,
            }}
            validationSchema={teamValidations}
            onSubmit={async (values, { resetForm }) => {
              // Handle form submission
              try {
                const response = await addTeam(values);
                if (response && response.status === 200) {
                  console.log("Category created successfully:");
                }
                notifySuccess();
                const buttonResponse = await buttonTeam();
                if (buttonResponse.status === 200) {
                  console.log(
                    "Button created successfully: ",
                    buttonResponse.data
                  );
                }
                window.location.reload();
                resetForm();
              } catch (err) {
                console.log(
                  "Somethig went wrong",
                  err.response ? err.response.data : err.message
                );
                notifyError();
                resetForm();
              }
              console.log(" Team Form Submitted:", values.teamName);
              resetForm();
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col">
                    <Field
                      label="Team Name"
                      type="text"
                      name="teamName"
                      as={TextField}
                      error={touched.teamName && !!errors.teamName}
                      helperText={touched.teamName && errors.teamName}
                      fullWidth
                    />
                  </div>
                  <div className="col">
                    <FormControl
                      sx={{ width: "100%" }}
                      error={
                        touched.teamcategoryDetails &&
                        !!errors.teamcategoryDetails
                      }
                    >
                      <InputLabel
                        id="demo-simple-select-label"
                        name="teamcategoryDetails"
                      >
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.teamcategoryDetails}
                        label="Options"
                        // onChange={(event) => {
                        //   setFieldValue(
                        //     "teamcategoryDetails",
                        //     event.target.value
                        //   );
                        // }}
                        onChange={(event) => {
                          const selectedCategoryName = event.target.value; // Get the selected category name
                          const selectedCategory = teamCategoryNames.find(
                            (cat) => cat.name === selectedCategoryName
                          ); // Find the corresponding category object

                          if (selectedCategory) {
                            console.log(
                              "Selected Category Name:",
                              selectedCategory.name
                            );
                            cat_id = selectedCategory.id;
                            console.log(
                              "Selected Category ID:",
                              selectedCategory.id
                            );

                            setFieldValue("category_id", cat_id);

                            setFieldValue(
                              "teamcategoryDetails",
                              selectedCategory.name
                            ); // Update category details
                          }
                        }}
                      >
                        {teamCategoryNames.map((data, index) => (
                          <MenuItem value={data.name} key={index}>
                            {data.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.teamcategoryDetails &&
                        !!errors.teamcategoryDetails && (
                          <FormHelperText>
                            {errors.teamcategoryDetails}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </div>
                  <div className="col">
                    <label for="exampleColorInput" class="form-label p-1">
                      Team Logo:
                    </label>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      sx={{ textTransform: "none", fontSize: 15 }}
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload files
                      <VisuallyHiddenInputTeam
                        type="file"
                        onChange={(event) =>
                          console.log(
                            setFieldValue(
                              "teamLogo",
                              event.currentTarget.files[0]
                            )
                          )
                        }
                        single
                      />
                    </Button>
                    {touched.teamLogo && errors.teamLogo && (
                      <p style={{ color: "red", paddingLeft: "50px" }}>
                        {errors.teamLogo}
                      </p>
                    )}
                  </div>
                  <div className="col">
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", fontSize: 15 }}
                      type="submit"
                    >
                      Add Team
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
      <br></br>
      <Box sx={{ width: "100%", paddingLeft: 40, marginTop: 4 }}>
        <div className="table">
          <div className="inputs px-3">
            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <h4 className="text-start">Teams</h4>
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
                            <TableCell>Team Name</TableCell>
                            <TableCell> Logo</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell> Type</TableCell>
                            <TableCell> Status</TableCell>
                            <TableCell> Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {teamValues.length > 0 ? (
                            teamValues.map((entries) => (
                              <TableRow key={entries.id}>
                                <TableCell>{entries.id}</TableCell>
                                <TableCell>{entries.name}</TableCell>
                                <TableCell>
                                  {" "}
                                  <img
                                    src={entries.icon}
                                    alt={entries.icon}
                                    width="100"
                                    height="100"
                                  />
                                </TableCell>
                                <TableCell>
                                  {entries.category?.name || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <p>Team</p>
                                </TableCell>
                                <TableCell
                                  style={{
                                    color:
                                      entries.status === "Active"
                                        ? "green"
                                        : "red",
                                    fontSize: "15px",
                                  }}
                                >
                                  <b>{entries.status}</b>
                                </TableCell>
                                {entries.status === "Active" ? (
                                  <TableCell>
                                    <button
                                      style={{
                                        borderRadius: "15px",
                                        width: "80px",
                                        height: "40px",
                                        backgroundColor: "#ff5252", //#ff5252
                                        border: "none",
                                        color: "white",
                                      }}
                                      onClick={(event) => {
                                        handleClick(event, entries.id, entries);
                                      }}
                                      // popovertarget
                                    >
                                      Disable
                                    </button>
                                  </TableCell>
                                ) : (
                                  <TableCell>
                                    <button
                                      style={{
                                        borderRadius: "15px",
                                        width: "80px",
                                        height: "40px",
                                        backgroundColor: "#2196f3",
                                        border: "none",
                                        color: "white",
                                      }}
                                      onClick={(event) => {
                                        handleClick(event, entries.id, entries);
                                      }}
                                    >
                                      Enable
                                    </button>
                                  </TableCell>
                                )}
                                {/* Confirmation Dialog */}
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
                                        // handleYesClose(currentId);
                                        handleYesClose(currentId);
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
    </article>
  );
};
export default Teams;
