import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from "gatsby-image/withIEPolyfill"

import '../styles/resources.scss' 

import Layout from '../components/layout'
import { ContentfulContent } from '../components/types';


export function nameToSlug(name: string): string {
  return name.replace(' ','-').toLowerCase()
}

type Category = {
  title: string,
  description: string
}

const LearningPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={props.content.metadata}>
    <div id="resources" className="resources-page" >
      <section className="hero is-small is-white">
        <div className="hero-body has-text-centered is-horizontal-center">
          <figure className="image is-128x128 is-horizontal-center">
            <Img fluid={props.content.headerImage.fluid} />
          </figure>
          <div className="container content-wrapper tight">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.title}
            </h1>
            <h6 className="subtitle has-text-grey-dark is-italic">
              {props.content.subtitle}
            </h6>
            <div className="field is-centered">
              {(props.content.categoryButtons).map( 
                (category: Category, i: number) =>
                <Link key={i} to={'/resources/' + nameToSlug(category.title)} 
                  className="button is-primary is-rounded is-uppercase">
                  {category.title}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="content-wrapper tight">
        {(props.content.articles).map(
          (article: any, i: number) => {
            const url = '/resources/' + article.slug; 
            return (
              <div key={i} className="box article-preview">
                <div className="tags">
                  {(article.categories).map(
                    (category: Category, i: number) => 
                    <Link key={i} to={'/resources/' + nameToSlug(category.title)} className="tag is-primary is-light">
                      {category.title}
                    </Link>
                  )}
                </div>
                
                  <h1 className="title is-size-3 has-text-primary is-spaced has-text-weight-semibold">
                    <Link to={url}>
                      {article.title}
                    </Link>
                  </h1>
                  <h6 className="subtitle has-text-grey-dark">
                    {article.previewText.previewText}
                  </h6>
                  <Link to={url} className="has-text-weight-semibold">
                    Read More →
                  </Link>
              </div>
              )
            }
        )}
      </section>
    </div>

  </Layout>); 

const LearningPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulLearningCenterSearchPage {
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
          subtitle
          headerImage {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          categoryButtons {
            title
            description
          }
          articles {
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
            slug
            title
            subtitle {
              json
            }
            previewText {
              previewText
            }
            author
            dateUpdated
            categories {
              title
              description
            }
            articleSections {
              __typename
              ... on ContentfulLearningArticleCtaBlock {
                title
                subtitle
                ctaText
                ctaLink
              }
              ... on ContentfulLearningArticleSection {
                title
                content {
                  json
                }
              }
            }
          }
          learningCenterCta {
            title
            subtitle
            ctaText
            ctaLink
          }
          justFixCta {
            title
            subtitle
            ctaText
            ctaLink
          }
        }
      }
    `}
  render = {data => (<LearningPageScaffolding content={data.contentfulLearningCenterSearchPage} />)}
  />
);

export default LearningPage;