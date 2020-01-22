import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import '../styles/learn.scss' 

import Layout from '../components/layout'
import { ContentfulContent } from '.'
import { ThankYouBanner } from '../components/learning-center/thank-you-banner'
import LearningSearchBar from '../components/learning-center/learning-searchbar'
import CategoryMenu from '../components/learning-center/category-menu'

const widont = require('widont')

export type Category = {
  title: string,
  description: string,
  slug: string
}

export const ArticlePreviewCard = (props: any) => {
  const localePrefix = props.locale ? ("/" + props.locale) : "";
  const url = localePrefix + '/learn/' + props.articleData.slug; 
  const categoryLabels = (props.articleData.categories).map(
    (category: Category, i: number) => 
    <Link key={i} to={localePrefix + '/learn/category/' + category.slug} className="tag is-primary is-light is-uppercase">
      {category.title}
    </Link>
  )
  return (
    <div className="box article-preview">
        <h1 className="title is-size-3 has-text-primary is-spaced has-text-weight-semibold">
          <Link to={url}>
            {widont(props.articleData.title)}
          </Link>
        </h1>
        <h6 className="has-text-grey-dark">
          {widont(props.articleData.previewText.previewText)}
        </h6>
          <br />
        <div>
          <Link to={url} className="is-inline-block is-size-7 is-uppercase has-text-weight-semibold has-letters-spaced">
            Read More →
          </Link>
          <div className="tags is-hidden-mobile is-inline-block is-uppercase is-pulled-right has-letters-spaced">
            {categoryLabels}
          </div>
          <div className="tags is-hidden-tablet is-uppercase has-letters-spaced">
            {categoryLabels}
          </div>
        </div>
    </div>
    )
  }

export const LearningPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={props.content.metadata} locale={props.locale}>
    <div id="learning-center" className="learning-center-page" >
      <section className="hero is-small">
        <div className="hero-body has-text-centered is-horizontal-center">
          <figure className="image landing-illustration is-3by1 is-horizontal-center">
            <img src={props.content.headerImage.file.url} />
          </figure>
          <div className="container content-wrapper tight">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.title}
            </h1>
            <h6 className="subtitle has-text-grey-dark is-italic">
              {widont(props.content.subtitle)}
            </h6>
            <LearningSearchBar />
              <br />
            <CategoryMenu locale={props.locale} />
          </div>
        </div>
      </section>
      <section className="content-wrapper tight">
        {(props.content.articles).map(
          (article: any, i: number) => <ArticlePreviewCard articleData={article} key={i} locale={props.locale} />
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
          headerImage {
            file {
              url
            }
          }
          subtitle
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
