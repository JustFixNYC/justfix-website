import React from "react";
import { useEffect } from "react";
import { navigate } from "gatsby";

// This component redirects users to a localized version of the given route
// based on their browser's preferred language
//
// Adapted from this very useful StackOverflow post:
// https://stackoverflow.com/questions/59908989/redirect-based-on-browser-language-in-gatsby

const getRedirectLanguage = (
  defaultLocale: string,
  acceptedLocales: string[]
) => {
  if (typeof navigator === `undefined`) {
    return defaultLocale;
  }

  const lang =
    navigator && navigator.language && navigator.language.split("-")[0];

  if (!lang || !acceptedLocales.includes(lang)) return defaultLocale;

  return lang;
};

type Props = {
  pageContext: {
    slug: string;
    defaultLocale: string;
    acceptedLocales: string[];
  };
};

const IndexPage = (props: Props) => {
  useEffect(() => {
    const urlLang = getRedirectLanguage(
      props.pageContext.defaultLocale,
      props.pageContext.acceptedLocales
    );

    navigate(`/${urlLang}${props.pageContext.slug}`);
  }, []);

  return <></>;
};

export default IndexPage;
