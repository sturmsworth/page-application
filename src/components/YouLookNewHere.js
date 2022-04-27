import React, { useState, useContext, useEffect } from "react";

// context
import { MetaDataContext } from "../context/MetaDataContext";
import { AuthContext } from "../context/AuthContext";

// bootstrap
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";

// components
import CustomAccordionToggle from "./CustomAccordionToggle";

// styles
import "../styles/YouLookNewHere.scss";

const YouLookNewHere = () => {
  const { metaData, setMetaData, updateMetaDataDocument } =
    useContext(MetaDataContext);
  const { currentUser } = useContext(AuthContext);
  const { youLookNew } = metaData;

  // takes context and converts true/false to a number which is used by keyState
  const assignYouLookNewToNumber = () => {
    if (youLookNew === true) {
      return "0";
    }

    return "1";
  };

  const [keyState, setKeyState] = useState(assignYouLookNewToNumber);
  const [loading, setLoading] = useState(false);

  const clickyClicky = () => {
    const newMetaData = {
      ...metaData,
      youLookNew: !youLookNew,
    };

    setLoading(true);
    setMetaData(newMetaData);
  };

  useEffect(() => {
    let isMounted = true;

    const doThis = async () => {
      await updateMetaDataDocument(currentUser, {
        youLookNew: metaData.youLookNew,
      });

      if (isMounted) {
        setKeyState(assignYouLookNewToNumber);
        setLoading(false);
      }
    };

    doThis();

    return () => {
      isMounted = false;
    };
  }, [metaData]); // eslint-disable-line

  // active key is 0, so it will display info if keyState is 0
  return (
    <Accordion defaultActiveKey="0">
      <div className="new-here py-5 mt-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="grow" variant="light" />
          </div>
        ) : (
          <div>
            <div className="h3 text-center">
              {keyState === "0"
                ? "You Look New Here, Let Us Give You the Rundown"
                : "Need Help?"}
            </div>
            <Accordion.Collapse eventKey={keyState}>
              <div>
                <div className="welcome-message">
                  <div className="px-5">
                    Welcome to our new Senate Page Program web application!
                    Please review the information below, failing to follow these
                    instructions can lead to an incomplete application.
                  </div>
                  <ul className="px-5">
                    <li className="px-3">
                      All steps must be completed and submitted. This ensures
                      that we receive the entirety of your application before we
                      begin the review process.
                    </li>
                    <li className="px-3">
                      Each step can be saved at any time, but must be
                      "submitted" in order to be marked as complete. Once you
                      have saved your progress, you can feel free to log out or
                      exit the application. You'll be able to resume right where
                      you left off once you return. The same applies once a step
                      is completed.
                    </li>
                    <li className="px-3">
                      All necessary document downloads can be found in Step 5 or
                      in the "Form Downloads" box below.
                    </li>
                    <li className="px-3">
                      All attachments for "Step 5" must be submitted together.
                      You may complete them at your own pace, just be ready to
                      submit them all together once they've been completed.
                    </li>
                    <li className="px-3">
                      Once you have completed all the necessary requirements,
                      the "Mark Application as Complete" button will turn blue,
                      indicating that you're ready to submit the entirety of
                      your application and flag it for review.{" "}
                      <u>
                        This step is very important, and must be completed in
                        order for us to begin the evaluation.
                      </u>
                    </li>
                  </ul>
                </div>
              </div>
            </Accordion.Collapse>
            <div className="text-center">
              <CustomAccordionToggle
                firstText="Got It!"
                secondText="Show Me More"
                eventKey={keyState}
                handleClick={clickyClicky}
              />
            </div>
          </div>
        )}
      </div>
    </Accordion>
  );
};

export default YouLookNewHere;
