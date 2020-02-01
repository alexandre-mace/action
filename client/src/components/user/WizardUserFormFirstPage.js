import React from "react";
import {ErrorMessage, Field, connect} from "formik";
import {TextField} from "formik-material-ui";

const WizardUserFormFirstPage = (props) => (
    <>
      <div className="form-group">
        <Field component={TextField<{helperText: "Incorrect entry."}} value={props.formik.values.firstName ? props.formik.values.firstName : ''} {...props} label="Prénom" margin="normal" fullWidth name="firstName" type="text"/>
        <ErrorMessage {...props}  name="firstName"  component="div" className="invalid-feedback"/>
      </div>
      <div className="form-group">
        <Field component={TextField<{helperText: "Incorrect entry."}} {...props} value={props.formik.values.lastName ? props.formik.values.lastName : ''} label="Nom" margin="normal" fullWidth name="lastName" type="text"/>
        <ErrorMessage {...props} name="lastName" component="div" className="invalid-feedback"/>
      </div>
      <div className="form-group">
        <Field component={TextField<{helperText: "Incorrect entry."}} {...props} value={props.formik.values.email ? props.formik.values.email : ''} label="Email" margin="normal" fullWidth name="email" type="text"/>
        <ErrorMessage {...props} name="email" component="div" className="invalid-feedback"/>
      </div>
    </>
);
export default connect(WizardUserFormFirstPage)
