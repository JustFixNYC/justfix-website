import React from "react";
import Helmet from "react-helmet";
import { I18nProvider } from "@lingui/react";
import catalogEn from "../locales/en/messages";
import catalogEs from "../locales/es/messages";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import { useCurrentLocale } from "../util/use-locale";
import localeConfig from "../util/locale-config.json";
import { CookiesBanner } from "./cookies-banner";
import { logAmplitudePageView } from "./amplitude";

const favicon16 = require("../img/brand/favicon-16x16.png");
const favicon32 = require("../img/brand/favicon-32x32.png");
const favicon96 = require("../img/brand/favicon-96x96.png");

const SITE_TITLE_SUFFIX = " | JustFix";
const TWITTER_HANDLE = "@JustFixOrg";
const SITE_MAIN_URL = "https://www.justfix.org";
const FB_APP_ID = "247990609143668";
export const FB_PIXEL_CODE = "o8wthqxkcblw3olfnavr7bi1x0bv5l";

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

type HelmetProps = {
  metadata?: {
    [key: string]: any;
  };
  defaultContent?: {
    metadata: HelmetProps["metadata"];
  };
  isLandingPage?: boolean;
  locale?: string;
};

type LayoutProps = HelmetProps & {
  children: React.ReactNode;
};

export const HelmetWithDefault = ({
  metadata,
  defaultContent,
  locale,
}: HelmetProps) => {
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

  return (
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
      <html lang={locale || localeConfig.DEFAULT_LOCALE} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="JustFix" />

      <meta property="fb:app_id" content={FB_APP_ID} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={SITE_MAIN_URL} />
      <meta property="og:image" content={shareImageURL} />
      <meta property="og:type" content="website" />
      <meta name="facebook-domain-verification" content={FB_PIXEL_CODE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={SITE_MAIN_URL} />
      <meta name="twitter:image" content={shareImageURL} />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  );
};

/** Component checks for custom metadata attributes, and then uses the default homepage values as a fallback */
const LayoutScaffolding = ({
  metadata,
  children,
  defaultContent,
  isLandingPage,
}: LayoutProps) => {
  const locale = useCurrentLocale();

  logAmplitudePageView();

  return (
    <I18nProvider language={locale} catalogs={catalogs}>
      <HelmetWithDefault
        metadata={metadata}
        isLandingPage={isLandingPage}
        defaultContent={defaultContent}
        locale={locale}
      />
      <div className="jf-page-body">
        <Header isLandingPage={isLandingPage} />
        <div>{children}</div>
        <Footer />
        <CookiesBanner />
      </div>
    </I18nProvider>
  );
};

type MetadataNodes = {
  node_locale: string;
  metadata: LayoutProps["metadata"];
};

export function getDefaultContentForLocale(
  locale: string,
  nodes: MetadataNodes[]
): LayoutProps["defaultContent"] {
  for (let node of nodes) {
    if (node.node_locale.startsWith(locale)) {
      return { metadata: node.metadata };
    }
  }
  throw new Error(
    `Unable to find default content metadata for locale "${locale}"`
  );
}

const Layout = ({ metadata, children, isLandingPage }: LayoutProps) => {
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
