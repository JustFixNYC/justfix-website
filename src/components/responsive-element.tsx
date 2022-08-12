import React from "react";
import classnames from "classnames";

type ResponsiveElementTagName = "h1" | "h2" | "h3" | "h4" | "p";

type ResponsiveElementInfo = {
  children: React.ReactNode;
  tagNames:
    | { mobile: ResponsiveElementTagName; tablet: ResponsiveElementTagName }
    | { touch: ResponsiveElementTagName; desktop: ResponsiveElementTagName }
    | {
        mobile: ResponsiveElementTagName;
        tabletOnly: ResponsiveElementTagName;
        desktop: ResponsiveElementTagName;
      };
  className?: string;
};

// https://bulma.io/documentation/helpers/visibility-helpers/#hide
const HIDDEN_CLASSES = {
  mobile: "is-hidden-tablet",
  touch: "is-hidden-desktop",
  tablet: "is-hidden-mobile",
  tabletOnly: "is-hidden-mobile is-hidden-desktop",
  desktop: "is-hidden-touch",
};

const ResponsiveElement = (props: ResponsiveElementInfo): JSX.Element => {
  const { children, className, tagNames } = props;

  if (Object.keys(tagNames).length < 2)
    throw new Error("At least two sizes must be given.");

  return (
    <>
      {Object.keys(tagNames).map((size: string, i: number) => {
        const Tag = tagNames[size] as keyof JSX.IntrinsicElements;
        const classes = classnames(HIDDEN_CLASSES[size], className);
        return (
          <Tag className={classes} key={i}>
            {children}
          </Tag>
        );
      })}
    </>
  );
};

export default ResponsiveElement;
