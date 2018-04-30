import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const CampMap = withScriptjs(withGoogleMap((props) => {
    let markers = props.coords
        .filter(v => v.lat !== null && v.lon !== null)
        .map((coords, idx) => {
          return (
            <Marker
              key={idx}
              position={{lat: coords.lat, lng: coords.lon }}
              onMouseDown={() => console.log('hello')}
            >
              {/* {props.infoWindowOpen &&
                <InfoWindow onCloseClick={props.infoWindowToggle}>
                  <h1>hello</h1>
                </InfoWindow>
              } */}
            </Marker>
          )
        });

    // Map with a MarkerClusterer
    // A wrapper around google.maps.InfoWindow



    // console.log(markers);

    return (
      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultOptions={{disableDefaultUI: true}}
        // onClick={() => console.log('hello')}
      >
        <Marker position={{lat: 1, lng: 1 }} onClick={() => console.log('hello')} />
        {/* { markers } */}
      </GoogleMap>)
  }
))

export default CampMap
