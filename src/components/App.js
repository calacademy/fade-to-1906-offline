import React, { Component } from 'react'
import '../style/App.css'
import Infotab from './Infotab'
import Slider from './Slider'
import Spotlight from './Spotlight'
import Translator from './Translator'
import Attract from './Attract'

class App extends Component {
  constructor() {
    super()
    this.state = {
      display: 'spotlight', // spotlight || slider || attract
      dataIntro: null,
      dataSlides: null,
      currentLanguage: 'english', // english || spanish || chinese || filipino
      currentSlide: 0,
      navDirection: null, // prev || next
      activeSpotlightBubble: null, // 0-14 depending on cms entries & spotlight anim
      selectedSpotlight: null,
      actionTranslate: null,
      inactiveSliderInt: 45000,
      dateLastTouch: null
    }

    // Translator handler
    this.handlerSelectLanguage = this._selectLanguage.bind(this)
    // Slider handler
    this.handlerSelectSlide = this._selectSlide.bind(this)
    // Infotab  handlers
    this.handlerExploreSlider = this._exploreSlider.bind(this)
    this.handlerCloseSlider = this._closeSlider.bind(this)
    this.handlerNavNext = this._navNext.bind(this)
    this.handlerNavPrev = this._navPrev.bind(this)
    // Spotlight handler
    this.handlerSpotlightBubble = this._spotlightBubble.bind(this)
    this.handlerSpotlightHitzone = this._spotlightHitzone.bind(this)
    this.handlerSpotlightCycleComplete = this._initAttractAnimation.bind(this)
  }

  // Translator method
  _selectLanguage(e, lang) {
    e.preventDefault()
    this.setState({
      currentLanguage: lang,
      actionTranslate: true,
      dateLastTouch: new Date()
    })
  }

  // Slider method
  _selectSlide(slide) {
    this.setState({
      currentSlide: slide,
      dateLastTouch: new Date()
    })
    if (slide > this.state.currentSlide) {
      this.setState({
        navDirection: 'next'
      })
    } else
    if (slide < this.state.currentSlide) {
      this.setState({
        navDirection: 'prev'
      })
    }
  }

  // Infotab methods
  _exploreSlider(e) {
    e.preventDefault()
    this.setState({
      display: 'slider',
      dateLastTouch: new Date()
    })
    if (this.state.activeSpotlightBubble) {
      this.setState({
        selectedSpotlight: this.state.activeSpotlightBubble
      })
    } else {
      this.setState({
        selectedSpotlight: 0
      })
    }
  }
  _closeSlider(e) {
    e.preventDefault()
    this.setState({
      currentSlide: 0,
      display: 'spotlight',
      navDirection: null,
      selectedSpotlight: null,
      dateLastTouch: new Date()
    })
  }
  _navPrev(e) {
    e.preventDefault()
    this.setState({
      navDirection: 'prev',
      actionTranslate: false,
      dateLastTouch: new Date()
    })
  }
  _navNext(e) {
    e.preventDefault()
    this.setState({
      navDirection: 'next',
      actionTranslate: false,
      dateLastTouch: new Date()
    })
  }

  _spotlightBubble(i) {
    this.setState({
      activeSpotlightBubble: i
    })
  }
  _spotlightHitzone(e, i) {
    this.setState({
      selectedSpotlight: i,
      display: 'slider',
      dateLastTouch: new Date()
    })
  }
  _initAttractAnimation() {
    this.setState({
      display: 'attract'
    })
    var _this = this
    setTimeout(function() {
      _this.setState({
        display: 'spotlight'
      })
    }, 4000)
  }

  _getDataIntro() {
    var _this = this
    fetch('/data/fade-to-1906-intro.json')
    .then(function (response) {
      return response.json()
    }).then(function(data) {
      _this.setState ({
        dataIntro: data
      })
    }).catch(function (ex) {
      console.log('parsing failed', ex)
      // try again in 30 sec
      setTimeout(function () {
       _this._getDataIntro()
     }, 30000)
    })
  }

  _getDataSlides() {
    var _this = this
    fetch('/data/fade-to-1906-slides.json')
    .then(function (response) {
      return response.json()
    }).then(function(data) {
      _this.setState ({
        dataSlides: data
      })
    }).catch(function (ex) {
      console.log('parsing failed', ex)
      // try again in 30 sec
      setTimeout(function () {
       _this._getDataSlides()
     }, 30000)
    })
  }

  _inactiveSliderCheck() {
    var now = new Date()
    var check = new Date(now.getTime() - this.state.inactiveSliderInt)
    if (this.state.dateLastTouch !== null) {
      if (this.state.dateLastTouch < check) {
        this.setState({
          currentLanguage: 'english'
        })
        if (this.state.display === 'slider') {
          this.setState({
            currentSlide: 0,
            display: 'spotlight',
            navDirection: null,
            selectedSpotlight: null,
            currentLanguage: 'english',
            dateLastTouch: null
          })
        }
      }
    }
  }

  componentDidMount() {
    this._getDataIntro()
    this._getDataSlides()
    setInterval(() => this._inactiveSliderCheck(), 5000)
  }

  render() {
    return (
      <div id="app">
        <div id="container-translator">
          <Translator
            language = {this.state.currentLanguage}
            handlerSelectLanguage = {this.handlerSelectLanguage}
           />
        </div>
        <div id="container-infotab">
          <Infotab
            dataintro = {this.state.dataIntro}
            language = {this.state.currentLanguage}
            dataslides = {this.state.dataSlides}
            handlerExploreSlider = {this.handlerExploreSlider}
            handlerCloseSlider = {this.handlerCloseSlider}
            display = {this.state.display}
            slide = {this.state.currentSlide}
            handlerNavPrev = {this.handlerNavPrev}
            handlerNavNext = {this.handlerNavNext}
          />
        </div>
        <div id="container-spotlight"
          className={((this.state.display !== 'spotlight')
          && (this.state.display !== 'attract')) ? 'hide' : ''}>
          <Spotlight
            dataslides = {this.state.dataSlides}
            active = {this.state.display === 'spotlight' ? true : false}
            handlerSpotlightBubble = {this.handlerSpotlightBubble}
            handlerSpotlightHitzone = {this.handlerSpotlightHitzone}
            handlerSpotlightCycleComplete = {this.handlerSpotlightCycleComplete}
          />
        </div>
        <div id="container-slider"
          className={this.state.display !== 'slider' ? 'hide' : ''}>
          <Slider
            dataslides = {this.state.dataSlides}
            currentSlide = {this.state.currentSlide}
            handlerSelectSlide = {this.handlerSelectSlide}
            direction = {this.state.navDirection}
            activeSpotlightBubble = {this.state.activeSpotlightBubble}
            selectedSpotlight = {this.state.selectedSpotlight}
            actionTranslate = {this.state.actionTranslate}
          />
        </div>
        <div id="container-attract"
          className={this.state.display !== 'attract' ? 'hide' : 'reveal'}>
          <Attract />
        </div>
      </div>
    )
  }
}

export default App
