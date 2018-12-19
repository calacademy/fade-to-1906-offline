import React, {Component} from 'react'
import '../style/Attract.css'

class Attract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foobar: null
    }
  }

  //componentDidMount() {}

  render() {
    return(
      <div id="attract" />
    )
  }
}

export default Attract
