import React, {Component} from 'react'
import '../style/Infotab.css'
//import Navigator from './Navigator'

class Infotab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headEnglish: '',
      headSpanish: '',
      headChinese: '',
      headFilipino: '',
      head: '',
      subheadEnglish: '',
      subheadSpanish: '',
      subheadChinese: '',
      subheadFilipino: '',
      subhead: '',
      bodyEnglish: '',
      bodySpanish: '',
      bodyChinese: '',
      bodyFilipino: '',
      body: '',
      ctaEnglish: '',
      ctaSpanish: '',
      ctaChinese: '',
      ctaFilipino: '',
      cta: '',
      creditsEnglish: '',
      creditsSpanish: '',
      creditsChinese: '',
      creditsFilipino: '',
      credits: '',
      map: '',
      locationEnglish: '',
      locationSpanish: '',
      locationChinese: '',
      locationFilipino: '',
      location: '',
      captionEnglish: '',
      captionSpanish: '',
      captionChinese: '',
      captionFilipino: '',
      caption: '',
      countSlides: 0
    }

  }

  _setTextDisplay(lang) {
    switch (lang) {
      case 'english':
        this.setState({
          head: this.state.headEnglish,
          subhead: this.state.subheadEnglish,
          body: this.state.bodyEnglish,
          cta: this.state.ctaEnglish,
          credits: this.state.creditsEnglish
        })
        break
      case 'spanish':
        this.setState({
          head: this.state.headSpanish,
          subhead: this.state.subheadSpanish,
          body: this.state.bodySpanish,
          cta: this.state.ctaSpanish,
          credits: this.state.creditsSpanish
        })
        break
      case 'chinese':
        this.setState({
          head: this.state.headChinese,
          subhead: this.state.subheadChinese,
          body: this.state.bodyChinese,
          cta: this.state.ctaChinese,
          credits: this.state.creditsChinese
        })
        break
      case 'filipino':
        this.setState({
          head: this.state.headFilipino,
          subhead: this.state.subheadFilipino,
          body: this.state.bodyFilipino,
          cta: this.state.ctaFilipino,
          credits: this.state.creditsFilipino
        })
        break
      default:
        break
    }
  }

  componentDidMount() {
    // hack to insure state default init
    this.setState({
      head: ' ',
      subhead: ' ',
      body: ' ',
      cta: ' ',
      credits: ' '
    })
  }

  componentWillReceiveProps(nextProps) {
    var _this = this
    var data = nextProps.dataintro
    if (data) {
      data.forEach(function(dataset) {
        _this.setState({
          headEnglish: dataset.headEnglish,
          headSpanish: dataset.headSpanish,
          headChinese: dataset.headChinese,
          headFilipino: dataset.headFilipino,
          subheadEnglish: dataset.subheadEnglish,
          subheadSpanish: dataset.subheadSpanish,
          subheadChinese: dataset.subheadChinese,
          subheadFilipino: dataset.subheadFilipino,
          bodyEnglish: dataset.bodyEnglish,
          bodySpanish: dataset.bodySpanish,
          bodyChinese: dataset.bodyChinese,
          bodyFilipino: dataset.bodyFilipino,
          ctaEnglish: dataset.ctaEnglish,
          ctaSpanish: dataset.ctaSpanish,
          ctaChinese: dataset.ctaChinese,
          ctaFilipino: dataset.ctaFilipino,
          creditsEnglish: dataset.creditsEnglish,
          creditsSpanish: dataset.creditsSpanish,
          creditsChinese: dataset.creditsChinese,
          creditsFilipino: dataset.creditsFilipino
        })
      })
    }

    var language = nextProps.language
    this._setTextDisplay(language)

    var slide = nextProps.slide
    var slides = nextProps.dataslides
    if (slides) {
      slides.forEach(function(s, i) {
        if (i === slide) {
          _this.setState({
            map: s.map,
            locationEnglish: s.locationEnglish,
            locationSpanish: s.locationSpanish,
            locationChinese: s.locationChinese,
            locationFilipino: s.locationFilipino,
            captionEnglish: s.captionEnglish,
            captionSpanish: s.captionSpanish,
            captionChinese: s.captionChinese,
            captionFilipino: s.captionFilipino
          })
          switch (language) {
            case 'english':
              _this.setState({
                location: s.locationEnglish,
                caption: s.captionEnglish
              })
              break
            case 'spanish':
              _this.setState({
                location: s.locationSpanish,
                caption: s.captionSpanish
              })
              break
            case 'chinese':
              _this.setState({
                location: s.locationChinese,
                caption: s.captionChinese
              })
              break
            case 'filipino':
              _this.setState({
                location: s.locationFilipino,
                caption: s.captionFilipino
              })
              break
            default:
              break
          }
        }
      })
      this.setState({
        countSlides: slides.length
      })
    }

  }

  render() {

    // pager dots for slides count
    const rows = []
    for(var i=0; i<this.state.countSlides; i++) {
      rows.push(
        <li key={i} id={i} className={this.props.slide === i ? 'hot' : ''} />
      )
    }

    var markupHead = {__html: this.state.head}
    var markupSubhead = {__html: this.state.subhead}
    var markupBody = {__html: this.state.body}
    var markupCta = {__html: this.state.cta}
    var markupCredits = {__html: this.state.credits}
    var markupMap = {__html: this.state.map}
    var markupLocation = {__html: this.state.location}
    var markupCaption = {__html: this.state.caption}

    return(
      <div id="infotab">
        <div id="container-infotab-intro" className={((this.props.display !== 'spotlight')
          && (this.props.display !== 'attract')) ? 'hide' : ''}>
          <h1 dangerouslySetInnerHTML={markupHead} />
          <h2 dangerouslySetInnerHTML={markupSubhead} />
          <p dangerouslySetInnerHTML={markupBody} />
          <button
            onClick={(e) => this.props.handlerExploreSlider(e)}
            onTouchEnd={(e) => this.props.handlerExploreSlider(e)}
            dangerouslySetInnerHTML={markupCta}/>
          <footer dangerouslySetInnerHTML={markupCredits} />
        </div>
        <div id="container-infotab-slides" className={this.props.display !== 'slider' ? 'hide' : ''}>
          <button
            onClick={(e) => this.props.handlerCloseSlider(e)}
            onTouchEnd={(e) => this.props.handlerCloseSlider(e)}
          />
          <h1 dangerouslySetInnerHTML={markupHead} />
          <h2 dangerouslySetInnerHTML={markupSubhead} />
          <div className="map" dangerouslySetInnerHTML={markupMap} />
          <div className="location">
            <span dangerouslySetInnerHTML={markupLocation} />
          </div>
          <div className="caption" dangerouslySetInnerHTML={markupCaption} />
          <button
            className="prev"
            onClick={(e) => this.props.handlerNavPrev(e)}
            onTouchEnd={(e) => this.props.handlerNavPrev(e)}
          />
          <button
            className="next"
            onClick={(e) => this.props.handlerNavNext(e)}
            onTouchEnd={(e) => this.props.handlerNavNext(e)}
          />
          <ul className="pager">{rows}</ul>
        </div>
      </div>
    )
  }
}

export default Infotab
