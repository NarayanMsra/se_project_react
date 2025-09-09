import { useState } from "react";

const useForm = (defaultValues) => {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    setValues,
    handleChange,
  };
};

export default useForm;
