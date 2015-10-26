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
const SWIPE_ONSET = 6;
const SWIPE_FACTOR = 0.4;

const DECK_STATUS = {
  SWIPE_STARTED: 1,
  SWIPING_UP: 2,
  SWIPING_DOWN: 3,
  SWIPE_FORWARDING_UP: 4,
  SWIPE_FORWARDING_DOWN: 5,
  SWIPE_CONFIRMED_UP: 6,
  SWIPE_CONFIRMED_DOWN: 7,
  SWIPE_CANCELED_UP: 8,
  SWIPE_CANCELED_DOWN: 9,
  NORMAL: 0
};

class Deck extends Component {
  constructor(props, context) {
    super(props, context);
    let { current } = props;
    this.state = {current, prev: current + 1};
  }
  componentWillMount() {
    this.status = DECK_STATUS.NORMAL;
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
    if (this.status !== DECK_STATUS.NORMAL || e.deltaY === 0) return;

    this.status = e.deltaY < 0 ? DECK_STATUS.SWIPE_FORWARDING_DOWN : DECK_STATUS.SWIPE_FORWARDING_UP;
    let prev = this.state.current, current = prev + (this.status === DECK_STATUS.SWIPE_FORWARDING_DOWN ? 1 : -1);
    let slidesCount = Children.count(this.props.children);
    current = this.props.loop ? (current + slidesCount) % slidesCount : current;

    if (current >= 0 && current < slidesCount) {
      this.setState({current, prev});
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
    if (distance !== 0) {
      this.status = distance < 0 ? DECK_STATUS.SWIPING_DOWN : DECK_STATUS.SWIPING_UP;
      prev = current + (this.status === DECK_STATUS.SWIPING_DOWN ? 1 : -1);
      prev = this.props.loop ? (prev + slidesCount) % slidesCount : prev;
      if (Math.abs(distance) > SWIPE_ONSET && prev >= 0 && prev < slidesCount) {
        this.setState({dx, dy, prev});
      }
    }
  }
  handleTouchEnd(e) {
    if (this.status !== DECK_STATUS.SWIPING_UP && this.status !== DECK_STATUS.SWIPING_DOWN) {
      this.status = DECK_STATUS.NORMAL;
      return;
    }
    let touch = e.changedTouches[0], factor = this.props.factor || SWIPE_FACTOR;
    let { prev, current, x, y, width, height } = this.state;
    let distance = this.props.horizontal ? touch.clientX - x : touch.clientY - y;
    let shouldForward = Math.abs(distance) / (this.props.horizontal ? width : height) > factor;
    if (shouldForward) [prev, current] = [current, prev];
    this.setState({prev, current});
    this.status = !shouldForward ? (distance > 0 ? DECK_STATUS.SWIPE_CANCELED_UP : DECK_STATUS.SWIPE_CANCELED_DOWN) : (distance > 0 ? DECK_STATUS.SWIPE_CONFIRMED_UP : DECK_STATUS.SWIPE_CONFIRMED_DOWN);
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
    let { children: slides, horizontal, vertical, loop } = this.props;
    let { prev, current, dx, dy } = this.state;
    let slidesCount = Children.count(slides), lastIndex = slidesCount - 1;
    let swipingUp = this.status === DECK_STATUS.SWIPING_UP,
        swipingDown = this.status === DECK_STATUS.SWIPING_DOWN,
        swipeForwardingUp = this.status === DECK_STATUS.SWIPE_FORWARDING_UP,
        swipeForwardingDown = this.status === DECK_STATUS.SWIPE_FORWARDING_DOWN,
        swipeConfirmedUp = this.status === DECK_STATUS.SWIPE_CONFIRMED_UP,
        swipeConfirmedDown = this.status === DECK_STATUS.SWIPE_CONFIRMED_DOWN,
        swipeCanceledUp = this.status === DECK_STATUS.SWIPE_CANCELED_UP,
        swipeCanceledDown = this.status === DECK_STATUS.SWIPE_CANCELED_DOWN,
        normal = this.status === DECK_STATUS.NORMAL;
    let slidesProps = Children.map(slides, (slide, index) => ({
      style: {},
      key: index,
      [index < current ? 'before' : index === current ? 'current' : 'after']: true
    }));
    let prevSlideProps = slidesProps[prev], currentSlideProps = slidesProps[current];

    loop = loop && !normal;
    if (swipingUp || swipingDown) {
      prevSlideProps.before = prevSlideProps.after = currentSlideProps.current = prevSlideProps.pre = false;
      prevSlideProps.style = this.setSlideStyle(true);
      currentSlideProps.style = this.setSlideStyle(false);
    } else if (prev !== current) {
      prevSlideProps.prev = true;
      currentSlideProps.reset = current > prev ? 'after' : 'before';
      if (loop) {
        if (prev === 0 && current === lastIndex && (swipeConfirmedUp || swipeForwardingUp || swipeCanceledDown)) {
          prevSlideProps.after = true; prevSlideProps.before = false;
          currentSlideProps.reset = 'before';
        } else if (prev === lastIndex && current === 0 && (swipeConfirmedDown || swipeForwardingDown || swipeCanceledUp)) {
          prevSlideProps.after = false; prevSlideProps.before = true;
          currentSlideProps.reset = 'after';
        }
      }
      if (swipeConfirmedUp || swipeConfirmedDown || swipeCanceledUp || swipeCanceledDown) {
        this.status = DECK_STATUS.NORMAL;
        currentSlideProps.reset = false;
      }
    }

    return slidesProps.map((props, index) => React.cloneElement(slides[index], props));
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

