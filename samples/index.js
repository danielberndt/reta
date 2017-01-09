import React from 'react'
import {render} from 'react-dom'
import B from 'retachyons'

class App extends React.Component {

  render() {
    return (
      <B.Col>
        <B blue bg-dark-green>hi</B>
      </B.Col>
    )
  }
}

render(<App/>, document.getElementById('app'))
