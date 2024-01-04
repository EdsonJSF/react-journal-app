import { useEffect, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [functionValidation, errorMessage = "Validation error"] =
        formValidations[formField];

      formCheckValues[`${formField}Valid`] = functionValidation(
        formState[formField]
      )
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckValues);
  };

  return {
    ...formState,
    ...formValidation,
    formState,
    handleInputChange,
    handleResetForm,
  };
};
