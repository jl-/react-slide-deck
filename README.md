> A simple react component for swipe, tabs, carousel, one page scroll ...,
with animation hooks. tweening, tween callbacks. works on PC and touch devices

---

**###NOTICES:**
- since 0.1.1, pass `swipe` prop to `Deck` only enable|disable swipe functionality, not including wheel control, which requires a seperated `wheel` prop
- since 0.2.2, slide classNames for animation hooks are using cssModules, see below


## `npm i react-slide-deck --save`

---

# [Demo](http://jl-.github.io/react-slide-deck)
also open on touch device, see the swipe effect


---
### For development
```sh
npm install
bower install
gulp dev
// then open localhost:3003
```

## build
```sh
gulp build
```

---

#### Usage:

```js

import React, { Component } from 'react';

import Deck from 'react-slide-deck';

import styles from './styles'; // your styles, css modules maybe?


class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {current: 0, horizontal: true, swipe: true, factor: 0.3, loop: true};
  }
  change(event) {
    let target = event.target;
    let index = Array.prototype.indexOf.call(target.parentElement.children, target);

    this.setState({
      current: index
    });
  }
  onSwitchStarted({prev: current, current: next}) {
    console.log(`started to switch from ${current} to ${next}`);
  }
  onSwitching(progress, deck) {
    console.log(`switching on progress.`);
    console.log(progress, deck.state.distance);
  }
  onSwitchDone({prev, current}) {
    console.log(`switch finished, current slide index: ${current}`);
  }
  render() {
    const slideClasses = {
      current: styles.currentSlide, // will be concat to className for current slide when it finished entering
      entering: styles.currentSlideEntering, // will be concat to className for current slide during its entering
      prev: styles.prevSlide, // ...
      leaving: styles.prevSlideLeaving, //...
      before: styles.before, //
      after: styles.after //
    };
    return (
      <div>
        <Deck {...this.state} onSwitching={::this.onSwitching} onSwitchDone={::this.onSwitchDone} slideClasses={slideClasses}>
          <Deck.Slide className='bg-black'>
          1
          </Deck.Slide>
          <Deck.Slide className='bg-green'>
          2
          </Deck.Slide>
          <Deck.Slide className='bg-red'>
          3
          </Deck.Slide>
          <Deck.Slide className='bg-yellow'>
          4
          </Deck.Slide>
        </Deck>
        <ul className='indicators' onClick={::this.change}>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    );
  }
}

```

---

```js
<Deck
  className // you may need to set you deck's width, height,...
  current // current slide index
  horizontal // boolean, direction for the slides. `vertical` is removed
  wheel // can be control by wheel or not
  swipe // can swipe or not for touch devices
  animate // boolean, should apply animation for indicator click switch or not, see demo link
  factor // swipe distance used to determine whether to swipe forward or abort on touch devices.
         // if (swipeDistance / width(or height for vertical)) > factor, then will switch to next slide, otherwise return to the current slide.
  loop //  scroll down on the last Deck.Slide => transition to the first Deck.Slide.(first => last as well). only work when `swipe` is set
  dura // duration for slide transition, optional. default is 1400ms
  easing // `function|string` tweening easing function for transition between slides. see detail below,
  onSwitching // function(progress, deck) /*fired on every tweening transition. `deck` is the component instance of Deck, useful for accessing data like deck.status, deck.state.distance ...*/
  onSwitchDone // function({prev, current}) /*fired when slide transition is finished*/
  onSwitchStarted // function({prev:current, current:next}) /*fired before a tween transition started*/
  slideClasses // optional, Object, { current, prev, entering, leaving, before, after },
               // useful css class hook for Slide animation
            // current: applied to the `className` of current Slide when it entered
            // entering: applied to the `className` of current Slide if it is entering
            // prev: applied to the `className` of previous Slide when it left
            // leaving: applied to the `className` of previous Slide when it is leaving
            // before: applied to the `className` for Slides whose index < the index of current Slide
            // after: applied to the `className` for Slides whose index > the index of current Slide
  >
  <Deck.Slide> content </Deck.Slide>
  <Deck.Slide> content2 </Deck.Slide>
</Deck>
```
---

`easing`:
  - `function(currentTime/duration)` a function used to do the tweening easing effect, take one argument
  - `string`, name of built in easing function. see `src/ease.js` for details

---

#### Note.

- it doesn't provide the slide indicators(usually for slides navigation), because it's hard to meet all needs.

- if you need slide indicators, do what you want, just provide the `current` slide index to `<Deck current={current}>`, it will take care of the transition
