import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

const InputFields = (props) => {
  const { formik, lable, type, id, onKeyDown } = props;
  return (
    <FormControl isInvalid={formik.errors[id]}>
      <FormLabel>{lable}</FormLabel>
      <Input
        placeholder={id}
        value={formik.values[id]}
        type={type}
        id={id}
        onChange={formik.handleChange}
        onKeyDown={onKeyDown}
      />
      <FormErrorMessage>{formik.errors[id]}</FormErrorMessage>
    </FormControl>
  );
};

export default InputFields;
