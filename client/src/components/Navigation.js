import React from "react";
import Logo from "./Logo";
import AccountLink from "./AccountLink";
import AppBottomNavigation from "./AppBottomNavigation";
import AppTopNavigation from "./AppTopNavigation";
import HomeLink from "./HomeLink";

const Navigation = props => (
  <>
    <div className="container">
      <div className="row align-items-center">
        <Logo/>
        <div className={"d-none d-md-block"}>
          <AppTopNavigation {...props}/>
        </div>
        {props.location.pathname !=='/compte' &&
        <AccountLink/>
        }
        {props.location.pathname ==='/compte' &&
        <HomeLink/>
        }
      </div>
    </div>
    <div className={"d-block d-md-none"}>
      {(props.location.pathname !== '/se-connecter' && props.location.pathname !== '/s\'inscrire') &&
      <AppBottomNavigation {...props}/>
      }
    </div>
  </>
);
export default Navigation;
