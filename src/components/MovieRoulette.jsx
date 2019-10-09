import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Transition, animated } from "react-spring/renderprops";

import Loading from "./Loading";
import "../style/movieRoulette.scss";

export class MovieRoulette extends Component {
  state = {
    genres: undefined,
    genreId: undefined,
    randomMovie: undefined
  };

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=5c9b7f26ee7ebb9e910bf1ec551bf09b&language=en-US"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ genres: data.genres });
      });
  }

  handleRandomMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=5c9b7f26ee7ebb9e910bf1ec551bf09b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=
      ${Math.floor(Math.random() * 50 + 1)}&with_genres=${this.state.genreId}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          randomMovie: data.results[Math.floor(Math.random() * 20 + 1)]
        });
      });
  };

  handleGenreChange = event => {
    this.setState({ genreId: event.target.value });
  };

  render() {
    return (
      <Transition
        native
        config={{ duration: 250 }}
        items={this.props.movieRouletteOpen}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {show =>
          show &&
          (props => (
            <animated.div style={props}>
              <div className="roulette-screen">
                <span className="border-animation"></span>
                <span className="border-animation"></span>
                <span className="border-animation"></span>
                <span className="border-animation"></span>
                <i
                  onClick={this.props.handleMovieRoulette}
                  className="fas fa-times"
                ></i>
                <h2>Movie Roulette</h2>
                <p>Select genre:</p>

                {this.state.genres ? (
                  <ul>
                    {this.state.genres.map(element => (
                      <li>
                        <label>
                          <input
                            type="radio"
                            name="genre"
                            value={element.id}
                            id="radio-btn"
                            onChange={this.handleGenreChange}
                            key={element.id}
                          />
                          <span>{element.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Loading height={"100%"} />
                )}
                {this.state.genres && (
                  <button onClick={this.handleRandomMovie} className="roll-btn">
                    ROLL
                  </button>
                )}
                {this.state.randomMovie && (
                  <Redirect to={"/movie/" + this.state.randomMovie.id} />
                )}
              </div>
            </animated.div>
          ))
        }
      </Transition>
    );
  }
}

export default MovieRoulette;
