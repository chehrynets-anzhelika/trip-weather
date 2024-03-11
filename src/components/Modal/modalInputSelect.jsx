import React from 'react';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';

const ModalInputSelect = (props) => {

  const title = props.title[0].toLowerCase() + props.title.slice(1);

  return (
    <GeoapifyContext apiKey="02aaae70892c4ef5a26f552d8e88892c">
    <label htmlFor={title} className="item-title">{props.title}</label>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter city here"
        placeSelect={props.onPlaceSelect}
      />
    </GeoapifyContext>
  );
}

export default ModalInputSelect;