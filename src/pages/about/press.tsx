import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
// import { Link } from 'gatsby'

import '../../styles/press.scss' 

import Layout from '../../components/layout'
import ReadMore from '../../components/read-more'
import { ContentfulContent } from '../../components/types'

const PressPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={props.content.metadata}>

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

        { (props.content.pressItems).map( (pressItem: any, i: number) =>
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


      {props.content.pressKitTitle && props.content.pressKitSubtitle && 
        props.content.pressKitButton && props.content.pressKitButton.link &&
      <section className="is-horizontal-center hero is-small is-primary">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-4 has-text-weight-bold is-spaced">
            {props.content.pressKitTitle}
            </h1>
            <span className="subtitle has-text-weight-medium"> 
              {documentToReactComponents(props.content.pressKitSubtitle.json)}
            </span>
            <br />
            <a href={props.content.pressKitButton.link} className="button is-medium is-primary is-inverted is-outlined">{props.content.pressKitButton.title}</a>
          </div>
        </div>

      </section>}

      <ReadMore title="Contact us." link="/contact-us" />

    </div>

</Layout>); 


const PressPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulPressPage {
          metadata {
            title
            description
            keywords { 
              keywords 
            }
            shareImage {
              file {
                url
              }
            }
          }
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
          pressKitSubtitle {
            json
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
