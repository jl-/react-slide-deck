import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import Deck from '../src/deck';
import './index.scss';
let Deck;
if (process.env.NODE_ENV === 'production') {
  Deck = require('../dist/deck').default;
} else {
  Deck = require('../src/deck').default;
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      horizontal: false,
      swipe: true,
      wheel: true,
      animate: true,
      factor: 0.3,
      loop: true,
      index: 0
    };
    this.change = ::this.change;
    this.onSwitching = ::this.onSwitching;
    this.onSwitchDone = ::this.onSwitchDone;
    this.horizontal = ::this.horizontal;
    this.vertical = ::this.vertical;
    this.swipe = ::this.swipe;
    this.wheel = ::this.wheel;
    this.animate = ::this.animate;
    this.loop = ::this.loop;
  }
  change({ target }) {
    const current = Array.prototype.indexOf.call(target.parentElement.children, target);
    this.setState({ current });
  }
  horizontal() {
    this.setState({
      horizontal: true
    });
  }
  vertical() {
    this.setState({
      horizontal: false
    });
  }
  swipe() {
    this.setState({ swipe: !this.state.swipe });
  }
  wheel() {
    this.setState({ wheel: !this.state.wheel });
  }
  animate() {
    this.setState({ animate: !this.state.animate });
  }
  loop() {
    this.setState({ loop: !this.state.loop });
  }
  onSwitching(factor, deck) {
    const prev = this.state.index, current = deck.state.current;
    //let indicatorLineLeft = 25 * index + '%';
    const indicatorLineLeft = (prev + (current - prev) * factor) * 25 + '%';
    const status = 'switching...';
    this.setState({indicatorLineLeft, current, status, progress: factor});
  }
  onSwitchDone(state) {
    this.setState({
      index: state.current,
      status: 'switchdone',
      indicatorLineLeft: state.current * 25 + '%'
    });
  }
  render() {
    const slideClasses = {
      current: 'slideCurrent',
      entering: 'slideCurrentEntering',
      prev: 'slidePrev',
      leaving: 'slidePrevLeaving'
    };
    return (
      <div className='demo'>
        <div className='indicators-wrapper' onClick={this.change}>
          <button className={`indicator${this.state.current === 0 ? ' current' : ''}`}>One</button>
          <button className={`indicator${this.state.current === 1 ? ' current' : ''}`}>two</button>
          <button className={`indicator${this.state.current === 2 ? ' current' : ''}`}>three</button>
          <button className={`indicator${this.state.current === 3 ? ' current' : ''}`}>four</button>
        </div>
        <span className='indicator-line' style={{ left: this.state.indicatorLineLeft }}></span>
        <Deck
          className='deck'
          wheel={this.state.wheel}
          animate={this.state.animate}
          current={this.state.current}
          horizontal={this.state.horizontal}
          swipe={this.state.swipe}
          loop={this.state.loop}
          onSwitching={this.onSwitching}
          onSwitchDone={this.onSwitchDone}
          slideClasses={slideClasses}
          dura={1000}
        >
          <Deck.Slide className='first'>1</Deck.Slide>
          <Deck.Slide className='second'>
            <div className='entering'>current entering animation</div>
            <div className='entered'>current entered animation</div>
          </Deck.Slide>
          <Deck.Slide className='third'>
            <h1 className='large-content'>The `Slide` is scrollable if its content overflow.</h1>
          </Deck.Slide>
          <Deck.Slide className='fourth'>4</Deck.Slide>
        </Deck>
        <div className='metas-ctrls'>
          <div>
            <p>status: {this.state.status}</p>
            <p className="switching-progress">switch progress: {this.state.progress}</p>
          </div>
          <div>
            <button className={`btn btn-${this.state.horizontal ? 'primary' : 'default'}`} onClick={this.horizontal}>Horizontal</button>
            <button className={`btn btn-${this.state.horizontal ? 'default' : 'primary'}`} onClick={this.vertical}>Vertical</button>
            <button className={`btn btn-${this.state.swipe ? 'primary' : 'default'}`} onClick={this.swipe}>can swipe?</button>
            <button className={`btn btn-${this.state.wheel ? 'primary' : 'default'}`} onClick={this.wheel}>wheel control?</button>
            <button className={`btn btn-${this.state.loop ? 'primary' : 'default'}`} onClick={this.loop}>loop?</button>
            <button className={`btn btn-${this.state.animate ? 'primary' : 'default'}`} onClick={this.animate}>animate on indicator click?</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
