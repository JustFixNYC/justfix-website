import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, Configure, Snippet, connectSearchBox } from 'react-instantsearch-dom';

const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;

const SearchBox = ({ currentRefinement, isSearchStalled, refine, refineAddition }: any) => (
  <form noValidate action="" role="search">
    <input
      type="search"
      value={currentRefinement}
      onChange={event => {refine(event.currentTarget.value); refineAddition(event.currentTarget.value);}}
    />
    <button onClick={() => refine('')}>Reset query</button>
    {isSearchStalled ? 'My search is stalled' : ''}
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

const Result = ({ hit }: any) => {
  return (
    <a href={hit.slug}>
      <div className="result__title">
        {hit.title} →
      </div>
      <div className="result__snippet">
        <Snippet
          attribute="articleContent"
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
    <div className="">
    <InstantSearch
      searchClient={algoliasearch(appId,searchKey)}
      indexName="learning_center"
      resultsState={[]}
    >
      
      <CustomSearchBox defaultRefinement="" refineAddition={(e) => this.setState({query: e})} />

      {
      (this.state.query || '').length > 0 && 
      (
        <React.Fragment>
          <Configure attributesToSnippet={['articleContent']} />
          <Hits hitComponent={Result} />
        </React.Fragment>
      )}
    </InstantSearch>
    </div>: <React.Fragment />
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