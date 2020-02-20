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
import AppBottomNavigation from "./AppBottomNavigation";
import AccountLink from "./AccountLink";
import Navigation from "./Navigation";
import Map from "./event/LeafletMap";

const Layout = (props) => {
  const [userPosition, setUserPosition] = useState({ latitude: 44.8337080, longitude: -0.5821208, addressName:  "38 Rue Lacornée, 33000 Bordeaux France" });
  const [mapCenter, setMapCenter] = useState([ 44.8337080, -0.5821208]);
  const [mapView, setMapView] = useState(false);

  const handleMapView = event => {
    setMapCenter([event.latitude, event.longitude]);
    setMapView(true);
  };
  const handleCloseMapView = () => {
    setMapView(false)
  };

  useEffect(() => {
    // if (authentication.currentUserValue) {
    //   this.props.retrieve(authentication.currentUserValue['@id'])
    //     .then(() => {
    //       this.props.setAuthenticated(true);
    //     })
    // }

    if (!localStorage.getItem('action-onboarding')) {
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
          <AppContext.Provider value={
            { userPosition: userPosition,
              setUserPosition: setUserPosition,
              mapView: mapView,
              handleMapView: handleMapView,
              mapCenter: mapCenter,
              handleCloseMapView: handleCloseMapView }
          }>
            <div className="my-3 my-md-5"></div>
            {props.history &&
              <Navigation {...props}/>
            }
            {props.children}
            {mapView &&
            <Map
              center={mapCenter}
              event={{latitude: mapCenter[0], longitude: mapCenter[1]}}
              handleCloseMapView={handleCloseMapView}
            />
            }
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
