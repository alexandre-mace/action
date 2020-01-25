import AlgoliaPlaces from "algolia-places-react";
import React from "react";

const SearchBar = (props) => (
  <div className="search-container container">
    <div className="row">
      <div className="col-12 p-0 col-md-6 offset-md-3">
        <AlgoliaPlaces
          placeholder="Je recherche des évenements à "
          options={{
            appId: 'plXZW2RVWB96',
            apiKey: '8432eadb718c9d4714a8beb933d71483',
            language: 'fr',
            countries: ['fr'],
            type: 'address',
            useDeviceLocation: true
          }}

          onChange={({query, rawAnswer, suggestion, suggestionIndex}) => {
            console.log("change")
            props.handleUserPositionSelected(suggestion.latlng)
          }}
          onSuggestions={({rawAnswer, query, suggestions}) => {}}
          onCursorChanged={({rawAnswer, query, suggestion, suggestonIndex}) => {}}
          onClear={() => {}}
          onLimit={({message}) => {}}
          onError={({message}) => {}}
        />
      </div>
    </div>
  </div>
);
export default SearchBar;
