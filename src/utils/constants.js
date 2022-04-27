// application constants
import {
  TERMS,
  APPLICANT_INFO,
  GUARDIAN_INFO,
  MISC_INFO,
  ATTACHMENTS,
} from "../routes";

// form urls
export const extrasFormURL =
  "https://firebasestorage.googleapis.com/v0/b/page-2020-28c30.appspot.com/o/form-templates%2F2022%2F2022%20Extracurricular%20Form.pdf?alt=media&token=7cec8edd-7b59-4f8c-8b09-b02a62a8e5f6";
export const endorsementsFormURL =
  "https://firebasestorage.googleapis.com/v0/b/page-2020-28c30.appspot.com/o/form-templates%2F2022%2F2022%20Page%20School%20Endorsement%20Form.pdf?alt=media&token=5203da7f-91b2-4e5f-9c5b-002d8e092850";

export const sessionStart = "1/11/2023";

export const prefixes = [
  "Prefix",
  "Mr.",
  "Ms.",
  "Mrs.",
  "Mx.",
  "Would rather not disclose",
];

export const dueDate = "October 17, 2022 at 5:00 PM EST";

export const essayTopics = [
  `Think about what it means to be a Virginian. If you were in a
  leadership capacity and had to speak with someone who is
  unfamiliar with the Commonwealth, what are three things you
  would tell them about Virginia and why? What is one thing you
  would change?`,
  `Leaders typically make difficult decisions and balance a
  multitude of responsibility. One challenge a leader may face is
  making a decision for which the outcome will not be satisfactory
  to everyone. Identify the characteristics you think a strong
  leader must possess and explain how you would apply those
  standards in an attempt to compromise.`,
];

export const shortAnswerTopics = [
  `List three leadership qualities that you think a Senate Page must have to be successful.  If you are selected, how would you apply those in your day-to-day responsibilities?`,
];

export const displayYearPlusOne = new Date().getFullYear() + 1;
export const displayYear = new Date().getFullYear();
export const statesArray = [
  "State",
  "AK",
  "AL",
  "AR",
  "AS",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "GU",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VI",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
];

export const districtArray = [
  `Select your Senator`,
  `Barker, George L. (39th District)`,
  `Bell, John J. (13th District)`,
  `Boysko, Jennifer B. (33rd District)`,
  `Chase, Amanda F. (11th District)`,
  `Cosgrove, John A. (14th District)`,
  `Morrissey, Joseph D. (16th District)`,
  `DeSteph, Bill R. (8th District)`,
  `Deeds, R. Creigh (25th District)`,
  `Dunnavant, Siobhan S. (12th District)`,
  `Ebbin, Adam P. (30th District)`,
  `Edwards,John S. (21st District)`,
  `Favola, Barbara A. (31st District)`,
  `Hackworth, T. Travis (38th District)`,
  `Hanger, Emmett W. (24th District)`,
  `Hashmi, Ghazala F. (10th District)`,
  `Howell, Janet D. (32nd District)`,
  `Kiggins, Jen A. (7th District)`,
  `Lewis, Lynwood W (6th District)`,
  `Locke, Mamie E. (2nd District)`,
  `Lucas, L. Louise (18th District)`,
  `Marsden, David W. (37th District)`,
  `Mason, T. Montgomery "Monty" (1st District)`,
  `McClellan, Jennifer L. (9th District)`,
  `McDougle, Ryan T. (4th District)`,
  `McPike, Jeremy S. (29th District)`,
  `Newman, Stephen D. (23rd District)`,
  `Norment, Thomas K. (3rd District)`,
  `Obenshain, Mark D. (26th District)`,
  `Peake, Mark J. (22nd District)`,
  `Petersen, J. Chapman "Chap" (34th District)`,
  `Pillion, Todd E. (40th District)`,
  `Reeves, Bryce E. (17th District)`,
  `Ruff, Frank M. (15th District)`,
  `Saslaw, Richard L. (35th District)`,
  `Spruill, Lionell (5th District)`,
  `Stanley, William M. (20th District)`,
  `Stuart, Richard H. (28th District)`,
  `Suetterlein, David R. (19th District)`,
  `Surovell, Scott A. (36th District)`,
  `Vogel, Jill Holtzman (27th District)`,
];

