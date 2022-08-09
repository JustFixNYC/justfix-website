import React from "react";
import classnames from "classnames";

type ResponsiveElementTagName = "h1" | "h2" | "h3" | "h4" | "p";

type ResponsiveElementInfo = {
  children: React.ReactNode;
  mobile?: ResponsiveElementTagName;
  tabletOnly?: ResponsiveElementTagName;
  desktopOnly?: ResponsiveElementTagName;
  widescreenOnly?: ResponsiveElementTagName;
  touch?: ResponsiveElementTagName;
  tablet?: ResponsiveElementTagName;
  desktop?: ResponsiveElementTagName;
  widescreen?: ResponsiveElementTagName;
  fullhd?: ResponsiveElementTagName;
  className?: string;
};

const ResponsiveElement = (props: ResponsiveElementInfo): JSX.Element => {
  const { children, className, ...sizeTags } = props;

  if (Object.keys(sizeTags).length < 2)
    throw new Error("At least two sizes must be given.");

  // https://bulma.io/documentation/helpers/visibility-helpers/#hide
  const hiddenClasses = {
    mobile: "is-hidden-tablet",
    tabletOnly: "is-hidden-mobile is-hidden-desktop",
    desktopOnly: "is-hidden-touch is-hidden-widescreen",
    widescreenOnly: "is-hidden-touch is-hidden-desktop-only is-hidden-fullhd",
    touch: "is-hidden-desktop",
    tablet: "is-hidden-mobile",
    desktop: "is-hidden-touch",
    widescreen: "is-hidden-touch is-hidden-desktop-only",
    fullhd: "is-hidden-touch is-hidden-desktop-only is-hidden-widescreen-only",
  };

  return (
    <>
      {Object.keys(sizeTags).map((size: string, i: number) => {
        const Tag = sizeTags[size] as keyof JSX.IntrinsicElements;
        const classes = classnames(hiddenClasses[size], className);
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
