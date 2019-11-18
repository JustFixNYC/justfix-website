import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from '../components/layout'
import { ContentfulContent } from '../components/types';


export const SubscribedPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={{title:"Subscribed"}}>
    <section className="hero is-small is-white">
        <div className="hero-body has-text-centered is-horizontal-center">
            <div className="content content-wrapper tight">
                <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
                    {props.content.title}
                </h1>
                <span className="is-size-5">
                    {documentToReactComponents(props.content.description.json)}
                </span>
            </div>
                <br />
            <div className="container block content-wrapper tight">
                <figure className="image">
                    <img src={props.content.teamPhoto.file.url} />
                </figure>
            </div>
                <br />
            <span className="is-size-5">
                {documentToReactComponents(props.content.descriptionBelowPhoto.json)}
            </span>
        </div>
    </section>
  </Layout>); 

const SubscribedPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulSubscriptionConfirmationPage {
            title
            description {
                json
            }
            teamPhoto {
                file {
                    url
                }
            }
            descriptionBelowPhoto {
                json
            }
        }
      }
    `}
  render = {data => (<SubscribedPageScaffolding content={data.contentfulSubscriptionConfirmationPage} />)}
  />
);

export default SubscribedPage;