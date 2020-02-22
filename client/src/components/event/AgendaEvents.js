import EventCard from "./EventCard";
import React from "react";
import displayMeters from "../../utils/displayMeters";
import getDistance from "geolib/es/getDistance";
import isSameDay from "../../utils/isSameDay";
import NoDataSvg from "../../utils/svg/NoDataSvg";
import sortByDateAsc from "../../utils/events/sortByDateAsc";
import { Animate }  from 'react-simple-animate';

const AgendaEvents = (props) => (
      <div className="container mt-5 bottom-navigation-padding">
        <div className="row">
          <div className="col text-center">
            <p>
              Recherche de d'événement à proximité de <br/>
              <span className="font-weight-bold">
                {props.userPosition.addressName}
              </span>
            </p>
          </div>
        </div>
        {props.events && props.events.length > 0 &&
        <div className="row">
          <div className="col text-center">
            <p>
              <span className="font-weight-bold">
                {props.events.length}
              </span> {props.events.length === 1 ? 'événement trouvé' : 'événements trouvés'}
            </p>
          </div>
        </div>
        }
        <div className="row">
          {props.events.length === 0 &&
          <>
            <div className="col-12 text-center mt-3">
              <NoDataSvg/>
            </div>
            <div className="col-12 text-center mt-3">
              <p>Il n'y a pas encore d'événements organisés proche de votre localisation</p>
            </div>
          </>
          }
        </div>
        <div className="row mt-3">
          {props.events && sortByDateAsc(props.events).map((event, index) => (
            <React.Fragment key={index}>
              {(!props.events[index - 1] || props.events[index - 1] && !isSameDay(props.events[index - 1].date, event.date)) &&
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
                    handleMapView={props.handleMapView}
                    distance={
                      props.userPosition
                        ? displayMeters(getDistance({ latitude:event.latitude, longitude: event.longitude} , {latitude: props.userPosition.latitude, longitude: props.userPosition.longitude}))
                        : false
                    }
                  />
                </Animate>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
);
export default AgendaEvents
