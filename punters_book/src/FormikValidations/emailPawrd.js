import * as Yup from "yup";

const login = Yup.object({
  emailName: Yup.string()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Please enter a valid email")
    .test(
      "single-tld",
      "Email should not have multiple top-level domains",
      (value) => {
        return !/\.[a-zA-Z]{2,}\./.test(value);
      }
    ),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export default login;

// email: yup
//       .string()
//       .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Please enter a valid email")
//       .test(
//         "single-tld",
//         "Email should not have multiple top-level domains",
//         (value) => {
//           return !/\.[a-zA-Z]{2,}\./.test(value);
//         }
//       )
//       .required("Email is Required"),
