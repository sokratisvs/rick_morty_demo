import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

export const Header = ({
  uniqueGender,
  uniqueSpecies,
  uniqueStatus,
  onGenderChange,
  onSpeciesChange,
  onStatusChange,
}) => (
  <div className="headerContainer">
    <div className="genderContainer">
      <div className="sortby">Sort by Gender:</div>
      <div>
        <select id="lang" onChange={e => onGenderChange(e)}>
          {uniqueGender.map((x, i) => {
            return (
              <option value={x} key={i}>
                {x}
              </option>
            );
          })}
        </select>
      </div>
    </div>
    <div className="spiecesContainer">
      <div className="sortby">Sort by Species:</div>
      <div>
        <select id="lang" onChange={e => onSpeciesChange(e)}>
          {uniqueSpecies.map((y, i) => {
            return (
              <option value={y} key={i}>
                {y}
              </option>
            );
          })}
        </select>
      </div>
    </div>
    <div className="statusContainer">
      <div className="sortby">Sort by Status:</div>
      <div>
        <select id="lang" onChange={e => onStatusChange(e)}>
          {uniqueStatus.map((z, i) => {
            return (
              <option value={z} key={i}>
                {z}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  </div>
);

// Specifies the default values for props:
Header.defaultProps = {
  uniqueGender: [],
  uniqueSpecies: [],
  uniqueStatus: [],
  onGenderChange: null,
  onSpeciesChange: null,
  onStatusChange: null,
};

Header.propTypes = {
  uniqueGender: PropTypes.arrayOf(PropTypes.string),
  uniqueSpecies: PropTypes.arrayOf(PropTypes.string),
  uniqueStatus: PropTypes.arrayOf(PropTypes.string),
  onGenderChange: PropTypes.func,
  onSpeciesChange: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default Header;
