import React from 'react';
import PropTypes from 'prop-types';
import './CharacterCard.scss';

export const CharacterCard = ({ clickCard, character }) => {
  const { image, name } = character;
  return (
    <div className="card" onClick={clickCard}>
      <img src={image} alt="Avatar" style={{ width: '100%' }} />
      <div className="container">
        <b>{name}</b>
      </div>
    </div>
  );
};

// Specifies the default values for props:
CharacterCard.defaultProps = {
  character: {},
  clickCard: null,
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }),
  clickCard: PropTypes.func,
};

export default CharacterCard;
