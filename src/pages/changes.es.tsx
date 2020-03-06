import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Changelog } from './changes';

const SpanishChangelogPage: React.FC<{}> = () => (
  <StaticQuery query={graphql`
  query ($locale: String! = "es") { ...LocalizedChangelogEntries }
  `} render={data => (<Changelog entries={data} />)} />
);

export default SpanishChangelogPage;
