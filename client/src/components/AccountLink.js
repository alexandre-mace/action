import React from "react";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const AccountLink = () => (
  <div className="col-auto">
    <Link to={"/compte"}>
      <AccountCircleRoundedIcon style={{fontSize: "45px"}} className="account-link-icon"/>
    </Link>
  </div>
);
export default AccountLink;
