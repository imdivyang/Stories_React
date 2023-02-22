import { Checkbox } from "@chakra-ui/react";
import React from "react";

const SelectBox = (props) => {
  const { formik, id, value, children } = props;
  return (
    <Checkbox
      colorScheme="blue"
      id={id}
      value={value}
      onChange={formik.handleChange}
    >
      {children}
    </Checkbox>
  );
};

export default SelectBox;
