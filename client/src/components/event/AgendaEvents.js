import EventCard from "./EventCard";
import React from "react";
import displayMeters from "../../utils/displayMeters";
import getDistance from "geolib/es/getDistance";
import isSameDay from "../../utils/isSameDay";

const AgendaEvents = (props) => (
      <div className="container search-box-margin">
        <div className="row">
          {props.events.map((event, index) => (
            <React.Fragment key={index}>
            {(!props.events[index - 1] || props.events[index - 1] && !isSameDay(props.events[index - 1].date, event.date)) &&
              <div className={"col-12 text-center mt-3"}>
                <span>{event.date}</span>
              </div>
            }
            <div className={"col-12 col-md-4 mt-3"} key={index}>
              <EventCard
                handleEventSelected={props.handleEventSelected}
                event={event}
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
);
export default AgendaEvents
