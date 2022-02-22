import React from "react"

const Footer = () => {
  return (
<div className="footer-main">
  <p className="footer-info">&copy; {new Date().getFullYear()}{" "}
  <span>Oleg Grygorenko</span>. Built with {" "}
    <a href="https://www.gatsbyjs.com/" >Gatsby</a>
  </p>
</div>
  )
}

export default Footer
