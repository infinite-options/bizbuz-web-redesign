import React, { Component } from "react";
import isEmpty from "lodash.isempty";
import Marker from "../common/Marker";
import GoogleMap from "../common/GoogleMap";
import SearchBox from "../common/SearchBox";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "2%",
        }}
      >
        {mapApiLoaded && (
          <SearchBox
            map={mapInstance}
            mapApi={mapApi}
            addplace={this.addPlace}
            defaultValue={this.props.defaultAddress}
            handleChange={this.props.addressChangeHandler}
          />
        )}
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{
            lat: this.props.defaultLat,
            lng: this.props.defaultLong,
          }}
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
                {this.props.addressSelectHandler(
                  place.formatted_address,
                  place.name
                )}
              </>
            ))}
        </GoogleMap>
      </div>
    );
  }
}

export default Searchbox;
