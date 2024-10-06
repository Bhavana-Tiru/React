import * as React from "react";
// import { useState } from "react";
import { Formik, Form, Field } from "formik";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import profileSchema from "../FormikValidations/profileConfi";
//profile: 1.Name, 2.Email, 3.Status, 4.Type:, 5.Username, 6.Phone, 7.LastLoggedin date:, 8.Address:
//Change Pswrd: Old Pswrd(i/p), new pswrd(i/p), confirm pswrd, Update Password(button)

const Profile = () => {
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
        </div>
      </Box>
      <br></br>

      <Box sx={{ width: "100%", paddingLeft: 40 }}>
        <div className="inputs px-3">
          <div class="container text-center">
            <div className="row">
              <div className="col">
                <h4>Change Password</h4>
              </div>
            </div>
            <Formik
              initialValues={{
                oldPswrd: "",
                newPswrd: "",
                confirmPswrd: "",
              }}
              validationSchema={profileSchema}
              onSubmit={(values) => {
                // Handle form submission
                console.log("Form Submitted:", values);
              }}
            >
              {({ values, handleBlur, handleChange, errors, touched }) => (
                <Form>
                  <div class="row">
                    <div class="col">
                      <Field
                        fullWidth
                        label="Old Password"
                        name="oldPswrd"
                        type="password"
                        as={TextField}
                        id="outlined-basic"
                        sx={{ paddingBottom: "10px", position: "relative" }}
                        error={touched.oldPswrd && !!errors.oldPswrd}
                        helperText={touched.oldPswrd && errors.oldPswrd}
                      />
                      <Field
                        fullWidth
                        label="New Password"
                        as={TextField}
                        name="newPswrd"
                        type="password"
                        id="outlined-basic"
                        sx={{ paddingBottom: "16px" }}
                        error={touched.newPswrd && !!errors.newPswrd}
                        helperText={touched.newPswrd && errors.newPswrd}
                      />
                      <Field
                        fullWidth
                        label="Confirm Password"
                        as={TextField}
                        name="confirmPswrd"
                        type="password"
                        // value={values.confirmPswrd}
                        onChange={handleChange}
                        id="fullWidth"
                        sx={{ paddingBottom: "16px" }}
                        error={touched.confirmPswrd && !!errors.confirmPswrd}
                        helperText={touched.confirmPswrd && errors.confirmPswrd}
                      />
                      <br></br>
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col">
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ textTransform: "none", fontSize: 15 }}
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Box>
    </article>
  );
};
export default Profile;
