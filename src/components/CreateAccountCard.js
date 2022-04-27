import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";

// context
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

// utils
import { createAccountSchema } from "../utils/schemas";

// routes
import { REGISTRATION_SUCCESS } from "../routes/index";

// components
import CustomInput from "./CustomInput";
import CustomDOBInput from "./CustomDOBInput";
import CustomPasswordInput from "./CustomPasswordInput";
import CustomButton from "./CustomButton";

const CreateAccountCard = () => {
  const initialFormState = {
    fName: "",
    lName: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormState);
  const [authError, setAuthError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { fName, lName, email, dob, password, confirmPassword } = formState;

  const {
    signup,
    sendVerificationEmail,
    updateDisplayName,
    authLoading,
    setAuthLoading,
    signOut,
  } = useContext(AuthContext);

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
    setAuthLoading(true);
    setAuthError(null);

    try {
      setFormErrors(initialFormState);
      await createAccountSchema.validate(formState, {
        abortEarly: false,
      });

      await signup(formState);
      await updateDisplayName(formState);
      await sendVerificationEmail();
      await signOut();

      setRedirect(true);
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

      setAuthLoading(false);
      setAuthError(err.message);
    }

    setAuthLoading(false);
  };

  return redirect ? (
    <Redirect to={REGISTRATION_SUCCESS} />
  ) : (
    <Col>
      <div className="h1 text-center cinzel">Create Account</div>
      <form onSubmit={handleSubmit}>
        <CustomInput
          name="fName"
          required
          placeholder="First Name"
          value={fName}
          errors={formErrors.fName}
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
        <CustomDOBInput
          name="dob"
          required
          placeholder="Date of Birth"
          value={dob}
          errors={formErrors.dob}
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
        <CustomPasswordInput
          name="password"
          required
          placeholder="Password"
          type="password"
          errors={formErrors.password}
          value={password}
          handleChange={handleChange}
        />
        <CustomPasswordInput
          name="confirmPassword"
          required
          type="password"
          placeholder="Confirm Password"
          errors={formErrors.confirmPassword}
          value={confirmPassword}
          handleChange={handleChange}
        />

        {authError ? (
          <div className="text-center text-danger">
            <div>{authError}</div>
          </div>
        ) : null}

        <CustomButton
          buttonType="btn"
          name={
            authLoading ? (
              <Spinner animation="grow" variant="light" />
            ) : (
              "Create Account"
            )
          }
          type="submit"
          onSubmit={handleSubmit}
        />
      </form>
    </Col>
  );
};

export default CreateAccountCard;
