import React, { Component } from "react";
import Loading from "./Loading";

import MovieRoulette from "./MovieRoulette";

import "../style/movieDetails.scss";

export class MovieDetails extends Component {
  state = {
    movie: undefined,
    isLoading: true,
    movieRouletteOpen: false
  };
  componentDidMount() {
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
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=5c9b7f26ee7ebb9e910bf1ec551bf09b&language=en-US`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ movie: data, movieRouletteOpen: false });
      });
  };
  handleFillStar = event => {
    /* let ratingStars = [];
    for (let i = 0; i < event.target.id; i++) {
      ratingStars.push(<i class="fas fa-star" />);
    }*/
  };
  imgLoaded = () => {
    this.setState({ isLoading: false });
  };
  handleMovieRoulette = () => {
    this.setState({ movieRouletteOpen: !this.state.movieRouletteOpen });
  };

  render() {
    console.log(this.state.movie);
    const ratingStars = [];
    for (let i = 0; i < 10; i++) {
      ratingStars.push(
        <i
          onMouseEnter={this.handleFillStar}
          key={i}
          className="far fa-star"
          id={i + 1}
        />
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
          {!this.state.movie && this.state.isLoading && (
            <Loading height="100vh" />
          )}
          {this.state.movie ? (
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
              <div className="star-rating">{ratingStars}</div>
              <p>
                <span>Rating:</span> {this.state.movie.vote_average}
              </p>
              <p>
                <span>Popularity:</span> {this.state.movie.popularity}
              </p>
              <p>
                <span>Language:</span> {this.state.movie.original_language}
              </p>
              <p>
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
          ) : (
            <Loading />
          )}
        </div>
        {this.state.movieRouletteOpen && (
          <MovieRoulette handleMovieRoulette={this.handleMovieRoulette} />
        )}
      </React.Fragment>
    );
  }
}

export default MovieDetails;
