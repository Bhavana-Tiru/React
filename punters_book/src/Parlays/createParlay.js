import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Formik, Form, Field } from "formik";
import createParSchema from "../FormikValidations/creataParShe";
import { useNavigate } from "react-router-dom";
import { fetchCategoryNames } from "../Categories/onlyCatName";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addPredictions, createMulti } from "../services/AllApiServices";
import FormHelperText from "@mui/material/FormHelperText";
import { notifyError, notifySuccess } from "../tostify/msgtostify";
import dayjs from "dayjs";

// top beside Create parlay-> Parlays List(button) Category(dropdown),status(dropdown), odds(input), rating(i/p), isFree(checkbox), value(i/p), button

const CreateParlay = () => {
  const [CategoryNames1, setCategoryNames1] = useState([]);
  let parCat_id;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadCategoryNames = async () => {
    try {
      const names = await fetchCategoryNames();
      setCategoryNames1(names);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    loadCategoryNames();
  }, []);

  return (
    <article>
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <div className="inputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Create Multi</h4>
              </div>
              <div className="col">
                <Button
                  variant="contained"
                  sx={{ textTransform: "none", fontSize: 15 }}
                  onClick={() => navigate("/multi/multilist")}
                >
                  Multi List
                </Button>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              ParCategory: "",
              ParCategoryId: "",
              ParStatus: "",
              ParOdds: "",
              ParRating: "",
              IsFree: 0,
              IsStar: 0,
              ParValue: "",
              ParStart: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            }}
            validationSchema={createParSchema}
            validateOnChange={true} // Log validation errors on change
            validateOnBlur={true}
            onSubmit={async (values, { resetForm }) => {
              console.log("createParCategoryID:", values);
              try {
                const response = await createMulti(values); // backend add star too.
                console.log(" Parlay Form Submitted:", values);
                notifySuccess();
                navigate(`/multi/addupdatecondition/${parCat_id}`);
                resetForm();
              } catch (err) {
                console.log(
                  "Somethig went wrong",
                  err.response ? err.response.data : err.message
                );
                notifyError();
                resetForm();
              }
              resetForm();
            }}
          >
            {({ values, errors, touched, handleBlur, setFieldValue }) => {
              console.log("Errors:", errors);
              return (
                <Form>
                  <div className="container text-center">
                    <div className="row">
                      <div className="col">
                        {/* Category Select */}
                        <FormControl
                          sx={{ width: "100%" }}
                          error={
                            touched.ParCategory && Boolean(errors.ParCategory)
                          }
                        >
                          <InputLabel
                            id="ParCategory-select-label"
                            name="ParCategory"
                          >
                            Category
                          </InputLabel>
                          <Select
                            name="ParCategory"
                            labelId="ParCategory-select-label"
                            id="ParCategory-select"
                            label="Options"
                            value={values.ParCategory}
                            onChange={(event) => {
                              const selectedCatName = event.target.value;
                              const selectedCat = CategoryNames1.find(
                                (cat) => cat.name === selectedCatName
                              );
                              if (selectedCat) {
                                console.log(
                                  "Selected Category ID:",
                                  selectedCat.id
                                );
                                //ParCategoryId
                                console.log(
                                  "Selected Category ID:",
                                  selectedCat.name
                                );
                                parCat_id = selectedCat.id;
                                setFieldValue("ParCategory", selectedCat.name);
                                setFieldValue("ParCategoryId", selectedCat.id);
                              }
                            }}
                            onBlur={handleBlur}
                          >
                            {CategoryNames1.map((data, index) => (
                              <MenuItem value={data.name} key={index}>
                                {data.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.ParCategory && errors.ParCategory && (
                            <FormHelperText>
                              {errors.ParCategory}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </div>
                      <div className="col">
                        {/* Status Select */}
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel
                            id="demo-simple-select-label"
                            error={Boolean(
                              touched.ParStatus && errors.ParStatus
                            )}
                          >
                            Status
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.ParStatus || ""}
                            onChange={(event) =>
                              setFieldValue("ParStatus", event.target.value)
                            }
                            error={Boolean(
                              touched.ParStatus && errors.ParStatus
                            )}
                          >
                            <MenuItem value="Upcoming">Upcoming</MenuItem>
                            <MenuItem value="Running">Running</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                          </Select>
                          {touched.createParStatus &&
                            errors.createParStatus && (
                              <FormHelperText error>
                                {errors.createParStatus}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="container text-center">
                    <div className="row">
                      <div className="col">
                        {/* Odds Field */}
                        <Field
                          fullWidth
                          label="Odds"
                          type="number"
                          as={TextField}
                          name="ParOdds"
                          error={Boolean(touched.ParOdds && errors.ParOdds)}
                          helperText={touched.ParOdds && errors.ParOdds}
                        />
                      </div>
                      <div className="col">
                        {/* Rating Field */}
                        <Field
                          fullWidth
                          label="Rating"
                          type="number"
                          as={TextField}
                          name="ParRating"
                          error={Boolean(touched.ParRating && errors.ParRating)}
                          helperText={touched.ParRating && errors.ParRating}
                        />
                      </div>
                      <div className="col">
                        {/* Value Field */}
                        <Field
                          fullWidth
                          label="Value"
                          type="number"
                          name="ParValue"
                          as={TextField}
                          error={Boolean(touched.ParValue && errors.ParValue)}
                          helperText={touched.ParValue && errors.ParValue}
                        />
                      </div>
                      <div className="col">
                        {/* Free Checkbox */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.IsFree}
                              name="IsFree"
                              onChange={() =>
                                setFieldValue(
                                  "IsFree",
                                  values.IsFree === 0 ? 1 : 0
                                )
                              }
                            />
                          }
                          label="isFree"
                        />
                      </div>
                      <div className="col">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="IsStar"
                              checked={values.IsStar}
                              onChange={() =>
                                setFieldValue(
                                  "IsStar",
                                  values.IsStar === 0 ? 1 : 0
                                )
                              } // Update Formik's state
                            />
                          }
                          name="star"
                          label="⭐"
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div className="col">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="Start Date and Time"
                              value={
                                values.ParStart ? dayjs(values.ParStart) : null
                              }
                              onChange={(values) =>
                                setFieldValue(
                                  "betStartDate",
                                  dayjs(values).format("YYYY-MM-DD HH:mm:ss")
                                )
                              }
                              error={
                                touched.ParStart && Boolean(errors.ParStart)
                              }
                              helperText={touched.ParStart && errors.ParStart}
                              name="ParStart"
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="container text-center">
                    <div className="row">
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
              );
            }}
          </Formik>
        </div>
      </Box>
    </article>
  );
};
export default CreateParlay;
