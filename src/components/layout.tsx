import React from "react";
import Helmet from "react-helmet";
import { I18nProvider } from "@lingui/react";
import catalogEn from "../locales/en/messages";
import catalogEs from "../locales/es/messages";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import { Locale, StringLocales } from "../pages/index.en";

const favicon16 = require("../img/brand/favicon-16x16.png");
const favicon32 = require("../img/brand/favicon-32x32.png");
const favicon96 = require("../img/brand/favicon-96x96.png");

const SITE_TITLE_SUFFIX = " | JustFix.nyc";
const TWITTER_HANDLE = "@JustFixNYC";
const SITE_MAIN_URL = "https://www.justfix.nyc";
const FB_APP_ID = "247990609143668";

type LocaleCatalogs = {
  [K in StringLocales]: any;
} & { en: any };

const catalogs: LocaleCatalogs = {
  en: catalogEn,
  es: catalogEs,
};

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
} & Locale;

/** Component checks for custom metadata attributes, and then uses the default homepage values as a fallback */
const LayoutScaffolding = ({
  metadata,
  children,
  isLandingPage,
  defaultContent,
  locale,
}: Props) => {
  var title, description, keywords, shareImageURL;
  if (defaultContent && defaultContent.metadata) {
    title =
      (metadata && metadata.title + SITE_TITLE_SUFFIX) ||
      defaultContent.metadata.title;
    description =
      (metadata && metadata.description) || defaultContent.metadata.description;
    keywords =
      (metadata && metadata.keywords && metadata.keywords.keywords) ||
      defaultContent.metadata.keywords.keywords;
    shareImageURL =
      (metadata &&
        metadata.shareImage &&
        metadata.shareImage.file &&
        metadata.shareImage.file.url) ||
      defaultContent.metadata.shareImage.file.url;
  }

  return (
    <I18nProvider language={locale || "en"} catalogs={catalogs}>
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
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="JustFix.nyc" />

        <meta property="fb:app_id" content={FB_APP_ID} />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_MAIN_URL} />
        <meta property="og:image" content={encodeURI(shareImageURL)} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="twitter:creator" content={TWITTER_HANDLE} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={SITE_MAIN_URL} />
        <meta name="twitter:image" content={encodeURI(shareImageURL)} />
        <meta name="twitter:image:alt" content={title} />
      </Helmet>
      <Header isLandingPage={isLandingPage} locale={locale} />
      <div>{children}</div>
      <Footer locale={locale} />
    </I18nProvider>
  );
};

const Layout = ({ metadata, children, isLandingPage, locale }: Props) => (
  <StaticQuery
    query={graphql`
      query {
        contentfulHomePage {
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
    `}
    render={(data) => (
      <LayoutScaffolding
        metadata={metadata}
        defaultContent={data.contentfulHomePage}
        children={children}
        isLandingPage={isLandingPage}
        locale={locale}
      />
    )}
  />
);

export default Layout;
