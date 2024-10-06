import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { TextareaAutosize, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Formik, Form, Field } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UpdatePredictions } from "../services/AllApiServices";
import { notifySuccess, notifyError } from "../tostify/msgtostify";
import { ToastContainer, toast } from "react-toastify";
import updatePreSche from "../FormikValidations/UpdatepreSche";
import FormHelperText from "@mui/material/FormHelperText";

const UpdateBet = () => {
  const location = useLocation();
  const singlePrediction = location.state;
  // console.log("singlePrediction:", singlePrediction);
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
      rating: "",
      is_free: "",
      is_tranding: "",
      prediction_value: "",
      team1_prediction: "",
      team2_predicition: "",
      team1_score: "",
      team2_score: "",
      reason: "",
      Odds: "",
      result: "",
      predicition_id: "",
    },
    validationSchema: updatePreSche, //should do
    onSubmit: async (values) => {
      console.log(" Updated values : ", values);
      try {
        const response = await UpdatePredictions(values);
        notifySuccess("Submitted Successfully!");
        resetForm();
        console.log(" Updated Prediction Form Submitted:", values);

        if (response && response.status === 200) {
          console.log("Updated Prediction successfully:");
        }
      } catch (err) {
        console.log(
          "Somethig went wrong",
          err.response ? err.response.data : err.message
        );
        notifyError("Something went wrong!!");
        resetForm();
      }
      resetForm();
    },

    validate: (values) => {
      const errors = {};
      return errors;
    },
  });

  useEffect(() => {
    if (singlePrediction) {
      const timer = setTimeout(() => {
        console.log(singlePrediction.rating);
        setValues({
          ...values,
          rating: `${singlePrediction.rating}`,
          is_free: `${singlePrediction.is_free}`,
          is_tranding: `${singlePrediction.is_tranding}`,
          prediction_value: `${singlePrediction.prediction_value}`,
          team1_prediction: `${singlePrediction.team1_prediction}`,
          team2_predicition: `${singlePrediction.team2_prediction}`,
          team1_score: `${singlePrediction.team1_score}`,
          team2_score: `${singlePrediction.team2_score}`,
          result: `${singlePrediction.result}`,
          Odds: `${singlePrediction.odds}`,
          reason: `${singlePrediction.reason}`,
          predicition_id: `${singlePrediction.id}`,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [singlePrediction]);
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
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <form onSubmit={handleSubmit}>
          <div className="inputs px-3">
            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <h4>Update Prediction for Perth Scorchers Winner </h4>
                </div>
              </div>
            </div>

            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <label className="float-start">Rating:</label>
                  <TextField
                    fullWidth
                    type="text"
                    value={values.rating}
                    name="rating"
                    onChange={(e) => {
                      setFieldValue("rating", e.target.value);
                      console.log({ rating: e.target.value });
                    }}
                    error={Boolean(touched.rating && errors.rating)}
                    helperText={touched.rating && errors.rating}
                    onBlur={handleBlur}
                  />
                </div>
                <div class="col">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.is_free === "1"}
                        onChange={() =>
                          setFieldValue(
                            "is_free",
                            values.is_free === "1" ? "0" : "1"
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
                        checked={values.is_tranding === "1"}
                        onChange={() =>
                          setFieldValue(
                            "is_tranding",
                            values.is_tranding === "1" ? "0" : "1"
                          )
                        }
                      />
                    }
                    label="is Trending"
                  />
                </div>
                <div class="col">
                  <label className="float-start">Prediction Value: </label>
                  <TextField
                    fullWidth
                    value={values.prediction_value}
                    name="prediction_value"
                    onChange={(e) => {
                      setFieldValue("prediction_value", e.target.value);
                      console.log({ prediction_value: e.target.value });
                    }}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.prediction_value && errors.prediction_value
                    )}
                    helperText={
                      touched.prediction_value && errors.prediction_value
                    }
                  />
                </div>
              </div>
              <br></br>
            </div>
            <div class="container text-center ">
              <div class="row">
                <div className="col">
                  <label className="float-start">Team 1 Prediction : </label>
                  <TextField
                    fullWidth
                    value={values.team1_prediction}
                    name="team1_prediction"
                    onChange={(e) => {
                      setFieldValue("team1_prediction", e.target.value);
                      console.log({ team1_prediction: e.target.value });
                    }}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.team1_prediction && errors.team1_prediction
                    )}
                    helperText={
                      touched.team1_prediction && errors.team1_prediction
                    }
                  />
                </div>
                <div class="col">
                  <label className="float-start">Team 2 Prediction : </label>
                  <TextField
                    fullWidth
                    value={values.team2_predicition}
                    name="team2_predicition"
                    onChange={(e) => {
                      setFieldValue("team2_predicition", e.target.value);
                      console.log({ team2_predicition: e.target.value });
                    }}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.team2_predicition && errors.team2_predicition
                    )}
                    helperText={
                      touched.team2_predicition && errors.team2_predicition
                    }
                  />
                </div>
              </div>
            </div>
            <br></br>
            <div class="container text-center ">
              <div class="row">
                <div className="col">
                  <label className="float-start">Team 1 Score : </label>
                  <TextField
                    fullWidth
                    value={values.team1_score}
                    name="team1_score"
                    onChange={(e) => {
                      setFieldValue("team1_score", e.target.value);
                      console.log({ team1_score: e.target.value });
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.team1_score && errors.team1_score)}
                    helperText={touched.team1_score && errors.team1_score}
                  />
                </div>
                <div className="col">
                  <label className="float-start">Team 2 Score : </label>
                  <TextField
                    fullWidth
                    value={values.team2_score}
                    name="team2_score"
                    onChange={(e) => {
                      setFieldValue("team2_score", e.target.value);
                      console.log({ team2_score: e.target.value });
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.team2_score && errors.team2_score)}
                    helperText={touched.team2_score && errors.team2_score}
                  />
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col">
                  <label className="float-start">Odds Value : </label>
                  <TextField
                    fullWidth
                    value={values.Odds}
                    name="Odds"
                    onChange={(e) => {
                      setFieldValue("Odds", e.target.value);
                      console.log({ Odds: e.target.value });
                    }}
                    onBlur={handleBlur}
                    error={Boolean(touched.Odds && errors.Odds)}
                    helperText={touched.Odds && errors.Odds}
                  />
                </div>
                <div className="col">
                  <label className="float-start">Result: </label>
                  <FormControl
                    sx={{ width: "100%" }}
                    error={touched.result && Boolean(errors.result)}
                  >
                    <InputLabel id="result-select-label" />
                    <Select
                      labelId="result-select-label"
                      id="demo-simple-select"
                      value={values.result}
                      onChange={(e) => setFieldValue("result", e.target.value)}
                    >
                      <MenuItem value="No Result">No Result</MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                    {touched.result && errors.result && (
                      <FormHelperText>{errors.result}</FormHelperText>
                    )}
                  </FormControl>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label float-start"
                  >
                    Reason:
                  </label>
                  <TextareaAutosize
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    name="headlineTitle"
                    value={values.reason}
                    onChange={(e) => {
                      setFieldValue("reason", e.target.value);
                      console.log({ reason: e.target.value });
                    }}
                    rows="3"
                    sx={{ width: "50%" }}
                    error={touched.reason && Boolean(errors.reason)}
                  />
                  {touched.reason && errors.reason ? (
                    <div className="text-danger">{errors.reason}</div>
                  ) : null}
                </div>
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
                  Save Prediction
                </Button>
              </div>
              <div className="col">
                <Button
                  variant="contained"
                  type="cancel"
                  sx={{
                    textTransform: "none",
                    fontSize: 15,
                    backgroundColor: "red",
                  }}
                  onClick={() => {
                    navigate("/predections/predectionslist");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Box>
    </article>
  );
};
export default UpdateBet;
