import { useState, useCallback, useEffect } from 'react';

export function useFormAndValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isValuesEqualInitial =
      values.name === initialValues.name &&
      values.email === initialValues.email;

    if (isValuesEqualInitial) {
      setIsValid(false);
    }
  }, [values, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    const isFormValid = e.target.closest('form').checkValidity();

    setIsValid(isFormValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
