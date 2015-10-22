/**
 * <Deck vertical loop scroll dura=1400 current=2>
 *  <Deck.Slide>
 *  </Deck.Slide>
 *
 *  <Deck.Slide>
 *  </Deck.Slide>
 * </Deck>
 *
 */
import React, { Component, Children } from 'react';
import cns from 'classnames';

import Slide from './slide';

import styles from './style.scss';

const DURA = 1400; // default transition duration

class Deck extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      slides: null,
      current: props.current
    };
  }
  handleWheel(e) {
    if (this.state.transitioning) return;
    let current = this.state.current + (e.deltaY < 0 ? 1 : e.deltaY > 0 ? -1 : 0);
    if (current === this.state.current || !this.props.loop && !(current >= 0 && current < Children.count(this.props.children))) return;

    this.setState({transitioning: true});
    setTimeout(() => this.setState({transitioning: false}), this.props.dura || DURA);
    this.makeSlides({...this.props, current: current});
  }
  makeSlides(nextProps) {
    let { children, loop, current } = nextProps, slidesProps = [];
    let slidesCount = Children.count(children), lastIndex = slidesCount - 1;
    let prev = this.state.current;
    current = (slidesCount + current) % slidesCount;
    for (let index = 0; index < slidesCount; index++) {
      slidesProps[index] = {[index < current ? 'before' : index === current ? 'current' : 'after']: true}
    }
    if (loop) {
      if (current === lastIndex) {
        slidesProps[0] = {after: true};
      } else if (current === 0) {
        slidesProps[lastIndex] = {before: true};
      }

      if (prev === lastIndex && current === 0) {
        slidesProps[0].reset = 'after';
      } else if (prev === 0 && current === lastIndex) {
        slidesProps[lastIndex].reset = 'before';
      }
    } else {
      if (prev === lastIndex && current === 0) {
        slidesProps[0].reset = 'before';
      } else if(prev === 0 && current === lastIndex) {
        slidesProps[lastIndex].reset = 'after';
      }
    }
    let slides = Children.map(children, (slide, index) => React.cloneElement(slide, slidesProps[index]));

    this.setState({
      slides: slides,
      current: current
    });
  }
  componentWillMount() {
    this.makeSlides({...this.props, loop: false});
  }
  componentWillReceiveProps(nextProps) {
    this.makeSlides({...nextProps, loop: false});
  }
  render() {
    let { children, current, vertical, horizontal, loop, scroll, className, ...rest } = this.props;
    if (scroll) rest.onWheel = ::this.handleWheel;

    className = cns({
      [className]: !!className,
      'deck--horizontal': horizontal,
      'deck--vertical': vertical
    }, 'deck');
    return (
      <div className={className} {...rest}>
        {this.state.slides}
      </div>
    );
  }
}

Deck.Slide = Slide;
export default Deck;
