import React from 'react';
import Layout from "../../components/Layout";
import Button from '@material-ui/core/Button';
import {authentication} from "../../utils/auth/authentication";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import {Typography} from "@material-ui/core";
import logout from "../../utils/auth/logout";

const AccountPage = props => {
  return (
    <Layout {...props}>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <Typography variant="h4" component="h4" gutterBottom className={'text-center'}>
              {authentication.currentUserValue.name}
            </Typography>
          </div>
        </div>
        <div className="container position-absolute-bottom-center">
          <div className="row">
          <div className="col text-center">
            <Button
              variant="contained"
              startIcon={<ExitToAppRoundedIcon />}
              onClick={() => logout(props.history)}
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
