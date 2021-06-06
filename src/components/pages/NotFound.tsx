/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import NotFoundImg from "./../../img/404.png";
import { Helmet } from "react-helmet";

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="content">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Abyss | 404</title>
        </Helmet>
        <div className="pt-12">
          <img className="w-96 mx-auto" src={NotFoundImg} alt="facepalm" />
          <h1 className="text-center pb-2 text-red-500">
            What. The. Actual. Hell.
          </h1>
          <p className="text-center font-bold">
            Did you just try to break my website!!
          </p>
          <h2 className="text-center">
            I am disappointed. But perhaps, I am not surpised{" "}
            <a
              href="https://www.youtube.com/watch?time_continue=1&v=j5a0jTc9S10&feature=emb_title"
              target="_blank"
              rel="noreferrer"
            >
              .
            </a>
          </h2>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;
