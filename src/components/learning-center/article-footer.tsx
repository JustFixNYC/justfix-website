import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby";
import { ContentfulContent, Locale } from '../../pages';
import { Category } from '../../pages/learn';

const widont = require('widont')

type ArticleListing = {
  title: string,
  slug: string,
}

type TableOfContentsSection = {
  categoryTitle: string,
  articles: ArticleListing[],
  noDivider?: boolean
} & Locale

const TableOfContentsSection = (props: TableOfContentsSection) => {
  const localePrefix = props.locale ? ("/" + props.locale) : "";
  return (
    props.articles.length > 0 ?
      <div className="table-of-contents-section">
        <p className="menu-label">{props.categoryTitle}</p>
        <ul>
          { (props.articles).map( ( article: ArticleListing, i: number ) => 
            (<li key={i}><Link to={localePrefix + "/learn/" + article.slug }> {article.title} </Link></li>))
          }
        <div className={"is-divider light" + (props.noDivider ? " is-hidden-tablet" : "")} />
        </ul>
      </div> :
      <div />
  );
}

const FooterCta = (props: any ) => {
  const localePrefix = props.locale ? ("/" + props.locale) : "";
  return (
    <div className="hero footer-cta is-white-ter">
      <div className="hero-body">
          <h1 className="title is-size-4 has-text-weight-bold has-text-grey-dark is-spaced">
            {widont(props.content.title)}
          </h1>
          {props.content.subtitle && (<p className="title is-size-6 has-text-weight-medium has-text-grey-dark is-spaced">
            {widont(props.content.subtitle)}
          </p>)}
          <Link to={localePrefix + props.content.ctaLink}>
              {props.content.ctaText} →
          </Link>   
      </div>
    </div>
  )
}


const LearningArticleFooterScaffolding = (props: ContentfulContent) => {
  
  const AllArticles = props.content.articles;
  const ArticlesSortedByCategory = (props.content.categoryButtons).map(
    (category: Category) => (
      {
        categoryTitle: category.title, 
        /* For given category, filter out articles that include it as one if its tags: */ 
        articles: AllArticles.filter( 
            ( article: any ) => (article.categories).some( (articleCategory: Category) => articleCategory.title === category.title)
          )
      }
    )
  );

  return (
    <div className="columns is-desktop has-background-white-ter">
      <div className="column footer-ctas">
        <FooterCta locale={props.locale} content={props.content.learningCenterCta} />
        <FooterCta locale={props.locale} content={props.content.justFixCta} />
      </div>
      <div className="column table-of-contents is-half-desktop">
        <div className="columns hero-body">
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map( ( section: TableOfContentsSection, i: number ) =>
              (i % 3 === 0 ? 
                <TableOfContentsSection key={i} locale={props.locale} noDivider={(ArticlesSortedByCategory.length <= i + 3)}
                  categoryTitle={section.categoryTitle} articles={section.articles} /> 
                : <React.Fragment key={i} />) 
            )}
          </div>
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map( ( section: TableOfContentsSection, i: number ) =>
              (i % 3 === 1 ? 
                <TableOfContentsSection key={i} locale={props.locale} noDivider={(ArticlesSortedByCategory.length <= i + 3)}
                  categoryTitle={section.categoryTitle} articles={section.articles} /> 
                : <React.Fragment key={i} />) 
            )}
          </div>
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map( ( section: TableOfContentsSection, i: number ) =>
              (i % 3 === 2 ? 
                <TableOfContentsSection key={i} locale={props.locale} noDivider={(ArticlesSortedByCategory.length <= i + 3)}
                  categoryTitle={section.categoryTitle} articles={section.articles} /> 
                : <React.Fragment key={i} />) 
            )}
          </div>
        </div>
      </div>

      <div className="column" />
      
    </div>
  );
}

export const LearningArticleFooter = (props: Locale) => (
  props.locale === "es" ? 
    <StaticQuery
      query={graphql`
        query {
          contentfulLearningCenterSearchPage( node_locale: { eq: "es" } ) {
            categoryButtons {
              title
              description
              slug
            }
            articles {
              slug
              title
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
    render = {data => (<LearningArticleFooterScaffolding content={data.contentfulLearningCenterSearchPage} locale={props.locale} />)}
    /> :
    <StaticQuery
      query={graphql`
        query {
          contentfulLearningCenterSearchPage {
            categoryButtons {
              title
              description
              slug
            }
            articles {
              slug
              title
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
    render = {data => (<LearningArticleFooterScaffolding content={data.contentfulLearningCenterSearchPage} locale={props.locale} />)}
    />
  );