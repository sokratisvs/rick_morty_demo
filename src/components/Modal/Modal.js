import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './Modal.scss';

const Modal = ({ isShown, selectedCharacter, onOverlay }) => {
  if (isShown) {
    let heShe =
      selectedCharacter.gender === 'Male'
        ? 'He'
        : selectedCharacter.gender === 'Female'
        ? 'She'
        : 'It';
    let beOrNot =
      selectedCharacter.status === 'Alive'
        ? 'lives'
        : selectedCharacter.status === 'Dead'
        ? 'used to live'
        : 'probably lives';

    return (
      <div>
        <div className="modal-overlay" onClick={onOverlay} />
        <div className="modal-content">
          <div>
            <img
              src={selectedCharacter.image}
              alt="Avatar"
              className="modal-image"
              //   style={{ width: '100%' }}
            />
          </div>
          <b>{selectedCharacter.name}</b>
          <b>
            {heShe} is {selectedCharacter.species}
          </b>
          <b>{selectedCharacter.status} status</b>
          <b>
            {heShe} {beOrNot} in {selectedCharacter.location.name}
          </b>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

// Specifies the default values for props:
Modal.defaultProps = {
  selectedCharacter: {},
  onOverlay: null,
  isShown: false,
};

Modal.propTypes = {
  selectedCharacter: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    type: PropTypes.string,
    gender: PropTypes.string,
    image: PropTypes.string,
  }),
  isShown: PropTypes.bool,
  onOverlay: PropTypes.func,
};

export default withRouter(Modal);
