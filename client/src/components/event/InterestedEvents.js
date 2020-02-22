import EventCard from "./EventCard";
import React, {useContext, useEffect} from "react";
import displayMeters from "../../utils/displayMeters";
import getDistance from "geolib/es/getDistance";
import isSameDay from "../../utils/isSameDay";
import NoDataSvg from "../../utils/svg/NoDataSvg";
import {reset, retrieve} from "../../actions/user/show";
import {connect} from "react-redux";
import {authentication} from "../../utils/authentication/authentication";
import AppContext from "../../config/appContext";
import {Loader} from "../Loader";
import sortByDateAsc from "../../utils/events/sortByDateAsc";
import {Animate} from "react-simple-animate";

const InterestedEvents = (props) => {
  useEffect(() => {
    props.retrieve(authentication.currentUserValue['@id']);
  }, []);

  const user = props.retrieved;

  let events = false;
  if (user) {
    events = [...new Set([...user.interestedEvents, ...user.participatedEvents])]
  }

  const appContext = useContext(AppContext);

  return (
    <>
      {props.loading && (
        <div className={'mt-5'}>
          <Loader/>
        </div>      )}
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
            <div className="col-12 text-center mt-5">
              <NoDataSvg/>
            </div>
            <div className="col-12 text-center mt-3">
              <p>Vous n'avez pas encore indiqué que vous étiez intéressé ou que vous participez à un événement</p>
            </div>
          </div>
          }
          {events && events.length > 0 &&
          <div className="row">
            <div className="col text-center">
              <span className="font-weight-bold">
                {events.length}
              </span> {events.length === 1 ? 'événement dans mon agenda' : 'événements dans mon agenda'}
            </div>
          </div>
          }
        <div className="row">
        {events && sortByDateAsc(events).map((event, index) => (
            <React.Fragment key={index}>
              {(!events[index - 1] || events[index - 1] && !isSameDay(events[index - 1].date, event.date)) &&
              <div className={"col-12 text-center mt-3"}>
                <span>{(new Date(event.date)).toLocaleDateString('fr-FR', {weekday: "long", month: "long", day: "numeric"}).toUpperCase()}</span>
              </div>
              }
              <div className={"col-12 col-md-4 mt-3"} key={index}>
                <Animate
                  play={true} // set play true to start the animation
                  duration={0.6} // how long is the animation duration
                  delay={index * 0.1} // how many delay seconds will apply before the animation start
                  start={{ transform: 'translate(0, 400px)' }}
                  end={{ transform: 'translate(0, 0)' }}
                  easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
                  onComplete={() => {}} // call back function when animation is completed
                >
                  <EventCard
                    event={event}
                    history={props.history}
                    handleMapView={appContext.handleMapView}
                    distance={
                      appContext.userPosition
                        ? displayMeters(getDistance({ latitude:event.latitude, longitude: event.longitude} , {latitude: appContext.userPosition.latitude, longitude: appContext.userPosition.longitude}))
                        : false
                    }
                  />
                </Animate>
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

export default connect(mapStateToProps, mapDispatchToProps)(InterestedEvents);
