import React, { useState } from 'react'
import * as elasticlunr from 'elasticlunr';
import lunrIndexJson from '../../lunr-index.json';
import { SearchIndexMetadataEntry, SearchIndexDoc } from '../../search-index';

type SearchResult = {
  type: 'simple',
} & SearchIndexMetadataEntry | {
  type: 'lunr',
  lunrResult: elasticlunr.SearchResults
} & SearchIndexMetadataEntry;

const lunrIndex = elasticlunr.Index.load<SearchIndexDoc>(lunrIndexJson.lunrIndex as any);
const indexMetadata: SearchIndexMetadataEntry[] = lunrIndexJson.metadata;
const indexSlugMetadata = new Map<string, SearchIndexMetadataEntry>();

indexMetadata.forEach(metadata => {
  indexSlugMetadata.set(metadata.slug, metadata);
});

function getSearchResults(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  let lunrResults = lunrIndex.search(query);
  const simpleSlugs = new Set<string>();
  const simpleResults = indexMetadata.filter(metadata => {
    return metadata.title.toLowerCase().indexOf(query) !== -1;
  });
  simpleResults.forEach(sr => {
    simpleSlugs.add(sr.slug);
    results.push({
      type: 'simple',
      ...sr
    });
  });
  lunrResults.forEach(lr => {
    if (simpleSlugs.has(lr.ref)) return;
    const metadata = indexSlugMetadata.get(lr.ref);
    if (!metadata) {
      throw new Error(`No metadata found for slug "${lr.ref}"!`);
    }
    results.push({
      type: 'lunr',
      ...metadata,
      lunrResult: lr
    });
  });

  return results;
}

const LearningCenterSearchBar: React.FC = props => {
  const [query, setQuery] = useState('');
  const results = React.useMemo(() => getSearchResults(query), [query]);
  let resultEl: JSX.Element|null = null;

  if (query) {
    if (results.length) {
      resultEl = <ol>
        {results.map(result => {
          return (
            <li key={result.slug}>
              <dl>
                <dt>slug</dt>
                <dd>{result.slug}</dd>
                <dt>title</dt>
                <dd>{result.title}</dd>
                {result.type === 'lunr' ? <>
                  <dt>score</dt>
                  <dd>{result.lunrResult.score}</dd>
                </> : null}
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
    <div className="search container">
      <label htmlFor="query">Search query:</label>{' '}
      <input id="query" type="text" value={query} onChange={e => setQuery(e.target.value)} />
      {resultEl}
    </div>
  );
};

export default LearningCenterSearchBar;
