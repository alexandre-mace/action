import EventCard from "./EventCard";
import React, {useContext, useEffect} from "react";
import displayMeters from "../../utils/displayMeters";
import getDistance from "geolib/es/getDistance";
import isSameDay from "../../utils/isSameDay";
import NoDataSvg from "../../utils/svg/NoDataSvg";
import {retrieve} from "../../actions/user/show";
import {authentication} from "../../utils/authentication/authentication";
import AppContext from "../../config/appContext";
import {Loader} from "../Loader";
import {connect} from "react-redux";

const OrganizedEvents = (props) => {
  useEffect(() => {
    props.retrieve(authentication.currentUserValue['@id']);
  }, []);

  const user = props.retrieved;

  let events = false;
  if (user) {
    events = user.organizedEvents
  }

  const appContext = useContext(AppContext);

  return (
    <>
      {props.loading && (
        <div className={'mt-5'}>
          <Loader/>
        </div>
      )}
      {props.error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
          {props.error}
        </div>
      )}

      {!props.loading &&
      <div className="container mt-5 bottom-navigation-padding">
        {user && events && events.length === 0 &&
        <div className="row">
          <div className="col-12 text-center mt-3">
            <NoDataSvg/>
          </div>
          <div className="col-12 text-center mt-3">
            <p>Vous n'aviez pas encore organisé d'évenement</p>
          </div>
        </div>
        }
        {events && events.length > 0 &&
        <div className="row">
          <div className="col text-center">
            <p>
              <span className="font-weight-bold">
                {events.length}
              </span> {events.length === 1 ? 'évenement organisé' : 'évenements organisés'}
            </p>
          </div>
        </div>
        }
        <div className="row">
          {events && events.map((event, index) => (
            <React.Fragment key={index}>
              {(!events[index - 1] || events[index - 1] && !isSameDay(events[index - 1].date, event.date)) &&
              <div className={"col-12 text-center mt-3"}>
                <span>{(new Date(event.date)).toLocaleDateString('fr-FR', {weekday: "long", month: "long", day: "numeric"}).toUpperCase()}</span>
              </div>
              }
              <div className={"col-12 col-md-4 mt-3"} key={index}>
                <EventCard
                  event={event}
                  handleMapView={props.handleMapView}
                  distance={
                    props.userPosition
                      ? displayMeters(getDistance({ latitude:event.latitude, longitude: event.longitude} , {latitude: props.userPosition.latitude, longitude: props.userPosition.longitude}))
                      : false
                  }
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      }
    </>
  )
};

const mapStateToProps = state => ({
  retrieved: state.user.show.retrieved,
  error: state.user.show.error,
  loading: state.user.show.loading,
  eventSource: state.user.show.eventSource,
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizedEvents);
