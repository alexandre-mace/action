import React, {useEffect, useState} from 'react';
// import Header from "./Header.jsx";
import {ThemeProvider} from '@material-ui/styles';
import {connect} from "react-redux";
import Logo from "./Logo";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import theme from "../config/theme";
import AppContext from "../config/appContext";
import AppBottomNavigation from "./BottomNavigation";
import AccountLink from "./AccountLink";

const Layout = (props) => {
  const [userPosition, setUserPosition] = useState({ latitude: 44.8337080, longitude: -0.5821208, addressName:  "38 Rue Lacornée, 33000 Bordeaux France" });

  useEffect(() => {
    // if (authentication.currentUserValue) {
    //   this.props.retrieve(authentication.currentUserValue['@id'])
    //     .then(() => {
    //       this.props.setAuthenticated(true);
    //     })
    // }

    if (!localStorage.getItem('onboarding')) {
      localStorage.setItem('onboarding', 'true')
      props.history.push('/bienvenue')
    }
  }, []);

  return (
    // const user = this.props.authenticated ? (this.props.updated ? this.props.updated : this.props.retrieved) : false;
    //
    // let notifications = 0;
    //
    // if (user) {
    //   notifications = user.initiatedProjects.reduce(function (accumulateur, currentProject) {
    //     return accumulateur + currentProject.joinDemands.filter(demand => (demand.status === 'En attente')).length;
    //   }, 0);
    // }
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
          <AppContext.Provider value={{userPosition: userPosition, setUserPosition: setUserPosition}}>
            <div className="my-3 my-md-5"></div>
            {props.history &&
            <>
              <Logo/>
              {props.location.pathname !=='/compte' &&
                <AccountLink/>
              }
              <AppBottomNavigation {...props}/>
            </>
            }
            {props.children}
          </AppContext.Provider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
}
const mapStateToProps = state => ({
  // updated: state.user.update.updated,
  // retrieved: state.user.show.retrieved,
});

const mapDispatchToProps = dispatch => ({
  // retrieve: id => dispatch(retrieve(id)),
  // reset: eventSource => dispatch(reset(eventSource)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
