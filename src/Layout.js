/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'gatsby'

const Layout = ({ children }) => {
  return (
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/marketing'>Marketing</Link>
            </nav>
            <main>
                {children}
            </main>
        </>
  )
}

export default Layout
