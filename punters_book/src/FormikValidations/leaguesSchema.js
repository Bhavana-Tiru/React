import * as Yup from "yup";

// Create a Yup schema after the dropdown has been populated
const getLeagueSchema = () => {
  return Yup.object().shape({
    // Use shape() to define the schema
    leagueName: Yup.string()
      .required("League Name is required")
      .min(2, "League Name must be at least 3 characters")
      .max(100, "League Name exceeds limit"),
    categoryDetails: Yup.string().required("Category Name is required"),
    leagueLogo: Yup.mixed().required("League Logo is required"),
    colorPicker: Yup.string()
      .required("Color is required")
      .matches(/^#[0-9A-F]{6}$/i, "Invalid color code"),
  });
};

export default getLeagueSchema;
