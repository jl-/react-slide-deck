import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Deck, { Slide } from '../src/deck';

import './index.scss';

class Demo extends Component {
  render() {
    return (
      <Deck vertical loop wheel swipe current={0}>
        <Slide className='second'>hi</Slide>
        <Slide className='third'><div className='long-content'>long content for scroll test</div></Slide>
        <Slide className='fourth'>hi</Slide>
        <Slide className='fifth'>hi</Slide>
        <Slide className='primary'>hello</Slide>
      </Deck>
    );
  }
}

ReactDom.render(
  <Demo></Demo>
  ,document.querySelector('#demo')
);

