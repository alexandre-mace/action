import React from 'react';
import {setAuthenticated} from "../../actions/authentication";
import {connect} from "react-redux";
import {retrieve} from "../../actions/user/show";
import {FormikWizard} from 'formik-wizard'
import steps from './steps'
import {authentication} from "../../utils/authentication/authentication";
import {fetch} from "../../utils/dataAccess";
import AuthenticationSvg from "../../utils/svg/AuthenticationSvg";
import {LinearProgress, Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';

function RegisterFormWrapper({
                       children,
                       isLastStep,
                       status,
                       goToPreviousStep,
                       canGoBack,
                       isSubmitting
                     }) {

  const errors = children['_owner']['stateNode'] ? children['_owner']['stateNode']['state']['errors']: [];
  const touched = children['_owner']['stateNode'] ? children['_owner']['stateNode']['state']['touched'] : [];

  return (
    <div>
      {status && (
        <div>
          {status.message}
          <hr />
        </div>
      )}

      {children}

      <div className={"d-flex justify-content-around"}>
        {(canGoBack && !isSubmitting) &&
        <>
          <div className="mt-3 w-100" onClick={goToPreviousStep}>
            <Button className={"w-100"} variant={"contained"} color={'secondary'}>Précedent</Button>
          </div>
          <div className="mx-3"></div>
        </>
        }
        {isSubmitting ? (
          <div className={"w-100"}>
            <LinearProgress/>
          </div>
        ) : (
          <div className="mt-3 w-100 text-center">
            <Button
              type="submit"
              variant={"contained"}
              className={!canGoBack ? "next" :  "next w-100"}
              color={'primary'}
              disabled={Object.entries(touched).length === 0 || (Object.entries(touched).length > 0 && Object.entries(errors).length > 0 )}
            >{(isLastStep ? 'S\'inscrire' : 'Suivant')}</Button>
          </div>
        )}
      </div>
    </div>
  )
}

const Register = (props) => {
  const handleSubmit = React.useCallback((values) => {
    const body = JSON.parse(JSON.stringify(values));
    body.name = values.ids.name;
    body.email = values.ids.email;
    body.password = values.password['password'];

     return fetch('/users', { method: 'POST', body: JSON.stringify(body, ['name', 'email', 'password'], 4)  })
       .then((response) => {
           return authentication.login(values.ids.email, values.password['password'])
             .then(
               user => {
                 props.history.push('/confirmation-inscription');
                 props.setAuthenticated(true);
                 props.retrieve(authentication.currentUserValue['@id']);
                 return {
                   message: "success"
                 };
               },
               error => {
                 // setSubmitting(false);
               }
             );
         })
         .catch(e => {
           console.log(e);
           // setErrors(e.errors);
           // setSubmitting(false);
         });
  }, []);

  return(
    <>
      <div className="mb-3 d-inline-block">
        <AuthenticationSvg/>
      </div>
      <Typography className={"mt-3"} variant={"h5"}>
        S'inscrire
      </Typography>
      <FormikWizard
        steps={steps}
        onSubmit={handleSubmit}
        render={RegisterFormWrapper}
      />
    </>
    );
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  setAuthenticated: boolean => dispatch(setAuthenticated(boolean))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
