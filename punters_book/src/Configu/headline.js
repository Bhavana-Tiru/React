import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import headlineSchema from "../FormikValidations/HeadlinShe";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

//Category(i/p), title(text box large), buuton(Add Headline)

const Headline = () => {
  const [headValues, setheadValues] = React.useState([]);
  const getCurrentDateTime = () => {
    const current = new Date();
    return current.toLocaleString(); // Get date and time in a readable format
  };
  return (
    <article>
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <div className="inputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Add Headline</h4>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              headlineCategory: "",
              headlineTitle: "",
            }}
            validationSchema={headlineSchema}
            onSubmit={(values, { resetForm }) => {
              // Handle form submission
              console.log("Form Submitted:", values);
              const enteredHead = {
                id: headValues.length + 1,
                headlineTitle: values.headlineTitle,
                headlineCategory: values.headlineCategory,
                headlineDateTime: getCurrentDateTime(),
              };
              setheadValues([...headValues, enteredHead]);
              resetForm();
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <div class="container text-center ">
                  <div class="row">
                    <div class="col align-items-center">
                      <Field
                        fullWidth
                        as={TextField}
                        name="headlineCategory"
                        label="Category"
                        id="outlined-basic"
                        error={
                          touched.headlineCategory && !!errors.headlineCategory
                        }
                        helperText={
                          touched.headlineCategory && errors.headlineCategory
                        }
                      />
                    </div>
                    <div className="col">
                      <label
                        for="exampleFormControlTextarea1"
                        className="form-label float-start"
                      >
                        Title:
                      </label>
                      <Field
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        name="headlineTitle"
                        // onChange={handleChange}
                        as="textarea"
                        rows="3"
                        width="50%"
                        error={touched.headlineTitle && !!errors.headlineTitle}
                      />{" "}
                      {touched.headlineTitle && errors.headlineTitle && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.headlineTitle}
                        </div>
                      )}
                    </div>
                    <div className="col">
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ textTransform: "none", fontSize: 15 }}
                      >
                        Add Headline
                      </Button>
                    </div>
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
                  <h4 className="text-start">HeadLine</h4>
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
                            <TableCell> Title</TableCell>
                            <TableCell> Updated</TableCell>
                            <TableCell> Status</TableCell>
                            <TableCell> Action</TableCell>
                            <TableCell>Edit</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {headValues.length > 0 ? (
                            headValues.map((entries) => (
                              <TableRow key={entries.id}>
                                <TableCell>{entries.id}</TableCell>
                                <TableCell>
                                  {entries.headlineCategory}
                                </TableCell>
                                <TableCell>{entries.headlineTitle}</TableCell>
                                <TableCell>
                                  {entries.headlineDateTime}
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
export default Headline;
