import React from "react";
import { Link } from "gatsby";
import { ContentfulContent, Locale } from "../../pages";
import { Category, isCovidRelated } from "../../pages/learn";
import classnames from "classnames";

type CategoryMenuProps = ContentfulContent & {
  selectedCategory?: any;
} & Locale;

const CategoryMenu = (props: CategoryMenuProps) => {
  const localePrefix = props.locale ? "/" + props.locale : "";
  return (
    <div className="field is-centered is-hidden-mobile">
      {props.content.map((category: Category, i: number) => (
        <Link
          key={i}
          to={localePrefix + "/learn/category/" + category.slug}
          className={classnames(
            "button",
            "is-uppercase",
            isCovidRelated(category.title) ? "is-warning" : "is-primary",
            {
              "is-small": props.selectedCategory,
              "is-outlined":
                props.selectedCategory &&
                props.selectedCategory !== category.slug,
            }
          )}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default CategoryMenu;
