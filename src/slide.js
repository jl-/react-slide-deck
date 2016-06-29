import React, { Component } from 'react';
import cx from 'classnames';

class Slide extends Component {
  render() {
    const { component = 'div', current, before, prev, after, done, ...props } = this.props;
    props.className = cx({
      'slide--current': current && done,
      'slide--current-entering': current && !done,
      'slide--before': before,
      'slide--after': after,
      'slide--prev': prev && done,
      'slide--prev-leaving': prev && !done
    }, 'slide', props.className);
    return React.createElement(component, props);
  }
}

export default Slide;
