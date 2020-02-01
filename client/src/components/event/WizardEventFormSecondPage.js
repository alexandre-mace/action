import React from 'react'
import { reduxForm } from 'redux-form'
import {Typography} from "@material-ui/core";
import EditorField from "../../utils/EditorField";
import Button from '@material-ui/core/Button';

const WizardEventFormSecondPage = (props) => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Typography variant={"h5"}>Décrivez votre projet</Typography>
      </div>
      <div className="mt-3">
        <EditorField
          name="description"
          id="inputEditorText"
          disabled={false}
          placeholder="Écrivez ici"
        />
      </div>
      <div className="d-flex justify-content-center">
        <div className="mt-3" onClick={previousPage}>
          <Button variant="contained" color={'secondary'}>Précédent</Button>
        </div>
        <div className="mx-3">
        </div>
        <div>
          <div className="mt-3">
            <Button variant="contained" type="submit" className="next" color={'primary'} >Suivant</Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'project-wizard',  //Form name is same
  destroyOnUnmount: false,     // <------ preserve form data
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(WizardEventFormSecondPage)
