import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'

import '../styles/mission.scss' 

import Layout from '../components/layout'
import ReadMore from '../components/read-more'

const MissionPageScaffolding = (props) => 
  (<Layout metadata={props.content.metadata}>
    <div id="mission" className="mission-page" >

      <section className="hero is-small is-white">
        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
            {props.content.title}
            </h1>
            <h6 className="subtitle has-text-grey-dark is-italic">
            {props.content.briefDescription}
            </h6>
          </div>
        </div>
      </section>

      <section className="hero problem is-medium is-white">
        <div className="hero-body is-horizontal-center">
          <div className="content has-text-grey-dark" dangerouslySetInnerHTML = {{ __html: props.content.problemBlock.childMarkdownRemark.html}}>
          </div>
        </div>
      </section>

      <section className="hero impact is-small is-primary is-horizontal-center">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-4 has-text-weight-bold is-spaced">
            {props.content.impactTitle}
            </h1>
            <span className="subtitle has-text-weight-medium">
            {props.content.impactSubtitle}
            </span>
            <br />
            <div className="buttons is-centered">
              { (props.content.impactReportButtons).map( (button, i) => 
                (<a href={button.link} target="_blank" rel="noopener noreferrer"
                  className="button is-medium is-primary is-inverted is-outlined">
                  <span className="is-size-6-mobile">{button.title}</span>
                </a>)
              )}
            </div>
          </div>
        </div>

      </section>

      <section className="hero serve is-medium is-white">
        <div className="hero-body is-horizontal-center">
          <div className="content has-text-grey-dark" dangerouslySetInnerHTML = {{ __html: props.content.serveBlock.childMarkdownRemark.html}} />
          <div className="content has-text-grey-dark" dangerouslySetInnerHTML = {{ __html: props.content.triptychParagraph.childMarkdownRemark.html}} />
        </div>
      </section>

      <section className="hero image is-large" style={{ backgroundImage: `url(${props.content.collaborationImageBreak.file.url})` }}>
        <div className="hero-body" />
      </section>

      <section className="hero approach is-medium is-white">

        <div className="hero-body is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-centered has-text-grey-dark has-text-weight-normal is-spaced">
              Our Approach
            </h1>
            <div className="columns">
            { (props.content.approachBreakIcon).map( (icon, i) =>
              <div className="column is-one-third has-text-centered " key={i}>
                <figure className="image approach-icon is-horizontal-center">
                  <img src={ icon.iconImage.file.url } alt={icon.iconDescription} />
                </figure>
                
                <h4 className="title is-size-6 has-text-grey-dark">{icon.iconDescription}</h4>
              </div>) }
            </div>
            <div className="content has-text-grey-dark" dangerouslySetInnerHTML = {{ __html: props.content.approachBlock.childMarkdownRemark.html}} />
          </div>
        </div>

      </section>

      <section className="hero collaborate is-small is-primary is-horizontal-center">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-4 has-text-weight-bold is-spaced">
            Interested in collaborating with JustFix.nyc?
            </h1>
            <p className="subtitle has-text-weight-medium">
            We are currently seeking partnerships and further collaboration with any groups or individuals dedicated to tenant’s rights in New York City. Please contact us you are interested in discussing further or would like a demonstration.
            </p>
            <div className="buttons is-centered">
              <Link to="/contact-us" className="button is-medium is-primary is-inverted is-outlined">CONTACT US</Link>
              <a href="https://donorbox.org/donate-to-justfix-nyc" className="button is-medium is-primary is-inverted is-outlined"  target="_blank" rel="noopener noreferrer">
                DONATE
              </a>
            </div>
          </div>
        </div>

      </section>

      <ReadMore title="Meet our Team." link="/about/team" />
      
    </div>
  </Layout>); 

const MissionPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulMissionPage {
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
          briefDescription
          problemBlock {
            childMarkdownRemark {
              html
            }
          }
          impactTitle
          impactSubtitle
          impactReportButtons {
            title
            link
          }
          serveBlock {
            childMarkdownRemark {
              html
            }
          }
          triptychParagraph {
            childMarkdownRemark {
              html
            }
          }
          collaborationImageBreak {
            file {
              url
            }
          }
          approachBlock {
            childMarkdownRemark {
              html
            }
          }
          approachBreakIcon {
            iconImage {
              file {
                url
              }
            }
            iconDescription 
          }
          collaborationBlock {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    `}
  render = {data => (<MissionPageScaffolding content={data.contentfulMissionPage} />)}
  />
);

export default MissionPage;
