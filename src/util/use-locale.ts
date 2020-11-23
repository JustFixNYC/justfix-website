import { useLocation } from "@reach/router";

import localeConfig from "./locale-config.json";

/**
 * This helper function splits up a given pathname into parts
 * (delimited by `/` in the url), and ensures that the first
 * part of the pathname is an accepted locale key.
 */
const splitPathnameIntoParts = (pathname: string) => {
  let urlBits = pathname.split("/").filter((elem) => !!elem);
  const locale = urlBits[0];
  if (!localeConfig.ACCEPTED_LOCALES.includes(locale)) {
    throw new Error(
      `Locale parameter ${locale} in url is not an accepted locale!`
    );
  }
  return urlBits;
};

export const getLocaleFromPathname = (pathname: string) => {
  const urlBits = splitPathnameIntoParts(pathname);
  return urlBits[0];
};

export const removeLocaleFromPathname = (pathname: string) => {
  let urlBits = splitPathnameIntoParts(pathname);
  urlBits.shift();
  return urlBits.join("/");
};

export const useCurrentLocale = () => {
  const location = useLocation();
  return getLocaleFromPathname(location.pathname);
};
