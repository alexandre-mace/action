import React, {useContext, useEffect, useState} from 'react';
import orderByDistance from 'geolib/es/orderByDistance';
import isPointWithinRadius from "geolib/es/isPointWithinRadius";
import Map from "./../components/event/LeafletMap";
import SearchBar from "../components/SearchBar";
import FullScreenLoader from "../components/FullScreenLoader";
import AgendaEvents from "../components/event/AgendaEvents";
import {list, reset} from "../actions/event/list";
import {connect} from "react-redux";
import AppContext from "../config/appContext";

const MainEventSearch = props => {
  const [radius, setRadius] = useState(5000);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const appContext = useContext(AppContext);

  const filterEvents = (eventsToFilter, { latitude, longitude }) => {
    return orderByDistance({latitude, longitude}, eventsToFilter.filter((event) => {
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

  if (props.retrieved && props.retrieved['hydra:member'].length !== allEvents.length) {
    setAllEvents(props.retrieved['hydra:member']);
    setFilteredEvents(filterEvents(props.retrieved['hydra:member'], {latitude: appContext.userPosition.latitude, longitude: appContext.userPosition.longitude}));
    setLoading(false);
  }

  const handleUserPositionSelected = ({lat, lng}, addressName) => {
    setLoading(true);
    setFilteredEvents(filterEvents(allEvents, {latitude: lat, longitude: lng}));
    appContext.setUserPosition({
      latitude: lat,
      longitude: lng,
      addressName: addressName
    });
    // setMapCenter([
    //   lat,
    //   lng
    // ]);
    setTimeout(() => {setLoading(false)}, 800);
  };

  const handleChangeRadius = (radiusElement) => {
    setLoading(true);
    setRadius(radiusElement.target.value);
    setFilteredEvents(filterEvents(allEvents, {latitude: appContext.userPosition.latitude, longitude: appContext.userPosition.longitude}))
    setTimeout(() => {setLoading(false)}, 800);
  };

  return (
    <>
      {(loading || props.loading) &&
      <FullScreenLoader/>
      }
      {(!props.loading && !loading) &&
      <SearchBar
        handleUserPositionSelected={({lat, lng}, addressName) => handleUserPositionSelected({lat, lng}, addressName)}
        radius={radius}
        handleChangeRadius={handleChangeRadius}
      />
      }
      {(!props.loading && !loading) &&
      <>
        <AgendaEvents
          events={filteredEvents}
          history={props.history}
          userPosition={appContext.userPosition}
          handleMapView={appContext.handleMapView}
        />
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
