import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Configure, Snippet } from 'react-instantsearch-dom';

const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;

const Result = ({ hit }: any) => {
  return (
    <a href={hit.slug}>
      <div className="result__title">
        {hit.title} →
      </div>
      <div className="result__snippet">
        <Snippet
          attribute="sectionsContent"
          hit={hit}
          tagName="u"
        />
      </div>
    </a>
  );
}

type Props = any;
type State = { query: string };

class LearningSearchBar extends Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  render() {
    return (appId && searchKey ? 
    <InstantSearch
      searchClient={algoliasearch(appId,searchKey)}
      indexName="learning_center"
      resultsState={[]}
    >
      <SearchBox onChange={e => this.setState({ query: e.currentTarget.value })} />

      {
      (this.state.query || '').length > 0 && 
      (
        <React.Fragment>
          <Configure attributesToSnippet={['title', 'sectionsContent']} />
          <Hits hitComponent={Result} />
        </React.Fragment>
      )}
    </InstantSearch>: <React.Fragment />
    )
  }
} 

// (appId && searchKey ?
//   <InstantSearch
//     indexName="learning_center"
//     searchClient={algoliasearch(
//       appId,
//       searchKey
//     )}
//   >
//     <SearchBox />
//     <Hits />
//   </InstantSearch> 
  

export default LearningSearchBar;