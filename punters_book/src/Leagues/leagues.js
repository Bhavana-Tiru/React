import * as React from "react";
import leagueValidations from "../FormikValidations/leaguesSchema";
import "./leagues.scss";
import Box from "@mui/material/Box";
import SideNavbar from "../SideNavbar/sidenavbar";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { Formik, Form, Field } from "formik";
import { fetchCategoryNames } from "../Categories/onlyCatName";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { addLeague, getLeagues } from "../services/AllApiServices";
const VisuallyHiddenInput = styled("input")({
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

const Leagues = () => {
  const [leagueValues, setleagueValues] = useState([]);
  const [CategoryNames, setCategoryNames] = useState([]);
  const [error, setError] = useState(null);
  const [catId, setcatId] = useState("");
  let cat_id;

  const fetchedLeague = async () => {
    try {
      const response = await getLeagues();
      console.log(" League values:", response);
      setleagueValues(response.leagues);

      if (response && response.status === 200) {
        console.log("Category data  :", response);
      }
    } catch (err) {
      console.log(
        "Somethig went wrong",
        err.response ? err.response.data : err.message
      );
    }
  };

  // dropdown category values
  const loadCategoryNames = async () => {
    try {
      const names = await fetchCategoryNames();
      setCategoryNames(names);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    fetchedLeague();
    loadCategoryNames();
    // setcatId;
  }, [fetchedLeague, catId]);

  return (
    <article>
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <div className="leaguesinputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Add Leagues</h4>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{
              leagueName: "",
              categoryDetails: "",
              leagueLogo: null,
              colorPicker: "",
              category_id: null,
            }}
            validationSchema={leagueValidations}
            onSubmit={async (values, { resetForm }) => {
              // Handle form submission
              try {
                const response = await addLeague(values);
                if (response && response.status === 200) {
                  console.log("League created successfully:", response.values);
                }
                resetForm();
              } catch (err) {
                console.log(
                  "Somethig went wrong",
                  err.response ? err.response.data : err.message
                );
                resetForm();
              }
              // console.log("Form Submitted:", values);
              console.log("Form Submitted:", values);
              // const enteredValues = {
              //   id: leagueValues.length + 1,
              //   leagueName: values.leagueName,
              //   categoryDetails: values.categoryDetails,
              //   leagueLogo: values.leagueLogo,
              //   colorPicker: values.colorPicker,
              //   category_id: cat_id,
              // };

              // setleagueValues([...leagueValues, enteredValues]);
              resetForm();
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col">
                    <Field
                      fullWidth
                      label="League name"
                      type="text"
                      name="leagueName"
                      as={TextField}
                      id="fullWidth"
                      error={touched.leagueName && !!errors.leagueName}
                      helperText={touched.leagueName && errors.leagueName}
                    />
                  </div>
                  <div className="col">
                    <FormControl
                      sx={{ width: "100%" }}
                      type="text"
                      error={
                        touched.categoryDetails &&
                        Boolean(errors.categoryDetails)
                      }
                    >
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.categoryDetails}
                        label="Options"
                        onChange={async (event) => {
                          const selectedCategoryName = event.target.value; // Get the selected category name
                          const selectedCategory = CategoryNames.find(
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
                              "categoryDetails",
                              selectedCategory.name
                            ); // Update category details
                          }
                        }}
                      >
                        {CategoryNames.map((data, index) => (
                          <MenuItem value={data.name} key={index}>
                            {data.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.categoryDetails && !!errors.categoryDetails && (
                        <FormHelperText>
                          {errors.categoryDetails}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="col">
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      sx={{ textTransform: "none", fontSize: 15 }}
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      League Logo
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(event) =>
                          console.log(
                            setFieldValue(
                              "leagueLogo",
                              event.currentTarget.files[0]
                            )
                          )
                        }
                        single
                      />
                    </Button>
                    {touched.leagueLogo && errors.leagueLogo && (
                      <p style={{ color: "red" }}>{errors.leagueLogo}</p>
                    )}
                  </div>

                  <div className="col">
                    <label htmlFor="colorPicker">Pick a Color:</label>
                    <Field
                      name="colorPicker"
                      type="color"
                      onChange={(event) => {
                        setFieldValue("colorPicker", event.target.value); // Set color value
                      }}
                    />
                    {touched.colorPicker && errors.colorPicker && (
                      <div style={{ color: "red" }}>{errors.colorPicker}</div>
                    )}
                  </div>
                  {/* {touched.colorPicker && errors.colorPicker && (
                    <p style={{ color: "red", paddingLeft: "70px" }}>
                      {errors.colorPicker}
                    </p>
                  )} */}
                  <div className="col">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ textTransform: "none", fontSize: 15 }}
                    >
                      Add League
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* <div className="leaguestable">
          <h5> Table</h5>
        </div> */}
      </Box>
      <br></br>
      <Box sx={{ width: "100%", paddingLeft: 40, marginTop: 4 }}>
        <div className="table">
          <div className="inputs px-3">
            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <h4 className="text-start"> Options List</h4>
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
                      style={{ marginBottom: "20px", width: "300px" }}
                    />

                    {/* Step 5: Render the table */}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>League Name</TableCell>
                            <TableCell>Logo </TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Color </TableCell>
                            {/* <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {leagueValues.length > 0 ? (
                            leagueValues.map((entries) => (
                              <TableRow key={entries.id}>
                                <TableCell>{entries.id}</TableCell>
                                <TableCell>{entries.name}</TableCell>
                                <TableCell>
                                  <img
                                    src={entries.icon}
                                    alt={entries.icon}
                                    width="100"
                                    height="100"
                                  />
                                </TableCell>
                                <TableCell>{entries.category.name}</TableCell>
                                <TableCell>
                                  {" "}
                                  <div
                                    style={{
                                      width: "100px",
                                      height: "25px",
                                      border: "solid 1px black",
                                      // borderColor: "black",
                                      backgroundColor: entries.color, // Use the color selected by the user
                                    }}
                                  />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </article>
  );
};
export default Leagues;
