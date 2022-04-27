import React from "react";

// context providers
import MetaDataContextProvider from "./context/MetaDataContext";
import FormContextProvider from "./context/FormContext";
import AuthContextProvider from "./context/AuthContext";
import AttachmentsContextProvider from "./context/AttachmentsContext";
import TableDataContextProvider from "./context/TableDataContext";

// packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// routes
import * as ROUTES from "./routes/index";

// pages
import Homepage from "./pages/Homepage";
import AboutUsPage from "./pages/AboutUsPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import MyAccountPage from "./pages/MyAccountPage";
import SignInPage from "./pages/SignInPage";
import ContactUsPage from "./pages/ContactUsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ApplicantInfoPage from "./pages/ApplicantInfoPage";
import GuardianInfoPage from "./pages/GuardianInfoPage";
import TermsPage from "./pages/TermsPage";
import MiscInfoPage from "./pages/MiscInfoPage";
import AttachmentsPage from "./pages/AttachmentsPage";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import SubmissionSuccessPage from "./pages/SubmissionSuccessPage";
import ForgotPasswordSuccessPage from "./pages/ForgotPasswordSuccessPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AdminSignInPage from "./pages/AdminSignInPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

// components
import MyNav from "./components/MyNav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";

// scss
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <AuthContextProvider>
          <MetaDataContextProvider>
            <FormContextProvider>
              <AttachmentsContextProvider>
                <TableDataContextProvider>
                  <MyNav />
                  <Switch>
                    <Route exact path={ROUTES.HOME} component={Homepage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route
                      path={ROUTES.CREATE_ACCOUNT}
                      component={CreateAccountPage}
                    />
                    <Route
                      path={ROUTES.REGISTRATION_SUCCESS}
                      component={RegistrationSuccessPage}
                    />

                    <Route
                      path={ROUTES.ADMIN_SIGN_IN}
                      component={AdminSignInPage}
                    />

                    <PrivateRoute
                      path={ROUTES.MY_ACCOUNT}
                      component={MyAccountPage}
                    />
                    <Route
                      path={ROUTES.FORGOT_PASSWORD}
                      component={ForgotPasswordPage}
                    />

                    <Route
                      path={ROUTES.FORGOT_PASSWORD_SUCCESS}
                      component={ForgotPasswordSuccessPage}
                    />

                    <Route
                      path={ROUTES.VERIFY_EMAIL}
                      component={VerifyEmailPage}
                    />

                    <Route path={ROUTES.CONTACT_US} component={ContactUsPage} />
                    <Route path={ROUTES.ABOUT_US} component={AboutUsPage} />
                    <PrivateRoute
                      path={ROUTES.APPLICANT_INFO}
                      component={ApplicantInfoPage}
                    />

                    <PrivateAdminRoute
                      path={ROUTES.ADMIN_DASHBOARD}
                      component={AdminDashboardPage}
                    />

                    <PrivateRoute path={ROUTES.TERMS} component={TermsPage} />

                    <PrivateRoute
                      path={ROUTES.GUARDIAN_INFO}
                      component={GuardianInfoPage}
                    />
                    <PrivateRoute
                      path={ROUTES.MISC_INFO}
                      component={MiscInfoPage}
                    />
                    <PrivateRoute
                      path={ROUTES.SUBMISSION_SUCCESS}
                      component={SubmissionSuccessPage}
                    />

                    <PrivateRoute
                      path={ROUTES.ATTACHMENTS}
                      component={AttachmentsPage}
                    />
                  </Switch>
                  <Footer />
                </TableDataContextProvider>
              </AttachmentsContextProvider>
            </FormContextProvider>
          </MetaDataContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
