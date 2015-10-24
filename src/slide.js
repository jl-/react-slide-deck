import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cns from 'classnames';

class Slide extends Component {
  componentWillReceiveProps(nextProps) {
    this.reset(nextProps.reset);
  }
  reset(status) {
    if (!status) return;
    let slide = ReactDOM.findDOMNode(this);
    slide.className = `slide slide--${status}`;
    slide.offsetWidth;
  }
  render() {
    let { children, current, before, prev, after, reset, className, touching, ...rest } = this.props;
    className = cns({
      'slide--current': current,
      'slide--before': before,
      'slide--after': after,
      'slide--prev': prev
    }, className, 'slide');
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }
}

export default Slide;
