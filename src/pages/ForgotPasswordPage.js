import React, { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Redirect } from "react-router-dom";

import { FORGOT_PASSWORD_SUCCESS } from "../routes";

import { Col } from "react-bootstrap";

import CustomContainer from "../components/CustomContainer";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const ForgotPasswordPage = () => {
  const initialFormState = {
    email: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [redirect, setRedirect] = useState(false);
  const [authError, setAuthError] = useState(null);

  const { email } = formState;

  const { resetPassword } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(formState);
      setRedirect(true);
    } catch (e) {
      setAuthError(e);
    }
  };

  return redirect ? (
    <Redirect to={FORGOT_PASSWORD_SUCCESS} />
  ) : (
    <CustomContainer>
      <Col>
        <div className="h1 text-center cinzel">Reset Password</div>

        <form onSubmit={handleSubmit}>
          <CustomInput
            name="email"
            required
            placeholder="Email Adddress"
            value={email}
            type="email"
            handleChange={handleChange}
          />

          {authError ? (
            <div className="text-danger pt-3">{authError.message}</div>
          ) : null}

          <CustomButton
            buttonType="submit"
            name="Request Password Reset"
            handleClick={handleSubmit}
          />
        </form>
      </Col>
    </CustomContainer>
  );
};

export default ForgotPasswordPage;
