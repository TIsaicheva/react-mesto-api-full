import React from 'react';

export function useFormValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (e) => {        
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });        
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest('.popup__form').checkValidity());
    }

    /* установка значений полей по умолчанию / очистка полей */
    const resetForm = React.useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {   
            setValues(newValues);
            setErrors(newErrors);    
            setIsValid(newIsValid);
        }, [setValues, setErrors, setIsValid]
    );
    
    return { values, errors, isValid, handleChange, resetForm };
}