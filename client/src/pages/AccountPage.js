import React from 'react';
import Layout from "../components/Layout";
import HomeLink from "../components/HomeLink";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import {authentication} from "../utils/authentication";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import {Typography} from "@material-ui/core";

const AccountPage = props => {
  const logout = () => {
    authentication.logout()
    this.props.history.push('/')
  }

  return (
    <Layout {...props}>
      <HomeLink/>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <Typography variant="h4" component="h4" gutterBottom className={'text-center'}>
              {authentication.currentUserValue.name}
            </Typography>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <Link to={"/ajouter-un-evenement"}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleRoundedIcon />}
              >
                Ajouter un evenement
              </Button>
            </Link>
          </div>
        </div>
        <div className="container position-absolute-bottom-center">
          <div className="row">
          <div className="col text-center">
            <Button
              variant="contained"
              startIcon={<ExitToAppRoundedIcon />}
              onClick={() => logout()}

            >
              Se déconnecter
            </Button>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};
export default AccountPage;
