import React, { useState } from "react";
import { useFormik, Form } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  FormattedMessage,
  injectIntl,
  IntlShape,
  defineMessages,
} from "react-intl";
import * as auth from "../_redux/authRedux";
import { register, login } from "../_redux/authCrud";

const initialValues = {
  email: "",
  password: "",
  changepassword: "",
};

function Registration(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      register(values.email, values.password)
        .then(({ data: { register_success } }) => {
          props.register(register_success);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.SUCCESS_REGISTER",
            })
          );
          disableLoading();
          setTimeout(() => {
            login(formik.values.email, formik.values.password)
              .then(({ data: { access_token } }) => {
                props.login(access_token);
              })
              .catch(() => {});
          }, 500);
        })
        .catch(() => {
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          disableLoading();
        });
    },
  });

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          <FormattedMessage
            id="AUTH.REGISTER.DESC"
            Enter
            your
            details
            to
            create
            your
            account
          />
        </p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <FormattedMessage
            id="AUTH.REGISTER.PLCHLDREMAIL"
            defaultMessage="Email"
          >
            {(placeholder) => (
              <input
                placeholder={placeholder}
                type="email"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "email"
                )}`}
                name="email"
                {...formik.getFieldProps("email")}
              />
            )}
          </FormattedMessage>

          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: Password */}

        <div className="form-group fv-plugins-icon-container">
          <FormattedMessage
            id="AUTH.REGISTER.PLCHLDRPSWRD"
            defaultMessage="Password"
          >
            {(placeholder) => (
              <input
                placeholder={placeholder}
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
            )}
          </FormattedMessage>

          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <FormattedMessage
            id="AUTH.REGISTER.PLCHLDRCNFRM"
            defaultMessage="Confirm Password"
          >
            {(placeholder) => (
              <input
                placeholder={placeholder}
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "changepassword"
                )}`}
                name="changepassword"
                {...formik.getFieldProps("changepassword")}
              />
            )}
          </FormattedMessage>
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.changepassword}
              </div>
            </div>
          ) : null}
        </div>

        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span>
              <FormattedMessage id="AUTH.REGISTER.SUBMIT">
                Submit
              </FormattedMessage>
            </span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              <FormattedMessage id="AUTH.REGISTER.CANCEL">
                Cancel
              </FormattedMessage>
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
