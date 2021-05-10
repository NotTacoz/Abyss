/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import NotFoundImg from "./../img/404.png";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="pt-12">
          <img
            className="w-96 mx-auto"
            src={NotFoundImg}
            alt="facepalm"
          />
          <h1 className="text-center pb-2">What. The. Actual. Hell.</h1>
          <p className="text-center font-bold">Did you just try to break my website!!</p>
          <h2 className="text-center">
            I am disappointed. But perhaps, I am not surpised <a href="https://www.youtube.com/watch?time_continue=1&v=j5a0jTc9S10&feature=emb_title" target="_blank" rel="noreferrer">.</a>
          </h2>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;
