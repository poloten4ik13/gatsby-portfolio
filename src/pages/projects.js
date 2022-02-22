import React, { useEffect } from "react"
import Layout from "../component/Layout"
import { gsap, Expo } from "gsap"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import PetProjects from "../component/PetProjects"

const query = graphql`
  {
    allContentfulProject {
      nodes {
        id
        description {
          description
        }
        image {
          gatsbyImageData(
            placeholder: TRACED_SVG
            layout: CONSTRAINED
            backgroundColor: "transparent"
          )
        }
        nameProject
        link {
          link_git
          link_project
        }
      }
    }
    allFile(filter: {name: {eq: "project"}}) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
          }
        }
      }
    }
  }
`

const Projects = () => {
  let tl = gsap.timeline({Defaults: { Easing: Expo.EaseOut}});
  useEffect(() => {
    tl.from('.bg', { scale: 0.6, duration: 2, opacity: 0, ease: Expo.EaseOut, delay: 0.2})
      .to('.text-reveal', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y:0, stagger: .3, duration: 1}, "-=2.9")
      .to('.text-reveal', { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', y: -200, duration: .2, delay: .5})
      .to('.text-reveal', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', stagger: .3, duration: .3, delay: .5})
      .to('svg', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: -150 })
      .to('.local', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',y: 0, stagger: .3, opacity: 1, duration: 1 }, "-=1.4" )
      .to('.back-flur', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',y: 0, stagger: .3, opacity: 1, duration: 1}, "-=1.4" )

    window.scroll(0, 100)
  }, [])


  const petData = useStaticQuery(query)
  const backImage = petData.allFile.edges[0].node.childImageSharp.gatsbyImageData
  const petDataArr = petData.allContentfulProject.nodes


  return (
    <div  className="proj-body">
    <Layout>
        <div className="proj-main">
        <div className="bg">
          <GatsbyImage  className="project-back" alt='notebook' image={backImage} />
        </div>
          <div className="back-flur"></div>
        <div className="container">
          <div className="content">
            <div className="content-inner">
              <h1 className="text-reveal">Check out </h1>
              <p className="text-reveal">My pet projects!</p>
            </div>
            <svg viewBox="0 0 24 122" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.9393 121.061C11.5251 121.646 12.4749 121.646 13.0607 121.061L22.6066 111.515C23.1924 110.929 23.1924 109.979 22.6066 109.393C22.0208 108.808 21.0711 108.808 20.4853 109.393L12 117.879L3.51471 109.393C2.92893 108.808 1.97918 108.808 1.39339 109.393C0.807607 109.979 0.807607 110.929 1.39339 111.515L10.9393 121.061ZM10.5 -6.55671e-08L10.5 120L13.5 120L13.5 6.55671e-08L10.5 -6.55671e-08Z"
                fill="#1A9C6E" />
            </svg>
          </div>
          <div className="locations-container">
            {petDataArr.map(e=><PetProjects
                                         img={e.image.gatsbyImageData}
                                         description={e.description.description}
                                         imgAlt={'petImage'}
                                         title={e.nameProject}
                                         key={e.id}
                                         code={e.link.link_git[0]}
                                         deploy={e.link.link_project[0]}
            />)}

          </div>
        </div>
    </div>
    </Layout>
    </div>
  )
}

export default Projects
