import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import CharacterCard from '../CharacterCard/CharacterCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import { API_URL } from '../../config';
import './Main.scss';

var selectedChar, valuesURL;

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.prevButtonPress = this.prevButtonPress.bind(this);
    this.nextButtonPress = this.nextButtonPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.sortGenderContent = this.sortGenderContent.bind(this);
    this.sortSpeciesContent = this.sortSpeciesContent.bind(this);
    this.sortStatusContent = this.sortStatusContent.bind(this);
    this.sortContent = this.sortContent.bind(this);

    this.state = {
      pending: true,
      characters: [],
      sortedArray: [],
      prev: null,
      next: null,
      uniqueGender: [],
      uniqueStatus: [],
      uniqueSpecies: [],
      filterGender: '',
      filterSpecies: '',
      filterStatus: '',
      filterByURL: '',
      show: false,
      nextBtnPressed: false,
      prevBtnPressed: false,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    valuesURL = queryString.parse(location.search);

    this.setState({ filterByURL: valuesURL }, () => {
      this.getContent();
    });
  }

  getContent() {
    let url = API_URL;
    const {
      filterByURL,
      nextBtnPressed,
      prevBtnPressed,
      next,
      prev,
    } = this.state;
    if (filterByURL.page) {
      url = API_URL + '/?page=' + filterByURL.page;
    }
    if (nextBtnPressed) {
      url = next;
      this.setState({ nextBtnPressed: false });
    }
    if (prevBtnPressed) {
      url = prev;
      this.setState({ prevBtnPressed: false });
    }

    fetch(url, {
      method: 'GET',
      // body: requestData
    })
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            characters: data.results,
            sortedArray: data.results,
            prev: data.info.prev,
            next: data.info.next,
          },
          () => {
            this.uniqueTags(data.results);
            // if search params include eg. gender=Female
            // sort content by gender
            if (filterByURL.gender) {
              this.setState(
                { filterGender: this.state.filterByURL.gender },
                () => {
                  this.sortContent();
                }
              );
            }
            // if search params include eg. spieces=Alien
            // sort content by species
            if (filterByURL.species) {
              this.setState(
                { filterSpecies: this.state.filterByURL.species },
                () => {
                  this.sortContent();
                }
              );
            }
            // if search params include eg. status=Alive
            // sort content by status
            if (filterByURL.status) {
              this.setState(
                { filterStatus: this.state.filterByURL.status },
                () => {
                  this.sortContent();
                }
              );
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          pending: false,
        });
      });
  }

  uniqueTags(character) {
    let uniqueGender = [];
    let uniqueStatus = [];
    let uniqueSpecies = [];

    character.map(x => {
      if (uniqueGender.indexOf(x.gender) === -1) {
        uniqueGender.push(x.gender);
      }
      if (uniqueStatus.indexOf(x.status) === -1) {
        uniqueStatus.push(x.status);
      }
      if (uniqueSpecies.indexOf(x.species) === -1) {
        uniqueSpecies.push(x.species);
      }
    });

    this.setState({
      uniqueGender: uniqueGender,
      uniqueStatus: uniqueStatus,
      uniqueSpecies: uniqueSpecies,
    });
  }

  sortGenderContent(e) {
    this.setState({ filterGender: e.target.value }, () => {
      this.sortContent();
    });
  }

  sortSpeciesContent(e) {
    this.setState({ filterSpecies: e.target.value }, () => {
      this.sortContent();
    });
  }

  sortStatusContent(e) {
    this.setState({ filterStatus: e.target.value }, () => {
      this.sortContent();
    });
  }

  // sort content depending on gender, spieces or status
  sortContent() {
    const {
      filterGender,
      filterSpecies,
      filterStatus,
      characters,
    } = this.state;
    let sortedArray = Array.prototype.slice.call(characters);

    if (filterGender) {
      sortedArray = sortedArray.filter(x => {
        return x.gender == filterGender;
      });
    }
    if (filterSpecies) {
      sortedArray = sortedArray.filter(x => {
        return x.species == filterSpecies;
      });
    }
    if (filterStatus) {
      sortedArray = sortedArray.filter(x => {
        return x.status == filterStatus;
      });
    }
    this.setState({ sortedArray: sortedArray });
  }

  handleClick(character) {
    selectedChar = character;
    this.setState({
      show: true,
    });
  }

  onOverlayClick() {
    this.hideModal();
  }

  hideModal() {
    this.setState({
      show: false,
    });
  }

  nextButtonPress(e) {
    e.preventDefault();
    this.setState({ pending: true, nextBtnPressed: true }, () => {
      this.getContent();
    });
  }

  prevButtonPress(e) {
    e.preventDefault();
    this.setState({ pending: true, prevBtnPressed: true }, () => {
      this.getContent();
    });
  }

  renderBody() {
    const { characters, sortedArray, pending, show } = this.state;
    if (characters && !pending) {
      return (
        <div className="main">
          {sortedArray.map((character, i) => (
            <CharacterCard
              character={character}
              key={i}
              clickCard={this.handleClick.bind(this, character)}
            />
          ))}
          {sortedArray.map((character, j) => (
            <Modal
              character={character}
              selectedCharacter={selectedChar}
              onOverlay={this.onOverlayClick}
              isShown={show}
              key={j}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="loader">
          <Loader type="Triangle" color="#f1f1f1" height="250" width="250" />
        </div>
      );
    }
  }

  render() {
    let body = this.renderBody();
    const { uniqueGender, uniqueSpecies, uniqueStatus } = this.state;
    return (
      <div className="app">
        <div className="mainHeader">
          <Header
            uniqueGender={uniqueGender}
            uniqueSpecies={uniqueSpecies}
            uniqueStatus={uniqueStatus}
            onGenderChange={this.sortGenderContent}
            onSpeciesChange={this.sortSpeciesContent}
            onStatusChange={this.sortStatusContent}
          />
        </div>
        <div>{body}</div>
        <Footer
          footer={this.state}
          nextButtonPress={this.nextButtonPress}
          prevButtonPress={this.prevButtonPress}
        />
      </div>
    );
  }
}

// Specifies the default values for props:
Main.defaultProps = {
  characters: [],
  clickCard: null,
};

Main.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

export default withRouter(Main);
