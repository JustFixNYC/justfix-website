import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { LocaleLink as Link } from "../components/locale-link";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Layout from "../components/layout";
import { ContentfulContent, ProductList } from "./index.en";

export const ToolsPageScaffolding = (props: ContentfulContent) => {
  const {
    productSectionTitle,
    productSectionSubtitle,
    productPageProductBlocks,
    productIdeaBanner,
  } = props.content;

  return (
    <Layout metadata={props.content.metadata}>
      <ProductList
        productSectionTitle={productSectionTitle}
        productSectionSubtitle={productSectionSubtitle}
        homePageProductBlocks={productPageProductBlocks}
        productIdeaBanner={productIdeaBanner}
      />
      <div className="columns has-background-success">
        <div className="column is-12 pt-9 pt-6-mobile pb-12 pb-9-mobile">
          <h1>{props.content.outroSectionTitle}</h1>
          <br />
          <Link
            to={props.content.outroSectionButton.link}
            className="button is-primary mt-5"
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
        location
        language
        screenshot {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
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
