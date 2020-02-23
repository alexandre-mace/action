import AlgoliaPlaces from "algolia-places-react";
import React from "react";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";

let theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: "#38d39f"
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.15)"
    },
  },
  overrides: {
    MuiLink: {
      root: {
        fontWeight: "bold",
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: 'white',
        color: "black"
      }
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "black"
      }
    },
    MuiIconButton: {
      colorSecondary: {
        color: "#e1e1e1"
      },
    },
    MuiButton: {
      textSecondary: {
        color: "black"
      },
      containedSecondary: {
        color: "#e6e6e6"
      },
      containedPrimary: {
        color: "#39374E",
        backgroundColor: "#38d39f"
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        '&.Mui-checked': {
          color: '#38d39f'
        }
      }
    },
  },
  shape: {
    borderRadius: 10
  }
});

const SearchInput = (props) => {
  return (
    <ThemeProvider theme={theme}>
            <AlgoliaPlaces
              placeholder={props.placeholder ? props.placeholder : "Adresse du lieu (utilisez les propositions)"}
              options={{
                appId: 'plXZW2RVWB96',
                apiKey: '8432eadb718c9d4714a8beb933d71483',
                language: 'fr',
                countries: ['fr'],
                type: 'address',
                useDeviceLocation: true
              }}
              onChange={({query, rawAnswer, suggestion, suggestionIndex}) => {
                props.onChange(suggestion.name + ', ' + suggestion.postcode + ' ' + suggestion.city);
                props.setPosition(suggestion.latlng)
              }}
              onSuggestions={({rawAnswer, query, suggestions}) => {}}
              onCursorChanged={({rawAnswer, query, suggestion, suggestonIndex}) => {}}
              onClear={() => {}}
              onLimit={({message}) => {}}
              onError={({message}) => {}}
            />
    </ThemeProvider>
  );
}

export default SearchInput;
