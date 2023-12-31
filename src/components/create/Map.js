import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

const SomeReactComponent = ({ text }) => {
  return (
    <RoomOutlinedIcon fontSize="large" sx={{ ml: "-17.5px", mt: "-35px" }} />
  );
};

export default class Map extends Component {
  static defaultProps = {
    center: {
      lat: 37.23672,
      lng: -121.88737,
    },
    zoom: 14,
    height: "40vh",
  };

  render() {
    const center = {
      lat: parseFloat(this.props.latitude)
        ? parseFloat(this.props.latitude)
        : 37.23672,
      lng: parseFloat(this.props.longitude)
        ? parseFloat(this.props.longitude)
        : -121.88737,
    };

    return (
      <div style={{ height: this.props.height, width: "90%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            libraries: ["places"],
          }}
          center={center}
          defaultZoom={this.props.zoom}
        >
          <SomeReactComponent
            lat={
              parseFloat(this.props.latitude)
                ? parseFloat(this.props.latitude)
                : 37.23672
            }
            lng={
              parseFloat(this.props.longitude)
                ? parseFloat(this.props.longitude)
                : -121.88737
            }
          />
        </GoogleMapReact>
      </div>
    );
  }
}
