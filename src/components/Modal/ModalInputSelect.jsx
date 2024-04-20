import React from 'react';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import styles from "./modal.module.css";
import "./modalReassign.css";

const ModalInputSelect = (props) => {

  const title = props.title[0].toLowerCase() + props.title.slice(1);

  return (
    <GeoapifyContext apiKey={process.env.REACT_APP_KEY_GEO}>
    <label htmlFor={title} className={styles.itemTitle}>{props.title}</label>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter city here"
        placeSelect={props.onPlaceSelect}
        value={props.value}
        type="city"
        lang="en"
      />
    </GeoapifyContext>
  );
}

export default ModalInputSelect;