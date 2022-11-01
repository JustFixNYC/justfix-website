import React from "react";
import { useEffect } from "react";
import { navigate } from "gatsby";
import localeConfig from "../util/locale-config.json";
import {
  getDefaultContentForLocale,
  HelmetWithDefault,
} from "../components/layout";
import "../styles/locale-redirect.scss";
import { StaticQuery, graphql } from "gatsby";
import ReactDOM from "react-dom/server";

// This component redirects users to a localized version of the given route
// based on their browser's preferred language
//
// Adapted from this very useful StackOverflow post:
// https://stackoverflow.com/questions/59908989/redirect-based-on-browser-language-in-gatsby

const allowRedirects = process.env.GATSBY_ENABLE_PUBLIC_FACING_I18N === "1";

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

const Noscript = (props: any) => {
  // Contents of <noscript> gets lost when hydrating; this component fixes that
  // https://github.com/facebook/react/issues/1252

  const staticMarkup = ReactDOM.renderToStaticMarkup(props.children);

  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

type Props = {
  pageContext: {
    slug: string;
  };
};

const LocaleRedirectPage = (props: Props) => {
  const urlLang = allowRedirects
    ? getRedirectLanguage(
        localeConfig.DEFAULT_LOCALE,
        localeConfig.ACCEPTED_LOCALES
      )
    : localeConfig.DEFAULT_LOCALE;
  const redirectURL = `/${urlLang}${props.pageContext.slug}`;

  useEffect(() => {
    navigate(redirectURL);
  }, []);

  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulHomePage {
            nodes {
              node_locale
              metadata {
                title
                description
                keywords {
                  keywords
                }
                shareImage {
                  file {
                    url
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <>
          <HelmetWithDefault
            defaultContent={getDefaultContentForLocale(
              localeConfig.DEFAULT_LOCALE,
              data.allContentfulHomePage.nodes
            )}
            locale={localeConfig.DEFAULT_LOCALE}
          />
          <Noscript>
            <meta
              httpEquiv="refresh"
              content={`3;url=${redirectURL}`}
              data-react-helmet="false"
            />
          </Noscript>
          <div>
            <p className="jf-redirect-message">
              If you're not automatically redirected, please visit{" "}
              <a href={redirectURL}>{redirectURL}</a>.
            </p>
          </div>
        </>
      )}
    />
  );
};

export default LocaleRedirectPage;
