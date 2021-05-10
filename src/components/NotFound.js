/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="pt-12">
          <img
            className="w-60 mx-auto"
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F11%2FFacepalm-PNG-Transparent-Image.png&f=1&nofb=1"
            alt="facepalm"
          />
          <h1 className="text-center text-red-500">404</h1>
          <p className="text-center">What. The. Actual. Hell.</p>
          <p className="text-center font-bold">Did you just try to break my website!!</p>
          <p className="text-center">
            I am <strong>disappointed</strong>. But perhaps, I am not{" "}
            <strong>surpised</strong> <a href="https://www.youtube.com/watch?time_continue=1&v=j5a0jTc9S10&feature=emb_title" target="_blank" rel="noreferrer">.</a>
          </p>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;
