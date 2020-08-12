import { useLocation } from "@reach/router";

import localeConfig from "./locale-config.json";

export const getLocaleFromPathname = (pathname: string) => {
  let urlBits = pathname.split("/").filter((elem) => !!elem);
  const locale = urlBits[0];
  console.log(locale);
  if (!localeConfig.ACCEPTED_LOCALES.includes(locale)) {
    throw new Error("Locale parameter in url is not an accepted locale!");
  }
  return locale;
};

export const useCurrentLocale = () => {
  const location = useLocation();
  return getLocaleFromPathname(location.pathname);
};