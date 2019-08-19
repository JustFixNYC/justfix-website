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
                  <a href = {pressItem.hyperlink} target="_blank">
                    <img className="img-centered" src={pressItem.logo.file.url} />
                  </a>
                </figure>
              </div>
              
              <div className="media-content">
                <h4 className="is-size-5 has-text-weight-semibold">{pressItem.title}</h4>
                <p className="is-size-5 has-text-primary">
                  <a href= {pressItem.hyperlink} target="_blank">{pressItem.linkText}</a>
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


    {/* <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content"> </div>
      </div>
      <div className="media-right">
        <button className="delete"></button>
      </div>
    </article> */}

    {/* <article contentful-entry="'content_type=pressPage'">
      <header className="container">
        <h1 className="center">{props.content.title}</h1>
      </header>
      <section className="press container">
        <div>

        { (props.content.pressItems).map( (pressItem, i) =>
          (<div className="press-item container" key={i}>
            <img src={pressItem.logo.file.url} />
            <div className="content">
              <h4>{pressItem.title}</h4>
              <p><a href= {pressItem.hyperlink} target="_blank">{pressItem.linkText}</a></p>
            </div>
          </div>) )
        }

        </div>
      </section>

      <article>
        <section className="center no-margin justfix-blue padding-section">
          <div className="left-block">
            <div className="left-block_style">
              <h3>{props.content.pressKitTitle}</h3>
              <span dangerouslySetInnerHTML={{ __html: props.content.pressKitBody.childMarkdownRemark.html}} />
            </div>
          </div>
          <div className="right-block">
            <a href={props.content.pressKitButton.link} target="_blank" className="btn btn-outline">{props.content.pressKitButton.title}</a>
          </div>
          <div className="clearfix"></div>
        </section>
      </article>
    </article> */}
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
