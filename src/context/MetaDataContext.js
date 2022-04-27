import React, { createContext, useState, useEffect } from "react";
import { firestore } from "../utils/firebase";
import { metaDataInitialState } from "../utils/constants";

export const MetaDataContext = createContext();
const { Provider } = MetaDataContext;

const MetaDataContextProvider = ({ children }) => {
  const [metaData, setMetaData] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [save, setSave] = useState(null);

  const getYear = (new Date().getFullYear() + 1).toString();
  const metaRef = firestore
    .collection(`years`)
    .doc(`${getYear}`)
    .collection(`metaData`);

  const createMetaDataDocument = (user) => {
    const { email, uid, displayName } = user;

    return metaRef.doc(`${email}`).set({
      ...metaDataInitialState,
      email,
      uid,
      createdAt: new Date(),
      displayName,
    });
  };

  const getMetaDataDocument = (user) => {
    const { email } = user;

    return metaRef.doc(`${email}`).get();
  };

  const updateMetaDataDocument = (user, data) => {
    const { email } = user;
    return metaRef.doc(`${email}`).update({
      ...data,
    });
  };

  const calculatePercentage = () => {
    const {
      applicantInfoCompleted,
      attachmentsCompleted,
      guardianInfoCompleted,
      miscInfoCompleted,
      termsCompleted,
    } = metaData;

    let applicantNumber,
      attachmentsNumber,
      guardianNumber,
      miscNumber,
      termsNumber;

    if (applicantInfoCompleted) {
      applicantNumber = 1;
    } else {
      applicantNumber = 0;
    }

    if (attachmentsCompleted) {
      attachmentsNumber = 1;
    } else {
      attachmentsNumber = 0;
    }

    if (guardianInfoCompleted) {
      guardianNumber = 1;
    } else {
      guardianNumber = 0;
    }

    if (miscInfoCompleted) {
      miscNumber = 1;
    } else {
      miscNumber = 0;
    }

    if (termsCompleted) {
      termsNumber = 1;
    } else {
      termsNumber = 0;
    }

    const percentage =
      (applicantNumber +
        attachmentsNumber +
        guardianNumber +
        miscNumber +
        termsNumber) *
      20;

    setPercentage(percentage);
  };

  useEffect(() => {
    if (metaData) {
      calculatePercentage();
    }
    // eslint-disable-next-line
  }, [metaData]);

  return (
    <Provider
      value={{
        metaData,
        setMetaData,
        createMetaDataDocument,
        getMetaDataDocument,
        updateMetaDataDocument,
        calculatePercentage,
        save,
        setSave,
        percentage,
      }}
    >
      {children}
    </Provider>
  );
};

export default MetaDataContextProvider;
