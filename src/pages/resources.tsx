import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import '../styles/resources.scss' 

import Layout from '../components/layout'
import { ContentfulContent } from '.'
import { LearningCenterImage } from '../components/learning-center/header-image'
import { ThankYouBanner } from '../components/learning-center/thank-you-banner'
import LearningCenterSearchBar from '../components/learning-center/search'

export type Category = {
  title: string,
  description: string,
  slug: string
}

export const ArticlePreviewCard = (props: any) => {
  const url = '/resources/' + props.articleData.slug; 
  return (
    <div className="box article-preview">
      <div className="tags">
        {(props.articleData.categories).map(
          (category: Category, i: number) => 
          <Link key={i} to={'/resources/category/' + category.slug} className="tag is-primary is-light">
            {category.title}
          </Link>
        )}
      </div>
      
        <h1 className="title is-size-3 has-text-primary is-spaced has-text-weight-semibold">
          <Link to={url}>
            {props.articleData.title}
          </Link>
        </h1>
        <h6 className="subtitle has-text-grey-dark">
          {props.articleData.previewText.previewText}
        </h6>
        <Link to={url} className="has-text-weight-semibold">
          Read More →
        </Link>
    </div>
    )
  }

const LearningPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={props.content.metadata}>
    <div id="resources" className="resources-page" >
      <section className="hero is-small is-white">
        <div className="hero-body has-text-centered is-horizontal-center">
          <figure className="image is-128x128 is-horizontal-center">
            <LearningCenterImage />
          </figure>
          <div className="container content-wrapper tight">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.title}
            </h1>
            <h6 className="subtitle has-text-grey-dark is-italic">
              {props.content.subtitle}
            </h6>
            <LearningCenterSearchBar />
            <div className="field is-centered">
              {(props.content.categoryButtons).map( 
                (category: Category, i: number) =>
                <Link key={i} to={'/resources/category/' + category.slug} 
                  className="button is-primary is-uppercase">
                  {category.title}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="content-wrapper tight">
        {(props.content.articles).map(
          (article: any, i: number) => <ArticlePreviewCard articleData={article} key={i} />
        )}
      </section>
      <ThankYouBanner />
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
          categoryButtons {
            title
            description
            slug
          }
          articles {
            slug
            title
            previewText {
              previewText
            }
            categories {
              title
              description
              slug
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
