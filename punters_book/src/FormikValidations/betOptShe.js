import * as Yup from "yup";

//optionName-> text, category->options

const betoptSchema = Yup.object({
  betoptionName: Yup.string().required("Option Name is required"),
  betOptCatName: Yup.string().required(" Category is required"),
});

export default betoptSchema;
