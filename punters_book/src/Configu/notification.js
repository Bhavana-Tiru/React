import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import notifiSchema from "../FormikValidations/ConNotifiShe";
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

const Configu = () => {
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

  const [notifiValues, setnotifiValues] = useState([]);

  // const handldeUserChange = (event) => {
  //   setuserGroup(event.target.value);
  // };

  return (
    <article>
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <div className="inputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Send Notification</h4>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{
              notifiTitle: "",
              notifiUser: "",
              notifiImage: null,
              notifiSummary: "",
            }}
            validationSchema={notifiSchema}
            onSubmit={(values, { resetForm }) => {
              // Handle form submission
              console.log("Form Submitted:", values);
              const enterednotifi = {
                id: notifiValues.length + 1,
                notifiTitle: values.notifiTitle,
                notifiUser: values.notifiUser,
                notifiImage: URL.createObjectURL(values.notifiImage),
                notifiSummary: values.notifiSummary,
              };
              setnotifiValues([...notifiValues, enterednotifi]);
              resetForm();
            }}
          >
            {({ values, setFieldValue, errors, touched, resetForm }) => (
              <Form>
                <div class="container text-center ">
                  <div class="row">
                    <div className="col">
                      <Field
                        fullWidth
                        as={TextField}
                        name="notifiTitle"
                        label="Title"
                        id="fullWidth"
                        error={touched.notifiTitle && !!errors.notifiTitle}
                        helperText={touched.notifiTitle && errors.notifiTitle}
                      />
                    </div>
                    <div class="col">
                      <FormControl
                        sx={{ width: "100%" }}
                        error={touched.notifiUser && Boolean(errors.notifiUser)}
                      >
                        <InputLabel id="demo-simple-select-label">
                          User Group
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.notifiUser}
                          label="Category"
                          onChange={(event) => {
                            setFieldValue("notifiUser", event.target.value);
                          }}
                        >
                          <MenuItem value="All User">All User</MenuItem>
                          <MenuItem value="Registered Users">
                            Registered Users
                          </MenuItem>
                          <MenuItem value="Guest Users">Guest Users</MenuItem>
                          <MenuItem value="optiPremium Userson3">
                            Premium Users
                          </MenuItem>
                        </Select>
                        {touched.notifiUser && errors.notifiUser && (
                          <FormHelperText>{errors.notifiUser}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </div>
                </div>
                <br></br>
                <div class="container text-center ">
                  <div className="row">
                    <div className="col">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Summary:
                      </label>
                      <Field
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        name="notifiSummary"
                        as="textarea"
                        rows="3"
                        width="50%"
                        error={touched.notifiSummary && !!errors.notifiSummary}
                      />{" "}
                      {touched.notifiSummary && errors.notifiSummary && (
                        <div
                          className="error"
                          style={{ color: "red", paddingLeft: "20px" }}
                        >
                          {errors.notifiSummary}
                        </div>
                      )}
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
                        Notification Image
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(event) =>
                            setFieldValue(
                              "notifiImage",
                              event.currentTarget.files[0]
                            )
                          }
                          multiple
                        />
                      </Button>
                      {touched.notifiImage && errors.notifiImage && (
                        <p style={{ color: "red", paddingLeft: "150px" }}>
                          {errors.notifiImage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="container text-center ">
                  <div className="row">
                    <div className="col">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => resetForm()}
                      >
                        Reset
                      </button>
                    </div>
                    <div className="col">
                      <button type="submit" class="btn btn-primary">
                        Send Notification
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
      {/* Part-2 */}
      <br></br>
      <Box sx={{ width: "100%", paddingLeft: 40, marginTop: 4 }}>
        <div className="table">
          <div className="inputs px-3">
            <div class="container text-center ">
              <div class="row">
                <div class="col">
                  <h4 className="text-start">Notification</h4>
                </div>

                <div>
                  <div style={{ padding: "20px" }}>
                    {/* Step 4: Render the search bar */}
                    <TextField
                      label="Search"
                      variant="outlined"
                      // value={searchQuery}
                      // onChange={handleSearch}
                      fullWidth
                      style={{ marginBottom: "20px" }}
                    />

                    {/* Step 5: Render the table */}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>User Group</TableCell>
                            <TableCell> Image</TableCell>
                            <TableCell> Summary</TableCell>
                            <TableCell> Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {notifiValues.length > 0 ? (
                            notifiValues.map((entries) => (
                              <TableRow key={entries.id}>
                                <TableCell>{entries.id}</TableCell>
                                <TableCell>{entries.notifiTitle}</TableCell>
                                <TableCell>{entries.notifiUser}</TableCell>
                                <TableCell>
                                  {" "}
                                  <img
                                    src={entries.notifiImage}
                                    alt={entries.notifiImage}
                                    width="100"
                                    height="100"
                                  />
                                </TableCell>
                                <TableCell>{entries.notifiSummary}</TableCell>
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
export default Configu;
