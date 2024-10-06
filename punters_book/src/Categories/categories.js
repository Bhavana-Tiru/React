import "./categories.scss";
import * as React from "react";
import { useState } from "react";
// import { useState } from "react";
import SideNavbar from "../SideNavbar/sidenavbar";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";

import {
  buttonAction,
  createCategory,
  deleteCategoryButton,
  UpdateCategory,
} from "../services/AllApiServices";
import { getCategories } from "../services/AllApiServices";
import { notifySuccess, notifyError } from "../tostify/msgtostify";
import { Bounce } from "react-toastify";

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

const validationSchema = Yup.object({
  categoryName: Yup.string()
    .required("Category Name is required")
    .min(3, "Category Name must be at least 3 characters"),
  categoryImage: Yup.mixed().required("Category Image is required"),
});

const UpdateCateValidation = Yup.object({
  updateCatName: Yup.string()
    .required("Category Name is required")
    .min(3, "Category Name must be at least 3 characters"),
  updateCatImg: Yup.mixed().required("Category Image is required"),
});

//start
const Categories = () => {
  const [error, setError] = useState(null);
  const [categoryValues, setcategoryValues] = React.useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategory, setCurrentCategory] = React.useState(null);
  //for id
  const [currentId, setcurrentId] = React.useState();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //update popover

  const fetchCategories = React.useCallback(async () => {
    try {
      const response = await getCategories();
      console.log(" Category values:", response);
      const categoriesWithStatus = response.categories.map((category) => ({
        ...category,
        status: category.status || "enable", // Set initial status
      }));
      setcategoryValues(categoriesWithStatus);

      if (response && response.status === 200) {
        console.log("Category data  :", response);
      }
    } catch (err) {
      console.log(
        "Somethig went wrong",
        err.response ? err.response.data : err.message
      );
    }
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Open the Popover
  const handleClick = (event, id, category) => {
    console.log("Clicked item ID:", id);
    // alert(" Are you sure you want to proceed?");
    setAnchorEl(event.currentTarget);
    setCurrentCategory(category);
    setcurrentId(id);
  };

  // Close the Popover
  const handleNoClose = () => {
    notifyError();
    setAnchorEl(null);
  };

  const handleYesClose = async (id) => {
    if (categoryValues !== null) {
      console.log("Confirmed Action for ID:", id);
      try {
        const response = await buttonAction(id);
        notifySuccess();
        setAnchorEl(null);
        await fetchCategories();
        if (response.status === 200) {
        } else if (response.status === 429) {
          console.error("Too many requests, retrying...");
          await sleep(2000); // wait 2 seconds before retrying
          await handleYesClose(id); // retry the action
          notifyError("Please try after some time!");
        }
      } catch (err) {
        console.error("Error performing action:", err);
        notifyError();
      }
    }
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  //deletecategory
  const deletecategory = async (id) => {
    console.log("delete category id: ", id);
    try {
      await deleteCategoryButton(id); //here is bet delete button
      console.log("category deleted: ", id);
      fetchCategories();
      notifySuccess();
    } catch (err) {
      setError(err.message);
      notifyError();
      console.log(" Category deleted button err: ", err.message);
    }
  };

  //Update popover
  const [anchorElC, setAnchorElC] = React.useState(null);
  const [conditionIdC, setconditionIdC] = React.useState();
  const [UpCategoryName, setUpcategoryName] = React.useState();

  const openC = Boolean(anchorElC);
  const popoverIdC = openC ? "simple-popover" : undefined;

  const handleCateClose = () => {
    notifyError();
    setAnchorElC(null);
    setconditionIdC(null); // Reset selected row when popover closes
  };

  const editPopover = (event, name, image, id) => {
    console.log("Category id:", id);
    console.log("Category name:", name);
    console.log("Category img:", image);
    setAnchorElC(event.currentTarget);
    setconditionIdC(id);
    setUpcategoryName(name);
  };

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
        <div className="inputs px-3">
          <div class="container text-center ">
            <div class="row">
              <div class="col">
                <h4>Add Category</h4>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              categoryName: "",
              categoryImage: null,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              // Handle form submission
              try {
                const response = await createCategory(values);
                if (response && response.status === 200) {
                  console.log("Category created successfully:");
                  const newCategory = {
                    id: categoryValues.length + 1,
                    categoryName: values.categoryName,
                    categoryImage: values.categoryImage,
                  };
                }
                const buttonResponse = await buttonAction();
                if (buttonResponse.status === 200) {
                  console.log(
                    "Button created successfully: ",
                    buttonResponse.data
                  );
                }
                resetForm();
              } catch (err) {
                console.log(
                  "Somethig went wrong",
                  err.response ? err.response.data : err.message
                );
                resetForm();
              }
              console.log("Form Submitted:", values);
              // setcategoryValues([...categoryValues, newCategory]);
              resetForm();
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <div class="container text-center ">
                    <div className="row">
                      <div className="col">
                        <Field
                          id="outlined-basic"
                          name="categoryName"
                          label="Category Name"
                          variant="outlined"
                          as={TextField}
                          style={{ color: "black" }}
                          error={touched.categoryName && !!errors.categoryName}
                          helperText={
                            touched.categoryName && errors.categoryName
                          }
                          fullWidth
                        />
                      </div>

                      <br></br>
                      <div className="col">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          sx={{ textTransform: "none", fontSize: 15 }}
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Category Image
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(event) =>
                              setFieldValue(
                                "categoryImage",
                                event.currentTarget.files[0]
                              )
                            }
                            single
                          />
                        </Button>
                        {touched.categoryImage && errors.categoryImage && (
                          <p style={{ color: "red", paddingLeft: "70px" }}>
                            {errors.categoryImage}
                          </p>
                        )}
                      </div>
                      <br></br>
                      <div className="col">
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ textTransform: "none", fontSize: 15 }}
                        >
                          Add Category
                        </Button>
                      </div>
                    </div>
                  </div>
                </Stack>
              </Form>
            )}
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
                  <h4 className="text-start"> Category</h4>
                </div>

                <div>
                  <div style={{ padding: "20px" }}>
                    {/* Step 4: Render the search bar */}
                    <TextField
                      label="Search"
                      variant="outlined"
                      // value={searchQuery} should implement
                      // onChange={handleSearch}
                      className="float-end"
                      style={{ marginBottom: "20px", width: "500px" }}
                    />

                    {/* Step 5: Render the table */}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Update/Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {categoryValues.length > 0 ? (
                            categoryValues.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                  <img
                                    src={row.icon}
                                    alt={row.icon}
                                    width="100"
                                    height="100"
                                  />
                                </TableCell>
                                <TableCell
                                  // className="text-decoration-line-through" for InActive
                                  style={{
                                    color:
                                      row.status === "Active" ? "green" : "red",
                                    fontSize: "15px",
                                  }}
                                >
                                  <b>{row.status}</b>
                                </TableCell>
                                {row.status === "Active" ? (
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      sx={{
                                        textTransform: "none",
                                        backgroundColor: "red",
                                        fontSize: 15,
                                      }}
                                      onClick={(event) => {
                                        handleClick(event, row.id, row);
                                      }}
                                      // popovertarget
                                    >
                                      Disable
                                    </Button>
                                  </TableCell>
                                ) : (
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      sx={{
                                        textTransform: "none",
                                        // padding: "10px 0px 10px 0px",
                                        fontSize: 15,
                                      }}
                                      onClick={(event) => {
                                        handleClick(event, row.id, row);
                                      }}
                                    >
                                      Enable
                                    </Button>
                                  </TableCell>
                                )}
                                <TableCell>
                                  <div className="row">
                                    <div className="col">
                                      <Button
                                        variant="contained"
                                        sx={{
                                          textTransform: "none",
                                          padding: "10px 0px 10px 0px",
                                          fontSize: 15,
                                        }}
                                        onClick={() => {
                                          editPopover(
                                            event,
                                            row.name,
                                            row.image,
                                            row.id
                                          );
                                          //name, image, id
                                        }}
                                      >
                                        <i class="fa-solid fa-pen-to-square"></i>
                                      </Button>
                                    </div>
                                    <div className="col">
                                      <Button
                                        variant="contained"
                                        sx={{
                                          textTransform: "none",
                                          fontSize: 15,
                                          padding: "10px 0px 10px 0px",
                                          // paddingTop: "10px",
                                          // paddingBottom: "10px",
                                          backgroundColor: "red",
                                        }}
                                        onClick={() => {
                                          deletecategory(row.id);
                                        }}
                                      >
                                        <i class="fa-solid fa-trash"></i>
                                      </Button>
                                    </div>
                                  </div>
                                </TableCell>
                                {/* Confirmation Dialog */}
                                <Popover
                                  id={popoverId}
                                  open={Boolean(anchorEl)}
                                  anchorEl={anchorEl}
                                  onClose={handleNoClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                >
                                  <Box p={2}>
                                    <Typography variant="body1">
                                      Are you sure you want to proceed?
                                    </Typography>
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        handleNoClose();
                                      }}
                                    >
                                      No
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        // handleYesClose(currentId);
                                        handleYesClose(currentId);
                                      }}
                                    >
                                      Yes
                                    </Button>
                                  </Box>
                                </Popover>
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

                    {/* Update */}
                    <Popover
                      id={popoverIdC}
                      open={Boolean(anchorElC)}
                      anchorEl={anchorElC}
                      onClose={() => {
                        handleCateClose();
                      }}
                      anchorReference="anchorPosition" // Use anchorPosition to ignore element position
                      anchorPosition={{ top: 0, left: window.innerWidth / 2 }} // Center horizontally, top vertically
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      PaperProps={{
                        style: {
                          width: "80%", // Full width of the window
                          maxWidth: "80%", // Restrict to window's width
                          marginTop: 0, // Adjust position to top of the window
                        },
                      }}
                    >
                      <Formik
                        initialValues={{
                          updateCatName: UpCategoryName,
                          updateCatImg: null,
                          updateCatId: conditionIdC,
                        }}
                        validationSchema={UpdateCateValidation}
                        onSubmit={async (values, { resetForm }) => {
                          try {
                            const response = await UpdateCategory(values);
                            fetchCategories();
                            notifySuccess("Updated Category Succesfully!");
                            setAnchorElC(null);
                            setconditionIdC(null);
                            resetForm();
                          } catch (err) {
                            console.log(
                              "Somethig went wrong",
                              err.response ? err.response.data : err.message
                            );
                            notifyError(err);
                            resetForm();
                          }
                          console.log("Updated Category Submitted:", values);
                          console.log(
                            "Image File:",
                            values.updateCatImg
                              ? values.updateCatImg
                              : "No image uploaded"
                          );
                          resetForm();
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          setFieldValue,
                          handleChange,
                          handleBlur,
                        }) => (
                          <Form>
                            <div class="container text-center ">
                              <div className="row">
                                <div className="col">
                                  <br></br>
                                  <TextField
                                    id="outlined-basic"
                                    name="updateCatName"
                                    label="Category Name"
                                    value={values.updateCatName}
                                    variant="outlined"
                                    onChange={handleChange}
                                    // onChange={(e) => {
                                    //   setFieldValue(
                                    //     "updateCatName",
                                    //     e.target.value
                                    //   );
                                    //   console.log({
                                    //     updateCatName: e.target.value,
                                    //   });
                                    // }}
                                    error={Boolean(
                                      touched.updateCatName &&
                                        errors.updateCatName
                                    )}
                                    helperText={
                                      touched.updateCatName &&
                                      errors.updateCatName
                                    }
                                    onBlur={handleBlur}
                                  />
                                </div>
                                <br></br>
                                <div className="col">
                                  <br></br>
                                  <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    value={values.updateCatImg}
                                    sx={{ textTransform: "none", fontSize: 15 }}
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                  >
                                    Category Image
                                    <VisuallyHiddenInput
                                      type="file"
                                      onChange={(event) =>
                                        setFieldValue(
                                          "updateCatImg",
                                          event.currentTarget.files[0]
                                        )
                                      }
                                      single
                                    />
                                  </Button>
                                  {touched.updateCatImg &&
                                    errors.updateCatImg && (
                                      <p
                                        style={{
                                          color: "red",
                                          paddingLeft: "70px",
                                        }}
                                      >
                                        {errors.updateCatImg}
                                      </p>
                                    )}
                                </div>
                              </div>
                            </div>
                            <Box p={2}>
                              <Box mt={2} sx={{ textAlign: "center" }}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                >
                                  Update Category
                                </Button>
                              </Box>
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </Popover>
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
export default Categories;
