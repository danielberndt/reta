import React from 'react'
import {render} from 'react-dom'
import B from 'retachyons'

class App extends React.Component {

  render() {
    return (
      <B.Col min-vh-100 bg-moon-gray bg-dark-green-ns hover-bg-dark-red-ns hover-bg-black>
        <B white-90 hover={{cursor: 'pointer'}} hover-bg-dark-blue hover-yellow>hi</B>
      </B.Col>
    )
  }
}

render(<App/>, document.getElementById('app'))
