import * as React from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import Box from "@mui/material/Box";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Formik, Form, Field } from "formik";
import storySchema from "../FormikValidations/AddStory";
import FormHelperText from "@mui/material/FormHelperText";

const AddStory = () => {
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

  const [storyType, setstoryType] = useState("");

  const handldeTypeChange = (event) => {
    setstoryType(event.target.value);
  };

  //Title, header, summary
  return (
    <article>
      <SideNavbar />
      <Box sx={{ width: "100%", paddingLeft: 40, paddingTop: 10 }}>
        <div className="inputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Add Trending / What's New Story</h4>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              storyType: "",
              storyTitle: "",
              storyImage: null,
              storyHeader: "",
              summary: "",
            }}
            validationSchema={storySchema}
            onSubmit={(values) => {
              // Handle form submission
              console.log("Form Submitted:", values);
            }}
          >
            {({ errors, touched, handleBlur, setFieldValue }) => (
              <Form>
                <div class="container text-center ">
                  <div class="row">
                    <div class="col">
                      <FormControl
                        sx={{ width: "100%" }}
                        error={touched.storyType && Boolean(errors.storyType)}
                      >
                        <InputLabel id="story-select-label">
                          Story Type
                        </InputLabel>
                        <Select
                          labelId="story-select-label"
                          id="story-select"
                          // name="storyType"
                          value={storyType}
                          // label="Category"
                          // onChange={handldeTypeChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem value="option1">Trending</MenuItem>
                          <MenuItem value="option2">What's New</MenuItem>
                        </Select>
                        {touched.storyType && errors.storyType && (
                          <FormHelperText>{errors.storyType}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className="col float-start">
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        sx={{ textTransform: "none", fontSize: 15 }}
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Image
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(event) =>
                            setFieldValue(
                              "storyImage",
                              event.currentTarget.files[0]
                            )
                          }
                          multiple
                        />
                      </Button>
                      {touched.storyImage && errors.storyImage && (
                        <p style={{ color: "red", paddingLeft: "200px" }}>
                          {errors.storyImage}
                        </p>
                      )}
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col">
                      <Field
                        fullWidth
                        label="Title"
                        as={TextField}
                        name="storyTitle"
                        id="fullWidth"
                        error={touched.storyTitle && !!errors.storyTitle}
                        helperText={touched.storyTitle && errors.storyTitle}
                        onBlur={handleBlur}
                      />
                    </div>
                    <br></br>
                    <div className="col">
                      <Field
                        fullWidth
                        label="Header"
                        as={TextField}
                        name="storyHeader"
                        id="fullWidth"
                        error={touched.storyHeader && !!errors.storyHeader}
                        helperText={touched.storyHeader && errors.storyHeader}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="textField">
                      <br></br>
                      <label
                        for="exampleFormControlTextarea1"
                        className="form-label float-start"
                      >
                        Summary:
                      </label>
                      <Field
                        class="form-control"
                        as="textarea"
                        name="summary"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        width="50%"
                        error={touched.summary && !!errors.summary}
                        onBlur={handleBlur}
                      />
                      {touched.summary && errors.summary && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.summary}
                        </div>
                      )}
                    </div>
                    <div className="col">
                      <br></br>
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ textTransform: "none", fontSize: 15 }}
                      >
                        Save
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
export default AddStory;
