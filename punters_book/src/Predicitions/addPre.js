import * as React from "react";
import { useState } from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import { Autocomplete, TextField } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Formik, Form, Field } from "formik";
import { Button } from "@mui/material";
import matchValidations from "../FormikValidations/AddPreSche";
import { useNavigate } from "react-router-dom";
import { fetchLeagueNames } from "../Leagues/onlyLeague";
import { fetchCategoryNames } from "../Categories/onlyCatName";
import { fetchOnlyTeamNames } from "../Teams/onlyTeamNames";
import FormHelperText from "@mui/material/FormHelperText";
import dayjs from "dayjs";
import { addPredictions } from "../services/AllApiServices";

const AddPre = () => {
  const [leagueNames4, setleagueNames4] = useState([]); //league dropdown
  const [categoryName, setcategoryName] = useState([]);
  const [teamNames, setteamNames] = useState([]);
  const [error, setError] = useState(null); //error
  const navigate = useNavigate();
  let cat_id;
  let league_id;

  const loadCatNames = async () => {
    try {
      const catgNames = await fetchCategoryNames();
      setcategoryName(catgNames);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadLeagueNames1 = async (id) => {
    try {
      const leagNames = await fetchLeagueNames(id);
      const teamNames = await fetchOnlyTeamNames(id);
      setteamNames(teamNames);
      setleagueNames4(leagNames);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    loadCatNames();
  }, []);

  return (
    <article>
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }} noValidate>
        <div className="inputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Add Predicition</h4>
              </div>

              <div className="col">
                <Button
                  variant="contained"
                  sx={{ textTransform: "none", fontSize: 15 }}
                  onClick={() => navigate("/predections/predectionslist")}
                >
                  Predicition List
                </Button>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              matchName: "",
              preCategoryDetails: "",
              preleagueName: "",
              status: "",
              team1: "",
              team2: "",
              date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              rating: "4",
              is_free: "1",
              is_trading: 1,
              prediction_value: "100",
              team1_prediction: "40",
              team2_prediction: "60",
              team1_score: "200",
              team2_score: "300",
              reason: "Helo",
              odds: "5",
            }}
            validationSchema={matchValidations}
            validateOnChange={true} // Log validation errors on change
            validateOnBlur={true}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              try {
                const response = await addPredictions(values);
                resetForm();
                console.log(" Prediction Form Submitted:", {
                  values,
                });

                if (response && response.status === 200) {
                  console.log("Category created successfully:");
                }
              } catch (err) {
                console.log(
                  "Somethig went wrong",
                  err.response ? err.response.data : err.message
                );
                resetForm();
              }
              resetForm();
            }}

            // console.log("Current errors:", errors);
            // if (Object.keys(errors).length > 0) {
            //   console.log("Validation errors detected:", errors);
            //   return; // Prevent submission if there are errors
            // }
          >
            {({ values, errors, handleBlur, touched, setFieldValue }) => {
              console.log("Errors:", errors);
              return (
                <Form>
                  <div class="container text-center ">
                    <div class="row">
                      <div class="col">
                        <Field
                          fullWidth
                          label="Match Name"
                          name="matchName"
                          type="text"
                          as={TextField}
                          error={Boolean(touched.matchName && errors.matchName)}
                          helperText={touched.matchName && errors.matchName}
                          id="outlined-basic"
                        />
                      </div>
                      <div class="col">
                        <FormControl
                          sx={{ width: "100%" }}
                          error={
                            touched.preCategoryDetails &&
                            Boolean(errors.preCategoryDetails)
                          }
                        >
                          <InputLabel
                            id="demo-simple-select-label"

                            // helperText={
                            //   touched.preCategoryDetails &&
                            //   errors.preCategoryDetails
                            // }
                          >
                            Category
                          </InputLabel>
                          <Select
                            name={values.preCategoryDetails}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Options"
                            onChange={(event) => {
                              const selectedCatName = event.target.value;
                              const selectedCat = categoryName.find(
                                (cat) => cat.name === selectedCatName
                              );
                              if (selectedCat) {
                                cat_id = selectedCat.id;
                                console.log(
                                  "Selected Category ID:",
                                  selectedCat.id
                                );
                                loadLeagueNames1(cat_id);
                                setFieldValue(
                                  "preCategoryDetails",
                                  selectedCat.id
                                );
                              }
                            }}
                          >
                            {categoryName.map((data, index) => (
                              <MenuItem value={data.name} key={index}>
                                {data.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.preCategoryDetails &&
                            errors.preCategoryDetails && (
                              <FormHelperText>
                                {errors.preCategoryDetails}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div class="container text-center ">
                    <div class="row">
                      <div class="col">
                        <FormControl
                          sx={{ width: "100%" }}
                          error={Boolean(
                            touched.preleagueName && errors.preleagueName
                          )}
                        >
                          <InputLabel id="demo-simple-select-label">
                            League Name
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name={values.preleagueName}
                            onChange={(event) => {
                              const selectedleaguName = event.target.value;
                              const selectedLeague = leagueNames4.find(
                                (league) => league.name === selectedleaguName
                              );
                              if (selectedLeague) {
                                league_id = selectedLeague.id;
                                console.log(
                                  "Selected Category ID:",
                                  selectedLeague.id
                                );

                                setFieldValue(
                                  "preleagueName",
                                  selectedLeague.id
                                );
                              }
                            }}
                          >
                            {leagueNames4.map((data, index) => (
                              <MenuItem value={data.name} key={index}>
                                {data.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.preleagueName && errors.preleagueName && (
                            <FormHelperText>
                              {errors.preleagueName}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </div>
                      <div className="col">
                        <FormControl
                          sx={{ width: "100%" }}
                          error={Boolean(touched.status && errors.status)}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Status
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.status}
                            onChange={(event) =>
                              setFieldValue("status", event.target.value)
                            }
                            label="Options"
                          >
                            <MenuItem value="Upcoming">Upcoming</MenuItem>
                            <MenuItem value="Running">Running</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                          </Select>
                          {touched.status && errors.status && (
                            <FormHelperText>{errors.status}</FormHelperText>
                          )}
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div class="container text-center ">
                    <div class="row">
                      <div class="col">
                        <Autocomplete
                          freeSolo
                          options={teamNames.map((team) => team.name)}
                          value={
                            teamNames.find((team) => team.id === values.team1)
                              ?.name || ""
                          }
                          name="team1"
                          onChange={(event, newValue) => {
                            console.log("Selected team name:", newValue);
                            const selectedTeam = teamNames.find(
                              (team) => team.name === newValue
                            );
                            console.log("Selected team object:", selectedTeam);

                            if (selectedTeam) {
                              console.log(
                                "Selected Team ID 1:",
                                selectedTeam.id
                              );
                              setFieldValue("team1", selectedTeam.id); // Set Formik value to the team's ID
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Team1"
                              variant="outlined"
                              fullWidth
                              error={Boolean(touched.team1 && errors.team1)}
                              helperText={touched.team2 && errors.team2}
                            />
                          )}
                        />
                        {/* {touched.team1 && errors.team1 && (
                          <FormHelperText sx={{ color: "red" }}>
                            {errors.team1}
                          </FormHelperText>
                        )} */}
                      </div>
                      <div className="col">
                        <Autocomplete
                          freeSolo
                          options={teamNames.map((team) => team.name)}
                          value={
                            teamNames.find((team) => team.id === values.team2)
                              ?.name || ""
                          }
                          name="team2"
                          onChange={(event, newValue) => {
                            console.log("Selected team name:", newValue);
                            const selectedTeam2 = teamNames.find(
                              (team) => team.name === newValue
                            );
                            console.log(
                              "Selected team object 2:",
                              selectedTeam2
                            );

                            if (selectedTeam2) {
                              console.log(
                                "Selected Team ID:",
                                selectedTeam2.id
                              );
                              setFieldValue("team2", selectedTeam2.id); // Set Formik value to team2's ID
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Team2"
                              variant="outlined"
                              fullWidth
                              error={Boolean(touched.team2 && errors.team2)}
                              helperText={touched.team2 && errors.team2}
                            />
                          )}
                        />
                        {/* {touched.team2 && errors.team2 && (
                          <FormHelperText>{errors.team2}</FormHelperText>
                        )} */}
                      </div>
                    </div>
                    <br></br>
                  </div>
                  <div class="container text-center ">
                    <div class="row">
                      <div class="col">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          error={Boolean(touched.date && errors.date)}
                        >
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="Start Date and Time"
                              name="date"
                              value={values.date ? dayjs(values.date) : null}
                              onChange={(newValue) => {
                                // Ensure you're setting a valid date object
                                const formattedDate = newValue
                                  ? dayjs(newValue).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )
                                  : null;
                                setFieldValue("date", formattedDate);
                              }}
                              error={Boolean(touched.date && errors.date)}
                            />
                          </DemoContainer>
                          {touched.date && errors.date && (
                            <FormHelperText error>{errors.date}</FormHelperText>
                          )}
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div class="container text-center ">
                    <div class="row">
                      <div class="col">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ textTransform: "none", fontSize: 15 }}
                        >
                          Save and Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Box>
    </article>
  );
};
export default AddPre;
