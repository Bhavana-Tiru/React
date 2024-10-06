// title, user-> dropdown, image, summary
import * as Yup from "yup";

const notifiSchema = Yup.object({
  notifiTitle: Yup.string()
    .required("Title is required")
    .min(5, "Title should be atleast 5 characters"),

  notifiUser: Yup.string().required(" Story Type is required"),
  notifiImage: Yup.mixed().required("Notification Image is required"),
  notifiSummary: Yup.string()
    .required("Summary is required")
    .min(10, "Category must have atleast 10 characters"),
});

export default notifiSchema;
