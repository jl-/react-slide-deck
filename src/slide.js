import React, { Component } from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';

class Slide extends Component {
  componentWillReceiveProps(nextProps) {
    this.isPrev = this.props.current;
    let reset = nextProps.reset;
    if (reset) {
      let slide = ReactDom.findDOMNode(this);
      slide.className = `slide slide--${reset}`;
      slide.offsetWidth;
    }
  }
  render() {
    let { children, current, before, after, className, ...rest } = this.props;
    className = cns({
      [className]: !!className,
      'slide--current': current,
      'slide--before': before,
      'slide--after': after,
      'slide--prev': this.isPrev
    }, 'slide');
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }
}

export default Slide;
