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
      `https://api.themoviedb.org/3/movie/popular?api_key=5c9b7f26ee7ebb9e910bf1ec551bf09b&language=en-US&page=${this
        .state.page + 1}`
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
    console.log(this.state.page);
    return (
      <main>
        {!this.state.movieList.length > 0 && <Loading height={"100vh"} />}
        <div className="container-grid">
          {this.state.movieList.length > 0 &&
            this.state.movieList.map(element => {
              return element.map(movie => {
                return <MovieContainer movie={movie} key={movie.id} />;
              });
            })}
        </div>
        <button className="load-btn btn" onClick={this.handleLoadMore}>
          LOAD
        </button>
        <button className="random-btn btn" onClick={this.handleMovieRoulette}>
          <i className="fas fa-random"></i>
        </button>
        {this.state.movieRouletteOpen && (
          <MovieRoulette handleMovieRoulette={this.handleMovieRoulette} />
        )}
      </main>
    );
  }
}

export default main;
