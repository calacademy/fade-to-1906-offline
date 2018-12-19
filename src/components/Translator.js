import React, {Component} from 'react'
import '../style/Translator.css'

class Translator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLanguage: null
    }
  }

  //componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    var language = nextProps.language
    this.setState({
      currentLanguage: language
    })
  }

  render() {
    return(
      <div id="translator">
        <button
          className={this.state.currentLanguage === 'filipino' ? 'active' : ''}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'filipino')}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'filipino')}
          ><span>FILIPINO</span></button>
        <button
          className={this.state.currentLanguage === 'chinese' ? 'active' : ''}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'chinese')}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'chinese')}
          ><span>繁体中文</span></button>
        <button
          className={this.state.currentLanguage === 'spanish' ? 'active' : ''}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'spanish')}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'spanish')}
          ><span>ESPAÑOL</span></button>
        <button
          className={this.state.currentLanguage === 'english' ? 'active' : ''}
          onClick={(e) => this.props.handlerSelectLanguage(e, 'english')}
          onTouchEnd={(e) => this.props.handlerSelectLanguage(e, 'english')}
          ><span>ENGLISH</span></button>
      </div>
    )
  }
}

export default Translator
