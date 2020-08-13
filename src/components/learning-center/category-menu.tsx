import React from "react";
import { ContentfulContent } from "../../pages/index.en";
import { Category, isCovidRelated } from "../../pages/learn.en";
import classnames from "classnames";
import { LocaleLink } from "../locale-link";

type CategoryMenuProps = ContentfulContent & {
  selectedCategory?: any;
};

const CategoryMenu = (props: CategoryMenuProps) => {
  return (
    <div className="field is-centered is-hidden-mobile">
      {props.content.map((category: Category, i: number) => (
        <LocaleLink
          key={i}
          to={"/learn/category/" + category.slug}
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
        </LocaleLink>
      ))}
    </div>
  );
};

export default CategoryMenu;
