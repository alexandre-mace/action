import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { create, reset } from '../../actions/event/create';
import Layout from "../../components/Layout";
import WizardEventForm from "./WizardEventForm";
import AccountLink from "../AccountLink";

class Initiate extends Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        created: PropTypes.object,
        eventSource: PropTypes.instanceOf(EventSource),
        create: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    };

    componentWillUnmount() {
      this.props.reset(this.props.eventSource);
    }

    handleSubmit = values => {
        console.log(values)
          this.props.create(values)
            .then(() => {
              this.props.history.push(`projet-initié`);
            })
            .catch((e) => {
              console.log(e)
            })
    }

    render() {
      return (
        <Layout {...this.props}>
          <div className="form-center">
            <div className="container">
              <div className="row">
                <div className="col">
                  {this.props.error && (
                    <div className="alert alert-danger" role="alert">
                      <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                      {this.props.error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute-center">
            <WizardEventForm onSubmit={this.handleSubmit} values={this.props.item} />
          </div>
        </Layout>
      );
    }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.event.create;
  return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initiate);
