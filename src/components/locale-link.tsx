import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import { removeLocaleFromPathname, useCurrentLocale } from "../util/use-locale";
import localeConfig from "../util/locale-config.json";
import { useLocation } from "@reach/router";

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

/**
 * An instance of Gatsby's <Link> that simply switches the locale of the current path.
 * Note that the `to` prop needs to be an accepted locale or else an error is thrown.
 */
export function LocaleToggle<TState>(
  props: GatsbyLinkProps<TState> & { ref?: never }
): JSX.Element {
  const location = useLocation();
  const existingPath = removeLocaleFromPathname(location.pathname);

  if (!localeConfig.ACCEPTED_LOCALES.includes(props.to)) {
    throw new Error(
      `The locale ${props.to} in this link is not an accepted locale!`
    );
  } else return <Link {...props} to={`/${props.to}/${existingPath}`} />;
}
