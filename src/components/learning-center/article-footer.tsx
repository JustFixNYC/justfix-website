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
      <p>{props.categoryTitle}</p>
      { (props.articles).map( ( article: ArticleListing, i: number ) => 
        (<Link key={i} to={ "/resources/" + article.slug }> {article.title} </Link>))
      }
    </div> :
    <div />
);


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
    <div>
      {ArticlesSortedByCategory.map( ( section: TableOfContentsSection, i: number ) =>
        <TableOfContentsSection key={i} categoryTitle={section.categoryTitle} articles={section.articles} />)
      }
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