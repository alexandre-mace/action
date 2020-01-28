import React from 'react'
import { render } from 'react-dom'
import L from 'leaflet';
import {Map, Popup, TileLayer, ZoomControl} from 'react-leaflet'
import LeafletMarker from "./LeafletMarker";
import LeafletAnimatedMarker from "./LeafletAnimatedMarker";
import CloseIcon from '@material-ui/icons/Close';

// defaults
let zoom = 10;

const LeafletMap = (props) => {
  window.dispatchEvent(new Event('resize'));

  if (props.eventSelected) {
    zoom = 12;
  }

  return (
    <>
    <Map center={props.center} zoom={zoom} zoomControl={false}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        attribution='map data © [[http://osm.org/copyright|OpenStreetMap contributors]] under ODbL  - tiles OpenRiverboatMap'
      />
      <ZoomControl position="bottomright"/>
      {props.events.map((event, index) => {
        if (props.eventSelected && props.eventSelected.name === event.name) {
          return (
            <LeafletAnimatedMarker key={index} position={props.center}/>
          )
        } else {
          return (
            <LeafletMarker key={index} event={event}/>
          )
        }
      }
      )}
    </Map>
      <div className={"map-close"}>
        <CloseIcon fontSize={"large"} onClick={() => props.handleCloseMapView()}/>
      </div>
    </>
  )
}

export default LeafletMap;
