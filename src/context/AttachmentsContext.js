import React, { createContext, useState } from "react";

// constants
import { initialAttachmentsData } from "../utils/constants";

// firebase config
import { storage, firestore } from "../utils/firebase";

export const AttachmentsContext = createContext();
const { Provider } = AttachmentsContext;

const AttachmentsContextProvider = ({ children }) => {
  const [attachmentsData, setAttachmentsData] = useState(
    initialAttachmentsData
  );

  const getYear = (new Date().getFullYear() + 1).toString();
  const formRef = firestore
    .collection(`years`)
    .doc(`${getYear}`)
    .collection(`attachmentsData`);
  const storageRef = storage.ref();

  const createAttachmentsDocument = (user) => {
    const { email } = user;
    return formRef.doc(`${email}`).set(initialAttachmentsData);
  };

  const updateAttachmentsDocument = (user, data) => {
    const { email } = user;
    return formRef.doc(`${email}`).update({ ...data });
  };

  const getAttachmentsDocument = (user) => {
    const { email } = user;
    return formRef.doc(`${email}`).get();
  };

  const deleteFile = async (user, attachmentType, files) => {
    const { email } = user;

    await files.map(async (file) => {
      const filePath = `${getYear}/${email}/${attachmentType}/${file.name}`;
      const fileRef = storageRef.child(filePath);

      try {
        fileRef.delete();
      } catch (e) {
        console.log(e);
      }
    });
  };

  const uploadFileAndGetURL = async (user, attachmentType, file) => {
    const { email } = user;
    const filePath = `${getYear}/${email}/${attachmentType}/${file.name}`;
    const fileRef = storageRef.child(filePath);

    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    return url;
  };

  const uploadRecsGetURLAndReturnDataArray = async (user, files, setData) => {
    // this code executes if there are two files
    if (files.length > 1) {
      console.log(`two files detected`);
      const { email } = user;
      const fileOne = files[0];
      const fileTwo = files[1];
      let data;

      const filePathOne = `${getYear}/${email}/recs/${fileOne.name}`;
      const filePathTwo = `${getYear}/${email}/recs/${fileTwo.name}`;
      const fileRefOne = storageRef.child(filePathOne);
      const fileRefTwo = storageRef.child(filePathTwo);

      try {
        await fileRefOne.put(fileOne);
        await fileRefTwo.put(fileTwo);

        const urlOne = await fileRefOne.getDownloadURL();
        const urlTwo = await fileRefTwo.getDownloadURL();

        console.log(urlOne);
        console.log(urlTwo);

        data = [
          {
            path: fileOne.path,
            name: fileOne.name,
            lastModified: fileOne.lastModified,
            webkitRelativePath: fileOne.webkitRelativePath,
            size: fileOne.size,
            type: fileOne.type,
            url: urlOne,
          },
          {
            path: fileTwo.path,
            name: fileTwo.name,
            lastModified: fileTwo.lastModified,
            webkitRelativePath: fileTwo.webkitRelativePath,
            size: fileTwo.size,
            type: fileTwo.type,
            url: urlTwo,
          },
        ];

        setData((p) => {
          return {
            ...p,
            recs: data,
          };
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      // this code executes if there's only one file
      const { email } = user;
      const fileOne = files[0];
      let data;

      const filePathOne = `${getYear}/${email}/recs/${fileOne.name}`;
      const fileRefOne = storageRef.child(filePathOne);

      try {
        await fileRefOne.put(fileOne);

        const urlOne = await fileRefOne.getDownloadURL();

        data = [
          {
            path: fileOne.path,
            name: fileOne.name,
            lastModified: fileOne.lastModified,
            webkitRelativePath: fileOne.webkitRelativePath,
            size: fileOne.size,
            type: fileOne.type,
            url: urlOne,
          },
        ];

        setData((p) => {
          return {
            ...p,
            recs: data,
          };
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Provider
      value={{
        createAttachmentsDocument,
        updateAttachmentsDocument,
        getAttachmentsDocument,
        deleteFile,
        uploadFileAndGetURL,
        uploadRecsGetURLAndReturnDataArray,
        attachmentsData,
        setAttachmentsData,
      }}
    >
      {children}
    </Provider>
  );
};

export default AttachmentsContextProvider;

// const uploadSchoolEndorsementForm = async (user, file) => {
//   const { email } = user;
//   const filePath = `${getYear}/${email}/schoolEndorsements/${file.name}`;
//   const fileRef = storageRef.child(filePath);

//   await fileRef.put(file);
//   const url = await fileRef.getDownloadURL();
//   return url;
// };

// const uploadExtras = async (user, file) => {
//   const { email } = user;
//   const filePath = `${getYear}/${email}/extras/${file.name}`;
//   const fileRef = storageRef.child(filePath);

//   await fileRef.put(file);
//   const url = await fileRef.getDownloadURL();
//   return url;
// };

// const uploadEssay = async (user, file) => {
//   const { email } = user;
//   const filePath = `${getYear}/${email}/essay/${file.name}`;
//  const fileRef = storageRef.child(filePath);

//  await fileRef.put(file);
//  const url = await fileRef.getDownloadURL();
//  return url;
// };
