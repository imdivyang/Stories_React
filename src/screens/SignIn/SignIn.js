import { Button, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputFields from "../../components/InputFields";
import { loginSchema } from "../../helpers/Validation";
import { localStorageKey } from "../../utils/Constant";
import "./SignIn.css";

const logo = require("../../logo.png");
const SignIn = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Session Store
    // sessionStorage.setItem("terms", JSON.stringify(userList));
    // const getSessionData = sessionStorage.getItem("terms");
    // console.log("getSessionData", getSessionData);

    // Cookies Store
    // const cookies = new Cookies();
    // cookies.set("terms", JSON.stringify(userList), { path: "/" });
    // const getCookiesData = cookies.get("terms");
    // console.log(getCookiesData);

    // Local Storage Store
    const getLocalStorageData = JSON.parse(
      localStorage.getItem(localStorageKey.USERDATA)
    );
    setUserList(getLocalStorageData);
  }, []);

  const onUserLogin = () => {
    const getCuurentUser = userList.filter((e) => {
      return (
        e.email === formik.values.email && e.password === formik.values.password
      );
    });

    const success = userList.some((e) => {
      return (
        e.email === formik.values.email && e.password === formik.values.password
      );
    });

    if (success) {
      localStorage.setItem(localStorageKey.ISLOGGEDIN, true);
      localStorage.setItem(
        localStorageKey.CURRENTUSER,
        JSON.stringify(getCuurentUser[0])
      );

      navigate("/");
    } else {
      alert("Please Enter valide email id and Password");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      onUserLogin();
      setSubmitting(false);
      resetForm();
      // navigate("/");
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div className="sign-in-container">
      {/* Nav Bar */}
      <div className="header">
        <a href="/" className="sign-in-company-logo">
          <img
            className="sign-in-company-logo"
            src={logo}
            alt="this is my company logo"
          />
        </a>
      </div>
      {/* Sign In Form */}
      <div className="sign-up-container">
        <Heading as="h2" size="xl" noOfLines={1}>
          Sign In
        </Heading>
        <div className="sign-up-form-container">
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <InputFields
              formik={formik}
              type="email"
              id="email"
              lable="Email"
            />
            <InputFields
              formik={formik}
              type="password"
              id="password"
              lable="Password"
            />

            <Button mt={4} colorScheme="facebook" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
