import React, {useState} from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import getDistance from 'geolib/es/getDistance';
import orderByDistance from 'geolib/es/orderByDistance';
import displayMeters from "../../utils/displayMeters";
import EventCard from "./EventCard";
import {Loader} from "../Loader";
import {Typography} from "@material-ui/core";
import Map from "./LeafletMap";

const events = [
  {
    name: "eventA",
    latitude: 44.868271,
    longitude: -0.552860
  },
  {
    name: "eventB",
    latitude: 80,
    longitude: 34
  },
  {
    name: "eventC",
    latitude: 37,
    longitude: 7
  },
  {
    name: "eventD",
    latitude: 22,
    longitude: 88
  },
];

const SearchEvent = () => {
  const [userPosition, setUserPosition] = useState(false);
  const [eventSelected, setEventSelected] = useState(false);
  const [calculatingNearestEvents, setCalculatingNearestEvents] = useState(false);

  const handleUserPositionSelected = ({lat, lng}) => {
    setCalculatingNearestEvents(true);
    setUserPosition({
      latitude: lat,
      longitude: lng
    });
    setTimeout(() => {setCalculatingNearestEvents(false)}, 800);
  };

  const handleEventSelected = (event) => {
    setEventSelected(event);
  };

  const mapCenter = eventSelected
    ? [eventSelected.latitude, eventSelected.longitude]
    : userPosition
      ? [userPosition.latitude, userPosition.longitude]
      : false;

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <Typography className={"font-size-3 mb-3"} variant={"h6"}>Je recherche des <span className={"color-primary"}>évenements</span> à </Typography>
            <AlgoliaPlaces
              placeholder=""
              options={{
                appId: 'plXZW2RVWB96',
                apiKey: '8432eadb718c9d4714a8beb933d71483',
                language: 'fr',
                countries: ['fr'],
                type: 'address',
              }}

              onChange={({query, rawAnswer, suggestion, suggestionIndex}) => {
                handleUserPositionSelected(suggestion.latlng)
              }}
              onSuggestions={({rawAnswer, query, suggestions}) => {}}
              onCursorChanged={({rawAnswer, query, suggestion, suggestonIndex}) => {}}
              onClear={() => {}}
              onLimit={({message}) => {}}
              onError={({message}) => {}}
            />
          </div>
        </div>
      </div>

      {calculatingNearestEvents &&
      <div className="container mt-5 pt-5 mt-md-5 pt-md-5">
        <div className="row">
          <div className="col text-center">
            <Loader/>
          </div>
        </div>
      </div>
      }

      {(!userPosition && !calculatingNearestEvents) &&
      <div className="container mt-5 pt-5 mt-md-5 pt-md-5">
        <div className="row">

          {events.map((event, index) => (
            <div className={"col-12 col-md-4 mb-3 mb-md-4"} key={index}>
              <EventCard
                handleEventSelected={handleEventSelected}
                event={event}
              />
            </div>
          ))}
        </div>

      </div>
      }

      {(userPosition && !calculatingNearestEvents) &&
      <div className="container mt-5 pt-5 mt-md-5 pt-md-5">
        <div className="row">
          {orderByDistance(userPosition, events).map((event, index) => (
            <div className={"col-12 col-md-4 mb-3 mb-md-4"} key={index}>
            <EventCard
              event={event}
              handleEventSelected={handleEventSelected}
              distance={displayMeters(getDistance({ latitude:event.latitude, longitude: event.longitude} , {latitude: userPosition.latitude, longitude: userPosition.longitude}))}
            />
            </div>
          ))}
        </div>
      </div>
      }
      {!calculatingNearestEvents &&
      <Map
        center={mapCenter}
        events={events}
      />
      }
    </>
  )
};
export default SearchEvent;
