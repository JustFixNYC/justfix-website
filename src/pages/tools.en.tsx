import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { LocaleLink as Link } from "../components/locale-link";
import Layout from "../components/layout";
import { ContentfulContent, ProductList } from "./index.en";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ReadMoreLink } from "../components/read-more";
import localeConfig from "../util/locale-config.json";
import { useCurrentLocale } from "../util/use-locale";
import PageHero from "../components/page-hero";

function formatDate(dateString: string, locale?: string): string {
  var date = new Date(dateString);
  return date.toLocaleDateString(locale || localeConfig.DEFAULT_LOCALE, {
    month: "short",
    year: "numeric",
  });
}

export const ToolsPageScaffolding = (props: ContentfulContent) => {
  const {
    productSectionTitle,
    productSectionSubtitle,
    productPageProductBlocks,
    productIdeaBanner,
  } = props.content;

  const locale = useCurrentLocale();

  return (
    <Layout metadata={props.content.metadata}>
      <PageHero {...props.content.pageHero} />

      <ProductList
        productSectionTitle={productSectionTitle}
        productSectionSubtitle={productSectionSubtitle}
        homePageProductBlocks={productPageProductBlocks}
        productIdeaBanner={productIdeaBanner}
      />

      <div className="columns is-multiline">
        <div className="column is-12 my-9 mb-6-touch">
          <h2>{props.content.pastToolsTitle}</h2>
        </div>
        {props.content.pastToolsBlocks.map((tool: any, i: number) => (
          <div
            className="column is-3 is-12-touch pt-0 pb-10 pb-7-touch"
            key={i}
          >
            <h3 className="mb-3">{tool.toolName}</h3>
            <div className="eyebrow is-small mb-5">
              {formatDate(tool.toolStartDate, locale)} -{" "}
              {formatDate(tool.toolEndDate, locale)}
            </div>
            <div className="title is-4 mb-5">
              {documentToReactComponents(tool.toolDescription.json)}
            </div>
            {tool.readMoreLink && <ReadMoreLink url={tool.readMoreLink} />}
            <div className="is-divider is-hidden-tablet mt-10" />
          </div>
        ))}
      </div>

      <div className="columns has-background-success">
        <div className="column is-12 pt-9 pt-6-touch pb-12 pb-9-touch">
          <h1 className="is-inline-desktop">
            {props.content.outroSectionTitle}
          </h1>
          <Link
            to={props.content.outroSectionButton.link}
            className="button is-primary mt-5 ml-5 ml-0-touch"
          >
            {props.content.outroSectionButton.title}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const ToolsPageFragment = graphql`
  fragment ToolsPage on Query {
    contentfulToolsPage(node_locale: { eq: $locale }) {
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
      pageHero {
        pageName
        description
        onThisPageList
      }
      productSectionTitle
      productSectionSubtitle
      productPageProductBlocks {
        productName
        title
        descriptionText {
          json
        }
        button {
          title
          link
        }
        smsText
        location
        language
      }
      productIdeaBanner {
        content {
          json
        }
        button {
          title
          link
        }
      }
      pastToolsTitle
      pastToolsBlocks {
        toolName
        toolStartDate
        toolEndDate
        toolDescription {
          json
        }
        readMoreLink
      }
      outroSectionTitle
      outroSectionButton {
        title
        link
      }
    }
  }
`;

const ToolsPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...ToolsPage
      }
    `}
    render={(data) => (
      <ToolsPageScaffolding content={data.contentfulToolsPage} />
    )}
  />
);

export default ToolsPage;
