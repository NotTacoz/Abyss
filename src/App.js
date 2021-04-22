/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <div className="sidebar">
        <div className="text-center mt-10 mb-12"><div className="inline-flex"><h1 className="">Genshin</h1> <h1 className="text-red-500">Mains</h1></div></div>
        <a className="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
      <div className="content">
        <div>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>
            This is <b>bold</b> and this is <strong>strong</strong>. This is <i>italic</i> and this is <em>emphasized</em>.
            This is <sup>superscript</sup> text and this is <sub>subscript</sub> text.
            This is <u>underlined</u> and this is code: <code>src/app.js</code>.
            Finally, this is a <a href="#">link</a>.
          </p>
          </div>
          <hr></hr>
          <div>
            Actions
            <div>
              <ul>
                <li><a href="#" className="button special">Default</a></li>
                <li><a href="#" className="button">Default</a></li>
                <li><a href="#" className="button alt">Default</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
