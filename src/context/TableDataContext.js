import React, { createContext, useState, useEffect, useContext } from "react";
import { initialAttachmentsData } from "../utils/constants";
import { firestore, storage } from "../utils/firebase";
import { AuthContext } from "./AuthContext";

export const TableDataContext = createContext();
const { Provider } = TableDataContext;

const TableDataContextProvider = ({ children }) => {
  const getYear = (new Date().getFullYear() + 1).toString();
  const { currentAdmin, currentSenator } = useContext(AuthContext);

  const [yearData, setYearData] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [tableMetaData, setTableMetaData] = useState([]);
  const [tableQueryData, setTableQueryData] = useState(null);
  const [showAllChecked, setShowAllChecked] = useState(true);
  const [showCompletedChecked, setShowCompletedChecked] = useState(false);
  const [showDistrictsChecked, setShowDistrictsChecked] = useState(false);
  const [year, setYear] = useState(getYear);
  const [tableLoading, setTableLoading] = useState(true);
  const [modalData, setModalData] = useState({});
  const [modalAttachmentData, setModalAttachmentData] = useState(
    initialAttachmentsData
  );
  const [attachmentDataForUpload, setAttachmentDataForUpload] = useState({});
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showApplicantInfoModal, setShowApplicantInfoModal] = useState(false);
  const [showGuardianInfoModal, setShowGuardianInfoModal] = useState(false);
  const [showMiscInfoModal, setShowMiscInfoModal] = useState(false);
  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
  const [csvData, setCSVData] = useState(null);

  const yearDataRef = firestore.collection(`yearsList`);
  const metaDataRef = firestore
    .collection(`years`)
    .doc(`${year}`)
    .collection(`metaData`);
  const userDataRef = firestore
    .collection(`years`)
    .doc(`${year}`)
    .collection(`users`);
  const formDataRef = firestore
    .collection(`years`)
    .doc(`${year}`)
    .collection(`formData`);
  const storageRef = storage.ref();
  // districts 01-09 are not the same as districts 1-9. We need to pull out the leading 0
  // this lets us do that
  const removeFrontZero = (number) => {
    const getRidOfThatPeskyZero = number.replace(/^0+/, "");
    return getRidOfThatPeskyZero;
  };

  const getSingleUserFormInfo = () => {
    const formRef = firestore
      .collection(`years`)
      .doc(`${year}`)
      .collection(`formData`);

    return formRef.doc(`${currentEmail}`).get();
  };

  const getSingleUserAttachmentInfo = () => {
    const attachmentsRef = firestore
      .collection(`years`)
      .doc(`${year}`)
      .collection(`attachmentsData`);

    return attachmentsRef.doc(`${currentEmail}`).get();
  };

  const updateUserFormInfo = (data) => {
    const formRef = firestore
      .collection(`years`)
      .doc(`${year}`)
      .collection(`formData`);

    return formRef.doc(`${currentEmail}`).update({ ...data });
  };

  const updateUserAttachmentAndGetUrl = async (file, attachmentType) => {
    const filePath = `${year}/${currentEmail}/${attachmentType}/${file.name}`;
    const fileRef = storageRef.child(filePath);

    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    return url;
  };

  const deleteUserAttachment = async (attachmentType, files) => {
    await files.map(async (file) => {
      const filePath = `${year}/${currentEmail}/${attachmentType}/${file.name}`;
      const fileRef = storageRef.child(filePath);

      try {
        fileRef.delete();
      } catch (e) {
        console.log(e);
      }
    });
  };

  const updateUserAttachmentInfo = (data) => {
    const attachmentsRef = firestore
      .collection(`years`)
      .doc(`${year}`)
      .collection(`attachmentsData`);

    return attachmentsRef.doc(`${currentEmail}`).update({ ...data });
  };

  // const updateUserAttachmentInfo = (data) => {
  //   const attachmentsRef = firestore
  //     .collection(`years`)
  //     .doc(`${year}`)
  //     .collection(`attachmentsData`);

  //   return attachmentsRef.doc(`${currentEmail}`).update({ ...data });
  // };

  const updateUserMetaData = (section) => {
    const formRef = firestore
      .collection(`years`)
      .doc(`${year}`)
      .collection(`metaData`);

    if (section === "terms") {
      return formRef.doc(`${currentEmail}`).update({
        terms: "completed",
        termsCompleted: true,
        termsLastTouched: new Date(),
      });
    }
  };

  const getAllYears = async () => {
    let yearArray = [];

    const getYearData = await yearDataRef.get();

    getYearData.forEach((doc) => {
      yearArray.push(doc.data().year);
    });

    setYearData(yearArray);
  };

  const getAllMetaData = async () => {
    // this function gets all the meta data, then gets the user data
    // then merges the meta data values with the displayName from the userdata values
    // using the uid property as the identifier
    let metaDataArray = [];
    let userDataArray = [];

    const getMetaData = await metaDataRef.get();
    const getUserData = await userDataRef.get();

    getMetaData.forEach((doc) => {
      metaDataArray.push({
        ...doc.data(),
        completed: doc.data().completed ? "Complete" : "Incomplete",
      });
    });

    getUserData.forEach((doc) => {
      userDataArray.push(doc.data());
    });

    // console.log("************  meta data array  *********", metaDataArray);
    // console.log("************  user data array  *********", userDataArray);

    // this finds the index of the element where the uid === the uid of the metaData
    // then merges the objects into a new array using a map
    const mergedArray = metaDataArray.map((e) => {
      const index = userDataArray.findIndex((el) => el.uid === e.uid);

      const { displayName } = index !== -1 ? userDataArray[index] : {};
      // console.log(displayName);
      return {
        ...e,
        displayName: e.displayName ? e.displayName : displayName,
      };
    });

    // console.log(mergedArray);

    setTableMetaData(mergedArray);
  };

  const getCompeletedApplicantData = async () => {
    let metaDataArray = [];
    let userDataArray = [];

    const getMetaData = await metaDataRef.where("completed", "==", true).get();
    const getUserData = await userDataRef.get();

    getMetaData.forEach((doc) => {
      metaDataArray.push({
        ...doc.data(),
        completed: doc.data().completed ? "Complete" : "Incomplete",
      });
    });

    getUserData.forEach((doc) => {
      userDataArray.push(doc.data());
    });

    const mergedArray = metaDataArray.map((e) => {
      const index = userDataArray.findIndex((el) => el.uid === e.uid);
      const { displayName } = index !== -1 ? userDataArray[index] : {};
      return {
        ...e,
        displayName: e.displayName ? e.displayName : displayName,
      };
    });

    setTableMetaData(mergedArray);
  };

  const getDistrictMetaData = async () => {
    let metaDataArray = [];
    let userDataArray = [];

    const getMetaData = await metaDataRef.where("district", "!=", "").get();
    const getUserData = await userDataRef.get();

    getMetaData.forEach((doc) => {
      metaDataArray.push({
        ...doc.data(),
        completed: doc.data().completed ? "Complete" : "Incomplete",
      });
    });

    getUserData.forEach((doc) => {
      userDataArray.push(doc.data());
    });

    const mergedArray = metaDataArray.map((e) => {
      const index = userDataArray.findIndex((el) => el.uid === e.uid);
      const { displayName } = index !== -1 ? userDataArray[index] : {};
      return {
        ...e,
        displayName: e.displayName ? e.displayName : displayName,
      };
    });

    setTableMetaData(mergedArray);
  };

  const getMetaDataForSenators = async () => {
    // const number1 = "40";
    // const number2 = "04";

    // const removeFrontZero = (number) => {
    //   const getRidOfThatPeskyZero = number.replace(/^0+/, "");
    //   console.log(getRidOfThatPeskyZero);
    // };

    // removeFrontZero(number1);
    // removeFrontZero(number2);

    let metaDataArray = [];
    let userDataArray = [];

    const getMetaData = await metaDataRef
      .where("district", "==", removeFrontZero(currentSenator.district))
      .get();
    const getUserData = await userDataRef.get();

    getMetaData.forEach((doc) => {
      metaDataArray.push({
        ...doc.data(),
        completed: doc.data().completed ? "Complete" : "Incomplete",
      });
    });

    getUserData.forEach((doc) => {
      userDataArray.push(doc.data());
    });

    const mergedArray = metaDataArray.map((e) => {
      const index = userDataArray.findIndex((el) => el.uid === e.uid);
      const { displayName } = index !== -1 ? userDataArray[index] : {};
      return {
        ...e,
        displayName: e.displayName ? e.displayName : displayName,
      };
    });

    setTableMetaData(mergedArray);
  };

  const getCompletedApplicantDataForSenators = async () => {
    let metaDataArray = [];
    let userDataArray = [];

    const getMetaData = await metaDataRef
      .where("district", "==", removeFrontZero(currentSenator.district))
      .where("completed", "==", true)
      .get();
    const getUserData = await userDataRef.get();

    getMetaData.forEach((doc) => {
      metaDataArray.push({
        ...doc.data(),
        completed: doc.data().completed ? "Complete" : "Incomplete",
      });
    });

    getUserData.forEach((doc) => {
      userDataArray.push(doc.data());
    });

    const mergedArray = metaDataArray.map((e) => {
      const index = userDataArray.findIndex((el) => el.uid === e.uid);
      const { displayName } = index !== -1 ? userDataArray[index] : {};
      return {
        ...e,
        displayName: e.displayName ? e.displayName : displayName,
      };
    });

    setTableMetaData(mergedArray);
  };

  const getCSVData = async () => {
    let metaDataArray = [];
    let formDataArray = [];

    const getMetaData = await metaDataRef.where("completed", "==", true).get();
    const getFormData = await formDataRef.get();

    getMetaData.forEach((doc) => {
      metaDataArray.push({
        email: doc.data().email,
      });
    });

    getFormData.forEach((doc) => {
      formDataArray.push(doc.data());
    });

    const mergedArray = metaDataArray.map((e) => {
      const index = formDataArray.findIndex(
        (el) => el.applicantInfo.email === e.email
      );

      const { applicantInfo } = index !== -1 ? formDataArray[index] : {};

      return {
        ...applicantInfo,
      };
    });

    setCSVData(mergedArray);
  };

  useEffect(() => {
    if (currentAdmin || currentSenator) {
      if (showCompletedChecked) {
        if (currentSenator) {
          setTableLoading(true);
          getCompletedApplicantDataForSenators();
        } else {
          setTableLoading(true);
          getCompeletedApplicantData();
        }
      } else if (showDistrictsChecked) {
        setTableLoading(true);
        getDistrictMetaData();
      } else if (currentSenator) {
        setTableLoading(true);
        getMetaDataForSenators();
      } else {
        setTableLoading(true);
        getAllMetaData();

        // getAllMetaData();
        // console.log("else");
        // if (currentAdmin) {
        //   console.log("getting admin data ");

        //   getAllMetaData();
        // } else {
        //   console.log(currentSenator);
        //   // getOnlyDistrictData()
        // }
      }

      getAllYears();

      setTableLoading(false);
    }
    // eslint-disable-next-line
  }, [
    showCompletedChecked,
    showDistrictsChecked,
    year,
    currentSenator,
    currentAdmin,
  ]);

  return (
    <Provider
      value={{
        getAllYears,
        yearData,
        setYearData,
        tableMetaData,
        setTableMetaData,
        tableQueryData,
        setTableQueryData,
        tableLoading,
        setTableLoading,
        getAllMetaData,
        getDistrictMetaData,
        getCompeletedApplicantData,
        showCompletedChecked,
        setShowCompletedChecked,
        showDistrictsChecked,
        setShowDistrictsChecked,
        setShowAllChecked,
        showAllChecked,
        year,
        setYear,
        currentEmail,
        setCurrentEmail,
        showTermsModal,
        setShowTermsModal,
        showApplicantInfoModal,
        setShowApplicantInfoModal,
        showGuardianInfoModal,
        setShowGuardianInfoModal,
        showMiscInfoModal,
        setShowMiscInfoModal,
        showAttachmentsModal,
        setShowAttachmentsModal,
        modalData,
        setModalData,
        modalAttachmentData,
        setModalAttachmentData,
        getSingleUserFormInfo,
        getSingleUserAttachmentInfo,
        updateUserFormInfo,
        updateUserAttachmentInfo,
        updateUserMetaData,
        updateUserAttachmentAndGetUrl,
        deleteUserAttachment,
        attachmentDataForUpload,
        setAttachmentDataForUpload,
        getCSVData,
        setCSVData,
        csvData,
      }}
    >
      {children}
    </Provider>
  );
};

export default TableDataContextProvider;
