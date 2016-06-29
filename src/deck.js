/**
 * <Deck
 *    vertical|horizontal
 *    loop
 *    swipe
 *    wheel
 *    animate
 *    dura=1400
 *    factor=0.4
 *    current=2
 *    easing=function(currentTime/duration)||string
 *    onSwitching
 *    onSwitchDone
 *  >
 *  <Deck.Slide>
 *  </Deck.Slide>
 *
 *  <Deck.Slide>
 *  </Deck.Slide>
 * </Deck>
 *
 */
import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import Tween from './tween';
import cx from 'classnames';
import raf from 'raf';
import Slide from './slide';
import './style.scss';

const SWIPE_DURA = 1000; // default transition duration
const SWIPE_MIN_DISTANCE = 0;
const SWIPE_FACTOR = 0.22;
const FORWARD_SPEED = 6;
const CURRENT_SLIDE_REF = Symbol('current slide');

const STATUS = {
  NORMAL: 0,
  SWIPE_STARTED:1,
  SWIPING: 2,
  FORWARDING: 4,
  CANCELING: 8,
  UP: 16,
  DOWN: 32,
  SWIPED: 64,
  WHEELING: 128
};

class Deck extends Component {
  constructor(props, context) {
    super(props, context);
    const { current, easing, dura = SWIPE_DURA } = props;
    this.state = { current, prev: this.normalizeIndex(current + 1), status: STATUS.NORMAL };

    this.handleTouchStart = ::this.handleTouchStart;
    this.handleTouchMove = ::this.handleTouchMove;
    this.handleTouchEnd = ::this.handleTouchEnd;
    this.handleWheel = ::this.handleWheel;
    this.calcDimension = ::this.calcDimension;

    this.tween = new Tween();
    this.tween.ease(easing).duration(dura)
      .on('started', ::this.onSwitchStarted)
      .on('updating', ::this.onSwitching)
      .on('stopped', ::this.onSwitchStopped)
      .on('paused', ::this.onSwitchPaused)
      .on('done', ::this.onSwitchDone);
  }
  componentDidMount() {
    this.calcDimension();
    window.addEventListener('resize', this.calcDimension);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.calcDimension)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.status & STATUS.SWIPE_STARTED) return false;
    return true;
  }
  componentWillReceiveProps(nextProps) {
    const { status, current: prev } = this.state;
    if (status & STATUS.SWIPED || status & STATUS.WHEELING) return;
    const current = this.normalizeIndex(nextProps.current);
    if (prev !== current) {
      if (nextProps.animate !== false) {
        this.setState({
          prev, current,
          status: STATUS.FORWARDING | (prev < current ? STATUS.DOWN : STATUS.UP)
        });
        this.startTran(0, (status & STATUS.DOWN ? -1 : 1) * (nextProps.horizontal ? this.state.width : this.state.height));
      } else {
        this.setState({ prev, current, status: STATUS.NORMAL });
        this.onSwitchDone();
      }
    }
  }
  normalizeIndex(index) {
    const slidesCount = Children.count(this.props.children);
    return (index + slidesCount) % slidesCount;
  }
  calcDimension() {
    const dom = ReactDOM.findDOMNode(this);
    this.setState({
      width: dom.offsetWidth,
      height: dom.offsetHeight
    });
  }
  onSwitchStarted() {
    const { onSwitchStarted: callback } = this.props;
    callback && raf(() => callback.call(this, this.state));
  }
  onSwitching({ distance, factor }) {
    this.setState({ distance });
    const { onSwitching: callback } = this.props;
    callback && raf(() => {
      const progress = factor || Math.abs(distance) / (this.props.horizontal ? this.state.width : this.state.height);
      return callback.call(this, progress, this);
    });
  }
  onSwitchDone(props) {
    this.setState({ distance: 0, status: STATUS.NORMAL });
    const { onSwitchDone: callback } = this.props;
    callback && raf(() => callback.call(this, this.state));
  }
  onSwitchPaused(props) {
    const { onSwitchPaused: callback } = this.props;
    callback && callback.call(this, this.state);
  }
  onSwitchStopped(props) {
    const { onSwitchStopped: callback } = this.props;
    callback && callback.call(this, this.state);
  }
  startTran(from, to) {
    this.tween.reset({ distance: from }).to({ distance: to }).start();
  }
  resumeTran() {
    const status = this.state.status & (~STATUS.SWIPE_STARTED);
    this.setState({ status });
    this.tween.resume();
  }
  isCurrentSlideScrolling({ delta, horizontal = false }) {
    const currentSlideDom = ReactDOM.findDOMNode(this.refs[CURRENT_SLIDE_REF]);
    const { offsetWidth, scrollLeft, scrollWidth, offsetHeight, scrollTop, scrollHeight } = currentSlideDom;
    const sizes = horizontal ? [offsetWidth, scrollLeft, scrollWidth] : [offsetHeight, scrollTop, scrollHeight];

    if (delta > 0 && sizes[0] + sizes[1] < sizes[2]) return true;
    if (delta < 0 && sizes[1] > 0) return true;

    return false;
  }
  handleWheel(e) {
    const delta = e.deltaY;
    let { status, prevWheelDelta = 1 } = this.state;
    Math.abs(delta) > 0 && this.setState({ prevWheelDelta: delta });
    if (Math.abs(delta) / Math.abs(prevWheelDelta) <= 2) return;

    if (status !== STATUS.NORMAL || delta === 0 || this.isCurrentSlideScrolling({ delta })) return;

    let { children: slides, loop, horizontal } = this.props;
    let prev = this.state.current, current = prev + (delta > 0 ? 1 : -1);
    let slidesCount = Children.count(slides);
    current = loop ? (current + slidesCount) % slidesCount : current;

    if (current >= 0 && current < slidesCount) {
      status = STATUS.WHEELING | STATUS.FORWARDING | (delta > 0 ? STATUS.DOWN : STATUS.UP);
      this.setState({ prev, current, status });
      this.startTran(0, (status & STATUS.DOWN ? -1 : 1) * (horizontal ? this.state.width : this.state.height));
    }
  }
  handleSwipeStart({ x, y }) {
    this.tween.stop();
    this.setState({ oriX: x, oriY: y, status: this.state.status | STATUS.SWIPE_STARTED });
  }
  handleSwipeMove({ x, y }) {
    let status = this.state.status;
    if (!(status & STATUS.SWIPING || status & STATUS.SWIPE_STARTED)) return;

    let { prev, current, oriX, oriY, width, height, distance = 0 } = this.state;
    const { horizontal, vertical } = this.props;
    const slidesCount = Children.count(this.props.children);
    const distanceDimen = horizontal ? width : height;

    // new swipe started during Canceling or Forwarding tweening
    if (status & STATUS.SWIPE_STARTED && distance !== 0) {
      horizontal ? (oriX = x - distance) : (oriY = y - distance);
    }
    distance = horizontal ? x - oriX : y - oriY;
    const gear = distance - (this.state.distance || 0);

    // swipe direction detection, if not corresponds with this.props;
    // or if current slide can swipe;
    // then return false to cancel this swipe
    let xDiff = Math.abs(x - oriX);
    let yDiff = Math.abs(y - oriY);
    const swipeDirectionOk = (xDiff >= SWIPE_MIN_DISTANCE || yDiff >= SWIPE_MIN_DISTANCE) && (xDiff >= yDiff ? horizontal : vertical);
    if (!swipeDirectionOk) return false;
    if (this.isCurrentSlideScrolling({ delta: (gear > 0 ? -1 : 1) * (horizontal ? yDiff: xDiff), horizontal })) return false;

    if (status === STATUS.SWIPE_STARTED || status & STATUS.CANCELING) {
      prev = current;
    }

    if (Math.abs(distance) >= distanceDimen) {
      distance %= distanceDimen;
      horizontal ? (oriX = x - distance) : (oriY = y - distance);
      prev = current;
    }

    current = prev + (distance > 0 ? -1 : 1);
    current = this.props.loop ? (current + slidesCount) % slidesCount : current;

    if (current < 0 || current >= slidesCount) {
      return;
    }

    status = STATUS.SWIPING | (distance < 0 ? STATUS.DOWN : STATUS.UP);
    this.setState({ prev, current, status, oriX, oriY, gear });
    this.onSwitching({ distance, factor: Math.abs(distance) / (horizontal ? width : height) });
  }
  handleSwipeEnd({ x, y }) {
    let { horizontal, vertical, factor = SWIPE_FACTOR, speed = FORWARD_SPEED } = this.props;
    let { prev, current, width, height, status, distance = 0, gear = 0 } = this.state;
    gear = Math.floor(gear);

    if (distance == 0) return;
    if (status & STATUS.SWIPE_STARTED) return this.resumeTran();

    let shouldForward = distance * gear >= 0 && (Math.abs(distance) / (horizontal ? width : height) >= factor || Math.abs(gear) >= speed);

    if (!shouldForward) [current, prev] = [prev, current];
    status = STATUS.SWIPED | (shouldForward ? STATUS.FORWARDING : STATUS.CANCELING) | (distance > 0 ? STATUS.UP : STATUS.DOWN);

    this.setState({ prev, current, status });
    this.startTran(distance, shouldForward ? (distance > 0 ? 1 : -1)  * (horizontal ? width : height) : 0);
  }
  handleSwipeCancel() {
    this.setState({ status: STATUS.NORMAL });
  }

  // For touch events
  handleTouchStart(e) {
    const touch = e.changedTouches[0];
    this.handleSwipeStart({ x: touch.clientX, y: touch.clientY });
  }
  handleTouchMove(e) {
    //e.preventDefault();
    const touch = e.changedTouches[0];
    this.handleSwipeMove({ x: touch.clientX, y: touch.clientY }) === undefined && e.preventDefault();
  }
  handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    this.handleSwipeEnd({ x: touch.clientX, y: touch.clientY });
  }
  handleTouchCancel(e) {
    this.handleSwipeCancel();
  }

  genSlideStyle(factor) {
    const { horizontal, vertical, loop, swipe } = this.props;
    const { prev, current, status, distance, width, height } = this.state;
    const dx = horizontal ? distance + factor * width : 0;
    const dy = vertical ? distance + factor * height : 0;
    const transform = `translate3d(${dx}px, ${dy}px, 0)`;
    return { transform, WebkitTransform: transform };
  }
  renderSlides() {
    const { children, horizontal, vertical, loop } = this.props;
    const { prev, current, status } = this.state;
    const slidesCount = Children.count(slides), lastIndex = slidesCount - 1;
    // const slides = Children.toArray(children);
    const slides = Array.isArray(children) ? children :  [children];

    const SWIPING = status & STATUS.SWIPING,
      FORWARDING = status & STATUS.FORWARDING,
      CANCELING = status & STATUS.CANCELING,
      UP = status & STATUS.UP,
      DOWN = status & STATUS.DOWN,
      NORMAL = status === STATUS.NORMAL;

    const slidesProps = Children.map(slides, (slide, index) => ({
      key: index, done: NORMAL,
      [index < current ? 'before' : index === current ? 'current' : 'after']: true
    }));
    const prevSlideProps = slidesProps[prev];
    const currentSlideProps = slidesProps[current];
    currentSlideProps.current = prevSlideProps.prev = true;

    if (prev !== current && !NORMAL) {
      let prevFactor = 0;
      let currentFactor = current > prev ? 1 : -1;
      if (CANCELING && DOWN) {
        currentFactor = 0;
        prevFactor = 1;
      } else if (CANCELING && UP) {
        currentFactor = 0;
        prevFactor = -1;
      }
      if (loop) {
        if (SWIPING && DOWN) {
          currentFactor = 1;
        } else if (SWIPING && UP) {
          currentFactor = -1;
        } else if (FORWARDING && DOWN) {
          currentFactor = 1;
        } else if (FORWARDING && UP) {
          currentFactor = -1;
        }
      }
      prevSlideProps.style = this.genSlideStyle(prevFactor);
      currentSlideProps.style = this.genSlideStyle(currentFactor);
    }
    currentSlideProps.ref = CURRENT_SLIDE_REF;
    return slidesProps.map((props, index) => React.cloneElement(slides[index], props));
  }

  render() {
    const { children, current, vertical, horizontal, loop, swipe, wheel, ...props } = this.props;
    if (wheel) {
      props.onWheel = this.handleWheel;
    }
    if (swipe) {
      props.onTouchStart = this.handleTouchStart;
      props.onTouchMove = this.handleTouchMove;
      props.onTouchEnd = this.handleTouchEnd;
    }
    props.className = cx({
      'deck--horizontal': horizontal,
      'deck--vertical': vertical
    }, 'deck', props.className);
    return (
      <div {...props}>
        {this.renderSlides()}
      </div>
    );
  }
}

Deck.STATUS = STATUS;
Deck.Slide = Slide;

export default Deck;

