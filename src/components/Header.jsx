import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../style/index.scss';

export class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/">
          <div
            className={
              this.props.location.pathname.substring(1, 6) === 'movie' ||
              window.screen.width < 480
                ? ''
                : 'logo-container'
            }
          >
            <img
              src="https://img.icons8.com/carbon-copy/100/000000/play.png"
              alt="noImg"
            />
          </div>
        </Link>
        <p
          className={
            this.props.location.pathname.substring(1, 6) === 'movie' ||
            window.screen.width < 480
              ? ''
              : 'header-title'
          }
        >
          {this.props.location.pathname.substring(1, 6) === 'movie'
            ? ''
            : 'Movie Roulette'}
        </p>
      </header>
    );
  }
}

export default Header;
