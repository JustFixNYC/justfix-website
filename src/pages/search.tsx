import React, { useState } from 'react'
import * as lunr from 'lunr';
import lunrIndex from '../lunr-index.json';
import '../styles/search.scss';
import Layout from '../components/layout';

const Page: React.FC = props => {
  const idx = React.useMemo(() => lunr.Index.load(lunrIndex), []);
  const [query, setQuery] = useState('');
  const results = idx.search(query);
  let resultEl: JSX.Element|null = null;

  if (query) {
    if (results.length) {
      resultEl = <ol>
        {results.map(result => {
          return (
            <li key={result.ref}>
              <dl>
                <dt>ref</dt>
                <dd>{result.ref}</dd>
                <dt>score</dt>
                <dd>{result.score}</dd>
                <dt>matchData</dt>
                <dd>{JSON.stringify(result.matchData)}</dd>
              </dl>
            </li>
          );
        })}
      </ol>;
    } else {
      resultEl = <p>Alas, no results.</p>;
    }
  }

  return (
    <Layout>
    <div className="search container">
      <label htmlFor="query">Search query:</label>{' '}
      <input id="query" type="text" value={query} onChange={e => setQuery(e.target.value)} />
      {resultEl}
    </div>
    </Layout>
  );
};

export default Page;
