import React from "react";
import { animated, Transition } from "react-spring/renderprops";

import "../style/loading.scss";
export default function Loading(props) {
  return (
    <Transition
      native
      config={{ duration: 750 }}
      items={props.isLoading}
      from={{ opacity: 1 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {show =>
        show &&
        (properties => (
          <animated.div style={properties}>
            <div className="loading">
              <div className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
              </div>
            </div>
          </animated.div>
        ))
      }
    </Transition>
  );
}
