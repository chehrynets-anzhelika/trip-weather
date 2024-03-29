import React from 'react';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';

const ModalInputSelect = (props) => {

  const title = props.title[0].toLowerCase() + props.title.slice(1);

  return (
    <GeoapifyContext apiKey={process.env.REACT_APP_KEY_GEO}>
    <label htmlFor={title} className="item-title">{props.title}</label>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter city here"
        placeSelect={props.onPlaceSelect}
        value={props.value}
      />
    </GeoapifyContext>
  );
}

export default ModalInputSelect;