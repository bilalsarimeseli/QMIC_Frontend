import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import * as meeting from "../_redux/meetingRedux";
import { crateMeeting } from "../_redux/meetingCrud";
import {Notice} from "../../../../_metronic/_partials/controls";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import QRCode from "qrcode.react";
import {Alert} from "react-bootstrap";
const initialValues = {
  description: "",
  meetingPIN: "",
  startDate: today,
  isPrivate: false,
  meetingLink: "", 
  copySuccess: ""
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const today = {date : new Date()};

function CreatingMeeting(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const CreateMeetingSchema = Yup.object().shape({
    description: Yup.string()
      .min(5, "Minimum 5 symbols")
      .max(100, "Maximum 100 symbols")
      .required(
        intl.formatMessage({
          id: "MEETING.MEETING_ID.REQUIRED_FIELD",
        })
      ),
    meetingPIN: Yup.string()
      .when("isPrivate", {
        is: (val) => (val && val == true),
        then: Yup.string()
        .min(4, "Minimum 3 symbols")
        .max(6, "Maximum 6 symbols")
        .required(
          [Yup.ref("meetingPIN")],
          "Required PIN"
        ),
      }),
      startDate: Yup.date()
      .min(new Date(Date.now()), "Must be Greater than today")
      .required(
        intl.formatMessage({
          id: "MEETING.MEETING_ID.REQUIRED_FIELD",
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
    validationSchema: CreateMeetingSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      crateMeeting(values.startDate, values.description, {pin:values.meetingPIN, is_private:values.isPrivate})
        .then(({ data: { meeting_id } }) => {
          props.crateMeeting(meeting_id);
          disableLoading();
          values.meetingLink = "http://qmic.online/subscribe/" + meeting_id; 
          setStatus(
            intl.formatMessage({
              id: "Create meeting operation success of " + meeting_id,
            })
          );
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "MEETING.CREATE.ERROR_MESSAGE",
            })
          );
          disableLoading();
        });
    },
  });
  const classes = useStyles();
  return (
    <div className="row">
    <div className="col-md-6">
    <Notice>
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="MEETING.CREATE.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your details to create your meeting
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

        {/* begin: Description */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Description"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "description"
            )}`}
            name="description"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.description}</div>
            </div>
          ) : null}
        </div>
        {/* end: Description */}

        {/* begin: isPrivate */}
        <div className="form-group">
          <label className="checkbox">
            <input
              type="checkbox"
              name="isPrivate"
              {...formik.getFieldProps("isPrivate")}
            />
            Private Meeting
            <span />
          </label>
        </div>
        {/* end: isPrivate */}

        {formik.values.isPrivate && (
        <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Meeting PIN"
          type="number"
          maxlength="6"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "text"
          )}`}
          name="meetingPIN"
          {...formik.getFieldProps("meetingPIN")}
        />
        {formik.touched.meetingPIN && formik.errors.meetingPIN ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.meetingPIN}</div>
          </div>
        ) : null}
      </div>
        )}
        
          {/* begin: Start Date Picker */}
          <div className="form-group fv-plugins-icon-container">
          <TextField
            id="startDate"
            label="Start Date"
            type="datetime-local"
            defaultValue={new Date(Date.now())}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            {...formik.getFieldProps("startDate")}
          />
          {formik.touched.startDate && formik.errors.startDate ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.startDate}
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
            <span>Create</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
    </div>
    </Notice>
    </div>
    {formik.values.meetingLink ?      
    <div className="col-md-6">
       <QRCode
    id="meetingQRCode"
    value={formik.values.meetingLink}
    size={430}
    level={"H"}
    includeMargin={true}
    />
     <Alert key="meetingLink" variant="secondary">
            This is a meeting link. &nbsp;
            <Alert.Link href={formik.values.meetingLink}>{formik.values.meetingLink}</Alert.Link>
      </Alert>
     </div> : null}
     </div>
  ); 
}

export default injectIntl(connect(null, meeting.actions)(CreatingMeeting));
