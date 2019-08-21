import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import { Link } from 'gatsby'

import '../../styles/index.scss' 

import Layout from '../../components/layout'
const PressPageScaffolding = (props) => 
  (<Layout>

    <div id="press" className="press-page">

      <section className="hero is-small is-white">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
            {props.content.title}
            </h1>
          </div>
        </div>

      </section>

      <section className="press-links content-wrapper">

        { (props.content.pressItems).map( (pressItem, i) =>
            (<article className="media" key={i}>
              <div className="media-left is-hidden-mobile">
                <figure className="image is-horizontal-center">
                  <a href = {pressItem.hyperlink} target="_blank" rel="noopener noreferrer">
                    <img className="img-centered" src={pressItem.logo.file.url} />
                  </a>
                </figure>
              </div>
              
              <div className="media-content">
                <h4 className="is-size-5 has-text-weight-semibold">{pressItem.title}</h4>
                <p className="is-size-5 has-text-primary">
                  <a href= {pressItem.hyperlink} target="_blank" rel="noopener noreferrer">{pressItem.linkText}</a>
                </p>
              </div>
            </article>) )
          }

      </section>

      <section className="is-horizontal-center hero is-small is-primary">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-4 has-text-weight-bold is-spaced">
            {props.content.pressKitTitle}
            </h1>
            <span className="subtitle has-text-weight-medium" 
              dangerouslySetInnerHTML={{ __html: props.content.pressKitBody.childMarkdownRemark.html}} >
            </span>
            <br />
            <a href={props.content.pressKitButton.link} className="button is-large is-primary is-inverted is-outlined">{props.content.pressKitButton.title}</a>
          </div>
        </div>

      </section>

    </div>

</Layout>); 


const PressPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulPressPage {
          title
          pressItems {
            title
            hyperlink
            linkText
            logo {
              file {
                url
              }
            }
          }
          pressKitTitle
          pressKitBody {
            childMarkdownRemark {
              html
            }
          }
          pressKitButton {
            title
            link
          }
        }
      }
    `}
  render = {data => (<PressPageScaffolding content={data.contentfulPressPage} />)}
  />
);

export default PressPage;
