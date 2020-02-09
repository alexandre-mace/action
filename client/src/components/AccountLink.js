import React from "react";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const AccountLink = () => (
  <div className="absolute-top-right">
    <Link to={"/compte"}>
      <AccountCircleRoundedIcon style={{fontSize: "45px"}} className="account-link-icon"/>
    </Link>
  </div>
);
export default AccountLink;
