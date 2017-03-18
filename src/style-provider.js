import React from 'react'
import ClientStyletron from 'styletron-client'

export const preparedStyletronContainer = {styletron: null}

export default class StyleProvider extends React.Component {

  static childContextTypes = {
    styletron: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return {styletron: this.styletron}
  }
  
  componentWillMount() {
    this.styletron = preparedStyletronContainer.styletron || new ClientStyletron(this.props.element, {prefix: '_'})
  }
  
  render() {
    return React.Children.only(this.props.children)
  }
}