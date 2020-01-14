import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { ContentfulContent } from '../../pages';
import { Category } from '../../pages/learn';

const CategoryMenuScaffolding = (props: ContentfulContent) => 
  (<div className="field is-centered is-hidden-mobile">
        {(props.content.categoryButtons).map( 
        (category: Category, i: number) =>
        <Link key={i} to={'/learn/category/' + category.slug} 
            className="button is-primary is-uppercase">
            {category.title}
        </Link>
        )}
    </div>
); 


const CategoryMenu  = () => (
  <StaticQuery
    query={graphql`
      query {
        contentfulLearningCenterSearchPage {
          categoryButtons {
            title
            slug
          }
        }
      }
    `}
  render = {data => (<CategoryMenuScaffolding content={data.contentfulLearningCenterSearchPage} />)}
  />
);

export default CategoryMenu;
