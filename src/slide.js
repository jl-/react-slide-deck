import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';

class Slide extends Component {
  render() {
    const {
      component = 'div', current, before, prev, after, done,
      classes = {},
      ...props
    } = this.props;
    props.className = cx({
      [styles.currentSlide]: current && done,
      [styles.slideBefore]: before,
      [styles.slideAfter]: after,

      // custom classes
      [classes.current]: classes.current && current && done,
      [classes.entering]: classes.entering && current && !done,
      [classes.prev]: classes.prev && prev && done,
      [classes.leaving]: classes.leaving && prev && !done,
      [classes.before]: classes.before && before,
      [classes.after]: classes.after && after,
    }, styles.slide, props.className);
    return React.createElement(component, props);
  }
}

export default Slide;
