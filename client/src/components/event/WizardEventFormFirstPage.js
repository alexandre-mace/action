import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'pitch',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Ce champ est requis'
    }
  })
  return errors
}

const renderTextField = ({
                           label,
                           input,
                           meta: { touched, invalid, error },
                           ...custom
                         }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const WizardEventFormFirstPage = (props) => {
  const { handleSubmit, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Typography variant={"h5"}>Titre de votre événement</Typography>
      </div>
      <div className={"mt-3"}>
        <Field
          component={renderTextField}
          name="name"
          type="text"
          label="Titre"
          fullWidth
          required={true}
        />
      </div>
      <div className="d-inline-block mt-3">
        <Button variant="contained" disabled={pristine || submitting} type="submit" color={'primary'} >Suivant</Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'project-wizard',              // <------ same form name
  validate,
  destroyOnUnmount: false,     // <------ preserve form data
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(WizardEventFormFirstPage)
