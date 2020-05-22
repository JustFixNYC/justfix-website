import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { ContentfulContent, Locale } from "../../pages";
import { Category } from "../../pages/learn";
import classnames from "classnames";

type CategoryMenuProps = ContentfulContent & {
  selectedCategory?: any;
} & Locale;

const CategoryMenuScaffolding = (props: CategoryMenuProps) => {
  const localePrefix = props.locale ? "/" + props.locale : "";
  return (
    <div className="field is-centered is-hidden-mobile">
      {props.content.categoryButtons.map((category: Category, i: number) => (
        <Link
          key={i}
          to={localePrefix + "/learn/category/" + category.slug}
          className={classnames("button", "is-primary", "is-uppercase", {
            "is-small": props.selectedCategory,
            "is-outlined":
              props.selectedCategory &&
              props.selectedCategory !== category.slug,
          })}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

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
    render={(data) => (
      <CategoryMenuScaffolding
        content={data.contentfulLearningCenterSearchPage}
        selectedCategory={props.selectedCategory}
        locale={props.locale}
      />
    )}
  />
);

export default CategoryMenu;
