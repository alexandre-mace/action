import React from 'react';
import Layout from "../components/Layout";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import BeerCelebrationSvg from "../utils/svg/BeerCelebrationSvg";
import {create, reset} from "../actions/event/create";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';

const ConfirmEventCreatedPage = (props) => (
  <Layout {...props}>
    <div className="container-fluid full-screen-page d-flex flex-column">
      <div className="row h-100">
        <div className="col-12 text-center mt-5 mb-3">
          <Typography variant="h4" gutterBottom>
            Bravo ! <br/> Votre évenement a été ajouté avec succès !
          </Typography>
        </div>
        <div className="col-12 col-md-6 mx-auto">
          <div>
            <BeerCelebrationSvg/>
          </div>
        </div>
        <div className="col-12 mt-auto text-center">
          <Typography variant="body1" gutterBottom>
            Vous serez notifié des intérêts / participations 😊
          </Typography>
        </div>
        <div className="col-12 mt-3 text-center">
          <Link to={`/mes-evenements`}>
            <Button
              color={"primary"}
              variant={"contained"}
            >
              Voir mes évenement
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

const mapStateToProps = state => {
  const { created, error, loading } = state.event.create;
  return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmEventCreatedPage);
