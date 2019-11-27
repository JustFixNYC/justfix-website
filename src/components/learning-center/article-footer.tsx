import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby";
import { ContentfulContent } from '../../pages';
import { Category } from '../../pages/resources';


type ArticleListing = {
  title: string,
  slug: string,
}

type TableOfContentsSection = {
  categoryTitle: string,
  articles: ArticleListing[]
}

const TableOfContentsSection = (props: TableOfContentsSection) => (
  props.articles.length > 0 ?
    <div>
      <p className="menu-label">{props.categoryTitle}</p>
      { (props.articles).map( ( article: ArticleListing, i: number ) => 
        (<Link key={i} to={ "/resources/" + article.slug }> {article.title} </Link>))
      }
      <div className="is-divider light" />
    </div> :
    <div />
);

const FooterCta = (props: any ) => (
  <div className="hero footer-cta is-white">
    <div className="hero-body">
        <h1 className="title is-size-4 has-text-weight-bold has-text-grey-dark is-spaced">
          {props.content.title}
        </h1>
        {props.content.subtitle && (<p className="title is-size-6 has-text-weight-medium has-text-grey-dark is-spaced">
          {props.content.subtitle }
        </p>)}
        <a href={props.content.ctaLink} target="_blank" rel="noopener noreferrer">
            {props.content.ctaText} →
        </a>   
    </div>
  </div>
)


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
    <div className="columns is-desktop">
      <div className="column footer-ctas">
        <FooterCta content={props.content.learningCenterCta} />
        <FooterCta content={props.content.justFixCta} />
      </div>
      <div className="column table-of-contents is-half-desktop">
        <div className="columns hero-body">
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map( ( section: TableOfContentsSection, i: number ) =>
              (i % 3 === 0 ? <TableOfContentsSection key={i} categoryTitle={section.categoryTitle} articles={section.articles} /> : <span key={i} />) 
            )}
          </div>
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map( ( section: TableOfContentsSection, i: number ) =>
              (i % 3 === 1 ? <TableOfContentsSection key={i} categoryTitle={section.categoryTitle} articles={section.articles} /> : <span key={i} />) 
            )}
          </div>
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map( ( section: TableOfContentsSection, i: number ) =>
              (i % 3 === 2 ? <TableOfContentsSection key={i} categoryTitle={section.categoryTitle} articles={section.articles} /> : <span key={i} />) 
            )}
          </div>
        </div>
      </div>

      <div className="column" />
      
    </div>
  );
}

export const LearningArticleFooter = () => (
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
    render = {data => (<LearningArticleFooterScaffolding content={data.contentfulLearningCenterSearchPage} />)}
    />
  );