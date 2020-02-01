import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {FormControlLabel, Typography} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import {Loader} from "../Loader";
import Button from '@material-ui/core/Button';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);

const renderDatePicker = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={input.value}
          onChange={input.onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      }
      label={label}
    />
  </div>
);

const renderTimePicker = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <TimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={input.value}
          onChange={input.onChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      }
      label={label}
    />
  </div>
);
const WizardEventFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      {submitting && (
        <Loader/>
      )}
      {!submitting &&
      <>
        <div>
          <Typography variant={"h5"}>C'est quand ?</Typography>
        </div>
        <div className="d-flex flex-wrap mt-3">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={"mt-3"}>
            <Field
              name="date"
              component={KeyboardDatePicker}
              format={null}
              hintText="Day of delivery?"
            />
            </div>
            <div className={"mt-3"}>
            <Field name={'time'} component={KeyboardTimePicker} label={'Time'} />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <div className="mt-3" onClick={previousPage}>
            <Button variant="contained" color={'secondary'} >Précédent</Button>
          </div>
          <div className="mx-3">
          </div>
          <div className="mt-3 text-center">
            <Button variant="contained" disabled={pristine || submitting} type="submit" color={'primary'} >Initier</Button>
          </div>
        </div>
      </>
      }
    </form>
  )
}
export default reduxForm({
  form: 'project-wizard', //Form name is same
  destroyOnUnmount: false,     // <------ preserve form data
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(WizardEventFormThirdPage)
