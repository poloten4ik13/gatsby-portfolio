import React from "react"
import { Link } from "gatsby"

const Button = ({string1, string2}) => {
  return (
    <div className="button-container">
     <Link to='/contact'>
      <span>{string1}</span>
      <span>{string2}</span>
       </Link>
    </div>
  )
}

export default Button
