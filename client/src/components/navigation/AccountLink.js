import React from "react";
import {Link} from "react-router-dom";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Button from "@material-ui/core/Button";
import {Badge} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

const AccountLink = () => (
  <div className="col-auto pl-md-0">
    <Link to={"/compte"}>
      <Button
        variant={"contained"}
        color={'primary'}
        className={"d-none d-md-flex"}
        endIcon={
            <AccountCircleRoundedIcon />
        }>
        Mon compte
      </Button>
      <AccountCircleRoundedIcon style={{fontSize: "45px"}} className="account-link-icon d-block d-md-none"/>
    </Link>
  </div>
);
export default AccountLink;
