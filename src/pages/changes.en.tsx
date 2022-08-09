import React from "react";
import Layout from "../components/layout";
import { StaticQuery, graphql } from "gatsby";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { EmbeddedAsset } from "../components/embedded-asset-node";

import "../styles/changes.scss";

type ChangelogEntries = {
  allContentfulChangelogEntry: {
    nodes: ChangelogEntry[];
  };
};

type ChangelogEntry = {
  title: string;
  date: string; // e.g. "2019-10-01"
  body: {
    json: Document;
  };
  node_locale: string;
};

type YearAndMonth = { year: number; month: number; localeString: string };

/**
 * Given a date string in the form "YYYY-MM-DD", returns the "YYYY-MM" part.
 */
const isSameYearAndMonth = (a: YearAndMonth, b: YearAndMonth) =>
  a.year === b.year && a.month === b.month;

const parseYearAndMonth = (date: string, locale: string): YearAndMonth => {
  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(5, 7), 10);
  const dateObj = new Date(year, month - 1);
  const localeString = dateObj.toLocaleString(locale, {
    month: "long",
    year: "numeric",
  });

  return { year, month, localeString };
};

const ChangelogEntry: React.FC<{
  node: ChangelogEntry;
  prevNode?: ChangelogEntry;
}> = ({ node, prevNode }) => {
  const currYM = parseYearAndMonth(node.date, node.node_locale);
  const prevYM = prevNode
    ? parseYearAndMonth(prevNode.date, prevNode.node_locale)
    : undefined;
  const showYM = !prevYM || !isSameYearAndMonth(currYM, prevYM);

  return (
    <>
      {showYM && <h2 className="date-and-month">{currYM.localeString}</h2>}
      <h3>{node.title}</h3>
      {documentToReactComponents(node.body.json, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (eaNode) => (
            <EmbeddedAsset
              node={eaNode}
              locale={node.node_locale}
              className="block-quoted"
            />
          ),
        },
      })}
    </>
  );
};

export const ChangelogPageScaffolding: React.FC<{
  content: ChangelogEntries;
}> = ({ content }) => {
  const { nodes } = content.allContentfulChangelogEntry;

  return (
    <Layout>
      <div className="changes-page">
        <section className="hero is-small">
          <div className="hero-body has-text-centered is-horizontal-center content-wrapper tight">
            <div className="container">
              <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
                Changelog
              </h1>
              <div className="subtitle has-text-grey-dark is-italic">
                Learn what's new in JustFix's products
              </div>
            </div>
          </div>
          <div className="hero-body is-horizontal-center content-wrapper tight">
            <div className="content has-text-grey-dark">
              {nodes.map((node, i) => (
                <ChangelogEntry
                  key={i}
                  node={node}
                  prevNode={i > 0 ? nodes[i - 1] : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const LocalizedChangelogEntriesFragment = graphql`
  fragment LocalizedChangelogEntries on Query {
    allContentfulChangelogEntry(
      filter: { node_locale: { eq: $locale } }
      sort: { order: DESC, fields: [date, title] }
    ) {
      nodes {
        title
        date
        body {
          json
        }
        node_locale
      }
    }
  }
`;

const EnglishChangelogPage: React.FC<{}> = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...LocalizedChangelogEntries
      }
    `}
    render={(data) => <ChangelogPageScaffolding content={data} />}
  />
);

export default EnglishChangelogPage;
