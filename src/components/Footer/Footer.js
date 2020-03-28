import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Footer.scss';

export const Footer = props => {
  const renderPreviousButton = props => {
    const { footer, prevButtonPress } = props;
    return (
      <div className="previousContainer">
        <button
          className="previousButton"
          disabled={!footer.prev}
          onClick={prevButtonPress}
        >
          <FaArrowLeft
            size={28}
            style={footer.prev ? { opacity: 1 } : { opacity: 0.5 }}
          />
        </button>
      </div>
    );
  };

  const renderNextButton = props => {
    const { footer, nextButtonPress } = props;
    return (
      <div className="nextContainer">
        <button
          className="nextButton"
          disabled={!footer.next}
          onClick={nextButtonPress}
        >
          <FaArrowRight
            size={28}
            style={footer.next ? { opacity: 1 } : { opacity: 0.5 }}
          />
        </button>
      </div>
    );
  };

  let prevButton = renderPreviousButton(props);
  let nextButton = renderNextButton(props);
  return (
    <div className="footer">
      {prevButton}
      {nextButton}
    </div>
  );
};

// Specifies the default values for props:
Footer.defaultProps = {
  footer: {
    next: '',
    prev: '',
  },
  prevButtonPress: null,
  nextButtonPress: null,
};

Footer.propTypes = {
  footer: PropTypes.shape({
    next: PropTypes.string,
    prev: PropTypes.string,
  }),
  prevButtonPress: PropTypes.func,
  nextButtonPress: PropTypes.func,
};

export default Footer;
