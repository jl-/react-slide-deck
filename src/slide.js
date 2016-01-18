import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cns from 'classnames';

class Slide extends Component {
  render() {
    let { children, component = 'div', current, before, prev, after, className, done, ...props } = this.props;
    props.className = cns({
      'slide--current': current && done,
      'slide--current-entering': current && !done,
      'slide--before': before,
      'slide--after': after,
      'slide--prev': prev && done,
      'slide--prev-leaving': prev && !done
    }, className, 'slide');
    return React.createElement(component, props, children);
  }
}

export default Slide;
