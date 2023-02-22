import React, { useContext, useEffect, useState } from "react";
import { Field, useFormik } from "formik";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
  Checkbox,
} from "@chakra-ui/react";
import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import { basicSchema } from "../../helpers/Validation";
import InputFields from "../../components/InputFields";
import SelectBox from "../../components/SelectBox";
import { v4 as uuidv4 } from "uuid";
import UserContext from "../../Context/UserContext";
import { localStorageKey } from "../../utils/Constant";
const logo = require("../../logo.png");

const SignUp = () => {
  const { currentUserDetail, setCurrentUser } = useContext(UserContext);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLocalStorageData = localStorage.getItem("userData");
    const convert = getLocalStorageData ? JSON.parse(getLocalStorageData) : [];
    convert.length && setUserList(convert);

    console.log(convert);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      hobbies: [],
    },
    validationSchema: basicSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      addUser();
      setSubmitting(false);
      resetForm();

      console.log(values, null, 2);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const addUser = () => {
    const userObj = {
      userId: uuidv4(),
      name: formik.values.name,
      email: formik.values.email,
      password: formik.values.password,
      hobbies: formik.values.hobbies,
    };

    let success = userList.some((e) => {
      return (
        e.email === formik.values.email && e.password === formik.values.password
      );
    });
    if (!success) {
      const merge = [...userList, userObj];
      localStorage.setItem(localStorageKey.USERDATA, JSON.stringify(merge));
      localStorage.setItem(localStorageKey.ISLOGGEDIN, true);
      localStorage.setItem(
        localStorageKey.CURRENTUSER,
        JSON.stringify(userObj)
      );
      setCurrentUser(userObj);
      navigate("/");
    } else {
      alert(
        "please enter different email and password,this email already register"
      );
    }
  };

  return (
    <>
      <div className="sign-up-nav-bar">
        <NavLink to="/" className="sign-in-company-logo">
          <img
            className="sign-in-company-logo"
            src={logo}
            alt="this is my company logo"
          />
        </NavLink>
      </div>
      <div className="sign-up-container">
        <Heading as="h2" size="xl" noOfLines={1}>
          Sign Up
        </Heading>
        <div className="sign-up-form-container">
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <InputFields formik={formik} type="text" id="name" lable="Name" />
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
            <FormControl
              isInvalid={formik.errors.hobbies}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <FormLabel>Select your Interest</FormLabel>
              <SelectBox formik={formik} id={"hobbies"} value="Stand-up comedy">
                Stand-up comedy
              </SelectBox>
              <SelectBox formik={formik} id={"hobbies"} value="Writing">
                Writing
              </SelectBox>
              <SelectBox formik={formik} id={"hobbies"} value="Photography">
                Photography
              </SelectBox>

              <FormErrorMessage>{formik.errors.hobbies}</FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="facebook" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
