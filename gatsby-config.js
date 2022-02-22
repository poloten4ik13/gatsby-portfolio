/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `image`,
        path: `${__dirname}/src/assets/image`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `svgFolder`,
        path: `${__dirname}/static/svgFolder`
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `a6jhk5p7genu`,
        accessToken: process.env.contentful_api_key,
      },
    },
  ]
}
