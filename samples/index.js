import React from 'react'
import {render} from 'react-dom'
import B from 'reta'
import './index.css'
const Col = p => <B flex flexColumn {...p}/>

class App extends React.Component {

  render() {
    return (
      <Col minVh100 bgMoonGray bgDarkGreenNs hoverBgDarkRedNs hoverBgBlack>
        <B white90 hoverBgDarkBlue hoverYellow>hi</B>
        <B dnNs>hide on not small</B>
        <B dnNs={false}>do not hide on not small</B>
      </Col>
    )
  }
}

render(<App/>, document.getElementById('app'))
