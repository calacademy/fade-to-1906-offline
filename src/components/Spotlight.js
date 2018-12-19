import React, {Component} from 'react'
import '../style/Spotlight.css'

var timeouts = []

class Spotlight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides: [],
      activeBubble: null,
      animationActive: false
    }
    this.handlerAnimation = this._animation.bind(this)
  }

  //componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataslides) {
      if (this.props.active && prevProps.active) {
        if (this.state.animationActive === false) {
          this.handlerAnimation()
        }
      } else {
        this._clearBubbleAnimStates()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataslides !== this.props.dataslides) {
      var data = nextProps.dataslides
      if (data) {
        this.setState({
          slides: data
        })
      }
    }
    if (nextProps.active !== this.props.active) {
      if (nextProps.active === true) {
        if (this.state.animationActive === false) {
          this.handlerAnimation()
        }
      } else {
        // clear all timeouts on nav away from spotlight to slider
        for (var i=0; i<timeouts.length; i++) {
          clearTimeout(timeouts[i])
        }
        this._clearBubbleAnimStates()
        this.setState({
          animationActive: false
        })
      }
    }
  }

  _setActiveBubble(n) {
    this.setState({
      activeBubble: n
    })
  }

  _clearBubbleAnimStates() {
    var bubbleContainers = document.getElementsByClassName("bubble-container")
    var arrBc = Object.keys(bubbleContainers).map(key => bubbleContainers[key])
    if (arrBc) {
      arrBc.forEach(function(bubbleContainer) {
        var bc = bubbleContainer
        bc.classList.remove('bubble-container-anim')
      })
    }
    var bubbles = document.getElementsByClassName("bubble")
    var arrB = Object.keys(bubbles).map(key => bubbles[key])
    if (arrB) {
      arrB.forEach(function(bubble) {
        var b = bubble
        b.classList.remove('bubble-anim-in')
      })
    }
  }

  _animation() {

    if (!this.state.animationActive) {
      this.setState({
        animationActive: true
      })

      var _this = this
      var i = 0

      var secBcOn = 500
      var secBcOff = 4100
      var bubbleContainers = document.getElementsByClassName("bubble-container")
      var arrBc = Object.keys(bubbleContainers).map(key => bubbleContainers[key])
      if (arrBc) {
        arrBc.forEach(function(bubbleContainer) {
          (function(i) {
            var bc = bubbleContainer
            timeouts.push(setTimeout(function() {
              bc.classList.add('bubble-container-anim')
              _this.props.handlerSpotlightBubble(i)
            }, secBcOn))
            timeouts.push(setTimeout(function() {
              bc.classList.remove('bubble-container-anim')
              _this.props.handlerSpotlightBubble(null)
            }, secBcOff))
          })(i)
          secBcOn += 4100
          secBcOff += 4100
          i++
        })
      }

      var secIn = 600
      var secOut = 3400
      var bubbles = document.getElementsByClassName("bubble")
      var arrB = Object.keys(bubbles).map(key => bubbles[key])
      if (arrB) {
        arrB.forEach(function(bubble) {
          var b = bubble
          timeouts.push(setTimeout(function() {
            b.classList.add('bubble-anim-in')
          }, secIn))
          timeouts.push(setTimeout(function() {
            b.classList.remove('bubble-anim-in')
          }, secOut))
          secIn += 4100
          secOut += 4100
        })
      }


      // init attract inter-anim
      timeouts.push(setTimeout(function() {
        _this.props.handlerSpotlightCycleComplete()
      }, arrB.length * 4200))
    }

  }

  render() {

    var _this = this

    if (this.state.slides) {

      // render spotlight callouts (thumbnail, posX, posY) from slides
      const rows = []

      this.state.slides.forEach(function(slide, i) {

        var img = slide.thumbnail
        var regexSrc = /<img.*?src=['"](.*?)['"]/
        var src = regexSrc.exec(img)[1]
        var regexWidth = /<img.*?width=['"](.*?)['"]/
        var width = regexWidth.exec(img)[1]

        var divStyle = {
          backgroundImage: 'url(' + src + ')',
          top: (slide.posY - (width/2) -45) + 'px',
          left: (slide.posX - (width/2)) + 'px'
        }

        rows.push(
          <div
            className="bubble-container"
            key={slide.nid}
            >
            <div
              className="hitzone"
              onClick={(e) => _this.props.handlerSpotlightHitzone(e, i)}
              onTouchEnd={(e) => _this.props.handlerSpotlightHitzone(e, i)}
              >
            </div>
            <div
              className="bubble"
              style={divStyle}
              >
            </div>
          </div>
        )

      })

      return(
        <div id="spotlight">
          {rows}
        </div>
      )

    } else {
      return(
        <div id="spotlight" />
      )

    }
  }
}

export default Spotlight
