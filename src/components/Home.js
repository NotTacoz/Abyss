/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'

function Home () {
  return (
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
              <li><a className="button special" onClick={() => { console.log('Button Special') }}>Special</a></li>
              <li><a className="button" onClick={() => { console.log('Button') }}>Default</a></li>
              <li><a className="button alt" onClick={() => { console.log('Button Alt') }}>Alt</a></li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Home
