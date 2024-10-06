import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFormik, Field } from "formik";
import { useState, useEffect } from "react";
// import { Formik, Form, Field } from "formik";
import { Button, TextField } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  conditionMultiButton,
  createConditionSGM,
  deleteButton,
  deleteparlayButton,
} from "../services/AllApiServices";
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
import { fetchOptionNames } from "../Betbuilder/getOptions";
import addUpdateParSche from "../FormikValidations/addUpdateParSche";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const UpdateAddContion = (props) => {
  const loaction2 = useLocation();
  const parlaycondition = loaction2.state;
  console.log("Parlaycondition: ", parlaycondition);
  const [optionId1, setoptionId1] = useState(null);
  const [options1, setoptions1] = useState([]);
  const [team, setTeam] = useState([]);
  const [conditionData1, setconditionData1] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
    touched,
    errors,
    isValid,
    setValues,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      parlay_id: "",
      team1_id: "",
      team2_id: "",
      conditionOdds: "",
      status: "Idle",
      start_at: "",
      title: "",
      option_id: "", //dropdown
    },
    validationSchema: addUpdateParSche,
    onSubmit: async (values, { resetForm }) => {
      // console.log("betbuilder_id:  ", betbuilder_id);
      console.log(" Multi Updated values : ", values);
      //   try {
      //     const response = await addInsideConditionMulti(values);
      //     resetForm();
      //     console.log(" Added Multi Condition inside values:", values);
      //     fetchConditions();
      // notifySuccess("Submitted Successfully!");
      //     if (response && response.status === 200) {
      //       console.log("Updated Multi successfully:");
      //     }
      //   } catch (err) {
      //     console.log(
      //       "Somethig went wrong",
      //       err.response ? err.response.data : err.message
      //     );
      //     resetForm();
      //   }
      resetForm();
    },
  });

  //for options
  const loadOptions = async () => {
    try {
      const names = await fetchOptionNames();
      setoptions1(names);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadTeams = async () => {
    try {
      const teams = await fetchTeamNames();
      setTeam(teams);
    } catch (err) {
      setError(err.message);
    }
  };

  //deleteButton
  const deleteParButtonClick = async (id) => {
    console.log("delete selected id: ", id);
    try {
      await deleteparlayButton(id); //here is bet delete button
      console.log("Condition deleted: ", id);
      fetchConditions();
    } catch (err) {
      setError(err.message);
      console.log(" Condition deleted button err: ", err.message);
    }
  };

  //conditionButton
  const fetchConditions = React.useCallback(async () => {
    try {
      const response = await conditionMultiButton(parlaycondition);
      console.log(" Condition values:", response.conditions);
      const condition = response.conditions.map((condi) => condi);
      setconditionData1(condition);
      setoptionId1(parlaycondition);
      console.log("OptionId1: ", optionId1);
      console.log(conditionData1);

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

  useEffect(() => {
    loadOptions();
    loadTeams();
    fetchConditions();
  }, []);

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
                  <h4 className="text-start">Add/Update Conditions To Multi</h4>
                </div>
                <div className="col">
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", fontSize: 15 }}
                    onClick={() => navigate("/sgm/sgmoptions")}
                  >
                    Create Option
                  </Button>
                </div>
              </div>
              <hr></hr>
              <form onSubmit={handleSubmit}>
                <div class="container text-center ">
                  <div class="row">
                    <div class="col">
                      <label className="float-start">Team 1: </label>
                      <FormControl
                        sx={{ width: "100%" }}
                        error={touched.team1_id && Boolean(errors.team1_id)}
                      >
                        <InputLabel id="team1-select-label" />

                        <Select
                          labelId="team1-select-label"
                          id="team1-select"
                          name="team1_id"
                          value={values.team1_id} // Use optional chaining to avoid errors
                          onChange={(event) => {
                            const selectedTeam = event.target.value;
                            const selectedTeamOption = team.find(
                              (opt) => opt.name === selectedTeam
                            );

                            if (selectedTeam) {
                              setFieldValue("team1_id", selectedTeamOption.id);
                            }

                            // Set the category name in Formik's state

                            console.log("team1_id:", selectedTeam);
                          }}
                          onBlur={handleBlur}
                        >
                          {team.map((data, index) => (
                            <MenuItem value={data.name} key={index}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.team1_id && errors.team1_id && (
                          <FormHelperText>{errors.team1_id}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div class="col">
                      <label className="float-start">Team 2: </label>
                      <FormControl
                        sx={{ width: "100%" }}
                        error={touched.team2_id && Boolean(errors.team2_id)}
                      >
                        <InputLabel id="demo-simple-select-label" />

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="team2_id"
                          value={values.team2_id} // Use optional chaining to avoid errors
                          onChange={(event) => {
                            const selectedTeam2 = event.target.value;
                            const selectedTeam2Option = team.find(
                              (opt) => opt.name === selectedTeam2
                            );

                            if (selectedTeam2) {
                              setFieldValue("team2_id", selectedTeam2Option.id);
                            }

                            // Set the category name in Formik's state

                            console.log("team2_id:", selectedTeam2);
                            onBlur = { handleBlur };
                          }}
                        >
                          {team.map((data, index) => (
                            <MenuItem value={data.name} key={index}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.team2_id && errors.team2_id && (
                          <FormHelperText>{errors.team2_id}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div class="col">
                      <label className="float-start">ConditionOdds : </label>
                      {/* //TextField */}
                      <TextField
                        fullWidth
                        value={values.conditionOdds}
                        name="conditionOdds"
                        type="text"
                        onChange={(event) => {
                          setFieldValue("conditionOdds", event.target.value);
                          console.log({ conditionOdds: event.target.value });
                        }}
                        error={Boolean(
                          touched.conditionOdds && errors.conditionOdds
                        )}
                        helperText={
                          touched.conditionOdds && errors.conditionOdds
                        }
                        id="outlined-basic"
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="col">
                      <div className="row">
                        <label
                          className="text-start "
                          style={{ marginRight: "auto" }}
                        >
                          Start Date:{" "}
                        </label>
                      </div>
                      {/* Start date */}

                      <div className="row">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          error={Boolean(touched.start_at && errors.start_at)}
                          onBlur={handleBlur}
                        >
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              // label="Start Date and Time"
                              name="date"
                              value={
                                values.start_at ? dayjs(values.start_at) : null
                              }
                              onChange={(newValue) => {
                                // Ensure you're setting a valid date object
                                const formattedDate = newValue
                                  ? dayjs(newValue).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )
                                  : null;
                                setFieldValue("start_at", formattedDate);
                              }}
                            />
                          </DemoContainer>
                          {touched.start_at && errors.start_at && (
                            <FormHelperText error>
                              {errors.start_at}
                            </FormHelperText>
                          )}
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col">
                      <label className="float-start">Status: </label>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-label" />
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="status"
                          value={values.status}
                          onChange={(e) => {
                            setFieldValue("status", e.target.value);
                          }}
                          onBlur={handleBlur}
                        >
                          <MenuItem value="Void"> Void</MenuItem>
                          <MenuItem value="Idle"> Idle</MenuItem>
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                        {touched.status && errors.status && (
                          <FormHelperText>{errors.status}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className="col">
                      <label className="float-start">Option: </label>
                      <TextField
                        fullWidth
                        value={values.conditionOdds}
                        name="rating"
                        type="text"
                        onChange={(event) => {
                          setFieldValue("rating", event.target.value);
                          console.log({ rating: event.target.value });
                        }}
                        onBlur={handleBlur}
                        id="outlined-basic"
                        error={Boolean(
                          touched.conditionOdds && errors.conditionOdds
                        )}
                        helperText={
                          touched.conditionOdds && errors.conditionOdds
                        }
                      />
                    </div>
                    <div className="col">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.isstar} // Bind checked state to Formik's state
                            onChange={() =>
                              setFieldValue(
                                "isstar",
                                values.isstar === 0 ? 1 : 0
                              )
                            } // Update Formik's state
                          />
                        }
                        name="star"
                        label="⭐"
                      />
                    </div>
                    <div className="col">
                      <Button
                        variant="contained"
                        type="submit"
                        className="align-middle"
                        sx={{ textTransform: "none", fontSize: 15 }}
                      >
                        Add Condition
                      </Button>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {conditionData1.length > 0 ? (
                          conditionData1.map((condiValues1) => (
                            <TableRow key={condiValues1.id}>
                              <TableCell>{condiValues1.team1.name}</TableCell>
                              <TableCell>{condiValues1.team2.name}</TableCell>
                              <TableCell>{condiValues1.title}</TableCell>
                              <TableCell>{condiValues1.option.name}</TableCell>

                              <TableCell>
                                {condiValues1.conditionOdds}
                              </TableCell>
                              <TableCell>{condiValues1.status}</TableCell>
                              <TableCell>{condiValues1.name}</TableCell>
                              <TableCell>
                                <Button
                                  sx={{
                                    // borderRadius: "15px",
                                    width: "80px",
                                    height: "30px",
                                    backgroundColor: "red",
                                    border: "none",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    deleteParButtonClick(condiValues1.id);
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
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
                <br></br>
                <div className="row float-end">
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", fontSize: 15 }}
                    onClick={() => navigate("/multi/multilist")}
                  >
                    Multi List
                  </Button>
                </div>
                <br></br>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default UpdateAddContion;
