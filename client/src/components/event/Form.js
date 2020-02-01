import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DateTimePicker } from "@material-ui/pickers";

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  renderField = data => {
    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }
    console.log(data)

    return (
      <div className={`form-group`}>

        {data && data.type === 'text' &&
        <TextField
          {...data.input}
          type={data.type}
          step={data.step}
          label={data.input.name}
          required={data.required}
          placeholder={data.placeholder}
          id={`event_${data.input.name}`}
          fullWidth
        />
        }
        {data && data.type === 'dateTime' &&
        <DateTimePicker
          {...data.input}
          value={data.input.value ? data.input.value : new Date()}
          disablePast
          label={data.input.name}
          showTodayButton
        />
        }
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          component={this.renderField}
          name="name"
          type="text"
          placeholder=""
          required={true}
        />
        <Field
          component={this.renderField}
          name="description"
          type="text"
          placeholder=""
          required={true}
        />
        <Field
          component={this.renderField}
          name="date"
          type="dateTime"
          placeholder=""
          required={true}
        />
        <Field
          component={this.renderField}
          name="address"
          type="text"
          placeholder=""
          required={true}
        />
        <Button color="primary" type="submit" variant="contained">
          Submit
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'event',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
