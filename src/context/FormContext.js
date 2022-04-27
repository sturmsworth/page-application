import React, { useState, createContext } from "react";
import { firestore } from "../utils/firebase";
import { initialFormData } from "../utils/constants";

export const FormContext = createContext();
const { Provider } = FormContext;

const FormContextProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);

  const getYear = (new Date().getFullYear() + 1).toString();
  const formRef = firestore
    .collection(`years`)
    .doc(`${getYear}`)
    .collection(`formData`);

  const createFormDocument = (user) => {
    const { email } = user;
    return formRef.doc(`${email}`).set(initialFormData);
  };

  const updateFormDocument = (user, data) => {
    const { email } = user;
    return formRef.doc(`${email}`).update({ ...data });
  };

  const getFormDocument = (user) => {
    const { email } = user;
    return formRef.doc(`${email}`).get();
  };

  return (
    <Provider
      value={{
        formData,
        setFormData,
        createFormDocument,
        updateFormDocument,
        getFormDocument,
      }}
    >
      {children}
    </Provider>
  );
};

export default FormContextProvider;
