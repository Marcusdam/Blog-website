import React from 'react'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Layout