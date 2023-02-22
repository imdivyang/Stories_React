import * as yup from "yup";

const emailRegX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordReg =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegX, { message: "Please Enter valid email" })
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordReg, { message: "Please create a stronger password" })
    .required("Required"),
});

export const basicSchema = yup.object().shape({
  name: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: yup
    .string()
    .matches(emailRegX, { message: "Please Enter valid email" })
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordReg, { message: "Please create a stronger password" })
    .required("Required"),
  hobbies: yup.array().min(2, "Select at least 2 hobbies").required("Required"),
});

export const storySchema = yup.object().shape({
  topic: yup.string().required("Required"),
  description: yup.string().max(500).required("Required"),
});
