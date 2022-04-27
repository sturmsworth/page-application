import React, { useEffect, useContext, useState } from "react";

// router
import { Redirect } from "react-router";

// context
import { FormContext } from "../context/FormContext";
import { MetaDataContext } from "../context/MetaDataContext";
import { AuthContext } from "../context/AuthContext";

// bootstrap
import Col from "react-bootstrap/Col";

// constants
import {
  displayYearPlusOne,
  dueDate,
  essayTopics,
  shortAnswerTopics,
} from "../utils/constants";

// components
import CustomContainerForForms from "../components/CustomContainerForForms";
import FormHeader from "../components/FormHeader";
import CustomButton from "../components/CustomButton";

// routes
import { SUBMISSION_SUCCESS } from "../routes";

const TermsPage = () => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { formData, setFormData, updateFormDocument } = useContext(FormContext);
  const { updateMetaDataDocument, metaData, setMetaData } =
    useContext(MetaDataContext);
  const { currentUser } = useContext(AuthContext);
  const { termsInfo } = formData;

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((p) => {
      return {
        ...p,
        termsInfo: {
          ...termsInfo,
          [name]: checked,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMetaData((p) => {
      return {
        ...p,
        terms: "completed",
        termsLastTouched: new Date(),
        termsCompleted: true,
      };
    });
  };

  useEffect(() => {
    let isMounted = true;

    const doThis = async () => {
      await updateFormDocument(currentUser, formData);
      await updateMetaDataDocument(currentUser, metaData);
    };

    doThis();

    if (isMounted && metaData.termsCompleted) {
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
      <Col className="pt-5 mt-5">
        <FormHeader
          title="Terms and Conditions"
          instructions="Before your application can be considered you must agree to the terms and conditions of the Senate Page Program Application. Please read over the information presented below and ensure that both the applicant and parent/guardian accept the agreement."
        />
        <div className="h5 cinzel pt-5">
          Application for {displayYearPlusOne} Session
        </div>
        <div className="pt-1">
          Applications should be submitted no earlier than August 3rd and no
          later than {dueDate}
        </div>

        <section id="general-information">
          <div className="h5 cinzel pt-5">I. General Information</div>
          <hr />
          <div className="pt-1 text-left">
            Please read this section carefully and completely. Highlights of the
            Senate Page Program (SPP) are included in this section. If you apply
            for the program, you should not plan vacations and activities during
            the legislative session and your school break may occur during this
            time. Discuss this application with your family, your principal, and
            your teachers before it is submitted. Senate Pages are required to
            work on state holidays during session.
          </div>
        </section>

        <section id="application">
          <div className="h5 cinzel pt-5">II. Application</div>
          <hr />
          <div className="pt-1 text-left">
            Persons interested in Senate Page appointments should complete the
            online application. The applicant is responsible for completing and
            submitting their application. We encourage parents/legal guardians
            to assist with the application process. The House Page Program is a
            separate application with different requirements and deadlines. The
            following items are required to submit your application online:
          </div>
          <div id="application-details" className="pt-3">
            <ol>
              <li className="text-left">
                School Endorsement form - completed by your principal, and
                school/guidance counselor.
              </li>
              <li className="text-left">
                Two professional letters of recommendation, addressed to your
                state Senator. (Letters should be scanned together as one file)
                Letters of recommendation can come from teachers, coaches, civic
                leaders, Senators, or Delegates. You do not need a letter of
                endorsement from a legislator.
              </li>
              <li className="text-left">
                A short answer question:
                <ul className="py-2">
                  {shortAnswerTopics.map((topic, i) => {
                    return (
                      <li className="text-left" key={`${i}-short-answer`}>
                        {topic}
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="text-left">
                A personal essay of no more than 300 words on one of the
                following topics:
                <ul className="pt-2">
                  {essayTopics.map((topic, i) => {
                    return (
                      <li key={`${i}-essay`} className="text-left pt-2">
                        {topic}
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ol>
          </div>
        </section>

        <section id="checklist">
          <div className="h5 cinzel pt-5">III. Checklist for Applicants</div>
          <hr />
          <div className="pt-1 text-left">
            Before completing the online application, please make sure you have
            completed all information fields and have attached the following:
          </div>
          <div id="check-em" className="pt-3">
            <ol>
              <li className="text-left">
                Applicant Photo (JPEG only, file not to exceed 10MB)
              </li>
              <li className="text-left">
                Activities Form (.pdf only, file not to exceed 5MB)
              </li>
              <li className="text-left">
                Essay (.pdf only, file not to exceed 5MB)
              </li>
              <li className="text-left">
                School Endorsement form (.pdf only, file not to exceed 5MB)
              </li>
              <li className="text-left">
                Two letters of recommendation (.pdf only, file not to exceed
                5MB)
              </li>
            </ol>
          </div>
        </section>

        <section id="questions">
          <div className="h5 cinzel pt-5">IV. Questions?</div>
          <hr />
          <div className="pt-1 text-left">
            Please call us at (804) 698-7410 or send an e-mail to
            pageinfo@senate.virginia.gov with any questions about the program or
            application. Selections are usually made by mid-December for the
            upcoming legislative session in January.
          </div>
        </section>

        <form id="terms-checkboxes" className="pt-3" onSubmit={handleSubmit}>
          <div className="text-left">
            <input
              type="checkbox"
              checked={termsInfo.applicantTerms}
              name="applicantTerms"
              id="applicantTerms-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="" className="ml-3">
              I (the applicant) reviewed and understand the above information.
            </label>
          </div>
          <div className="text-left">
            <input
              type="checkbox"
              checked={termsInfo.guardianTerms}
              id="guardianTerms-checkbox"
              name="guardianTerms"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="" className="ml-3">
              I (the parent/legal guardian) reviewed and understand the above
              information.
            </label>
          </div>

          {termsInfo.applicantTerms && termsInfo.guardianTerms ? (
            <CustomButton
              name="Mark as Complete"
              type="submit"
              buttonType="btn"
              diabled={loading.toString()}
            />
          ) : (
            <CustomButton name="Save and Continue" buttonType="btn" disabled />
          )}
        </form>
      </Col>
    </CustomContainerForForms>
  );
};

export default TermsPage;
