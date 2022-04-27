import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";

// context
import { FormContext } from "../context/FormContext";
import { MetaDataContext } from "../context/MetaDataContext";
import { AuthContext } from "../context/AuthContext";

// utils
import { miscInfoSchema, familyServiceSchema } from "../utils/schemas";
import { districtArray } from "../utils/constants";

// router
import { Redirect } from "react-router";

// bootstrap
import Col from "react-bootstrap/Col";

// components
import CustomContainerForForms from "../components/CustomContainerForForms";
import CustomInput from "../components/CustomInput";
import FormHeader from "../components/FormHeader";
import CustomButton from "../components/CustomButton";
import { SUBMISSION_SUCCESS } from "../routes";

const MiscInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { formData, setFormData, updateFormDocument } = useContext(FormContext);
  const { updateMetaDataDocument, metaData, setMetaData, save, setSave } =
    useContext(MetaDataContext);
  const { currentUser } = useContext(AuthContext);
  const { miscInfo } = formData;

  const [formErrors, setFormErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        miscInfo: {
          ...miscInfo,
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
      const checkingData = miscInfoSchema.validate(miscInfo, {
        abortEarly: false,
      });

      if (miscInfo.familyService === "Yes") {
        const {
          familyServiceOneName,
          familyServiceOneBranch,
          familyServiceOneRelation,
          familyServiceOneYear,
          familyServiceTwoName,
          familyServiceTwoBranch,
          familyServiceTwoRelation,
          familyServiceTwoYear,
        } = miscInfo;

        const checkingServiceData = familyServiceSchema.validate(
          {
            familyServiceOneName,
            familyServiceOneBranch,
            familyServiceOneRelation,
            familyServiceOneYear,
            familyServiceTwoName,
            familyServiceTwoBranch,
            familyServiceTwoRelation,
            familyServiceTwoYear,
          },
          {
            abortEarly: false,
          }
        );

        await checkingServiceData;
      }

      await checkingData;

      setMetaData((p) => {
        return {
          ...p,
          district: miscInfo.district.replace(/[^0-9]/g, ""),
          senator: miscInfo.district.split(`,`)[0],
          miscInfo: "completed",
          miscInfoLastTouched: new Date(),
          miscInfoCompleted: true,
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

    if (isMounted && metaData.miscInfoCompleted) {
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
          title="Miscellaneous Information"
          instructions="Fill out any remaining relevant information."
        />
        <form onSubmit={handleSubmit}>
          <div className="h5 cinzel pt-5">District Information</div>
          <div className="pt-1">
            Not sure who your legislator is? Find out{" "}
            <a
              href="https://whosmy.virginiageneralassembly.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              here.
            </a>
          </div>

          <CustomInput
            name="district"
            value={miscInfo.district}
            type="select"
            required
            dropValues={districtArray}
            handleChange={handleChange}
            errors={formErrors.district}
          />

          <div className="h5 cinzel pt-5">School Information</div>
          <CustomInput
            name="school"
            required
            placeholder="School Name"
            value={miscInfo.school}
            errors={formErrors.school}
            handleChange={handleChange}
          />

          <CustomInput
            name="grade"
            required
            placeholder="Grade"
            value={miscInfo.grade}
            errors={formErrors.grade}
            handleChange={handleChange}
          />

          <CustomInput
            name="gpa"
            required
            placeholder="GPA/Overall Letter Grade"
            value={miscInfo.gpa}
            errors={formErrors.gpa}
            handleChange={handleChange}
          />

          <div className="h5 cinzel pt-5">Legacy Information</div>
          <div className="pt-1">
            Has a member of your family served as a Senate Page/Messenger or a
            House Page?
          </div>

          <CustomInput
            name="familyService"
            value={miscInfo.familyService}
            type="select"
            dropValues={["Choose an Option", "Yes", "No"]}
            handleChange={handleChange}
          />

          {miscInfo.familyService === "Yes" ? (
            <div>
              <div className="h5 cinzel pt-5">Family Service</div>
              <div className="pt-1">
                If you selected yes, please enter the following family legacy
                information. We'll accept two entries, this is not required.
              </div>
              <CustomInput
                name="familyServiceOneName"
                required
                placeholder="Name One"
                value={miscInfo.familyServiceOneName}
                errors={formErrors.familyServiceOneName}
                handleChange={handleChange}
              />

              <CustomInput
                name="familyServiceOneYear"
                required
                placeholder="Their Service Year"
                value={miscInfo.familyServiceOneYear}
                errors={formErrors.familyServiceOneYear}
                handleChange={handleChange}
              />

              <CustomInput
                name="familyServiceOneRelation"
                required
                placeholder="Relation"
                value={miscInfo.familyServiceOneRelation}
                errors={formErrors.familyServiceOneRelation}
                handleChange={handleChange}
              />

              <CustomInput
                name="familyServiceOneBranch"
                value={miscInfo.familyServiceOneBranch}
                type="select"
                dropValues={["Their Service Branch", "House", "Senate"]}
                handleChange={handleChange}
              />

              <br />
              <br />
              <br />

              <CustomInput
                name="familyServiceTwoName"
                placeholder="Name Two"
                value={miscInfo.familyServiceTwoName}
                errors={formErrors.familyServiceTwoName}
                handleChange={handleChange}
              />

              <CustomInput
                name="familyServiceTwoYear"
                placeholder="Their Service Year"
                value={miscInfo.familyServiceTwoYear}
                errors={formErrors.familyServiceTwoYear}
                handleChange={handleChange}
              />

              <CustomInput
                name="familyServiceTwoRelation"
                placeholder="Relation"
                value={miscInfo.familyServiceTwoRelation}
                errors={formErrors.familyServiceTwoRelation}
                handleChange={handleChange}
              />

              <CustomInput
                name="familyServiceTwoBranch"
                value={miscInfo.familyServiceTwoBranch}
                type="select"
                dropValues={["Their Service Branch", "House", "Senate"]}
                handleChange={handleChange}
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

export default MiscInfoPage;
