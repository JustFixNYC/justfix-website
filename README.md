This is the JustFix website at https://justfix.org.

Actual site content is stored in [Contentful](https://www.contentful.com/), and
the site is built using [Gatsby](https://next.gatsbyjs.org/).

## Docker setup (preferred)

Docker is the preferred way to set up a local build of the site.

1.  Create an `.env` file by copying `.env.sample`:

    ```
    cp .env.sample .env
    ```

2.  Edit the `.env` file as needed.

3. Run the following commands:

    ```
    docker-compose run app yarn --frozen-lockfile
    docker-compose up
    ```

Then visit `http://localhost:8000`!


## Local development (legacy)

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


## Deployment 

  We deploy our version of the site using [Netlify](https://www.netlify.com/), which links directly to this repo and deploys on commits to the master branch. To use Netlify in deploying your own version, follow this [step-by-step guide](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).
  
## Code of Conduct

  Read about JustFix's code of conduct as an organization on our [Mission page](https://www.justfix.org/our-mission/).
