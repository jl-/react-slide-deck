/**
 * <Deck vertical|horizontal loop swipe dura=1400 factor=0.4 current=2>
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
import cns from 'classnames';

import Slide from './slide';

import styles from './style.scss';

const SWIPE_DURA = 1400; // default transition duration
const SWIPE_ONSET = 20;
const SWIPE_FACTOR = 0.4;

const DECK_STATUS = {
  SWIPE_STARTED: 1,
  SWIPING: 2,
  SWIPE_FORWARDING: 3,
  SWIPE_CONFIRMED: 4,
  SWIPE_CANCELED: 5,
  NORMAL: 6
};

class Deck extends Component {
  constructor(props, context) {
    super(props, context);
    let { current } = props;
    this.currIndex = 0;
    this.state = {current, prev: current + 1};
  }
  componentWillMount() {
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.status === DECK_STATUS.SWIPE_STARTED) return false;
    return true;
  }
  componentWillReceiveProps(nextProps) {
    let current = nextProps.current, prev = this.state.current;
    this.status = DECK_STATUS.NORMAL;
    this.setState({current, prev});
  }
  normalizeIndex(index) {
    let slidesCount = Children.count(this.props.children);
    return (index + slidesCount) % slidesCount;
  }

  handleWheel(e) {
    let prev = this.state.current, current = prev + (e.deltaY < 0 ? 1 : e.deltaY > 0 ? -1 : 0);
    let slidesCount = Children.count(this.props.children);
    current = this.props.loop ? (current + slidesCount) % slidesCount : current;

    if (this.status !== DECK_STATUS.SWIPE_FORWARDING && current !== prev && current >= 0 && current < slidesCount) {
      this.setState({current, prev});
      this.status = DECK_STATUS.SWIPE_FORWARDING;
      setTimeout(() => this.status = DECK_STATUS.NORMAL, this.props.dura || SWIPE_DURA);
    }
  }

  handleTouchStart(e) {
    let touch = e.changedTouches[0];
    let dom = ReactDOM.findDOMNode(this);
    this.setState({
      x: this.props.horizontal ? touch.clientX : 0,
      y: this.props.vertical ? touch.clientY : 0,
      width: dom.offsetWidth,
      height: dom.offsetHeight
    });
    this.status = DECK_STATUS.SWIPE_STARTED;
  }
  handleTouchMove(e) {
    let touch = e.changedTouches[0];
    let { prev, current, x, y } = this.state;
    let dx = this.props.horizontal ? touch.clientX - x : 0,
        dy = this.props.vertical ? touch.clientY - y : 0;
    let slidesCount = Children.count(this.props.children), distance = dx + dy;
    prev = current + (distance > 0 ? -1 : distance < 0 ? 1 : 0);
    prev = this.props.loop ? (prev + slidesCount) % slidesCount : prev;
    if (Math.abs(distance) > SWIPE_ONSET && prev !== current && prev >= 0 && prev < slidesCount) {
      this.status = DECK_STATUS.SWIPING;
      this.setState({dx, dy, prev});
    }
  }
  handleTouchEnd(e) {
    if (this.status !== DECK_STATUS.SWIPING) {
      this.status = DECK_STATUS.NORMAL;
      return;
    }
    let touch = e.changedTouches[0], factor = this.props.factor || SWIPE_FACTOR;
    let { prev, current, x, y, width, height } = this.state;
    let shouldForward = this.props.horizontal ? Math.abs(touch.clientX - x) / width > factor : Math.abs(touch.clientY - y) / height > factor ;
    if (shouldForward) [prev, current] = [current, prev];
    this.setState({prev, current});
    this.status = shouldForward ? DECK_STATUS.SWIPE_CONFIRMED : DECK_STATUS.SWIPE_CANCELED;
  }
  handleTouchCancel(e) {
    this.status = DECK_STATUS.SWIPE_CANCELED;
  }

  setSlideStyle(isPrev) {
    let { width, height, dx, dy } = this.state;
    let style = {};
    if (isPrev) {
      if (this.props.horizontal) {
        dx = (dx > 0 ? -width : width) + dx;
      } else if (this.props.vertical) {
        dy = (dy > 0? -height : height) + dy;
      }
    }
    style.WebkitTransform = style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    return style;
  }

  updateSlides() {
    let { children, horizontal, vertical, loop } = this.props;
    let { prev, current, dx, dy } = this.state;
    let slidesCount = Children.count(children), lastIndex = slidesCount - 1;
    let slides = [], [prevSlideProps, currentSlideProps] = [{style:{}}, {style:{}}];
    let isSameSlideIndex = prev === current;
    let swiping = this.status === DECK_STATUS.SWIPING,
        swipeForwarding = this.status === DECK_STATUS.SWIPE_FORWARDING,
        swipeConfirmed = this.status === DECK_STATUS.SWIPE_CONFIRMED,
        swipeCanceled = this.status === DECK_STATUS.SWIPE_CANCELED;
    /*
    swiping && console.log('swiping');
    swipeForwarding && console.log('swipeForwarding');
    swipeConfirmed && console.log('swipeConfrimed');
    swipeCanceled && console.log('swipeCanceled');
    console.log('prev current: ', prev, current);
    */

    loop = loop && (swiping || swipeForwarding || swipeConfirmed || swipeCanceled);
    if (isSameSlideIndex) prev = this.normalizeIndex(current + 1);

    if (swiping) {
      prevSlideProps.style = this.setSlideStyle(true);
      currentSlideProps.style = this.setSlideStyle(false);
    } else {
      currentSlideProps.current = prevSlideProps.prev = true;
      currentSlideProps.reset = current > prev ? 'after' : 'before';
      if (loop) {
        if (prev === 0 && current === lastIndex) {
          currentSlideProps.reset = 'before';
        } else if (prev === lastIndex && current === 0) {
          currentSlideProps.reset = 'after';
        }
      }
      prevSlideProps[currentSlideProps.reset === 'before' ? 'after' : 'before'] = true;
      if (isSameSlideIndex) {
        currentSlideProps.reset = prevSlideProps.prev = false;
      }
      if (swipeConfirmed || swipeCanceled) {
        this.status = DECK_STATUS.NORMAL;
        currentSlideProps.reset = false;
      }
    }

    this.currIndex = (swiping || swipeCanceled) ? this.currIndex : +(isSameSlideIndex && this.currIndex === 1 || !isSameSlideIndex && this.currIndex === 0);

    prevSlideProps.key = +!this.currIndex;
    currentSlideProps.key = this.currIndex;
    slides[+!this.currIndex] = React.cloneElement(children[prev], prevSlideProps);
    slides[this.currIndex] = React.cloneElement(children[current], currentSlideProps);

    return slides;
  }

  render() {
    let { children, current, vertical, horizontal, loop, swipe, className, ...rest } = this.props;
    if (swipe) {
      rest.onWheel = ::this.handleWheel;
      rest.onTouchStart = ::this.handleTouchStart;
      rest.onTouchMove = ::this.handleTouchMove;
      rest.onTouchEnd = ::this.handleTouchEnd;
    }
    className = cns({
      [className]: !!className,
      'deck--horizontal': horizontal,
      'deck--vertical': vertical
    }, 'deck');
    return (
      <div className={className} {...rest}>
        {this.updateSlides()}
      </div>
    );
  }

}

Deck.Slide = Slide;
export default Deck;

