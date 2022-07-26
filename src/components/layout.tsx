import React from "react";
import Helmet from "react-helmet";
import { I18nProvider } from "@lingui/react";
import catalogEn from "../locales/en/messages";
import catalogEs from "../locales/es/messages";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import { removeLocaleFromPathname, useCurrentLocale } from "../util/use-locale";
import localeConfig from "../util/locale-config.json";
import { CookiesBanner } from "./cookies-banner";
import { useLocation } from "@reach/router";
import { LocaleLink } from "./locale-link";
import { Trans } from "@lingui/macro";
import classnames from "classnames";

const favicon16 = require("../img/brand/favicon-16x16.png");
const favicon32 = require("../img/brand/favicon-32x32.png");
const favicon96 = require("../img/brand/favicon-96x96.png");

const SITE_TITLE_SUFFIX = " | JustFix.nyc";
const TWITTER_HANDLE = "@JustFixNYC";
const SITE_MAIN_URL = "https://www.justfix.nyc";
const FB_APP_ID = "247990609143668";

// All our supported locales.
type StringLocales = "es" | "en";

type LocaleCatalogs = {
  [K in StringLocales]: any;
} & { en: any };

const catalogs: LocaleCatalogs = {
  en: catalogEn,
  es: catalogEs,
};

export const formatImageUrlForSEO = (url: string) =>
  url.startsWith("//") ? encodeURI(`https:${url}`) : encodeURI(url);

// import './layout.css'

type Props = {
  metadata?: {
    [key: string]: any;
  };
  defaultContent?: {
    metadata: Props["metadata"];
  };
  children: React.ReactNode;
  isLandingPage?: boolean;
};

/** Component checks for custom metadata attributes, and then uses the default homepage values as a fallback */
const LayoutScaffolding = ({
  metadata,
  children,
  isLandingPage,
  defaultContent,
}: Props) => {
  var title, description, keywords, imageUrl, shareImageURL;
  if (defaultContent && defaultContent.metadata) {
    title =
      (metadata && metadata.title + SITE_TITLE_SUFFIX) ||
      defaultContent.metadata.title;
    description =
      (metadata && metadata.description) || defaultContent.metadata.description;
    keywords =
      (metadata && metadata.keywords && metadata.keywords.keywords) ||
      defaultContent.metadata.keywords.keywords;
    imageUrl =
      (metadata &&
        metadata.shareImage &&
        metadata.shareImage.file &&
        metadata.shareImage.file.url) ||
      defaultContent.metadata.shareImage.file.url;
    shareImageURL = formatImageUrlForSEO(imageUrl);
  }

  const locale = useCurrentLocale() || localeConfig.DEFAULT_LOCALE;
  const { pathname } = useLocation();
  const isHomepage = removeLocaleFromPathname(pathname) === "";

  return (
    <I18nProvider language={locale} catalogs={catalogs}>
      <Helmet
        link={[
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: `${favicon16}`,
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: `${favicon32}`,
          },
          { rel: "shortcut icon", type: "image/png", href: `${favicon96}` },
        ]}
      >
        <html lang={locale} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="JustFix.nyc" />

        <meta property="fb:app_id" content={FB_APP_ID} />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_MAIN_URL} />
        <meta property="og:image" content={shareImageURL} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="twitter:creator" content={TWITTER_HANDLE} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={SITE_MAIN_URL} />
        <meta name="twitter:image" content={shareImageURL} />
        <meta name="twitter:image:alt" content={title} />
      </Helmet>
      <Header isLandingPage={isLandingPage} />
      <div
        className={
          // Add extra space at bottom of page for fixed footer button:
          classnames(isHomepage && "mb-12-mobile")
        }
      >
        {children}
        <Footer />
        <div className="jf-footer-menu">
          <CookiesBanner />
          {isHomepage && (
            <div className="has-background-black py-5 is-flex is-justify-content-center is-hidden-desktop">
              <LocaleLink to="/tools" className="button is-primary">
                <Trans>See our tools</Trans>
              </LocaleLink>
            </div>
          )}
        </div>
      </div>
    </I18nProvider>
  );
};

type MetadataNodes = {
  node_locale: string;
  metadata: Props["metadata"];
};

function getDefaultContentForLocale(
  locale: string,
  nodes: MetadataNodes[]
): Props["defaultContent"] {
  for (let node of nodes) {
    if (node.node_locale.startsWith(locale)) {
      return { metadata: node.metadata };
    }
  }
  throw new Error(
    `Unable to find default content metadata for locale "${locale}"`
  );
}

const Layout = ({ metadata, children, isLandingPage }: Props) => {
  const locale = useCurrentLocale();

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
        <LayoutScaffolding
          metadata={metadata}
          defaultContent={getDefaultContentForLocale(
            locale,
            data.allContentfulHomePage.nodes
          )}
          children={children}
          isLandingPage={isLandingPage}
        />
      )}
    />
  );
};

export default Layout;
