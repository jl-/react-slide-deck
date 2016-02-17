import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Deck from '../src/deck';

import './index.scss';

class Demo extends Component {
  render() {
    return (
      <Deck vertical loop wheel swipe current={0}>
        <Deck.Slide className='second'>hi</Deck.Slide>
        <Deck.Slide className='third'><div className='long-content'>long content for scroll test</div></Deck.Slide>
        <Deck.Slide className='fourth'>hi</Deck.Slide>
        <Deck.Slide className='fifth'>hi</Deck.Slide>
        <Deck.Slide className='primary'>hello</Deck.Slide>
      </Deck>
    );
  }
}

ReactDom.render(
  <Demo></Demo>
  ,document.querySelector('#demo')
);

