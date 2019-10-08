import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MovieContainer extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.arc(50, 50, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(50, 50, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 3;
    let strokeColor;
    if (this.props.movie.vote_average < 4.5) strokeColor = "#FF652F";
    else if (this.props.movie.vote_average < 7.5) strokeColor = "#FFE400";
    else strokeColor = "#14A76C";
    ctx.strokeStyle = strokeColor;
    let radians = (Math.PI / 180) * this.props.movie.vote_average * 36;
    ctx.arc(50, 50, 20, -0.5 * Math.PI, radians - 0.5 * Math.PI);
    ctx.stroke();
  }
  render() {
    const {
      title,
      poster_path,
      release_date,
      original_language,
      vote_average,
      id
    } = this.props.movie;
    return (
      <div className="movie-card">
        <Link to={"/movie/" + id}>
          <div className="poster-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt="NoImg"
            />
            <div className="rating-container">
              <canvas
                ref="canvas"
                className="canvas-rating"
                width={100}
                height={100}
              ></canvas>
              <p className="rating-number">{vote_average * 10}</p>
            </div>
          </div>
          <h3 className="title">
            {title} <span> ({release_date.slice(0, 4)})</span>
          </h3>
        </Link>
        <p className="language">Language: {original_language}</p>
      </div>
    );
  }
}

export default MovieContainer;
