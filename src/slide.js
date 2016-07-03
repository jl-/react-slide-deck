import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';

class Slide extends Component {
  render() {
    const {
      component = 'div', current, before, prev, after, done,
      classNames = {},
      ...props
    } = this.props;
    props.className = cx({
      [styles.currentSlide]: current && done,
      [styles.slideBefore]: before,
      [styles.slideAfter]: after,

      // custom classNames
      [classNames.current]: classNames.current && current && done,
      [classNames.entering]: classNames.entering && current && !done,
      [classNames.prev]: classNames.prev && prev && done,
      [classNames.leaving]: classNames.leaving && prev && !done,
      [classNames.before]: classNames.before && before,
      [classNames.after]: classNames.after && after,
    }, styles.slide, props.className);
    return React.createElement(component, props);
  }
}

export default Slide;
