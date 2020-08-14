import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import { useCurrentLocale } from "../util/use-locale";

/**
 * Like Gatsby's <Link>, but it prefixes the passed-in `to` prop with
 * the current locale.
 *
 * Note that this doesn't localize the actual *text* of the link--it only localizes
 * the path!
 */
export function LocaleLink<TState>(
  props: GatsbyLinkProps<TState> & { ref?: never }
): JSX.Element {
  const locale = useCurrentLocale();

  return <Link {...props} to={`/${locale}${props.to}`} />;
}
