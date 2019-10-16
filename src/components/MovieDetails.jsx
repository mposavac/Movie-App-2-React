import React, { Component } from "react";
import Loading from "./Loading";

import MovieRoulette from "./MovieRoulette";
import language from "../languages.json";

import "../style/movieDetails.scss";

export class MovieDetails extends Component {
  state = {
    movie: undefined,
    isLoading: true,
    movieRouletteOpen: false,
    rating: 0,
    isRated: false
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
  }
  componentDidUpdate() {
    console.log("UPDATE");
    if (
      this.state.movie &&
      String(this.state.movie.id) !== this.props.match.params.movieId
    ) {
      window.scrollTo(0, 0);
      this.fetchData();
    }
  }
  fetchData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          movie: data,
          movieRouletteOpen: false,
          isRated: false,
          rating: Math.round(data.vote_average)
        });
      });
  };
  handleFillStar = event => {
    this.setState({ rating: parseInt(event.target.value), isRated: true });
  };
  imgLoaded = () => {
    this.setState({ isLoading: false });
  };
  handleMovieRoulette = () => {
    this.setState({ movieRouletteOpen: !this.state.movieRouletteOpen });
  };

  render() {
    let lang;
    if (this.state.movie) {
      document.title = this.state.movie.title;
      lang = language.filter(element => {
        return element.language === this.state.movie.original_language;
      });
    }
    console.log(this.state);
    const ratingStars = [];
    for (let i = 0; i < 10; i++) {
      ratingStars.push(
        <React.Fragment key={i}>
          <label className="rating-label" htmlFor={"rating-" + (i + 1)}>
            <i className="far fa-star" />
          </label>
          <input
            className="rating-input"
            name="rating"
            id={"rating-" + (i + 1)}
            value={i + 1}
            type="radio"
            onChange={this.handleFillStar}
            checked={this.state.rating === i + 1}
          />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div
          className="movie-details"
          style={
            this.state.movieRouletteOpen
              ? {
                  overflow: "hidden",
                  transform: "scale(0)"
                }
              : null
          }
        >
          <Loading height="100vh" isLoading={this.state.isLoading} />

          {this.state.movie && (
            <React.Fragment>
              <h1 className="title">
                {this.state.movie.title}{" "}
                <span>({this.state.movie.release_date.slice(0, 4)})</span>
              </h1>
              <div className="backdrop-container">
                <div className="img-container">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      this.state.movie.backdrop_path
                    }
                    onLoad={this.imgLoaded}
                    alt="NoImg"
                  />
                </div>
                <div className="overview">
                  <p
                    style={
                      this.state.movieRouletteOpen ? { opacity: "0" } : null
                    }
                  >
                    {this.state.movie.overview}
                  </p>
                </div>
              </div>
              <div
                className={
                  this.state.isRated ? "star-rating rated" : "star-rating"
                }
              >
                {ratingStars}
              </div>
              <p>
                <span>Rating:</span> {this.state.movie.vote_average}
              </p>
              <p>
                <span>Popularity:</span> {this.state.movie.popularity}
              </p>
              <div className="language">
                <span>Language:</span>{" "}
                {lang[0] ? (
                  <img src={lang[0].flag} alt="noimg" />
                ) : (
                  this.state.movie.original_language
                )}
              </div>
              <p className="production">
                {" "}
                <span>Production companies:</span>{" "}
                {this.state.movie.production_companies
                  .map(element => element.name)
                  .join(", ")}
              </p>
              <button
                className="random-btn btn"
                onClick={this.handleMovieRoulette}
              >
                <i className="fas fa-random"></i>
              </button>
            </React.Fragment>
          )}
        </div>
        <MovieRoulette
          movieRouletteOpen={this.state.movieRouletteOpen}
          handleMovieRoulette={this.handleMovieRoulette}
        />
      </React.Fragment>
    );
  }
}

export default MovieDetails;
