import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import logo from "./images/logo.png";
import Loader from "./Loader";

function CharacterCard(props) {
  const { character } = props;

  return (
  <React.Fragment>
    <div
      className="CharacterCard"
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div className="CharacterCard__name-container text-truncate">
          {character.name}
      </div>
    </div>
      <ul className="dates">
        <li><span>Status: </span> {character.status} </li>
        <li><span>Species: </span> {character.species} </li>
        <li><span>Gender: </span> {character.gender} </li>
        <li><span>Origin: </span> {character.origin.name} </li>
        {/* <li>Last Location: {character.location.name} </li>         */}
      </ul>
  </React.Fragment>
  );
}

class App extends React.Component {
  state = {
    loading: true,
    error: null,
    data: {
      info: {},
      results: []
    },
    nextPage: 1
  };

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
      );
      const data = await response.json();

      this.setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(this.state.data.results, data.results)
        },
        nextPage: this.state.nextPage + 1
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.error) {
      return "Error!";
    }

    return (
      <div>
        <figure>
          <img className="Logo" src={logo} alt="Rick y Morty" />
        </figure>
        <div className="App">
          <div className="container">
              <ul className="row">
                {this.state.data.results.map(character => (
                  <li className="col-6 col-md-3" key={character.id}>
                    <CharacterCard character={character} />
                  </li>
                ))}
              </ul>
              {this.state.loading && <Loader />}
              {!this.state.loading && this.state.data.info.next && (
                <button onClick={() => this.fetchCharacters()}>Load More</button>
              )}
            </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
