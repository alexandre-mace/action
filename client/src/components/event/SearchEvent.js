import React, {useState} from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import orderByDistance from 'geolib/es/orderByDistance';
import {Loader} from "../Loader";
import Map from "./LeafletMap";
import Events from "./Events";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const defaultsEvents = [
  {
    name: "Ramassage de déchet sur le bassin à flot",
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
  const [mapCenter, setMapCenter] = useState([ 44.8337080, -0.5821208]);
  const [events, setEvents] = useState(defaultsEvents);
  const [calculatingNearestEvents, setCalculatingNearestEvents] = useState(false);

  const handleUserPositionSelected = ({lat, lng}) => {
    setCalculatingNearestEvents(true);
    setEvents(orderByDistance({lat, lng}, events));
    setUserPosition({
      latitude: lat,
      longitude: lng
    });
    setMapCenter([
      lat,
      lng
    ]);
    setTimeout(() => {setCalculatingNearestEvents(false)}, 800);
  };

  const handleEventSelected = swipeIndex => {
    setEventSelected(events[swipeIndex]);
    setMapCenter([
      events[swipeIndex].latitude,
      events[swipeIndex].longitude
    ])
  };

  return (
    <>
      {!calculatingNearestEvents &&
      <Map
        center={mapCenter}
        eventSelected={eventSelected}
        events={events}
      />
      }
      {calculatingNearestEvents &&
      <div className="loader-container container">
        <div className="row">
          <div className="col text-center">
            <Loader/>
          </div>
        </div>
      </div>
      }
      <div className="logo-container">
        <span>Action</span>
      </div>
      <div className="account-link-container">
        <AccountBoxIcon style={{fontSize: "45px"}} color="primary" className="account-link-icon"/>
      </div>
      <div className="search-container container">
        <div className="row">
          <div className="col-12 p-0 col-md-6 offset-md-3">
            <AlgoliaPlaces
              placeholder="Je recherche des évenements à "
              options={{
                appId: 'plXZW2RVWB96',
                apiKey: '8432eadb718c9d4714a8beb933d71483',
                language: 'fr',
                countries: ['fr'],
                type: 'address',
                useDeviceLocation: true
              }}

              onChange={({query, rawAnswer, suggestion, suggestionIndex}) => {
                console.log("change")
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


        {!calculatingNearestEvents &&
          <Events
            events={events}
            handleEventSelected={handleEventSelected}
            userPosition={userPosition}
          />
        }
    </>
  )
};
export default SearchEvent;
