import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import {graphql, useStaticQuery} from "gatsby"
import Particle from "./Particle"
import { motion } from "framer-motion"
import Button from "./Button"

const query = graphql`
  {
    allFile(filter: {name: {eq: "home-img"}}) {
      edges {
        node {
          id
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
          }
        }
      }
    }
  }
`
const Hero = () => {
  const data = useStaticQuery(query)
  const img = data.allFile.edges[0].node.childImageSharp.gatsbyImageData

  const text1 = 'Hi';
  const text2 = `I\`m f Oleg,`;
  const text3 = 'front-end f developer';


  const spanVariants = {
    visible: { y: 0, scaleY: 1, x: 0, scaleX: 1 },
    hover: {
      y: [-1, -2, -2.8, -3.2, 0.9, 0],
      scaleY: [1, 1.5, 0.8, 1, 1.4],
      x: [-1, -2, 2.2, 0.9, 0],
      scaleX: [1, 1.2, 0.8, 1, 1.1],
      color: "#1A9C6E"
    }
  }
  const split = (text) => {
    return text.split('').map((letter,id)=> (
      <motion.span style={{ display: "inline-block"}}
                   variants={spanVariants} whileHover='hover'  initial="visible"
                   id={"n"+ id}
       key={id}>{letter}</motion.span>
    ))
  }
  return (
    <div>
      <GatsbyImage className="hero-img" alt='home-img' image={img} />
       <Particle />

      <div className="hero-main">
        <h1  className="hero-hello">{split(text1)}</h1>
        <h1 className="hero-name">{split(text2)}</h1>
        <h1 className="hero-dev">{split(text3)}</h1>
        <Button string1={"CONTACT ME!"} string2={"PRESS ME"} />
      </div>
    </div>
  )
}

export default Hero
