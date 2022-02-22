import React from "react"
import  Footer from "../component/Footer"
import Navbar from "../component/Navbar"
import "../styles/modernZero.css"
import "../styles/main.scss"

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
