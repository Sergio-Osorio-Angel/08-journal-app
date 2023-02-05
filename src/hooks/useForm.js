import { useEffect, useMemo, useState } from "react";

export function useForm(initialForm = {}, formValidations = {}) {

    const [formState, setformState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setformState(initialForm);
    }, [initialForm]);


    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) {
                return false;
            }
        }
        return true;
    }, [formValidation]);


    function onInputChange({ target }) {
        const { name, value } = target;
        setformState({
            ...formState,
            [name]: value
        })
    }

    function onResetForm() {
        setformState(initialForm);
    }

    function createValidators() {
        const formCheckValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckValues);
    }

    return {
        ...formState,
        formState,
        ...formValidation,
        formValidation,
        isFormValid,
        onInputChange,
        onResetForm
    };
}
