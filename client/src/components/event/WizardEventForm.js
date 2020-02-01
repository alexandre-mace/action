import React, { Component } from 'react'
import WizardProjectFormFirstPage from "./WizardEventFormFirstPage";
import WizardProjectFormSecondPage from "./WizardEventFormSecondPage";
import WizardProjectFormThirdPage from "./WizardEventFormThirdPage";

class WizardEventForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { page } = this.state;
    return (<div>
        {page === 1 && <WizardProjectFormFirstPage error={this.props.error} onSubmit={this.nextPage}/>}
        {page === 2 && <WizardProjectFormSecondPage error={this.props.error} previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 3 && <WizardProjectFormThirdPage  error={this.props.error} previousPage={this.previousPage} onSubmit={this.props.onSubmit}/>}
      </div>
    )
  }
}

export default WizardEventForm
