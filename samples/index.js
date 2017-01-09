import React from 'react'
import {render} from 'react-dom'
import B from 'retachyons'

class App extends React.Component {

  render() {
    return (
      <B.Col minVh100 bgMoonGray bgDarkGreenNs hoverBgDarkRedNs hoverBgBlack>
        <B white90 hover={{cursor: 'pointer'}} hoverBgDarkBlue hoverYellow>hi</B>
      </B.Col>
    )
  }
}

render(<App/>, document.getElementById('app'))
