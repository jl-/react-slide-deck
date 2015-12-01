(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDeck"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDeck"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * <Deck
	 *    vertical|horizontal
	 *    loop
	 *    swipe
	 *    dura=1400
	 *    factor=0.4
	 *    current=2
	 *    easing=function(currentTime/duration)||string
	 *    onSwitching
	 *    onSwitchDone
	 *  >
	 *  <Deck.Slide>
	 *  </Deck.Slide>
	 *
	 *  <Deck.Slide>
	 *  </Deck.Slide>
	 * </Deck>
	 *
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _tween = __webpack_require__(3);
	
	var _tween2 = _interopRequireDefault(_tween);
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _raf = __webpack_require__(5);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _slide = __webpack_require__(10);
	
	var _slide2 = _interopRequireDefault(_slide);
	
	var _styleScss = __webpack_require__(11);
	
	var _styleScss2 = _interopRequireDefault(_styleScss);
	
	var SWIPE_DURA = 1400; // default transition duration
	var SWIPE_ONSET = 6;
	var SWIPE_FACTOR = 0.22;
	var FORWARD_SPEED = 6;
	var CURRENT_SLIDE_REF = 'CURRENT_SLIDE';
	
	var STATUS = {
	  NORMAL: 0,
	  SWIPE_STARTED: 1,
	  SWIPING: 2,
	  FORWARDING: 4,
	  CANCELING: 8,
	  UP: 16,
	  DOWN: 32
	};
	
	var Deck = (function (_Component) {
	  _inherits(Deck, _Component);
	
	  function Deck(props, context) {
	    _classCallCheck(this, Deck);
	
	    _get(Object.getPrototypeOf(Deck.prototype), 'constructor', this).call(this, props, context);
	    var current = props.current;
	
	    this.state = { current: current, prev: current + 1, status: STATUS.NORMAL };
	    this.tween = new _tween2['default']();
	    this.tween.ease(props.easing).duration(props.dura || SWIPE_DURA).on('started', this.onSwitchStarted.bind(this)).on('updating', this.onSwitching.bind(this)).on('stopped', this.onSwitchStopped.bind(this)).on('paused', this.onSwitchPaused.bind(this)).on('done', this.onSwitchDone.bind(this));
	  }
	
	  _createClass(Deck, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.calcDimension = this.calcDimension.bind(this);
	      this.calcDimension();
	      window.addEventListener('resize', this.calcDimension);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this.calcDimension);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      if (nextState.status & STATUS.SWIPE_STARTED) return false;
	      return true;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var status = this.state.status;
	      if (status === STATUS.NORMAL) {
	        var prev = this.state.current;
	        var current = this.normalizeIndex(nextProps.current);
	        if (prev !== current) {
	          status = STATUS.FORWARDING | (prev < current ? STATUS.DOWN : STATUS.UP);
	          this.setState({ prev: prev, current: current, status: status });
	          this.startTran(0, (status & STATUS.DOWN ? -1 : 1) * (nextProps.horizontal ? this.state.width : this.state.height));
	        }
	      }
	    }
	  }, {
	    key: 'normalizeIndex',
	    value: function normalizeIndex(index) {
	      var slidesCount = _react.Children.count(this.props.children);
	      return (index + slidesCount) % slidesCount;
	    }
	  }, {
	    key: 'calcDimension',
	    value: function calcDimension() {
	      var dom = _reactDom2['default'].findDOMNode(this);
	      this.setState({
	        width: dom.offsetWidth,
	        height: dom.offsetHeight
	      });
	    }
	  }, {
	    key: 'onSwitchStarted',
	    value: function onSwitchStarted() {
	      var _this = this;
	
	      var callback = this.props.onSwitchStarted;
	      callback && (0, _raf2['default'])(function () {
	        return callback.call(_this, _this.state);
	      });
	    }
	  }, {
	    key: 'onSwitching',
	    value: function onSwitching(_ref2) {
	      var _this2 = this;
	
	      var distance = _ref2.distance;
	      var factor = _ref2.factor;
	
	      this.setState({ distance: distance });
	      var callback = this.props.onSwitching;
	      callback && (0, _raf2['default'])(function () {
	        return callback.call(_this2, factor || Math.abs(distance) / (_this2.props.horizontal ? _this2.state.width : _this2.state.height), _this2);
	      });
	    }
	  }, {
	    key: 'onSwitchDone',
	    value: function onSwitchDone(props) {
	      var _this3 = this;
	
	      this.setState({ distance: 0, status: STATUS.NORMAL });
	      var callback = this.props.onSwitchDone;
	      callback && (0, _raf2['default'])(function () {
	        return callback.call(_this3, _this3.state);
	      });
	    }
	  }, {
	    key: 'onSwitchPaused',
	    value: function onSwitchPaused(props) {
	      var callback = this.props.onSwitchPaused;
	      callback && callback.call(this, this.state);
	    }
	  }, {
	    key: 'onSwitchStopped',
	    value: function onSwitchStopped(props) {
	      var callback = this.props.onSwitchStopped;
	      callback && callback.call(this, this.state);
	    }
	  }, {
	    key: 'startTran',
	    value: function startTran(from, to) {
	      this.tween.reset({ distance: from }).to({ distance: to }).start();
	    }
	  }, {
	    key: 'resumeTran',
	    value: function resumeTran() {
	      var status = this.state.status & ~STATUS.SWIPE_STARTED;
	      this.setState({ status: status });
	      this.tween.resume();
	    }
	  }, {
	    key: 'isCurrentSlideScrolling',
	    value: function isCurrentSlideScrolling(delta) {
	      var currentSlideDom = _reactDom2['default'].findDOMNode(this.refs[CURRENT_SLIDE_REF]);
	      var offsetWidth = currentSlideDom.offsetWidth;
	      var scrollLeft = currentSlideDom.scrollLeft;
	      var scrollWidth = currentSlideDom.scrollWidth;
	      var offsetHeight = currentSlideDom.offsetHeight;
	      var scrollTop = currentSlideDom.scrollTop;
	      var scrollHeight = currentSlideDom.scrollHeight;
	
	      var sizes = this.props.horizontal ? [offsetWidth, scrollLeft, scrollWidth] : [offsetHeight, scrollTop, scrollHeight];
	
	      if (delta > 0 && sizes[0] + sizes[1] < sizes[2]) return true;
	      if (delta < 0 && sizes[1] > 0) return true;
	
	      return false;
	    }
	  }, {
	    key: 'handleWheel',
	    value: function handleWheel(e) {
	      var status = this.state.status;
	      if (status !== STATUS.NORMAL || e.deltaY === 0 || this.isCurrentSlideScrolling(e.deltaY)) return;
	
	      var _props = this.props;
	      var slides = _props.children;
	      var loop = _props.loop;
	      var horizontal = _props.horizontal;
	
	      var prev = this.state.current,
	          current = prev + (e.deltaY > 0 ? 1 : -1);
	      var slidesCount = _react.Children.count(slides);
	      current = loop ? (current + slidesCount) % slidesCount : current;
	
	      if (current >= 0 && current < slidesCount) {
	        status = STATUS.FORWARDING | (e.deltaY > 0 ? STATUS.DOWN : STATUS.UP);
	        this.setState({ prev: prev, current: current, status: status });
	        this.startTran(0, (status & STATUS.DOWN ? -1 : 1) * (horizontal ? this.state.width : this.state.height));
	      }
	    }
	  }, {
	    key: 'handleSwipeStart',
	    value: function handleSwipeStart(_ref3) {
	      var x = _ref3.x;
	      var y = _ref3.y;
	
	      this.tween.stop();
	      this.setState({ oriX: x, oriY: y, status: this.state.status | STATUS.SWIPE_STARTED });
	    }
	  }, {
	    key: 'handleSwipeMove',
	    value: function handleSwipeMove(_ref4) {
	      var x = _ref4.x;
	      var y = _ref4.y;
	
	      var status = this.state.status;
	      if (!(status & STATUS.SWIPING || status & STATUS.SWIPE_STARTED)) return;
	
	      var _state = this.state;
	      var prev = _state.prev;
	      var current = _state.current;
	      var oriX = _state.oriX;
	      var oriY = _state.oriY;
	      var width = _state.width;
	      var height = _state.height;
	      var _state$distance = _state.distance;
	      var distance = _state$distance === undefined ? 0 : _state$distance;
	      var _props2 = this.props;
	      var horizontal = _props2.horizontal;
	      var vertical = _props2.vertical;
	
	      var slidesCount = _react.Children.count(this.props.children);
	      var distanceDimen = horizontal ? width : height;
	
	      // swipe started during Canceling or Forwarding tweening
	      if (status & STATUS.SWIPE_STARTED && distance !== 0) {
	        horizontal ? oriX = x - distance : oriY = y - distance;
	      }
	      distance = horizontal ? x - oriX : y - oriY;
	
	      if (status === STATUS.SWIPE_STARTED || status & STATUS.CANCELING) {
	        prev = current;
	      }
	
	      if (Math.abs(distance) > distanceDimen) {
	        distance = (distance + distanceDimen) % distanceDimen;
	        horizontal ? oriX = x - distance : oriY = y - distance;
	        prev = current;
	      }
	
	      current = prev + (distance > 0 ? -1 : 1);
	      current = this.props.loop ? (current + slidesCount) % slidesCount : current;
	
	      if (current < 0 || current >= slidesCount) {
	        return;
	      }
	
	      status = STATUS.SWIPING | (distance < 0 ? STATUS.DOWN : STATUS.UP);
	      this.setState({ prev: prev, current: current, status: status, oriX: oriX, oriY: oriY, gear: distance - (this.state.distance || 0) });
	      this.onSwitching({ distance: distance, factor: Math.abs(distance) / (horizontal ? width : height) });
	    }
	  }, {
	    key: 'handleSwipeEnd',
	    value: function handleSwipeEnd(_ref5) {
	      var x = _ref5.x;
	      var y = _ref5.y;
	      var _props3 = this.props;
	      var horizontal = _props3.horizontal;
	      var vertical = _props3.vertical;
	      var _props3$factor = _props3.factor;
	      var factor = _props3$factor === undefined ? SWIPE_FACTOR : _props3$factor;
	      var _props3$speed = _props3.speed;
	      var speed = _props3$speed === undefined ? FORWARD_SPEED : _props3$speed;
	      var _state2 = this.state;
	      var prev = _state2.prev;
	      var current = _state2.current;
	      var width = _state2.width;
	      var height = _state2.height;
	      var status = _state2.status;
	      var _state2$distance = _state2.distance;
	      var distance = _state2$distance === undefined ? 0 : _state2$distance;
	      var _state2$gear = _state2.gear;
	      var gear = _state2$gear === undefined ? 0 : _state2$gear;
	
	      if (distance == 0) return;
	      if (status & STATUS.SWIPE_STARTED) return this.resumeTran();
	
	      var shouldForward = distance * gear >= 0 && (Math.abs(distance) / (horizontal ? width : height) >= factor || Math.abs(gear) >= speed);
	
	      if (!shouldForward) {
	        ;
	        var _ref6 = [prev, current];
	        current = _ref6[0];
	        prev = _ref6[1];
	      }status = (shouldForward ? STATUS.FORWARDING : STATUS.CANCELING) | (distance > 0 ? STATUS.UP : STATUS.DOWN);
	
	      this.setState({ prev: prev, current: current, status: status });
	      this.startTran(distance, shouldForward ? (distance > 0 ? 1 : -1) * (horizontal ? width : height) : 0);
	    }
	  }, {
	    key: 'handleSwipeCancel',
	    value: function handleSwipeCancel() {}
	
	    // For touch events
	  }, {
	    key: 'handleTouchStart',
	    value: function handleTouchStart(e) {
	      var touch = e.changedTouches[0];
	      this.handleSwipeStart({ x: touch.clientX, y: touch.clientY });
	    }
	  }, {
	    key: 'handleTouchMove',
	    value: function handleTouchMove(e) {
	      e.preventDefault();
	      var touch = e.changedTouches[0];
	      this.handleSwipeMove({ x: touch.clientX, y: touch.clientY });
	    }
	  }, {
	    key: 'handleTouchEnd',
	    value: function handleTouchEnd(e) {
	      var touch = e.changedTouches[0];
	      this.handleSwipeEnd({ x: touch.clientX, y: touch.clientY });
	    }
	  }, {
	    key: 'handleTouchCancel',
	    value: function handleTouchCancel(e) {
	      this.handleSwipeCancel();
	    }
	  }, {
	    key: 'setSlideStyle',
	    value: function setSlideStyle(factor) {
	      var _state3 = this.state;
	      var prev = _state3.prev;
	      var current = _state3.current;
	      var status = _state3.status;
	      var distance = _state3.distance;
	      var width = _state3.width;
	      var height = _state3.height;
	      var _props4 = this.props;
	      var horizontal = _props4.horizontal;
	      var vertical = _props4.vertical;
	      var loop = _props4.loop;
	      var swipe = _props4.swipe;
	
	      var style = {},
	          dx = horizontal ? distance + factor * width : 0,
	          dy = vertical ? distance + factor * height : 0;
	      style.WebkitTransform = style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)';
	      return style;
	    }
	  }, {
	    key: 'updateSlides',
	    value: function updateSlides() {
	      var _props5 = this.props;
	      var slides = _props5.children;
	      var horizontal = _props5.horizontal;
	      var vertical = _props5.vertical;
	      var loop = _props5.loop;
	      var _state4 = this.state;
	      var prev = _state4.prev;
	      var current = _state4.current;
	      var status = _state4.status;
	
	      var slidesCount = _react.Children.count(slides),
	          lastIndex = slidesCount - 1;
	
	      var SWIPING = status & STATUS.SWIPING,
	          FORWARDING = status & STATUS.FORWARDING,
	          CANCELING = status & STATUS.CANCELING,
	          UP = status & STATUS.UP,
	          DOWN = status & STATUS.DOWN,
	          NORMAL = status === STATUS.NORMAL;
	
	      var slidesProps = _react.Children.map(slides, function (slide, index) {
	        return _defineProperty({
	          done: NORMAL,
	          key: index
	        }, index < current ? 'before' : index === current ? 'current' : 'after', true);
	      });
	      var prevSlideProps = slidesProps[prev],
	          currentSlideProps = slidesProps[current];
	
	      currentSlideProps.current = prevSlideProps.prev = true;
	
	      if (prev !== current && !NORMAL) {
	        var prevFactor = 0;
	        var currentFactor = current > prev ? 1 : -1;
	        if (CANCELING && DOWN) {
	          currentFactor = 0;
	          prevFactor = 1;
	        } else if (CANCELING && UP) {
	          currentFactor = 0;
	          prevFactor = -1;
	        }
	        if (loop) {
	          if (SWIPING && DOWN) {
	            currentFactor = 1;
	          } else if (SWIPING && UP) {
	            currentFactor = -1;
	          } else if (FORWARDING && DOWN) {
	            currentFactor = 1;
	          } else if (FORWARDING && UP) {
	            currentFactor = -1;
	          }
	        }
	        prevSlideProps.style = this.setSlideStyle(prevFactor);
	        currentSlideProps.style = this.setSlideStyle(currentFactor);
	      }
	      currentSlideProps.ref = CURRENT_SLIDE_REF;
	      return slidesProps.map(function (props, index) {
	        return _react2['default'].cloneElement(slides[index], props);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _cns;
	
	      var _props6 = this.props;
	      var children = _props6.children;
	      var current = _props6.current;
	      var vertical = _props6.vertical;
	      var horizontal = _props6.horizontal;
	      var loop = _props6.loop;
	      var swipe = _props6.swipe;
	      var className = _props6.className;
	
	      var props = _objectWithoutProperties(_props6, ['children', 'current', 'vertical', 'horizontal', 'loop', 'swipe', 'className']);
	
	      if (swipe) {
	        props.onWheel = this.handleWheel.bind(this);
	        props.onTouchStart = this.handleTouchStart.bind(this);
	        props.onTouchMove = this.handleTouchMove.bind(this);
	        props.onTouchEnd = this.handleTouchEnd.bind(this);
	      }
	      className = (0, _classnames2['default'])((_cns = {}, _defineProperty(_cns, className, !!className), _defineProperty(_cns, 'deck--horizontal', horizontal), _defineProperty(_cns, 'deck--vertical', vertical), _cns), 'deck');
	      return _react2['default'].createElement(
	        'div',
	        _extends({ className: className }, props),
	        this.updateSlides()
	      );
	    }
	  }]);
	
	  return Deck;
	})(_react.Component);
	
	Deck.STATUS = STATUS;
	Deck.Slide = _slide2['default'];
	exports['default'] = Deck;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * let tween = new Tween({});
	 * tween.reset({})
	 *      .to({})
	 *      .on('update', function(){})
	 *      .on('end', function(){});
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _flatEvent = __webpack_require__(4);
	
	var _flatEvent2 = _interopRequireDefault(_flatEvent);
	
	var _raf = __webpack_require__(5);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _ease2 = __webpack_require__(8);
	
	var _ease3 = _interopRequireDefault(_ease2);
	
	var STATUS = {
	  INIT: 1,
	  RUNNING: 2,
	  STOPPED: 3,
	  PAUSED: 4,
	  RESUMED: 5,
	  DONE: 6
	};
	
	var Tween = (function (_FlatEvent) {
	  _inherits(Tween, _FlatEvent);
	
	  function Tween(from, easing, duration) {
	    _classCallCheck(this, Tween);
	
	    _get(Object.getPrototypeOf(Tween.prototype), 'constructor', this).call(this);
	    this.reset(from).ease(easing).duration(duration);
	  }
	
	  _createClass(Tween, [{
	    key: 'reset',
	    value: function reset(from) {
	      this.stop();
	      this.from(from);
	      this._curr = this._from; // no need a deep clone
	      this._lasted = 0;
	      this._status = STATUS.INIT;
	      return this;
	    }
	  }, {
	    key: 'from',
	    value: function from(props) {
	      this._from = props || this._from;
	      return this;
	    }
	  }, {
	    key: 'to',
	    value: function to(props) {
	      this._to = props || this._to;
	      return this;
	    }
	  }, {
	    key: 'ease',
	    value: function ease() {
	      var fn = arguments.length <= 0 || arguments[0] === undefined ? _ease3['default'].outQuint : arguments[0];
	
	      fn = typeof fn === 'function' ? fn : _ease3['default'][fn];
	      if (!fn) throw new TypeError('invalid easing function');
	      this._ease = fn;
	      return this;
	    }
	  }, {
	    key: 'duration',
	    value: function duration() {
	      var ms = arguments.length <= 0 || arguments[0] === undefined ? 1600 : arguments[0];
	
	      this._duration = ms;
	      return this;
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      var progress = this._lasted / this._duration;
	      if (progress >= 1) {
	        this._status = STATUS.DONE;
	        this._curr = this._to;
	        this.emit('updating', this._curr);
	        this.emit('done', this._curr);
	      } else {
	        var from = this._from,
	            to = this._to,
	            curr = this._curr = {};
	        var factor = this._ease(progress);
	        for (var prop in from) {
	          curr[prop] = from[prop] + (to[prop] - from[prop]) * factor;
	        }
	        this.emit('updating', curr);
	      }
	      return this;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      _raf2['default'].cancel(this._raf);
	      this._status = STATUS.STOPPED;
	      this.emit('stopped', this._curr);
	      return this;
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      _raf2['default'].cancel(this._raf);
	      this._status = STATUS.PAUSED;
	      this.emit('paused', this._curr);
	      return this;
	    }
	  }, {
	    key: 'iterate',
	    value: function iterate() {
	      var lasted = Date.now() - this._latest + this._lasted;
	      if (lasted >= this._duration) {
	        this._lasted = this._duration;
	      } else {
	        this._lasted = lasted;
	        this._latest = Date.now();
	        this._raf = (0, _raf2['default'])(this.iterate.bind(this));
	      }
	      return this.step();
	    }
	  }, {
	    key: 'resume',
	    value: function resume(p) {
	      if (this._status === STATUS.RUNNING) return;
	      if (p >= 0) {
	        this._lasted = p * this._duration;
	        this.emit('resumed');
	      }
	      this._status = STATUS.RUNNING;
	      this._latest = Date.now();
	      this._raf = (0, _raf2['default'])(this.iterate.bind(this));
	      return this;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      if (this.resume()) {
	        this._start = this._latest;
	        this.emit('started');
	      }
	      return this;
	    }
	  }]);
	
	  return Tween;
	})(_flatEvent2['default']);
	
	Tween.ease = _ease3['default'];
	
	exports['default'] = Tween;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FlatEvent = (function () {
	  function FlatEvent() {
	    _classCallCheck(this, FlatEvent);
	
	    this.$events = {};
	  }
	
	  _createClass(FlatEvent, [{
	    key: "on",
	    value: function on(event, fn) {
	      var listeners = this.$events[event] || (this.$events[event] = []);
	      listeners.push(fn);
	      return this;
	    }
	  }, {
	    key: "off",
	    value: function off() {
	      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	        params[_key] = arguments[_key];
	      }
	
	      var event = params[0];
	      if (params.length === 0) {
	        this.$events = {};
	      } else if (params.length === 1) {
	        delete this.$events[event];
	      } else {
	        var listeners = this.$events[event] || (this.$events[event] = []);
	        var index = listeners.indexOf(params[1]);
	        index !== -1 && listeners.splice(index, 1);
	      }
	      return this;
	    }
	  }, {
	    key: "emit",
	    value: function emit(event) {
	      var _this = this;
	
	      for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        params[_key2 - 1] = arguments[_key2];
	      }
	
	      var listeners = this.$events[event] || (this.$events[event] = []);
	      listeners.forEach(function (listener) {
	        return listener.apply(_this, params);
	      });
	      return this;
	    }
	  }]);
	
	  return FlatEvent;
	})();
	
	exports["default"] = FlatEvent;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var now = __webpack_require__(6),
	    global = typeof window === 'undefined' ? {} : window,
	    vendors = ['moz', 'webkit'],
	    suffix = 'AnimationFrame',
	    raf = global['request' + suffix],
	    caf = global['cancel' + suffix] || global['cancelRequest' + suffix];
	
	for (var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix];
	  caf = global[vendors[i] + 'Cancel' + suffix] || global[vendors[i] + 'CancelRequest' + suffix];
	}
	
	// Some versions of FF have rAF but not cAF
	if (!raf || !caf) {
	  var last = 0,
	      id = 0,
	      queue = [],
	      frameDuration = 1000 / 60;
	
	  raf = function (callback) {
	    if (queue.length === 0) {
	      var _now = now(),
	          next = Math.max(0, frameDuration - (_now - last));
	      last = next + _now;
	      setTimeout(function () {
	        var cp = queue.slice(0);
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0;
	        for (var i = 0; i < cp.length; i++) {
	          if (!cp[i].cancelled) {
	            try {
	              cp[i].callback(last);
	            } catch (e) {
	              setTimeout(function () {
	                throw e;
	              }, 0);
	            }
	          }
	        }
	      }, Math.round(next));
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    });
	    return id;
	  };
	
	  caf = function (handle) {
	    for (var i = 0; i < queue.length; i++) {
	      if (queue[i].handle === handle) {
	        queue[i].cancelled = true;
	      }
	    }
	  };
	}
	
	module.exports = function (fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(global, fn);
	};
	module.exports.cancel = function () {
	  caf.apply(global, arguments);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	"use strict";
	
	(function () {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if (typeof performance !== "undefined" && performance !== null && performance.now) {
	    module.exports = function () {
	      return performance.now();
	    };
	  } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
	    module.exports = function () {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function () {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function () {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function () {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	'use strict';
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ease = {};
	ease.linear = function (n) {
	  return n;
	};
	
	ease.inQuad = function (n) {
	  return n * n;
	};
	
	ease.outQuad = function (n) {
	  return n * (2 - n);
	};
	
	ease.inOutQuad = function (n) {
	  n *= 2;
	  if (n < 1) return 0.5 * n * n;
	  return -0.5 * (--n * (n - 2) - 1);
	};
	
	ease.inCube = function (n) {
	  return n * n * n;
	};
	
	ease.outCube = function (n) {
	  return --n * n * n + 1;
	};
	
	ease.inOutCube = function (n) {
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n;
	  return 0.5 * ((n -= 2) * n * n + 2);
	};
	
	ease.inQuart = function (n) {
	  return n * n * n * n;
	};
	
	ease.outQuart = function (n) {
	  return 1 - --n * n * n * n;
	};
	
	ease.inOutQuart = function (n) {
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n;
	  return -0.5 * ((n -= 2) * n * n * n - 2);
	};
	
	ease.inQuint = function (n) {
	  return n * n * n * n * n;
	};
	
	ease.outQuint = function (n) {
	  return --n * n * n * n * n + 1;
	};
	
	ease.inOutQuint = function (n) {
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n * n;
	  return 0.5 * ((n -= 2) * n * n * n * n + 2);
	};
	
	ease.inSine = function (n) {
	  return 1 - Math.cos(n * Math.PI / 2);
	};
	
	ease.outSine = function (n) {
	  return Math.sin(n * Math.PI / 2);
	};
	
	ease.inOutSine = function (n) {
	  return .5 * (1 - Math.cos(Math.PI * n));
	};
	
	ease.inExpo = function (n) {
	  return 0 == n ? 0 : Math.pow(1024, n - 1);
	};
	
	ease.outExpo = function (n) {
	  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	};
	
	ease.inOutExpo = function (n) {
	  if (0 == n) return 0;
	  if (1 == n) return 1;
	  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
	  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	};
	
	ease.inCirc = function (n) {
	  return 1 - Math.sqrt(1 - n * n);
	};
	
	ease.outCirc = function (n) {
	  return Math.sqrt(1 - --n * n);
	};
	
	ease.inOutCirc = function (n) {
	  n *= 2;
	  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
	  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	};
	
	ease.inBack = function (n) {
	  var s = 1.70158;
	  return n * n * ((s + 1) * n - s);
	};
	
	ease.outBack = function (n) {
	  var s = 1.70158;
	  return --n * n * ((s + 1) * n + s) + 1;
	};
	
	ease.inOutBack = function (n) {
	  var s = 1.70158 * 1.525;
	  if ((n *= 2) < 1) return 0.5 * (n * n * ((s + 1) * n - s));
	  return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
	};
	
	ease.inBounce = function (n) {
	  return 1 - ease.outBounce(1 - n);
	};
	
	ease.outBounce = function (n) {
	  if (n < 1 / 2.75) {
	    return 7.5625 * n * n;
	  } else if (n < 2 / 2.75) {
	    return 7.5625 * (n -= 1.5 / 2.75) * n + 0.75;
	  } else if (n < 2.5 / 2.75) {
	    return 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375;
	  } else {
	    return 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
	  }
	};
	
	ease.inOutBounce = function (n) {
	  if (n < .5) return ease.inBounce(n * 2) * .5;
	  return ease.outBounce(n * 2 - 1) * .5 + .5;
	};
	
	ease.inElastic = function (n) {
	  var s,
	      a = 0.1,
	      p = 0.4;
	  if (n === 0) return 0;
	  if (n === 1) return 1;
	  if (!a || a < 1) {
	    a = 1;s = p / 4;
	  } else s = p * Math.asin(1 / a) / (2 * Math.PI);
	  return -(a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
	};
	
	ease.outElastic = function (n) {
	  var s,
	      a = 0.1,
	      p = 0.4;
	  if (n === 0) return 0;
	  if (n === 1) return 1;
	  if (!a || a < 1) {
	    a = 1;s = p / 4;
	  } else s = p * Math.asin(1 / a) / (2 * Math.PI);
	  return a * Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
	};
	
	ease.inOutElastic = function (n) {
	  var s,
	      a = 0.1,
	      p = 0.4;
	  if (n === 0) return 0;
	  if (n === 1) return 1;
	  if (!a || a < 1) {
	    a = 1;s = p / 4;
	  } else s = p * Math.asin(1 / a) / (2 * Math.PI);
	  if ((n *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p));
	  return a * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - s) * (2 * Math.PI) / p) * 0.5 + 1;
	};
	
	ease.outCirc = function (n) {
	  return Math.sqrt(1 - --n * n);
	};
	ease.outExpo = function (n) {
	  return n === 1 ? n : -Math.pow(2, -10 * n) + 1;
	};
	
	exports["default"] = ease;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	'use strict';
	
	(function () {
		'use strict';
	
		var hasOwn = ({}).hasOwnProperty;
	
		function classNames() {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	})();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Slide = (function (_Component) {
	  _inherits(Slide, _Component);
	
	  function Slide() {
	    _classCallCheck(this, Slide);
	
	    _get(Object.getPrototypeOf(Slide.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Slide, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	      var _props$tag = _props.tag;
	      var tag = _props$tag === undefined ? 'div' : _props$tag;
	      var current = _props.current;
	      var before = _props.before;
	      var prev = _props.prev;
	      var after = _props.after;
	      var className = _props.className;
	      var done = _props.done;
	
	      var props = _objectWithoutProperties(_props, ['children', 'tag', 'current', 'before', 'prev', 'after', 'className', 'done']);
	
	      props.className = (0, _classnames2['default'])({
	        'slide--current': current && done,
	        'slide--current-entering': current && !done,
	        'slide--before': before,
	        'slide--after': after,
	        'slide--prev': prev && done,
	        'slide--prev-leaving': prev && !done
	      }, className, 'slide');
	      return _react2['default'].createElement(tag, props, children);
	    }
	  }]);
	
	  return Slide;
	})(_react.Component);
	
	exports['default'] = Slide;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?importLoaders=2!./../node_modules/autoprefixer-loader/index.js?{browsers:[\"last 5 version\"]}!./../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?importLoaders=2!./../node_modules/autoprefixer-loader/index.js?{browsers:[\"last 5 version\"]}!./../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".deck {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.deck > .slide {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.deck > .slide--current {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  overflow: auto; }\n\n.deck--horizontal > .slide--before {\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0); }\n\n.deck--horizontal > .slide--after {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0); }\n\n.deck--vertical > .slide--before {\n  -webkit-transform: translate3d(0, -100%, 0);\n          transform: translate3d(0, -100%, 0); }\n\n.deck--vertical > .slide--after {\n  -webkit-transform: translate3d(0, 100%, 0);\n          transform: translate3d(0, 100%, 0); }\n", ""]);
	
	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";
	
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=deck.map.json