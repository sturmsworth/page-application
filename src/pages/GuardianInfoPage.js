import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";

// context
import { FormContext } from "../context/FormContext";
import { MetaDataContext } from "../context/MetaDataContext";
import { AuthContext } from "../context/AuthContext";

// utils
import {
  guardianInfoSchema,
  secondaryGuardianInfoSchema,
} from "../utils/schemas";
import { statesArray } from "../utils/constants";

// router
import { Redirect } from "react-router";

// routes
import { SUBMISSION_SUCCESS } from "../routes";

// bootstrap
import Col from "react-bootstrap/Col";

// components
import CustomContainerForForms from "../components/CustomContainerForForms";
import CustomInput from "../components/CustomInput";
import FormHeader from "../components/FormHeader";
import CustomButton from "../components/CustomButton";
import CustomPhoneInput from "../components/CustomPhoneInput";

const GuardianInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { formData, setFormData, updateFormDocument } = useContext(FormContext);
  const { updateMetaDataDocument, metaData, setMetaData, save, setSave } =
    useContext(MetaDataContext);
  const { currentUser } = useContext(AuthContext);
  const { guardianInfo, secondaryGuardianInfo } = formData;

  const [formErrors, setFormErrors] = useState("");

  const handleChangeGuardianOne = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        guardianInfo: {
          ...guardianInfo,
          [name]: value,
        },
      };
    });
  };

  const handleChangeGuardianTwo = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        secondaryGuardianInfo: {
          ...secondaryGuardianInfo,
          [name]: value,
        },
      };
    });
  };

  const handleSecondaryGuardianSelection = (e) => {
    const { value } = e.target;
    setMetaData((p) => {
      return {
        ...p,
        secondaryGuardian: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setFormErrors("");
      const checkGuardianOne = guardianInfoSchema.validate(guardianInfo, {
        abortEarly: false,
      });

      const checkGuardianTwo = secondaryGuardianInfoSchema.validate(
        secondaryGuardianInfo,
        {
          abortEarly: false,
        }
      );

      if (metaData.secondaryGuardian === "Yes") {
        await checkGuardianTwo;
        await checkGuardianOne;
      } else {
        await checkGuardianOne;
      }

      setMetaData((p) => {
        return {
          ...p,
          guardianInfo: "completed",
          guardianInfoLastTouched: new Date(),
          guardianInfoCompleted: true,
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

    if (isMounted && metaData.guardianInfoCompleted) {
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
          title="Parent or Guardian Information"
          instructions="Please fill all fields with the parent/guardian's information. Only One Parent or Guardian is required."
        />
        <form onSubmit={handleSubmit}>
          <div className="h5 cinzel pt-5">
            Primary Parent or Guardian Personal Information
          </div>
          <CustomInput
            name="prefix"
            value={guardianInfo.prefix}
            type="select"
            required
            dropValues={["Prefix", "Mr.", "Ms.", "Mrs."]}
            handleChange={handleChangeGuardianOne}
            errors={formErrors.prefix}
          />
          <CustomInput
            name="fName"
            required
            placeholder="First Name"
            value={guardianInfo.fName}
            errors={formErrors.fName}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="mName"
            placeholder="Middle Name"
            value={guardianInfo.mName}
            errors={formErrors.mName}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="lName"
            required
            placeholder="Last Name"
            errors={formErrors.lName}
            value={guardianInfo.lName}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="suffix"
            value={guardianInfo.suffix}
            type="select"
            dropValues={[
              "Suffix",
              "Jr.",
              "Sr.",
              "2nd",
              "III",
              "IV",
              "V",
              "Esq.",
              "Ph. D",
              "M.D.",
              "J.D.",
              "None",
            ]}
            handleChange={handleChangeGuardianOne}
          />

          <div className="h5 cinzel pt-5">
            Primary Parent or Guardian Address
          </div>
          <CustomInput
            name="addressOne"
            required
            placeholder="Street Address"
            value={guardianInfo.addressOne}
            errors={formErrors.addressOne}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="addressTwo"
            placeholder="Apartment, suite, unit, etc."
            value={guardianInfo.addressTwo}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="city"
            required
            placeholder="City"
            value={guardianInfo.city}
            errors={formErrors.city}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="state"
            value={guardianInfo.state}
            type="select"
            required
            dropValues={statesArray}
            handleChange={handleChangeGuardianOne}
            errors={formErrors.prefix}
          />
          <CustomInput
            name="zip"
            required
            placeholder="Zip Code"
            value={guardianInfo.zip}
            errors={formErrors.zip}
            handleChange={handleChangeGuardianOne}
          />

          <div className="h5 cinzel pt-5">
            Primary Parent or Guardian Contact
          </div>
          <CustomPhoneInput
            name="phone"
            required
            placeholder="Phone One"
            value={guardianInfo.phone}
            errors={formErrors.phone}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="phoneType"
            value={guardianInfo.phoneType}
            type="select"
            required
            dropValues={["Phone Type", "Work", "Home", "Cell"]}
            handleChange={handleChangeGuardianOne}
          />

          <CustomPhoneInput
            name="phoneTwo"
            placeholder="Phone Two"
            value={guardianInfo.phoneTwo}
            errors={formErrors.phoneTwo}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="phoneTwoType"
            value={guardianInfo.phoneTwoType}
            type="select"
            dropValues={["Phone Type", "Work", "Home", "Cell"]}
            handleChange={handleChangeGuardianOne}
          />
          <CustomInput
            name="email"
            required
            placeholder="Email Address"
            value={guardianInfo.email}
            type="email"
            errors={formErrors.email}
            handleChange={handleChangeGuardianOne}
          />

          <div className="h5 cinzel pt-5">
            Would you Like to Add a Secondary Parent/Guardian's Contact
            Information?
          </div>

          <CustomInput
            name="addSecondaryGuardian"
            value={metaData.secondaryGuardian}
            type="select"
            required
            dropValues={["Choose One", "Yes", "No"]}
            handleChange={handleSecondaryGuardianSelection}
          />

          {metaData.secondaryGuardian === "Yes" ? (
            <div>
              <div className="h5 cinzel pt-5">
                Secondary Parent or Guardian Personal Information
              </div>
              <CustomInput
                name="prefix"
                value={secondaryGuardianInfo.prefix}
                type="select"
                required
                dropValues={["Prefix", "Mr.", "Ms.", "Mrs."]}
                handleChange={handleChangeGuardianTwo}
                errors={formErrors.prefix}
              />
              <CustomInput
                name="fName"
                required
                placeholder="First Name"
                value={secondaryGuardianInfo.fName}
                errors={formErrors.fName}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="mName"
                placeholder="Middle Name"
                value={secondaryGuardianInfo.mName}
                errors={formErrors.mName}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="lName"
                required
                placeholder="Last Name"
                errors={formErrors.lName}
                value={secondaryGuardianInfo.lName}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="suffix"
                value={secondaryGuardianInfo.suffix}
                type="select"
                dropValues={[
                  "Suffix",
                  "Jr.",
                  "Sr.",
                  "2nd",
                  "III",
                  "IV",
                  "V",
                  "Esq.",
                  "Ph. D",
                  "M.D.",
                  "J.D.",
                  "None",
                ]}
                handleChange={handleChangeGuardianTwo}
              />

              <div className="h5 cinzel pt-5">
                Secondary Parent or Guardian Address
              </div>
              <CustomInput
                name="addressOne"
                required
                placeholder="Street Address"
                value={secondaryGuardianInfo.addressOne}
                errors={formErrors.addressOne}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="addressTwo"
                placeholder="Apartment, suite, unit, etc."
                value={secondaryGuardianInfo.addressTwo}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="city"
                required
                placeholder="City"
                value={secondaryGuardianInfo.city}
                errors={formErrors.city}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="state"
                value={secondaryGuardianInfo.state}
                type="select"
                required
                dropValues={statesArray}
                handleChange={handleChangeGuardianTwo}
                errors={formErrors.prefix}
              />
              <CustomInput
                name="zip"
                required
                placeholder="Zip Code"
                value={secondaryGuardianInfo.zip}
                errors={formErrors.zip}
                handleChange={handleChangeGuardianTwo}
              />

              <div className="h5 cinzel pt-5">
                Secondary Parent or Guardian Contact
              </div>
              <CustomPhoneInput
                name="phone"
                required
                placeholder="Phone One"
                value={secondaryGuardianInfo.phone}
                errors={formErrors.phone}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="phoneType"
                value={secondaryGuardianInfo.phoneType}
                type="select"
                required
                dropValues={["Phone Type", "Work", "Home", "Cell"]}
                handleChange={handleChangeGuardianTwo}
              />

              <CustomPhoneInput
                name="phoneTwo"
                placeholder="Phone Two"
                value={secondaryGuardianInfo.phoneTwo}
                errors={formErrors.phoneTwo}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="phoneTwoType"
                value={secondaryGuardianInfo.phoneTwoType}
                type="select"
                dropValues={["Phone Type", "Work", "Home", "Cell"]}
                handleChange={handleChangeGuardianTwo}
              />
              <CustomInput
                name="email"
                required
                placeholder="Email Address"
                value={secondaryGuardianInfo.email}
                type="email"
                errors={formErrors.email}
                handleChange={handleChangeGuardianTwo}
              />
            </div>
          ) : null}

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

export default GuardianInfoPage;
