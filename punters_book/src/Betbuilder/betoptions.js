import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import betoptSchema from "../FormikValidations/betOptShe";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchCategoryNames } from "../Categories/onlyCatName";
import { categoryOption, getCategories } from "../services/AllApiServices";

const BetOptions = () => {
  const [BetOptionName, setBetOptionName] = useState([]);
  const [CategoryNames7, setCategoryNames7] = useState([]);
  const [error, setError] = useState(null);
  let cat_id7;

  const fetchCategory7 = React.useCallback(async () => {
    try {
      const response = await getCategories();
      console.log(" Prediction values:", response);
      // const optionWithStatus = response.options.map((option) => ({
      //   ...option,
      //   status: option.status || "enable", // Set initial status
      // }));
      // setBetOptionName(optionWithStatus);

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

  const loadCategoryNames7 = async () => {
    try {
      const names = await fetchCategoryNames();
      setCategoryNames7(names);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchCategory7();
    loadCategoryNames7();
  }, [fetchCategory7]);

  return (
    <article>
      {error && <p>{error}</p>}
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <div className="inputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Category-Options</h4>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{
              betOptCatName: "",
              betOptCategoryId: "",
              betoptionName: "",
            }}
            validationSchema={betoptSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log("Form Submitted:", values);
              try {
                const response = await categoryOption(values);
                resetForm();
                if (response && response.status === 200) {
                  console.log("Category created successfully:");
                  // const newCategory = {
                  //   id: categoryValues.length + 1,
                  //   categoryName: values.categoryName,
                  //   categoryImage: values.categoryImage,
                  // };
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
          >
            {({ values, errors, touched, setFieldValue }) => {
              console.log("Errors:", errors);
              return (
                <Form>
                  <div class="container text-center ">
                    <div class="row">
                      <div className="col">
                        <Field
                          fullWidth
                          label="Option Name"
                          as={TextField}
                          name="betoptionName"
                          id="fullWidth"
                          error={
                            touched.betoptionName && !!errors.betoptionName
                          }
                          helperText={
                            touched.betoptionName && errors.betoptionName
                          }
                        />
                      </div>
                      <div className="col">
                        <FormControl
                          sx={{ width: "100%" }}
                          error={Boolean(
                            touched.betOptCatName && errors.betOptCatName
                          )}
                        >
                          <InputLabel
                            id="demo-simple-select-label"
                            // name="betOptCategory"
                            // error={
                            //   touched.betOptCategory && !!errors.betOptCategory
                            // }
                            // helperText={
                            //   touched.betOptCategory && errors.betOptCategory
                            // }
                          >
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="betOptCatName"
                            value={values.betOptCatName}
                            label="Category"
                            onChange={(event) => {
                              const selectedCategoryOption = event.target.value; // Get the selected category name
                              const selectedCatOption = CategoryNames7.find(
                                (cat1) => cat1.name === selectedCategoryOption
                              ); // Find the corresponding category object

                              if (selectedCatOption) {
                                console.log(
                                  "Selected Category Name:",
                                  selectedCatOption.name
                                );
                                // cat_id7 = selectedCatOption.id;
                                console.log(
                                  "Selected Category ID:",
                                  selectedCatOption.id
                                );

                                setFieldValue(
                                  "betOptCategoryId",
                                  selectedCatOption.id
                                );

                                setFieldValue(
                                  "betOptCatName",
                                  selectedCatOption.name
                                ); // Update category details
                              }
                            }}
                          >
                            {CategoryNames7.map((data, index) => (
                              <MenuItem value={data.name} key={index}>
                                {data.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.betoptionName && errors.betoptionName && (
                            <FormHelperText>
                              {errors.betoptionName}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div class="container text-center ">
                    <div class="row">
                      <div className="col">
                        <Button
                          variant="contained"
                          type="submit" // Correct type for form submission
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
      <br></br>
      {/* Part-2 */}
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
                      style={{ marginBottom: "20px", width: "500px" }}
                    />

                    {/* Step 5: Render the table */}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Option Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {BetOptionName.length > 0 ? (
                            BetOptionName.map((option) => (
                              <TableRow key={option.id}>
                                <TableCell>{option.id}</TableCell>
                                <TableCell>{option.name}</TableCell>
                                <TableCell>{option.category.name}</TableCell>
                                <TableCell>{}</TableCell>
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
export default BetOptions;
