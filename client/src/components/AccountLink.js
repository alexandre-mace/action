import {Link} from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import React from "react";

const AccountLink = () => (
  <div className="account-link-container">
    <Link to={"/compte"}>
      <AccountBoxIcon style={{fontSize: "45px"}} className="account-link-icon"/>
    </Link>
  </div>
);
export default AccountLink;
