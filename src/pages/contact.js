import React from "react"
import Map from "../component/Map"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../component/Layout"
import ContactForm from "../component/ContactForm"
const query = graphql`
  {
    allFile(filter: {name: {eq: "contact-back"}}) {
      totalCount
      nodes {
        name
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  }
`

const Contact = () => {

  const {allFile:{nodes:[{ childImageSharp: {gatsbyImageData}}]}} = useStaticQuery(query)

  return (
    <>
      <Layout>
      <div className="contact-main">
        <ContactForm />
        <GatsbyImage className="contact-back" alt="abstract" image={gatsbyImageData} />
        <Map />
      </div>
      </Layout>
    </>
  )
}

export default Contact
