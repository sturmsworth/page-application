const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// exports.newUserSignup = functions.auth.user().onCreate((user) => {
//   console.log(user);
//   const displayYear = new Date().getFullYear() + 1;
//   const yearRef = admin.firestore().collection("years").doc(displayYear);

//   return yearRef.collection("users").doc(user.email).set({
//     createdAt: new Date(),
//     email: user.email,
//     displayName: user.displayName,
//     lastLogin: new Date(),
//     uid: user.uid,
//   });
// });
