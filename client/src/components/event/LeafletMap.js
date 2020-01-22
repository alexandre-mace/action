import React from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import LeafletMarker from "./LeafletMarker";

// defaults
let position = [ 44.8337080, -0.5821208];
let zoom = 2;

const LeafletMap = (props) => {
  window.dispatchEvent(new Event('resize'));

  if (props.center) {
    position = props.center;
    zoom = 13;
  }

  return (
    <Map center={position} zoom={zoom}>
      <TileLayer
        url='http://{s}.tile.openstreetmap.fr/openriverboatmap/{z}/{x}/{y}.png'
        attribution='map data © [[http://osm.org/copyright|OpenStreetMap contributors]] under ODbL  - tiles OpenRiverboatMap'
      />
      {props.events.map((event, index) => (
        <LeafletMarker key={index} event={event} ></LeafletMarker>
      ))}
    </Map>
  )
}

export default LeafletMap;
