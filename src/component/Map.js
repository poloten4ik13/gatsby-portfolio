import React from "react"
import GoogleMapReact  from "google-map-react"
import star from "../assets/image/img_1.png"
import { StyleMap} from "./StyleMap"

const Mark = () => {
  return(
    <div>
      <img src={star} alt='star' />
    </div>
  )
}


const Map = () => {

  return (
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.google_map_api_key,
            language: "en",
            region: "UK"
          }}
          defaultCenter={{ lat: 50.4217, lng: 30.5486 }}
          defaultZoom={14}
          options={StyleMap}
        >
          <Mark lat={50.4217}  lng={30.5486}  />
        </GoogleMapReact>
    </div>
  )
}

export default Map
