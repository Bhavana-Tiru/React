import "./putlogin.scss";
import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import loginImg from "../images/login.jpg";
import { AuthContext } from "../auth";
import emailPawrd from "../FormikValidations/emailPawrd";
import { Login } from "../services/AllApiServices";

const PutLogin = () => {
  const [showpswrd, setShowpswrd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    //email:admin@admin.com, password:Admin@123
    emailName: "",
    password: "",
  };

  const loginUser = async (data) => {
    // console.log("Login data:", data);
    try {
      const response = await Login(data);
      // console.log(response);
      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
      // console.log("USer data:", response);
      setErrorMessage("");
      navigate("/dashboard");
      if (response && response.status === 200) {
      }
      // resetForm();
    } catch (err) {
      console.log("Somethig went wrong", err);
      setErrorMessage("Somethig went wrong");
      // resetForm();
    }
  };

  const onSubmit = (values, { resetForm }) => {
    loginUser(values, resetForm);
  };

  return (
    <div
      className="loginpage"
      style={{ marginTop: "80px", marginBottom: "0px" }}
    >
      <div className="inputs">
        <Formik
          initialValues={initialValues}
          validationSchema={emailPawrd}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div class="container text-center ">
                <div class="row">
                  <div class="col">
                    <h1 margin="0px">
                      <b>Admin Login</b>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="image">
                <img src={loginImg} alt="login image"></img>
              </div>

              <div className="row float- start">
                <div className="col">
                  <div className="email">
                    <Field
                      className="txtinput"
                      type="email"
                      name="emailName"
                      style={{
                        width: "100%",
                        height: "35px",
                        fontSize: "15px",
                      }}
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="emailName"
                      component="p"
                      style={{ color: "red", margin: "0px", fontSize: "15px" }}
                    />
                  </div>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col ">
                  <div
                    className="password"
                    style={{ position: "relative", width: "250px" }}
                  >
                    <Field
                      type={showpswrd ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      style={{
                        width: "300px",
                        height: "35px",
                        fontSize: "15px",
                        paddingRight: "15px",
                      }}
                    />
                    <span>
                      <button
                        type="button"
                        onClick={() => setShowpswrd(!showpswrd)}
                        className="eyebutton"
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px", // Positioning the button inside the input field
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {showpswrd ? (
                          <i class="fa-solid fa-eye"></i>
                        ) : (
                          <i class="fa-solid fa-eye-slash"></i>
                        )}
                      </button>
                    </span>
                    <ErrorMessage
                      name="password"
                      component="p"
                      style={{
                        color: "red",
                        margin: "0px",
                        fontSize: "15px",
                        width: "250px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <br></br>
              {errorMessage && (
                <p style={{ color: "red", fontSize: "15px" }}>{errorMessage}</p>
              )}
              <br></br>
              <p>
                <button
                  type="submit"
                  className="loginbut"
                  style={{ alignContent: "center" }}
                >
                  <b>Log in</b>
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PutLogin;
