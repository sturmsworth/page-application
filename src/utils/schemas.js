import * as Yup from "yup";
import moment from "moment";
import { sessionStart } from "./constants";

const yupObject = (schematic) => Yup.object().shape(schematic);

export const signInSchema = yupObject({
  email: Yup.string()
    .email("Please enter a valid email format")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export const createAccountSchema = yupObject({
  fName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters")
    .trim()
    .required("Required"),
  lName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be less than 20 characters")
    .trim()
    .required("Required"),
  dob: Yup.string()
    .length(10, "Date should be formatted as such: MM/DD/YYYY")
    .test(
      "check-age",
      "You do not meet the age requirements. You must be either 13 or 14 on the day session starts.",
      (value) => {
        const sessionStartDate = moment(sessionStart, "MM/DD/YYYY");
        const birthday = moment(value, "MM/DD/YYYY");
        const compare = (a, b) => {
          const age = a.diff(b, "years");
          if (age === 13 || age === 14) {
            return true;
          } else {
            return false;
          }
        };
        return compare(sessionStartDate, birthday);
      }
    )
    .required("Required"),
  email: Yup.string()
    .email("Please enter a valid email format")
    .required("Required"),
  password: Yup.string()
    .min(
      8,
      "Passwords require a minimum of 8 characters and must contain at least one number."
    )
    .max(
      20,
      "Passwords can only be up to 20 characters and must contain at least one number."
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Required"),
});

export const applicantInfoSchema = yupObject({
  prefix: Yup.string().required("Required"),
  fName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters")
    .required("Required"),
  mName: Yup.string(),
  lName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be less than 20 characters")
    .required("Required"),
  suffix: Yup.string(),
  addressOne: Yup.string()
    .min(5, "Your street address must be at least 5 characters")
    .max(70, "Your street address must be less than 70 characters")
    .required("Street Address is required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string()
    .length(5, "Zip Code should be 5 characters")
    .required("Required"),
  phone: Yup.string()
    .length(13, "Please format phone numbers as follows: (555)555-5555")
    .required("Required"),
  dob: Yup.string()
    .length(10, "Date should be formatted as such: MM/DD/YYYY")
    .test(
      "check-age",
      "You do not meet the age requirements. You must be either 13 or 14 on the day session starts.",
      (value) => {
        const sessionStartDate = moment(sessionStart, "MM/DD/YYYY");
        const birthday = moment(value, "MM/DD/YYYY");
        const compare = (a, b) => {
          const age = a.diff(b, "years");
          if (age === 13 || age === 14) {
            return true;
          } else {
            return false;
          }
        };
        return compare(sessionStartDate, birthday);
      }
    )
    .required("Required"),
  email: Yup.string()
    .email("Please enter a valid email format")
    .required("Required"),
  hApply: Yup.string().required("Required"),
  hServed: Yup.string().required("Required"),
});

export const guardianInfoSchema = yupObject({
  prefix: Yup.string().required("Required"),
  fName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters")
    .required("Required"),
  mName: Yup.string().max(20, "Middle name must be less than 20 characters"),
  lName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be less than 20 characters")
    .required("Required"),
  suffix: Yup.string(),
  addressOne: Yup.string()
    .min(5, "Your street address must be at least 5 characters")
    .max(70, "Your street address must be less than 70 characters")
    .required("Street Address is required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string()
    .length(5, "Zip Code should be 5 characters")
    .required("Required"),
  phone: Yup.string()
    .length(13, "Please format phone numbers as follows: (555)555-5555")
    .required("Required"),
  phoneType: Yup.string().required("Required"),
  email: Yup.string()
    .email("Please enter a valid email format")
    .required("Required"),
});

export const secondaryGuardianInfoSchema = yupObject({
  prefix: Yup.string().required("Required"),
  fName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters")
    .required("Required"),
  mName: Yup.string().max(20, "Middle name must be less than 20 characters"),
  lName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be less than 20 characters")
    .required("Required"),
  suffix: Yup.string(),
  addressOne: Yup.string()
    .min(5, "Your street address must be at least 5 characters")
    .max(70, "Your street address must be less than 70 characters")
    .required("Street Address is required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string()
    .length(5, "Zip Code should be 5 characters")
    .required("Required"),
  phone: Yup.string()
    .length(13, "Please format phone numbers as follows: (555)555-5555")
    .required("Required"),
  phoneType: Yup.string().required("Required"),
  email: Yup.string()
    .email("Please enter a valid email format")
    .required("Required"),
});

export const miscInfoSchema = yupObject({
  district: Yup.string().required("Required"),
  school: Yup.string().required("Required"),
  grade: Yup.string().required("Required"),
  gpa: Yup.string().required("Required"),
  familyService: Yup.string().required("Required"),
});

export const familyServiceSchema = yupObject({
  familyServiceOneName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be less than 35 characters")
    .required("Name is required"),
  familyServiceOneYear: Yup.string()
    .length(4, "Format: YYYY")
    .required("Required"),
  familyServiceOneBranch: Yup.string().required("Required"),
  familyServiceOneRelation: Yup.string().required("Required"),
  familyServiceTwoName: Yup.string(),
  familyServiceTwoYear: Yup.string(),
  familyServiceTwoBranch: Yup.string(),
  familyServiceTwoRelation: Yup.string(),
});
