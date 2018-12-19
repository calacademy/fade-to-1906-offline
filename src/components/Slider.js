import React, {Component} from 'react'
import '../style/Slider.css'
import { Carousel } from 'react-bootstrap'

class Slider extends Component {
  constructor(props) {
    super(props)

    this.handlerTouchStart = this._onTouchStart.bind(this)
    this.handlerTouchMove = this._onTouchMove.bind(this)
    this.handlerTouchEnd = this._onTouchEnd.bind(this)

    this.state = {
      index: 0,
      direction: null,
      slides: []
    }

    this._swipe = {}
    this.minDistance = 50

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedSpotlight !== this.props.selectedSpotlight) {
      this.setState({
        index: this.props.selectedSpotlight
      })
    } else
    if (prevState.index !== this.state.index) {
      this.props.handlerSelectSlide(this.state.index)
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.state.index === this.props.currentSlide) {

      if (this.state.slides !== nextProps.dataslides) {
        var data = nextProps.dataslides
        this.setState({
          slides: data
        })
      }

      if (this.state.direction !== nextProps.direction) {
        this.setState({
          direction: nextProps.direction
        })
      }

      // block slider nav on language state change
      if (!nextProps.actionTranslate) {
        if (nextProps.direction === 'prev') {
          //if (this.state.index > 0) {
            this.setState({
              //index: this.state.index - 1
              index: this.state.index === 0 ? this.state.slides.length - 1 : this.state.index - 1
            })
          //}
        }
        if (nextProps.direction === 'next') {
          //if (this.state.index < (this.state.slides.length - 1)) {
            this.setState({
              //index: this.state.index + 1
              index: this.state.index === this.state.slides.length - 1 ? 0 : this.state.index + 1
            })
          //}
        }
        if (nextProps.direction === null) {
          this.setState({
            index: 0
          })
        }
      }

    }

  }

  _onTouchStart(e) {
    const touch = e.touches[0]
    this._swipe = { x: touch.clientX }
  }

  _onTouchMove(e) {
    //e.preventDefault()
    if (e.changedTouches && e.changedTouches.length) {
      this._swipe.swiping = true
    }
  }

  _onTouchEnd(e) {
    const touch = e.changedTouches[0]
    const absX = Math.abs(touch.clientX - this._swipe.x)
    if (this._swipe.swiping && absX > this.minDistance ) {
      if (touch.clientX > this._swipe.x) {
        //if (this.state.index > 0) {
          this.setState({
            //index: this.state.index - 1,
            index: this.state.index === 0 ? this.state.slides.length - 1 : this.state.index - 1,
            direction: 'prev'
          })
        //}
      } else {
        //if (this.state.index < (this.state.slides.length - 1)) {
          this.setState({
            //index: this.state.index + 1,
            index: this.state.index === this.state.slides.length - 1 ? 0 : this.state.index + 1,
            direction: 'next'
          })
        //}
      }
    }
    this._swipe = {}
  }

  /*
  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    })
  }
  */

  render() {

    if (this.state.slides) {

      const rows = []
      const _this = this

      this.state.slides.forEach(function(data) {

        var markup = {__html: data.photo}

        rows.push(
          <Carousel.Item
            key={data.nid}
            onTouchStart={_this.handlerTouchStart}
            onTouchMove={_this.handlerTouchMove}
            onTouchEnd={_this.handlerTouchEnd}
            >
            <div dangerouslySetInnerHTML={markup} />
          </Carousel.Item>
        )
      })

      return (
        <div id="slider">
          <Carousel
            activeIndex={this.state.index}
            direction={this.state.direction}
            //onSelect={this.handleSelect}
            >
            {rows}
          </Carousel>
        </div>
      )
    } else {
      return (
        <div>There was a problem.</div>
      )

    }

  }
}

export default Slider
