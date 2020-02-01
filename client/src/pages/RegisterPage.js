import React from 'react';
import Layout from "../components/Layout";
import Register from "../components/user/Register";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const RegisterPage = (props) => (
  <Layout {...props}>
    <div className="container min-full-screen-page">
      <div className="row my-3">
        <div className="col">
          <Link to="/">
            <ArrowBackIcon/>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <Register {...props}/>
        </div>
        <div className="col-12 text-center mt-3">
          <Typography variant={"body1"}>
            Vous avez déjà un compte compte ? <br/>
            <Link to="/se-connecter">
              C'est par ici !
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  </Layout>
)
export default RegisterPage
