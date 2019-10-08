import React, { Component } from "react";
import { Redirect } from "react-router-dom";

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
      <div className="roulette-screen">
        <i
          onClick={this.props.handleMovieRoulette}
          className="fas fa-times"
        ></i>
        <h3>Movie Roulette</h3>
        <p>Select genre:</p>
        {this.state.genres ? (
          this.state.genres.map(element => (
            <React.Fragment>
              <input
                type="radio"
                name="genre"
                value={element.id}
                id="radio-btn"
                onChange={this.handleGenreChange}
                key={element.id}
              />
              {element.name}
              <br />
            </React.Fragment>
          ))
        ) : (
          <Loading height={"100%"} />
        )}
        {this.state.genres && (
          <button onClick={this.handleRandomMovie} className="roll-btn">
            Roll
          </button>
        )}
        {this.state.randomMovie && (
          <Redirect to={"/movie/" + this.state.randomMovie.id} />
        )}
      </div>
    );
  }
}

export default MovieRoulette;
