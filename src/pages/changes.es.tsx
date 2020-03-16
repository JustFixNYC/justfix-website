import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { ChangelogPageScaffolding } from './changes';

const SpanishChangelogPage: React.FC<{}> = () => (
  <StaticQuery query={graphql`
  query ($locale: String! = "es") { ...LocalizedChangelogEntries }
  `} render={data => (<ChangelogPageScaffolding entries={data} />)} />
);

export default SpanishChangelogPage;
