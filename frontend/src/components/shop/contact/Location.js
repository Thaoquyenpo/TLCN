import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"

const Map = () => {
  return (
    <div>
      <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat:  10.8506377, lng: 106.7693382 }}
        >
         <Marker
              icon={{
                url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              position={{ lat: 10.8506377, lng: 106.7693382 }}
          />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));

