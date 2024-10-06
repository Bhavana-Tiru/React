import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFormik, Field } from "formik";
import { useState, useEffect } from "react";
// import { Formik, Form, Field } from "formik";
import { Button, TextField } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { fetchOptionNames } from "./getOptions";
import FormHelperText from "@mui/material/FormHelperText";

import {
  conditionButton,
  createConditionSGM,
  deleteButton,
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
import UpdateAddCondiSche from "../FormikValidations/UpdateAddCondiSche";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const UpdateAddContion = (props) => {
  const loaction1 = useLocation();
  const betcondition = loaction1.state;
  console.log("betcondition: ", betcondition);
  const [optionId, setoptionId] = useState(null);
  const [options, setoptions] = useState([]);
  const [conditionData, setconditionData] = useState([]);
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
      betbuilder_id: "",
      option_id: "",
      title: "",
      rating: "",
      status: "Idle",
    },
    validationSchema: UpdateAddCondiSche,
    onSubmit: async (values, { resetForm }) => {
      // console.log("betbuilder_id:  ", betbuilder_id);
      console.log(" Updated values : ", values);
      try {
        const response = await createConditionSGM(values);
        resetForm();
        console.log(" Added Condition inside values:", values);
        fetchConditions();

        if (response && response.status === 200) {
          console.log("Updated Prediction successfully:");
        }
      } catch (err) {
        console.log(
          "Somethig went wrong",
          err.response ? err.response.data : err.message
        );
        resetForm();
      }
      resetForm();
    },
  });

  //for options
  const loadOptions = async () => {
    try {
      const names = await fetchOptionNames();
      setoptions(names);
    } catch (err) {
      setError(err.message);
    }
  };

  //deleteButton
  const deleteButtonClick = async (id) => {
    console.log("delete selected id: ", id);
    try {
      await deleteButton(id);
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
      const response = await conditionButton(betcondition);
      console.log(" Condition values:", response.conditions);
      const condition = response.conditions.map((condi) => condi);
      setconditionData(condition);
      setoptionId(betcondition);
      console.log("OptionId: ", optionId);
      console.log(conditionData);

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
    fetchConditions();
  }, []);

  return (
    <div>
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }} noValidate>
        <div className="table">
          <div className="inputs px-3">
            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <h4 className="text-start">Conditions To BetBuilder</h4>
                </div>
                <div className="col">
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", fontSize: 15 }}
                    onClick={() => navigate("/sgm/sgmoptions")}
                  >
                    Create SGM
                  </Button>
                </div>
              </div>
              <hr></hr>
              <form onSubmit={handleSubmit}>
                <div class="container text-center ">
                  <div class="row">
                    <div class="col">
                      <label className="float-start">Title: </label>
                      <TextField
                        fullWidth
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={(e) => {
                          setFieldValue("title", e.target.value);
                          console.log({ title: e.target.value });
                          setFieldValue("betbuilder_id", optionId);
                        }}
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                        onBlur={handleBlur}
                        id="outlined-basic"
                      />
                    </div>
                    <div class="col">
                      <label className="float-start">Option: </label>
                      <FormControl
                        sx={{ width: "100%" }}
                        error={touched.option_id && Boolean(errors.option_id)}
                      >
                        <InputLabel id="demo-simple-select-label" />

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="option_id"
                          // value={values.option_id} // Use optional chaining to avoid errors
                          onChange={(event) => {
                            const selectedoption = event.target.value;
                            const selectedTotalOption = options.find(
                              (opt) => opt.name === selectedoption
                            );

                            if (selectedoption) {
                              setFieldValue(
                                "option_id",
                                selectedTotalOption.id
                              );
                            }

                            // Set the category name in Formik's state

                            console.log("option_id:", selectedoption);
                          }}
                        >
                          {options.map((data, index) => (
                            <MenuItem value={data.name} key={index}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.option_id && errors.option_id && (
                          <FormHelperText>{errors.option_id}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className="col">
                      <label className="float-start">Rating: </label>
                      <TextField
                        fullWidth
                        value={values.rating}
                        name="rating"
                        type="text"
                        onChange={(event) => {
                          setFieldValue("rating", event.target.value);
                          console.log({ rating: event.target.value });
                        }}
                        error={Boolean(touched.rating && errors.rating)}
                        helperText={touched.rating && errors.rating}
                        id="outlined-basic"
                      />
                    </div>
                    <div className="col">
                      <label className="float-start">Status: </label>
                      <FormControl
                        sx={{ width: "100%" }}
                        error={touched.status && Boolean(errors.status)}
                      >
                        <InputLabel id="demo-simple-select-label" />
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="status"
                          value={values.status}
                          onChange={(e) => {
                            setFieldValue("status", e.target.value);
                          }}
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
                        sx={{ textTransform: "none", fontSize: 15 }}
                        // onClick={()=>{}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        {conditionData.length > 0 ? (
                          conditionData.map((condiValues) => (
                            <TableRow key={condiValues.id}>
                              <TableCell>{condiValues.title}</TableCell>
                              <TableCell>{condiValues.rating}</TableCell>
                              <TableCell>{condiValues.status}</TableCell>
                              <TableCell>{condiValues.name}</TableCell>
                              <TableCell>
                                <button
                                  style={{
                                    // borderRadius: "15px",
                                    width: "80px",
                                    height: "30px",
                                    backgroundColor: "red",
                                    border: "none",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    deleteButtonClick(condiValues.id);
                                  }}
                                >
                                  Delete
                                </button>
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
              </form>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default UpdateAddContion;
