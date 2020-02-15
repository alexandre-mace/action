import React, {useContext, useEffect, useState} from 'react';
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
import {list, reset} from "../actions/event/list";
import {connect} from "react-redux";
import AppContext from "../config/appContext";

const MainEventSearch = props => {
  const [radius, setRadius] = useState(5000);
  const [mapCenter, setMapCenter] = useState([ 44.8337080, -0.5821208]);
  const [mapView, setMapView] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const appContext = useContext(AppContext);

  const filterEvents = (events, { latitude, longitude }) => {
    return orderByDistance({latitude, longitude}, events.filter((event) => {
      return isPointWithinRadius(
        {latitude: event.latitude, longitude: event.longitude},
        {latitude: latitude, longitude: longitude},
        radius
      )
    }))
  };

  useEffect(() => {
    props.list(
      props.match.params.page &&
      decodeURIComponent(props.match.params.page))
  }, []);

  useEffect(() => {
    if (props.retrieved && props.retrieved['hydra:member'].length !== events.length) {
      setEvents(props.retrieved['hydra:member']);
      setFilteredEvents(filterEvents(props.retrieved['hydra:member'], {latitude: appContext.userPosition.latitude, longitude: appContext.userPosition.longitude}))
      setLoading(false);
    }
  });

  const handleUserPositionSelected = ({lat, lng}, addressName) => {
    setLoading(true);
    setFilteredEvents(filterEvents(events, {latitude: lat, longitude: lng}));
    appContext.setUserPosition({
      latitude: lat,
      longitude: lng,
      addressName: addressName
    });
    setMapCenter([
      lat,
      lng
    ]);
    setTimeout(() => {setLoading(false)}, 800);
  };

  const handleChangeRadius = (radiusElement) => {
    setLoading(true);
    setRadius(radiusElement.target.value);
    setFilteredEvents(filterEvents(events, {latitude: appContext.userPosition.latitude, longitude: appContext.userPosition.longitude}))
    setTimeout(() => {setLoading(false)}, 800);
  };

  const handleMapView = event => {
    setMapCenter([event.latitude, event.longitude])
    setMapView(true);
  };

  const handleCloseMapView = () => {
    setMapView(false)
  };

  return (
    <>
      {(loading || props.loading) &&
      <FullScreenLoader/>
      }
      <SearchBar
        handleUserPositionSelected={handleUserPositionSelected}
        radius={radius}
        handleChangeRadius={handleChangeRadius}
      />
      {!loading &&
      <>
        <AgendaEvents
          events={filteredEvents}
          userPosition={appContext.userPosition}
          handleMapView={handleMapView}
        />
        {mapView &&
        <Map
          center={mapCenter}
          events={filteredEvents}
          handleCloseMapView={handleCloseMapView}
        />
        }
      </>
      }
    </>
  )
};


const mapStateToProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
    deletedItem
  } = state.event.list;
  return { retrieved, loading, error, eventSource, deletedItem };
};
const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainEventSearch);
