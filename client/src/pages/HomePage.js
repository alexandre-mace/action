import React, {useState} from 'react';
import orderByDistance from 'geolib/es/orderByDistance';
import isPointWithinRadius from "geolib/es/isPointWithinRadius";
import Map from "./../components/event/LeafletMap";
import MapEvents from "../components/event/MapEvents";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import AccountLink from "../components/AccountLink";
import SearchBar from "../components/SearchBar";
import FullScreenLoader from "../components/FullScreenLoader";
import AgendaEvents from "../components/event/AgendaEvents";
import defaultsEvents from "../config/defaultEvents";

const HomePage = (props) => {
  const [userPosition, setUserPosition] = useState({ latitude: 44.8337080, longitude: -0.5821208 });
  const [radius, setRadius] = useState(5000);
  const [eventSelected, setEventSelected] = useState(false);
  const [mapCenter, setMapCenter] = useState([ 44.8337080, -0.5821208]);
  const [events, setEvents] = useState(defaultsEvents.filter((event) => {
    return isPointWithinRadius(
      {latitude: event.latitude, longitude: event.longitude},
      {latitude: userPosition.latitude, longitude: userPosition.longitude},
      radius
    )
  }));
  const [calculatingNearestEvents, setCalculatingNearestEvents] = useState(false);

  const handleUserPositionSelected = ({lat, lng}) => {
    setCalculatingNearestEvents(true);

    const eventsInRadius = defaultsEvents.filter((event) => {
      return isPointWithinRadius(
         {latitude: event.latitude, longitude: event.longitude},
        {latitude: lat, longitude: lng},
        radius
      )
    });

    setEvents(orderByDistance({latitude: lat, longitude: lng}, eventsInRadius));
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

  const handleChangeRadius = (radiusElement) => {
    setCalculatingNearestEvents(true);

    setRadius(radiusElement.target.value);
    const eventsInRadius = defaultsEvents.filter((event) => {
      return isPointWithinRadius(
        {latitude: event.latitude, longitude: event.longitude},
        {latitude: userPosition.latitude, longitude: userPosition.longitude},
        radiusElement.target.value
      )
    });

    setEvents(orderByDistance({latitude: userPosition.latitude, longitude: userPosition.longitude}, eventsInRadius));
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
        radius={radius}
        handleChangeRadius={handleChangeRadius}
      />

      {!calculatingNearestEvents &&
      <AgendaEvents
        events={events}
        eventSelected={eventSelected}
        handleEventSelected={handleEventSelected}
        userPosition={userPosition}
      />
        // {viewMode === 'map' &&
        // <>
        //   <Map
        //     center={mapCenter}
        //     eventSelected={eventSelected}
        //     events={events}
        //   />
        //   <MapEvents
        //     events={events}
        //     eventSelected={eventSelected}
        //     handleEventSelected={handleEventSelected}
        //     userPosition={userPosition}
        //   />
        // </>
        // }
      }
    </Layout>
  )
};
export default HomePage;
