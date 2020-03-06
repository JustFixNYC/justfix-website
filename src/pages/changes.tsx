import React from 'react';
import Layout from '../components/layout';
import { StaticQuery, graphql } from 'gatsby';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import '../styles/changes.scss';

type ChangelogEntry = {
  title: string,
  date: string, // e.g. "2019-10-01"
  body: {
    json: Document,
  },
  node_locale: string,
};

type YearAndMonth = {year: number, month: number};

/**
 * Given a date string in the form "YYYY-MM-DD", returns the "YYYY-MM" part.
 */
const isSameYearAndMonth = (a: YearAndMonth, b: YearAndMonth) => a.year === b.year && a.month === b.month;

const parseYearAndMonth = (date: string): YearAndMonth => {
  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(5, 7), 10);

  return {year, month};
};

const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const ChangelogEntry: React.FC<{node: ChangelogEntry, prevNode?: ChangelogEntry}> = ({node, prevNode}) => {
  const currYM = parseYearAndMonth(node.date);
  const prevYM = prevNode ? parseYearAndMonth(prevNode.date) : undefined;
  const showYM = !prevYM || !isSameYearAndMonth(currYM, prevYM);

  return <>
    {showYM && <h2 className="date-and-month">{MONTHS[currYM.month]} {currYM.year}</h2>}
    <h3>{node.title}</h3>
    {documentToReactComponents(node.body.json)}
  </>;
};

const Changelog: React.FC<{nodes: ChangelogEntry[]}> = ({nodes}) => {
  return (
    <Layout>
      <div className="changes-page">
        <section className="hero is-small">
          <div className="hero-body has-text-centered is-horizontal-center">
            <div className="container">
              <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
                Changelog
              </h1>
              <div className="subtitle has-text-grey-dark is-italic">
                Learn what's new in JustFix.nyc's products
              </div>
            </div>
          </div>
          <div className="hero-body is-horizontal-center">
            <div className="content has-text-grey-dark">
            {nodes.map((node, i) => (
              <ChangelogEntry node={node} prevNode={i > 0 ? nodes[i - 1] : undefined} />
            ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const ChangelogPage: React.FC<{}> = () => (
  <StaticQuery query={graphql`
  {
    allContentfulChangelogEntry(
      filter: {node_locale: {eq: "en-US"}},
      sort: {order: DESC, fields: [date, title]}
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
  `} render={data => (<Changelog nodes={data.allContentfulChangelogEntry.nodes} />)} />
);

export default ChangelogPage;
