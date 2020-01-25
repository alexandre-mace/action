import React, {useState} from 'react';
import orderByDistance from 'geolib/es/orderByDistance';
import Map from "./../components/event/LeafletMap";
import Events from "../components/event/MapEvents";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import AccountLink from "../components/AccountLink";
import SearchBar from "../components/SearchBar";
import FullScreenLoader from "../components/FullScreenLoader";

const defaultsEvents = [
  {
    name: "Ramassage de déchet sur le bassin à flot",
    latitude: 44.868271,
    longitude: -0.552860
  },
  {
    name: "eventB",
    latitude: 48.858372,
    longitude: 2.294481
  },
  {
    name: "eventC",
    latitude: 51.507351,
    longitude: -0.127758
  },
  {
    name: "eventD",
    latitude: 22,
    longitude: 88
  },
];

const HomePage = (props) => {
  const [userPosition, setUserPosition] = useState(false);
  const [eventSelected, setEventSelected] = useState(false);
  const [mapCenter, setMapCenter] = useState([ 44.8337080, -0.5821208]);
  const [events, setEvents] = useState(defaultsEvents);
  const [calculatingNearestEvents, setCalculatingNearestEvents] = useState(false);
  const [viewMode, setViewMode] = useState('agenda');

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
    <Layout>
      {calculatingNearestEvents &&
        <FullScreenLoader/>
      }
      <Logo/>
      <AccountLink/>
      <SearchBar
        handleUserPositionSelected={handleUserPositionSelected}
      />

      {!calculatingNearestEvents &&
      <>
        {viewMode === 'map' &&
        <>
          <Map
            center={mapCenter}
            eventSelected={eventSelected}
            events={events}
          />
          <MapEvents
            events={events}
            eventSelected={eventSelected}
            handleEventSelected={handleEventSelected}
            userPosition={userPosition}
          />
        </>
        }

      </>
      }
    </Layout>
  )
};
export default HomePage;
