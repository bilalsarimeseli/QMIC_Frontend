import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as subscribe from "../_redux/subscribeRedux";
const initialValues = {
  meetingId: "",
  description: "",
  pin: "",
};

function Subscribe(props) {
  const { intl } = props;
  initialValues.meetingId = props.match.params.meetingId;
  const [loading, setLoading] = useState(false);
  const SubscribeSchema = Yup.object().shape({
    pin: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
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
    validationSchema: SubscribeSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        subscribe(values.meetingId, values.pin)
          .then(({ data: { subscribe_success } }) => {
            disableLoading();
            props.subscribe(subscribe_success);
          })
          .catch(() => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "SUBSCRIBE.VALIDATION.INVALID_INFORMATION",
              })
            );
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="SUBSCRIBE.MEETING.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Please enter meeting information
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : null}

        <div className="form-group fv-plugins-icon-container">
          <input
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "meetingId"
            )}`}
            value={initialValues.meetingId}
            name="meetingId"
            disabled="disabled"
          />
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            type="text"
            disabled="disabled"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "description"
            )}`}
            value="This field description"
            name="description"
          />
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Subscribe</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, subscribe.actions)(Subscribe));
