import React, {useState} from 'react';
import Layout from "../components/Layout";
import {Link} from "react-router-dom";
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';

const AccountPage = props => {
  return (
    <Layout>
      <div className="container mt-3 mt-md-5">
        <div className="row">
          <div className="col">
            <span className="logo">Action</span>
          </div>
          <div className="col text-right">
            <Link to={"/"}>
              <HomeIcon style={{fontSize: "45px"}} color="primary"/>
            </Link>
          </div>
        </div>
      </div>

      <div>Ajouter un évenement</div>
      <div>mes event sauvegardés</div>
      <div>
        se déconnecter
      </div>
    </Layout>
  )
};
export default AccountPage;
