if (process.env.ENVIROMENT !== 'production') {
  require('dotenv').config()
}

const contentfulConfig = {
  spaceId: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
}

module.exports = {
  siteMetadata: {
    title: 'Gatsby Contentful TypeScript starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-contentful-typescript',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/img/brand/favicon-96x96.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-NMPT5JP",
  
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
  
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-67069242-1",
      },
    },
    {
      resolve: "gatsby-plugin-rollbar",
      options: {
        accessToken: "61296a1fcbc94b408bf1c1e71a851794",
        // For all configuration options, see https://docs.rollbar.com/v1.0.0/docs/rollbarjs-configuration-reference
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
          environment: "production"
        }
      }
    },
    {
      resolve: 'gatsby-plugin-heap',
      options: {
        appId: '3368297951',
        enableOnDevMode: false // if 'false', heap will be fired on NODE_ENV=production only
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    `gatsby-plugin-typescript`,
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-emotion`,
    },
    `gatsby-plugin-client-side-redirect`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`400`,`400i`,`600`,`700`]
          },
        ],
      },
    }
  ],
}
