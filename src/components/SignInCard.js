import React, { useState, useContext } from "react";
import * as Yup from "yup";

// react-router-dom
import { Redirect, Link } from "react-router-dom";

// routes
import { ADMIN_SIGN_IN, FORGOT_PASSWORD, MY_ACCOUNT } from "../routes/index";

// context
import { AuthContext } from "../context/AuthContext";

// bootstrap
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

// components
import CustomInput from "./CustomInput";
import CustomPasswordInput from "./CustomPasswordInput";
import CustomButton from "./CustomButton";

// utils
import { signInSchema } from "../utils/schemas";

const SignInCard = () => {
  const initialFormState = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormState);
  const [authError, setAuthError] = useState(null);

  const { email, password } = formState;

  const {
    currentUser,
    signInWithEmailAndPassword,
    authLoading,
    setAuthLoading,
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
      await signInSchema.validate(formState, {
        abortEarly: false,
      });

      await signInWithEmailAndPassword(formState);
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

  return currentUser ? (
    <Redirect to={MY_ACCOUNT} />
  ) : (
    <Col>
      <div className="h1 text-center cinzel">Sign In</div>

      <form onSubmit={handleSubmit}>
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

        {authError ? (
          <div className="pt-3 text-center text-danger">
            <div>{authError}</div>
          </div>
        ) : null}

        <CustomButton
          // disabled={authLoading}
          buttonType="btn"
          name={
            authLoading ? (
              <Spinner animation="grow" variant="light" />
            ) : (
              "Sign In"
            )
          }
          type="submit"
        />

        <div className="pt-3">
          <Link to={FORGOT_PASSWORD}>Forgot Password?</Link>
        </div>

        <div className="pt-3">
          <Link to={ADMIN_SIGN_IN}>Admin Sign In</Link>
        </div>
      </form>
    </Col>
  );
};

export default SignInCard;
