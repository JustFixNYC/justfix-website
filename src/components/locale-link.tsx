import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import { useCurrentLocale } from "../util/use-locale";

export function LocaleLink<TState>(
  props: GatsbyLinkProps<TState> & { ref?: any }
): JSX.Element {
  const locale = useCurrentLocale();

  return <Link {...props} to={`/${locale}${props.to}`} />;
}
