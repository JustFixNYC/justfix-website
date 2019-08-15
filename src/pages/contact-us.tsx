import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import { Link } from 'gatsby'

import '../styles/index.scss' 

import Layout from '../components/layout'
const ContactPageScaffolding = (props) => 
  (<Layout>
    <article id="contact">
      <article className="container center full_page_hero-container">

        <header className="no-margin-bottom">
          <h1 className="center">{ props.content.pageTitle }</h1>
        </header>

        <section className="reduced-margin-top">

          <p className="hidden-desktop">
            <a className="btn btn-success btn-block btn-email" href={ props.content.contactMethods[0].url } target="_blank"><span className="glyphicon glyphicon-envelope"> </span>{ props.content.contactMethods[0].content }</a>
          </p>

          <p className="hidden-mobile">
            Send us an email at <a href={ props.content.contactMethods[0].url } target="_blank">{props.content.contactMethods[0].content}</a>
          </p>

          <div className="social">
            { (props.content.socialButtons).map( (button, i) =>
              (<span className="btn btn-primary btn-icon" key={i}>
                <a href={button.url} target="_blank">
                  <i className={"glyphicon "+ button.title}></i>
                </a>
              </span>) )
            }
          </div>
        </section>

        <section className="mailing-list">
          <div dangerouslySetInnerHTML={{ __html: props.content.mailingList.childMarkdownRemark.html}}>
          </div>
          <br />
          {/* <form  action="//nyc.us13.list-manage.com/subscribe/post?u=d4f5d1addd4357eb77c3f8a99&amp;id=588f6c6ef4" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
            <input className="footer" type="email" value="" name="EMAIL" placeholder="Email Address" required />
            <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_d4f5d1addd4357eb77c3f8a99_588f6c6ef4" value="" /></div>
            <input className="btn btn-primary signup" name="subscribe" type="submit" value="SIGN UP" />
          </form> */}
        </section>

      </article>



      <div className="clearfix"></div>

      {/* <section className="alt blue-bg white center">
        <div className="container" ng-bind-html="props.content.donateText | markdown"></div>
        <br />
        <a ui-sref="donate" className="btn btn-block btn-outline">DONATE</a>
      </section> */}

    </article>
  </Layout>); 


const ContactPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulContactPage {
          pageTitle 
          contactMethods {
            url
            content
            title
          }
          mailingList {
            childMarkdownRemark {
              html
            }
          }
          socialButtons {
            title
            url
          }
        }
      }
    `}
  render = {data => (<ContactPageScaffolding content={data.contentfulContactPage} />)}
  />
);

export default ContactPage;
