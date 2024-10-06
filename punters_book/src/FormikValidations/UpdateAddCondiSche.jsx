import * as Yup from "yup";

const UpdateAddCondiSche = Yup.object({
  option_id: Yup.string().required("Option_id is required"),
  title: Yup.string().required("Title is required"),
  status: Yup.string().required("Status is required"),
  rating: Yup.string()
    .required("Rating is required")
    .max(5, "Rating should be between 1-5"),
});

export default UpdateAddCondiSche;
