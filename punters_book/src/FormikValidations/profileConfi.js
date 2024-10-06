// onload, new , confirm-> password
import * as Yup from "yup";

const profileSchema = Yup.object({
  oldPswrd: Yup.string()
    .min(8, "Old Password length is short")
    .max(225, " Old Password length is too Long")
    .required("Old Password is a required ")

    .test(
      "Old password-requirements",
      "Old Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",
      (value) => {
        // Password validation logic here (using a regular expression or other methods)
        return /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).+$/.test(value);
      }
    ),
  newPswrd: Yup.string()
    .min(8, "New Password length is short")
    .max(225, " New Password length is too Long")
    .required("New Password is a required ")

    .test(
      "New password-requirements",
      "New Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",
      (value) => {
        // Password validation logic here (using a regular expression or other methods)
        return /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).+$/.test(value);
      }
    ),
  confirmPswrd: Yup.string()
    .min(8, " Confirm Password length is short")
    .max(225, "Confirm Password length is too Long")
    .required("Confirm Password is a required")

    .test(
      "Confirm password-requirements",
      " Confirm Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",
      (value) => {
        // Password validation logic here (using a regular expression or other methods)
        return /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).+$/.test(value);
      }
    )
    .oneOf([Yup.ref("newPswrd"), null], "Passwords must match"),
});
export default profileSchema;