// forms
export const formsOverview = [
  {
    formName: "Step 1: Terms and Conditions",
    formDescription:
      "Please Accept the Terms and Conditions of the application. These are required before you continue.",
    link: TERMS,
    storeName: "terms",
  },
  {
    formName: "Step 2: Applicant Information",
    formDescription:
      "Now that you've accepted the terms, let's get started! In this form we'll ask you about applicant information.",
    link: APPLICANT_INFO,
    storeName: "applicantInfo",
  },
  {
    formName: "Step 3: Parent/Guardian Information",
    formDescription:
      "Keep going! Here you'll provide us with your parent or guardian information.",
    link: GUARDIAN_INFO,
    storeName: "guardianInfo",
  },
  {
    formName: "Step 4: Miscellaneous Information",
    formDescription:
      "Almost there! Provide us with information about your district, school, and past page service (if applicable).",
    link: MISC_INFO,
    storeName: "miscInfo",
  },
  {
    formName: "Step 5: Attachments",
    formDescription:
      "You're in the home stretch! Here you'll provide us with all the necessary attachments, including: applicant's essay, a short answer response, extracurricular information, letters of recommendation, and the school endorsement form.",
    link: ATTACHMENTS,
    storeName: "attachments",
  },
];

export const metaDataInitialState = {
  uid: null,
  email: null,
  displayName: null,
  district: null,
  senator: null,
  createdAt: new Date(),
  terms: null,
  termsLastTouched: null,
  termsCompleted: false,
  applicantInfo: null,
  applicantInfoLastTouched: null,
  applicantInfoCompleted: false,
  guardianInfo: null,
  guardianInfoLastTouched: null,
  guardianInfoCompleted: false,
  miscInfo: null,
  miscInfoLastTouched: null,
  miscInfoCompleted: false,
  attachments: null,
  attachmentsLastTouched: null,
  attachmentsCompleted: false,
  messages: 0,
  applicationStatus: `You have yet to begin your application adventure. Check the out the "You Look New Here" box down below for tips on how to get started!`,
  submitted: false,
  completed: false,
  youLookNew: true,
  secondaryGuardian: "No",
};

export const initialFormData = {
  termsInfo: {
    applicantTerms: false,
    guardianTerms: false,
  },
  applicantInfo: {
    prefix: "",
    fName: "",
    mName: "",
    lName: "",
    suffix: "",
    nickname: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    dob: "",
    email: "",
    hApply: "",
    hServed: "",
    hServiceDate: "",
  },
  guardianInfo: {
    prefix: "",
    fName: "",
    mName: "",
    lName: "",
    suffix: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    phoneType: "",
    phoneTwo: "",
    phoneTwoType: "",
    email: "",
  },
  secondaryGuardianInfo: {
    prefix: "",
    fName: "",
    mName: "",
    lName: "",
    suffix: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    phoneType: "",
    phoneTwo: "",
    phoneTwoType: "",
    email: "",
  },
  miscInfo: {
    district: "",
    familyService: "",
    familyServiceOneName: "",
    familyServiceOneBranch: "",
    familyServiceOneRelation: "",
    familyServiceOneYear: "",
    familyServiceTwoName: "",
    familyServiceTwoBranch: "",
    familyServiceTwoRelation: "",
    familyServiceTwoYear: "",
    gpa: "",
    grade: "",
    school: "",
  },
};

export const initialAttachmentsData = {
  photo: null,
  endorsements: null,
  extras: null,
  shortAnswer: null,
  essay: null,
  recs: null,
};
