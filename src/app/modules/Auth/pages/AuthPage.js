/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Link, Switch, Redirect} from "react-router-dom";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import {ContentRoute} from "../../../../_metronic/layout"
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import CreatingMeeting from "./CreateMeeting";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { FormattedMessage } from "react-intl";

export function AuthPage() {
  return (
      <>
        <div className="d-flex flex-column flex-root">
          {/*begin::Login*/}
          <div
              className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
              id="kt_login"
          >
            {/*begin::Aside*/}
            <div
                className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl("/media/bg/qmic_bg.png")})`
                }}
            >
              {/*begin: Aside Container*/}
              <div className="d-flex flex-row-fluid flex-column justify-content-between">
                {/* start:: Aside header */}
                <Link to="/" className="flex-column-auto mt-5">
                  <img
                      alt="Logo"
                      className="max-h-70px"
                      src={toAbsoluteUrl("/media/logos/logo.png")}
                  />
                </Link>
                {/* end:: Aside header */}

                {/* start:: Aside content */}
                <div className="flex-column-fluid d-flex flex-column justify-content-center">
                  <h3 className="font-size-h1 mb-5 text-white">
                    <FormattedMessage id="AUTH.REGISTER.QMIC">Welcome to QMIC!</FormattedMessage>
                  </h3>
                  <p className="font-weight-lighter text-white opacity-80">
                  </p>
                </div>
                {/* end:: Aside content */}

                {/* start:: Aside footer for desktop */}
                <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                  <div className="opacity-70 font-weight-bold	text-white">
                    <FormattedMessage id="AUTH.REGISTER.COPY">&copy; 2020 QMIC</FormattedMessage>
                  </div>
                  <div className="d-flex">
                    <Link to="/terms" className="text-white">

                    </Link>
                    <Link to="/terms" className="text-white ml-10">
                      
                    </Link>
                  </div>
                </div>
                {/* end:: Aside footer for desktop */}
              </div>
              {/*end: Aside Container*/}
            </div>
            {/*begin::Aside*/}

            {/*begin::Content*/}
            <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
              {/*begin::Content header*/}
              <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
                <span className="font-weight-bold text-dark-50"><FormattedMessage id="AUTH.GENERAL.NO_ACCOUNT">Don't have an account yet?</FormattedMessage></span>
                <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">Sign Up!</Link>
              </div>
              {/*end::Content header*/}

              {/* begin::Content body */}
              <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
                <Switch>
                
                <ContentRoute path="/auth/login" component={Login}/>
                <ContentRoute path="/auth/registration" component={Registration}/>
                <ContentRoute
                    path="/auth/forgot-password"
                    component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login"/>
                <Redirect to="/auth/login"/>
              </Switch>
              </div>
              {/*end::Content body*/}

              {/* begin::Mobile footer */}
              <div
                  className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
                <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                  &copy; 2020 QMIC
                </div>
                <div className="d-flex order-1 order-sm-2 my-2">
                  <Link to="/terms" className="text-dark-75 text-hover-primary">
                    
                  </Link>
                  <Link
                      to="/terms"
                      className="text-dark-75 text-hover-primary ml-4"
                  >
                    
                  </Link>
                </div>
              </div>
              {/* end::Mobile footer */}
            </div>
            {/*end::Content*/}
          </div>
          {/*end::Login*/}
        </div>
      </>
  );
}
