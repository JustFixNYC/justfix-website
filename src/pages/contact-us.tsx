import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { SocialIcon } from 'react-social-icons';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { t, Trans } from '@lingui/macro';
import { I18n } from '@lingui/react';
// import { Link } from 'gatsby'

import '../styles/contact.scss' 

import Layout from '../components/layout'
import { ContentfulContent } from '.'

const MAILCHIMP_URL = "https://nyc.us13.list-manage.com/subscribe/post?u=d4f5d1addd4357eb77c3f8a99&amp;id=588f6c6ef4";

export const ContactPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={props.content.metadata} locale={props.locale}>
    <I18n>{({i18n}) => 
    <div id="contact" className="contact-page" >

      <section className="hero is-medium">
        <div className="hero-body has-text-centered is-horizontal-center content-wrapper">
          <div className="container">

            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.pageTitle}
            </h1>
            <span className="is-size-5 has-text-grey-dark">
              {documentToReactComponents(props.content.contactCta.json)}
            </span>

            <div className="field">
              { (props.content.socialButtons).map( (button: any, i: number) =>
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
                        <input type="email" name="EMAIL" className="required email input" id="mce-EMAIL" placeholder={i18n._(t`Email Address`)} />
                    </div>
                    <div className="control">
                        <button className="button is-primary" type="submit">
                          <span className="is-uppercase"><Trans>Sign up</Trans></span>
                        </button>
                    </div>
                </div>
              </div>
            </form>
              
          </div>
        </div>

      </section>
      
    </div>
    }</I18n>
  </Layout>); 

export const ContactPageFragment = graphql`
  fragment ContactPage on Query {
    contentfulContactPage( node_locale: { eq: $locale } ) {
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
      socialButtons {
        title
        url
      }
      mailingListTitle 
      mailingListSubtitle
    }
  }`;

const ContactPage  = () => (
<StaticQuery
  query={graphql`
    query ($locale: String! = "en-US") { ...ContactPage }
  `}
  render = {data => (<ContactPageScaffolding content={data.contentfulContactPage} />)}
  />
);

export default ContactPage;
