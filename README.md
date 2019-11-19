This is the JustFix.nyc website at https://justfix.nyc.

Actual site content is stored in [Contentful](https://www.contentful.com/), and
the site is built using [Gatsby](https://next.gatsbyjs.org/).

## Quick start

1.  Create an `.env` file by copying `.env.sample`:

    ```
    cp .env.sample .env
    ```

2.  Edit the `.env` file as needed.

3.  Install dependencies:

    ```
    yarn --frozen-lockfile
    ```

4.  Run the development server:

    ```
    yarn develop
    ```

5.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!
    
    *Note: You'll also see a second link: `http://localhost:8000___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://next.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).*
    
    Open the the `justfix-website` directory in your code editor of choice and edit `src/pages/index.tsx`. Save your changes and the browser will update in real time!

## Docker setup

You can also run the site using Docker. Create an `.env` file as per the quick start instructions, but then run:

```
docker-compose run app yarn --frozen-lockfile
docker-compose up
```

Then visit `http://localhost:8000`!

## Deployment 

  We deploy our version of the site using [Netlify](https://www.netlify.com/), which links directly to this repo and deploys on commits to the master branch. To use Netlify in deploying your own version, follow this [step-by-step guide](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).   
