import Category from "@mui/icons-material/Category";
import * as Yup from "yup";

const headlineSchema = Yup.object({
  headlineCategory: Yup.string()
    .min(5, "Category must have atleast 5 characters")
    .required("Category is required"),
  headlineTitle: Yup.string().required("Title is required"),
});

export default headlineSchema;
