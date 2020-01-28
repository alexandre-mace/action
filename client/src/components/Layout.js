import React from 'react';
// import Header from "./Header.jsx";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
// import {setAuthenticated} from "../../actions/authentication";
import {connect} from "react-redux";
// import {authentication} from "../../services/authentication";
// import { retrieve, reset } from '../../actions/user/show';
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

let theme = createMuiTheme({
  palette: {
    type: 'dark',
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
    MuiTab: {
      root: {
        position: 'relative',
        display: 'flex',
        borderRadius: '30px',
        textAlign: 'center',
        transition: 'all .5s',
        padding: '10px 20px',
        color: '#555555',
        height: 'auto',
        opacity: '1',
        margin: '10px 0',
        float: 'none',
        '& + button': {
          margin: '10px 0',
        },
        '&$selected': {
          '&, &:hover': {
            color: '#000',
            backgroundColor: '#38d39f',
            boxShadow: '0 7px 10px -5px rgba(76, 175, 80, 0.4)',
          },
        },
      },
      selected: {},
      wrapper: {
        lineHeight: '24px',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: '500',
        position: 'relative',
        display: 'block',
        color: 'inherit',
      },
    },
    MuiTabs: {
      indicator: {
        display: "none",
        backgroundColor: "white"
      },
    }
  },
  shape: {
    borderRadius: 10
  }
});
theme = responsiveFontSizes(theme);

class Layout extends React.Component {
  componentDidMount() {
    // if (authentication.currentUserValue) {
    //   this.props.retrieve(authentication.currentUserValue['@id'])
    //     .then(() => {
    //       this.props.setAuthenticated(true);
    //     })
    // }

    if (!localStorage.getItem('onboarding')) {
      localStorage.setItem('onboarding', 'true')
      this.props.history.push('/bienvenue')
    }
  }

  render() {
    // const user = this.props.authenticated ? (this.props.updated ? this.props.updated : this.props.retrieved) : false;
    //
    // let notifications = 0;
    //
    // if (user) {
    //   notifications = user.initiatedProjects.reduce(function (accumulateur, currentProject) {
    //     return accumulateur + currentProject.joinDemands.filter(demand => (demand.status === 'En attente')).length;
    //   }, 0);
    // }

    return(
        <ThemeProvider theme={theme}>
          <div className="my-md-5"></div>
          {this.props.children}
        </ThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  // updated: state.user.update.updated,
  // retrieved: state.user.show.retrieved,
});

const mapDispatchToProps = dispatch => ({
  // retrieve: id => dispatch(retrieve(id)),
  // reset: eventSource => dispatch(reset(eventSource)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
