import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { SocialIcon } from 'react-social-icons';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
// import { Link } from 'gatsby'

import '../styles/contact.scss' 

import Layout from '../components/layout'

const MAILCHIMP_URL = "https://nyc.us13.list-manage.com/subscribe/post?u=d4f5d1addd4357eb77c3f8a99&amp;id=588f6c6ef4";

const ContactPageScaffolding = (props) => 
  (<Layout metadata={props.content.metadata}>
    <div id="contact" className="contact-page" >

      <section className="hero is-medium is-white">
        <div className="hero-body has-text-centered is-horizontal-center content-wrapper">
          <div className="container">

            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.pageTitle}
            </h1>
            <span className="is-size-5 has-text-grey-dark">
              {documentToReactComponents(props.content.contactCta.json)}
            </span>

            <div className="field">
              { (props.content.socialButtons).map( (button, i) =>
                (<SocialIcon key={i} url={button.url} target="_blank" rel="noopener noreferrer" bgColor="#0096D7" style={{ height: 40, width: 40 }} />) )
              }
            </div>

            <h1 className="title is-size-4 has-text-grey-dark is-spaced ">
              {props.content.mailingListTitle}
            </h1>
            <span className="subtitle has-text-grey-dark">
              {props.content.mailingListSubtitle}
            </span>

            <form action={MAILCHIMP_URL} className="email-form is-horizontal-center" method="post" target="_blank">
              <div className="mc-field-group">
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input type="email" name="EMAIL" className="required email input" id="mce-EMAIL" placeholder="Email Address" />
                    </div>
                    <div className="control">
                        <button className="button is-primary" type="submit">
                            SIGN UP
                        </button>
                    </div>
                </div>
              </div>
            </form>
              
          </div>
        </div>

      </section>
      
    </div>
  </Layout>); 

const ContactPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulContactPage {
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
          pageTitle
          contactCta {
            json
          }
          mailingListTitle 
          mailingListSubtitle
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
