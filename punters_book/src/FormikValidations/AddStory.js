import * as Yup from "yup";
//story type: dropdown
//title: text
//Image:
//header: text
//sumary:

const storySchema = Yup.object({
  storyType: Yup.string().required(" Story Type is required"),
  storyTitle: Yup.string()
    .required("Title is required")
    .min(5, "Title should be atleast 5 characters"),
  storyImage: Yup.mixed().required(" Image is required"),
  storyHeader: Yup.string()
    .required("Header is requried")
    .min(5, "Header must have atleast 5 characters"),
  summary: Yup.string()
    .required("Summary is required")
    .min(100, "Category must have atleast 100 characters"),
});

export default storySchema;
