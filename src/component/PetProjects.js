import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"





const PetProjects = ({ img, imgAlt, title, description, code, deploy}) => {
  console.log(code)
  return (
    <>
        <div className="local">
          <GatsbyImage  className="petImage" alt={imgAlt} image={img} />
          <div className="wrapper"></div>
          <div className="info">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
            <div className="button-wrapper">
              <a href={deploy}>
              <button type="button"  className="button-pet" >Deploy</button>
              </a>
              <a href={code}>
                <button type="button" className="button-pet">Code</button>
              </a>
            </div>
          </div>
        </div>
    </>
  )
}

export default PetProjects
