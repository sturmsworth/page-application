import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";

// context
import { FormContext } from "../context/FormContext";
import { MetaDataContext } from "../context/MetaDataContext";
import { AuthContext } from "../context/AuthContext";

// utils
import { applicantInfoSchema } from "../utils/schemas";
import { statesArray } from "../utils/constants";

// router
import { Redirect } from "react-router";

// bootstrap
import Col from "react-bootstrap/Col";

// components
import CustomContainerForForms from "../components/CustomContainerForForms";
import CustomInput from "../components/CustomInput";
import CustomPhoneInput from "../components/CustomPhoneInput";
import CustomDOBInput from "../components/CustomDOBInput";
import FormHeader from "../components/FormHeader";
import CustomButton from "../components/CustomButton";
import { SUBMISSION_SUCCESS } from "../routes";

const ApplicantInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { formData, setFormData, updateFormDocument } = useContext(FormContext);
  const { updateMetaDataDocument, metaData, setMetaData, setSave, save } =
    useContext(MetaDataContext);
  const { currentUser } = useContext(AuthContext);
  const { applicantInfo } = formData;

  const [formErrors, setFormErrors] = useState("");

  const {
    prefix,
    fName,
    mName,
    lName,
    suffix,
    nickname,
    addressOne,
    addressTwo,
    city,
    state,
    zip,
    phone,
    dob,
    email,
    hApply,
    hServed,
    hServiceDate,
  } = applicantInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        applicantInfo: {
          ...applicantInfo,
          [name]: value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setFormErrors("");
      const checkingData = applicantInfoSchema.validate(applicantInfo, {
        abortEarly: false,
      });

      await checkingData;

      setMetaData((p) => {
        return {
          ...p,
          applicantInfo: "completed",
          applicantInfoLastTouched: new Date(),
          applicantInfoCompleted: true,
        };
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.map((err) => {
          return setFormErrors((prev) => {
            return {
              ...prev,
              [err.path]: err.message,
            };
          });
        });
      }

      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateFormDocument(currentUser, formData);
    setLoading(false);
    setSave(
      "Your document has been successfully saved. You may exit the page or logout, your progress will be here when you get back."
    );
  };

  useEffect(() => {
    let isMounted = true;

    setSave(null);

    const doThis = async () => {
      await updateFormDocument(currentUser, formData);
      await updateMetaDataDocument(currentUser, metaData);
      setLoading(false);
    };

    doThis();

    if (isMounted && metaData.applicantInfoCompleted) {
      setRedirect(true);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [metaData]);

  return redirect ? (
    <Redirect to={SUBMISSION_SUCCESS} />
  ) : (
    <CustomContainerForForms>
      <Col className="mt-5">
        <FormHeader
          title="Applicant Information"
          instructions="Please fill all fields with the applicant's (not the parent/guardian's) information."
        />
        <form onSubmit={handleSubmit}>
          <div className="h5 cinzel pt-5">Name</div>
          <CustomInput
            name="prefix"
            value={prefix}
            type="select"
            required
            dropValues={["Prefix", "Mr.", "Ms."]}
            handleChange={handleChange}
            errors={formErrors.prefix}
          />
          <CustomInput
            name="fName"
            required
            placeholder="First Name"
            value={fName}
            errors={formErrors.fName}
            handleChange={handleChange}
          />
          <CustomInput
            name="mName"
            placeholder="Middle Name"
            value={mName}
            errors={formErrors.mName}
            handleChange={handleChange}
          />
          <CustomInput
            name="lName"
            required
            placeholder="Last Name"
            errors={formErrors.lName}
            value={lName}
            handleChange={handleChange}
          />
          <CustomInput
            name="suffix"
            value={suffix}
            type="select"
            dropValues={["Suffix", "Jr.", "II", "III", "IV", "V", "None"]}
            handleChange={handleChange}
          />
          <CustomInput
            name="nickname"
            placeholder="Preferred Name"
            value={nickname}
            handleChange={handleChange}
          />

          <div className="h5 cinzel pt-5">Address</div>
          <CustomInput
            name="addressOne"
            required
            placeholder="Street Address"
            value={addressOne}
            errors={formErrors.addressOne}
            handleChange={handleChange}
          />
          <CustomInput
            name="addressTwo"
            placeholder="Apartment, suite, unit, etc."
            value={addressTwo}
            handleChange={handleChange}
          />
          <CustomInput
            name="city"
            required
            placeholder="City"
            value={city}
            errors={formErrors.city}
            handleChange={handleChange}
          />
          <CustomInput
            name="state"
            value={state}
            type="select"
            required
            dropValues={statesArray}
            handleChange={handleChange}
            errors={formErrors.prefix}
          />
          <CustomInput
            name="zip"
            required
            placeholder="Zip Code"
            value={zip}
            errors={formErrors.zip}
            handleChange={handleChange}
          />

          <div className="h5 cinzel pt-5">Contact</div>
          <CustomPhoneInput
            name="phone"
            required
            placeholder="Phone Number"
            value={phone}
            errors={formErrors.phone}
            handleChange={handleChange}
          />
          <CustomInput
            name="email"
            required
            placeholder="Email Address"
            value={email}
            type="email"
            errors={formErrors.email}
            handleChange={handleChange}
          />

          <div className="h5 cinzel pt-5">Date of Birth</div>
          <CustomDOBInput
            name="dob"
            required
            placeholder="Date of Birth"
            value={dob}
            errors={formErrors.dob}
            handleChange={handleChange}
          />

          <div className="h5 cinzel pt-5">Service History</div>
          <div className="pt-5 text-secondary">
            Have you also applied to be a House Page this year? *
          </div>
          <CustomInput
            name="hApply"
            value={hApply}
            type="select"
            required
            dropValues={["Choose One", "Yes", "No"]}
            handleChange={handleChange}
            errors={formErrors.hApply}
          />

          <div className="pt-5 text-secondary">
            Have you ever served as a House Page? *
          </div>
          <CustomInput
            name="hServed"
            value={hServed}
            type="select"
            required
            dropValues={["Choose One", "Yes", "No"]}
            handleChange={handleChange}
            errors={formErrors.hServed}
          />

          <div className="pt-5 text-secondary">
            If applicable, what year did you serve as a House Page?
          </div>
          <CustomInput
            name="hServiceDate"
            placeholder="Format: YYYY"
            value={hServiceDate}
            errors={formErrors.hServiceDate}
            handleChange={handleChange}
          />

          <div className="text-success pt-3">{save ?? <p>{save}</p>}</div>

          <CustomButton
            buttonType="btn"
            name="Save Your Progress"
            onClick={handleSave}
            disabled={loading}
          />

          <CustomButton
            buttonType="btn ml-3"
            name="Mark as Complete"
            type="submit"
            disabled={loading}
          />
        </form>
      </Col>
    </CustomContainerForForms>
  );
};

export default ApplicantInfoPage;
