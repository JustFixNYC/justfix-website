import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { ContentfulContent } from '../../pages';
import { Category } from '../../pages/learn';

type CategoryMenuProps = 
  ContentfulContent & 
  {selectedCategory?: any}

const CategoryMenuScaffolding = (props: CategoryMenuProps) => (
  <div className="field is-centered is-hidden-mobile">
    {(props.content.categoryButtons).map( 
    (category: Category, i: number) =>
    <Link key={i} to={'/learn/category/' + category.slug} 
      className={"button is-primary is-uppercase " + 
        /* Small button size on category pages: */ 
        (props.selectedCategory ? " is-small" : "") + 
        /* Highlighted button for selected category: */
        (props.selectedCategory && props.selectedCategory !== category.slug ? " is-outlined" : "")} >
      {category.title}
    </Link>)}
  </div>)


const CategoryMenu = (props: any) => (
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
  render = {data => (<CategoryMenuScaffolding content={data.contentfulLearningCenterSearchPage} selectedCategory={props.selectedCategory} />)}
  />
);

export default CategoryMenu;
