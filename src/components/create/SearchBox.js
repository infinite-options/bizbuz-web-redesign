import React, { Component } from "react";
import isEmpty from "lodash.isempty";

// components:
import Marker from "../map/Marker";

// examples:
import GoogleMap from "../map/GoogleMap";
import SearchBox from "../map/SearchBox";

// consts
const center = { lat: 37.23672, lng: -121.88737 };

class Searchbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  addPlace = (place) => {
    this.setState({ places: place });
  };

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5%",
          }}
        >
          {mapApiLoaded && (
            <SearchBox
              map={mapInstance}
              mapApi={mapApi}
              addplace={this.addPlace}
            />
          )}
          <GoogleMap
            defaultZoom={10}
            defaultCenter={center}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAP_KEY,
              libraries: ["places", "geometry"],
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              console.log("map loading ");
              this.apiHasLoaded(map, maps);
            }}
          >
            {!isEmpty(places) &&
              places.map((place) => (
                <>
                  <Marker
                    key={place.place_id}
                    text={place.name}
                    lat={place.geometry.location.lat()}
                    lng={place.geometry.location.lng()}
                  />
                  {console.log("address =  ", place)}
                  {this.props.latLongHandler(
                    place.geometry.location.lat(),
                    place.geometry.location.lng()
                  )}
                  {this.props.addressHandler(
                    place.formatted_address,
                    place.name
                  )}

                  {/* {console.log(" zip code ", place.address_components.find(addr => addr.types[0] === "postal_code").short_name)}; */}
                </>
              ))}
          </GoogleMap>
        </div>
      </>
    );
  }
}

export default Searchbox;
