import React, { Component } from "react";
import MovieContainer from "./MovieContainer";
import MovieRoulette from "./MovieRoulette";
import Loading from "./Loading";

import "../style/index.scss";

export class main extends Component {
  state = {
    movieList: [],
    page: 0,
    movieRouletteOpen: false
  };

  componentDidMount() {
    this.fetchData();
  }

  handleLoadMore = () => {
    this.fetchData();
  };

  fetchData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&language=en-US&page=${this.state.page + 1}`
    )
      .then(res => res.json())
      .then(data => {
        let newObj = this.state.movieList;
        newObj.push(data.results);
        let nextPage = this.state.page + 1;
        this.setState({ page: nextPage, movieList: newObj });
      });
  };

  handleMovieRoulette = () => {
    this.setState({ movieRouletteOpen: !this.state.movieRouletteOpen });
  };

  render() {
    return (
      <main>
        <Loading
          height={"100vh"}
          isLoading={!this.state.movieList.length > 0}
        />
        <div
          className="container-grid"
          style={
            this.state.movieRouletteOpen
              ? {
                  overflow: "hidden",
                  transform: "scale(0.2)"
                }
              : null
          }
        >
          {this.state.movieList.length > 0 &&
            this.state.movieList.map(element => {
              return element.map(movie => {
                return <MovieContainer movie={movie} key={movie.id} />;
              });
            })}
        </div>
        <button
          style={
            this.state.movieRouletteOpen
              ? {
                  opacity: "0"
                }
              : null
          }
          className="load-btn btn"
          onClick={this.handleLoadMore}
        >
          LOAD
        </button>
        <button
          style={
            this.state.movieRouletteOpen
              ? {
                  opacity: "0"
                }
              : null
          }
          className="random-btn btn"
          onClick={this.handleMovieRoulette}
        >
          <i className="fas fa-random"></i>
        </button>
        <MovieRoulette
          movieRouletteOpen={this.state.movieRouletteOpen}
          handleMovieRoulette={this.handleMovieRoulette}
        />
      </main>
    );
  }
}

export default main;
