import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, Field } from "formik";
import createbetValidations from "../FormikValidations/createBetSche";
import { useNavigate } from "react-router-dom";
import { fetchCategoryNames } from "../Categories/onlyCatName";
import { fetchOnlyTeamNames, fetchTeamNames } from "../Teams/onlyTeamNames";
import FormHelperText from "@mui/material/FormHelperText";
import dayjs from "dayjs";
import { addSGM } from "../services/AllApiServices";
import { notifyError, notifySuccess } from "../tostify/msgtostify";

const Createbet = () => {
  // const [BetlcatOption, setBetcatOption] = useState("");
  // const [BetstatOption, setBetstatOption] = useState("");
  // const [BettteamOption, setBetteamOption] = useState("");
  // const [Betteam2Option, setBetteam2Option] = useState("");
  const [cateName1, setcateName1] = useState([]);
  const [teamNames2, setteamNames2] = useState([]);
  const [error, setError] = useState(null);
  let cate_id;
  const navigate = useNavigate();

  const loadCatNames = async () => {
    try {
      const catgNames1 = await fetchCategoryNames();
      // const teamNames = await fetchOnlyTeamNames();
      // setteamNames(teamNames);
      setcateName1(catgNames1);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadTeaNames = async () => {
    try {
      const teamNames1 = await fetchTeamNames();
      setteamNames2(teamNames1);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    loadCatNames();
    loadTeaNames();
  }, []);

  return (
    <article>
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <div className="inputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Create SGM</h4>
              </div>
              <div className="col">
                <Button
                  variant="contained"
                  sx={{ textTransform: "none", fontSize: 15 }}
                  onClick={() => navigate("/sgm/sgmlist")}
                >
                  SGM List
                </Button>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              betCateId: "",
              team1: "",
              team2: "",
              betStatus: "",
              betStartDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              betrating: "",
              betOdds: "",
              betValue: "",
              isFree: 0,
              isstar: 0,
            }}
            validationSchema={createbetValidations}
            onSubmit={async (values, { resetForm }) => {
              try {
                const response = await addSGM(values);
                resetForm();
                notifySuccess();
                console.log(" Bet Builder Form Submitted:", {
                  ...values,
                  betStartDate: dayjs(values.betStartDate).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                });
                navigate(`/sgm/addcondition/${cate_id}`);
                if (response && response.status === 200) {
                  console.log("Category created successfully:");
                }
              } catch (err) {
                notifyError();
                console.log(
                  "Somethig went wrong",
                  err.response ? err.response.data : err.message
                );
                resetForm();
              }
              // console.log(" bet Form Submitted:", {
              //   ...values,
              //   betStartDate: dayjs(values.betStartDate).format(
              //     "YYYY-MM-DD HH:mm:ss"
              //   ),
              // });
              resetForm();
            }}
          >
            {({ values, errors, handleBlur, touched, setFieldValue }) => (
              <Form>
                <div class="container text-center ">
                  <div class="row">
                    <div class="col">
                      <FormControl
                        sx={{ width: "100%" }}
                        error={
                          touched.betCategory && Boolean(errors.betCategory)
                        }
                      >
                        <InputLabel
                          id="demo-simple-select-label"
                          // name="betCategory"
                        >
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.betCategory} // Use optional chaining to avoid errors
                          label="Options"
                          onChange={(event) => {
                            const selectCatName = event.target.value;
                            const selectCategory = cateName1.find(
                              (cat) => cat.name === selectCatName
                            );
                            console.log("SelectedCategorys: ", selectCategory);

                            // Set the category name in Formik's state
                            cate_id = selectCategory.id;
                            setFieldValue("betCategory", selectCategory.name);
                            setFieldValue("betCateId", selectCategory.id);

                            console.log(
                              "Selected Category Name:",
                              selectCategory.id
                            );
                          }}
                        >
                          {cateName1.map((data, index) => (
                            <MenuItem value={data.name} key={index}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.betCategory && errors.betCategory && (
                          <FormHelperText>{errors.betCategory}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div class="col">
                      <Autocomplete
                        freeSolo
                        options={teamNames2.map((team) => team.name)}
                        value={
                          teamNames2.find((team) => team.id === values.team1)
                            ?.name || ""
                        }
                        name="team1"
                        onChange={(event, newValue) => {
                          console.log("Selected team name:", newValue);
                          const selectedTeam1 = teamNames2.find(
                            (team) => team.name === newValue
                          );
                          console.log("Selected team object:", selectedTeam1);

                          if (selectedTeam1) {
                            console.log(
                              "Selected Team ID 1:",
                              selectedTeam1.id
                            );
                            setFieldValue("team1", selectedTeam1.id); // Set Formik value to the team's ID
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Team1"
                            variant="outlined"
                            fullWidth
                            error={Boolean(touched.team1 && errors.team1)}
                            helperText={touched.team1 && errors.team1}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <br></br>
                <div class="container text-center ">
                  <div class="row">
                    <div class="col">
                      <Autocomplete
                        freeSolo
                        options={teamNames2.map((team) => team.name)}
                        value={
                          teamNames2.find((team) => team.id === values.team2)
                            ?.name || ""
                        }
                        name="team2"
                        onChange={(event, newValue) => {
                          console.log("Selected team name:", newValue);
                          const selectedTeam2 = teamNames2.find(
                            (team) => team.name === newValue
                          );
                          console.log("Selected team object 2:", selectedTeam2);

                          if (selectedTeam2) {
                            console.log("Selected Team ID:", selectedTeam2.id);
                            setFieldValue("team2", selectedTeam2.id);
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
                    </div>
                    <div className="col">
                      <FormControl
                        sx={{ width: "100%" }}
                        error={touched.betStatus && Boolean(errors.betStatus)}
                      >
                        <InputLabel
                          id="demo-simple-select-label"
                          name="betStatus"
                        >
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.betStatus}
                          label="Options"
                          onChange={(event) =>
                            setFieldValue("betStatus", event.target.value)
                          }
                        >
                          <MenuItem value="Upcoming">Upcoming</MenuItem>
                          <MenuItem value="Running">Running</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                        {/* {touched.preleagueName && errors.preleagueName && (
                            <FormHelperText>
                              {errors.preleagueName}
                            </FormHelperText>
                          )} */}
                      </FormControl>
                    </div>
                  </div>
                </div>
                <br></br>
                <div class="container text-center ">
                  <div class="row">
                    <div class="col">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            label="Start Date and Time"
                            value={
                              values.betStartDate
                                ? dayjs(values.betStartDate)
                                : null
                            }
                            onChange={(values) =>
                              setFieldValue(
                                "betStartDate",
                                dayjs(values).format("YYYY-MM-DD HH:mm:ss")
                              )
                            }
                            error={
                              touched.betStartDate &&
                              Boolean(errors.betStartDate)
                            }
                            helperText={
                              touched.betStartDate && errors.betStartDate
                            }
                            name="betStartDate"
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {/* odds(input), rating(input) , isFree(check box), value(input), star(checkbox), save and next */}
                    </div>
                    <div className="col">
                      <Field
                        fullWidth
                        label="Odds"
                        name="betOdds"
                        type="number"
                        value={values.betOdds}
                        as={TextField}
                        id="fullWidth"
                        error={touched.betOdds && Boolean(errors.betOdds)}
                        helperText={touched.betOdds && errors.betOdds}
                      />
                    </div>
                    <div className="col">
                      <Field
                        fullWidth
                        label="Rating"
                        type="number"
                        name="betrating"
                        value={values.betrating}
                        as={TextField}
                        error={touched.betrating && Boolean(errors.betrating)}
                        helperText={touched.betrating && errors.betrating}
                      />
                    </div>
                    <div className="col">
                      <Field
                        fullWidth
                        label="Value"
                        type="number"
                        as={TextField}
                        value={values.betValue}
                        name="betValue"
                        id="fullWidth"
                        error={touched.betValue && Boolean(errors.betValue)}
                        helperText={touched.betValue && errors.betValue}
                      />
                    </div>
                    <div class="col">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.isFree}
                            onChange={() =>
                              setFieldValue(
                                "isFree",
                                values.isFree === 0 ? 1 : 0
                              )
                            }
                          />
                        }
                        label="isFree"
                        name="isFree"
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
                  </div>
                </div>
                <br></br>
                <div class="container text-center ">
                  <div class="row">
                    <div className="col">
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
            )}
          </Formik>
        </div>
      </Box>
    </article>
  );
};
export default Createbet;
