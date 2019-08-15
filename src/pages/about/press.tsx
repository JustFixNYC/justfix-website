import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import { Link } from 'gatsby'

import '../../styles/index.scss' 

import Layout from '../../components/layout'
const PressPageScaffolding = (props) => 
  (<Layout>
    <article contentful-entry="'content_type=pressPage'">
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
    </article>
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
