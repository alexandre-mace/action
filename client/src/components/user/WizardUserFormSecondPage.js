import React from "react";
import {connect, ErrorMessage, Field} from "formik";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {RadioGroup} from "formik-material-ui";

const radioButton = (props) => (
    <RadioGroup {...props}>
      {props.options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio color={"primary"} />}
            label={option}
            onChange={e => {
            props.form.setFieldTouched(props.field.name);
            }}
          />
        )
      )}
    </RadioGroup>
);

const WizardUserFormSecondPage = (props) => (
  <>
    <Typography className={"mt-3 text-center"} variant="h6" gutterBottom={true}>
      Quelle est votre compétence principale ?
    </Typography>
    <div className="form-group">
    </div>
  </>
);
export default connect(WizardUserFormSecondPage)
