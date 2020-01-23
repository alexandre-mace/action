import SwipeableViews from "react-swipeable-views";
import EventCard from "./EventCard";
import React from "react";
import displayMeters from "../../utils/displayMeters";
import getDistance from "geolib/es/getDistance";

const styles = {
  root: {
    padding: '0 30px 0 15px',
  },
  slideContainer: {
  },
  slide: {
  },
};

const Events = (props) => (
  <SwipeableViews onChangeIndex={props.handleEventSelected} style={styles.root} slideStyle={styles.slideContainer}>
    {props.events.map((event, index) => (
      <div className={"h-100 py-30 pr-3"} key={index} style={Object.assign({}, styles.slide)}>
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
    ))}
  </SwipeableViews>
);
export default Events
