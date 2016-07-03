(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDeck"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDeck"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_89__, __WEBPACK_EXTERNAL_MODULE_90__) {
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _objectWithoutProperties2 = __webpack_require__(1);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _defineProperty2 = __webpack_require__(2);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getPrototypeOf = __webpack_require__(21);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(34);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(81);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _symbol = __webpack_require__(65);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _react = __webpack_require__(89);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(90);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _tween = __webpack_require__(91);
	
	var _tween2 = _interopRequireDefault(_tween);
	
	var _classnames = __webpack_require__(97);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _raf = __webpack_require__(93);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _slide = __webpack_require__(98);
	
	var _slide2 = _interopRequireDefault(_slide);
	
	var _style = __webpack_require__(99);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import throttle from 'utils/throttle';
	
	var SWIPE_DURA = 1000; // default transition duration
	/**
	 * <Deck
	 *    horizontal={true|false}
	 *    loop
	 *    swipe
	 *    wheel
	 *    slideClasses
	 *    animate
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
	var SWIPE_MIN_DISTANCE = 0;
	var SWIPE_FACTOR = 0.22;
	var FORWARD_SPEED = 6;
	var CURRENT_SLIDE_REF = (0, _symbol2.default)('current slide');
	
	// really hacky to disable wheel event during scrolling
	var WHEELABLE_AFTER_SCROLL_MS = 100;
	var SCROLL_THROTTLE_MS = 100;
	
	var STATUS = {
	  NORMAL: 0,
	  SWIPE_STARTED: 1,
	  SWIPING: 2,
	  FORWARDING: 4,
	  CANCELING: 8,
	  UP: 16,
	  DOWN: 32,
	  SWIPED: 64,
	  WHEELING: 128
	};
	
	var Deck = function (_Component) {
	  (0, _inherits3.default)(Deck, _Component);
	
	  function Deck(props, context) {
	    (0, _classCallCheck3.default)(this, Deck);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Deck).call(this, props, context));
	
	    var current = props.current;
	    var easing = props.easing;
	    var _props$dura = props.dura;
	    var dura = _props$dura === undefined ? SWIPE_DURA : _props$dura;
	
	    _this.state = { current: current, prev: _this.normalizeIndex(current + 1), status: STATUS.NORMAL };
	
	    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
	    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
	    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
	    _this.handleWheel = _this.handleWheel.bind(_this);
	    _this.calcDimension = _this.calcDimension.bind(_this);
	    //this.handleScroll = throttle(::this.handleScroll, SCROLL_THROTTLE_MS);
	    _this.handleScroll = _this.handleScroll.bind(_this);
	
	    _this.tween = new _tween2.default();
	    _this.tween.ease(easing).duration(dura).on('started', _this.onSwitchStarted.bind(_this)).on('updating', _this.onSwitching.bind(_this)).on('stopped', _this.onSwitchStopped.bind(_this)).on('paused', _this.onSwitchPaused.bind(_this)).on('done', _this.onSwitchDone.bind(_this));
	    return _this;
	  }
	
	  (0, _createClass3.default)(Deck, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
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
	      var _state = this.state;
	      var prev = _state.current;
	      var prevStatus = _state.status;
	
	      if (prevStatus & STATUS.SWIPED || prevStatus & STATUS.WHEELING) return;
	      var current = this.normalizeIndex(nextProps.current);
	      if (prev === current) return;
	      if (prevStatus === STATUS.NORMAL && nextProps.animate !== false) {
	        var status = STATUS.FORWARDING | (prev < current ? STATUS.DOWN : STATUS.UP);
	        this.setState({ prev: prev, current: current, status: status });
	        this.startTran(0, (status & STATUS.DOWN ? -1 : 1) * (nextProps.horizontal ? this.state.width : this.state.height));
	      } else {
	        this.setState({ prev: prev, current: current, status: STATUS.NORMAL });
	        this.onSwitchDone();
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
	      var dom = _reactDom2.default.findDOMNode(this);
	      this.setState({
	        width: dom.offsetWidth,
	        height: dom.offsetHeight
	      });
	    }
	  }, {
	    key: 'onSwitchStarted',
	    value: function onSwitchStarted() {
	      var _this2 = this;
	
	      var callback = this.props.onSwitchStarted;
	
	      callback && (0, _raf2.default)(function () {
	        return callback.call(_this2, _this2.state);
	      });
	    }
	  }, {
	    key: 'onSwitching',
	    value: function onSwitching(_ref) {
	      var _this3 = this;
	
	      var distance = _ref.distance;
	      var factor = _ref.factor;
	
	      this.setState({ distance: distance });
	      var callback = this.props.onSwitching;
	
	      callback && (0, _raf2.default)(function () {
	        var progress = factor || Math.abs(distance) / (_this3.props.horizontal ? _this3.state.width : _this3.state.height);
	        return callback.call(_this3, progress, _this3);
	      });
	    }
	  }, {
	    key: 'onSwitchDone',
	    value: function onSwitchDone(props) {
	      var _this4 = this;
	
	      this.setState({ distance: 0, status: STATUS.NORMAL });
	      var callback = this.props.onSwitchDone;
	
	      callback && (0, _raf2.default)(function () {
	        return callback.call(_this4, _this4.state);
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
	    key: 'backTran',
	    value: function backTran() {
	      this.tween.back();
	    }
	  }, {
	    key: 'reverseTran',
	    value: function reverseTran() {
	      var _state2 = this.state;
	      var distance = _state2.distance;
	      var width = _state2.width;
	      var height = _state2.height;
	
	      var total = (distance > 0 ? 1 : -1) * (this.props.horizontal ? width : height);
	      this.tween.reset({ distance: this.state.distance - total }).to({ distance: -total }).start();
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
	    value: function isCurrentSlideScrolling(_ref2) {
	      var delta = _ref2.delta;
	      var _ref2$horizontal = _ref2.horizontal;
	      var horizontal = _ref2$horizontal === undefined ? false : _ref2$horizontal;
	
	      var currentSlideDom = _reactDom2.default.findDOMNode(this.refs[CURRENT_SLIDE_REF]);
	      var offsetWidth = currentSlideDom.offsetWidth;
	      var scrollLeft = currentSlideDom.scrollLeft;
	      var scrollWidth = currentSlideDom.scrollWidth;
	      var offsetHeight = currentSlideDom.offsetHeight;
	      var scrollTop = currentSlideDom.scrollTop;
	      var scrollHeight = currentSlideDom.scrollHeight;
	
	      var sizes = horizontal ? [offsetWidth, scrollLeft, scrollWidth] : [offsetHeight, scrollTop, scrollHeight];
	
	      if (delta > 0 && sizes[0] + sizes[1] < sizes[2]) return true;
	      if (delta < 0 && sizes[1] > 0) return true;
	
	      return false;
	    }
	  }, {
	    key: 'handleWheel',
	    value: function handleWheel(e) {
	      var _props = this.props;
	      var slides = _props.children;
	      var loop = _props.loop;
	      var horizontal = _props.horizontal;
	
	      var delta = horizontal ? e.deltaX : e.deltaY;
	      var _state3 = this.state;
	      var prevStatus = _state3.status;
	      var prevWheelDelta = _state3.prevWheelDelta;
	
	      var status = STATUS.WHEELING | STATUS.FORWARDING | (delta > 0 ? STATUS.DOWN : STATUS.UP);
	      Math.abs(delta) > 0 && this.setState({ prevWheelDelta: delta });
	
	      if (Date.now() - this.latestScroll <= WHEELABLE_AFTER_SCROLL_MS) {
	        return;
	      }
	
	      if (prevStatus & STATUS.WHEELING && delta * prevWheelDelta < 0) {
	        this.setState({
	          prev: this.state.current,
	          current: this.state.prev,
	          status: status
	        });
	        this.reverseTran();
	        return;
	      }
	      if (prevWheelDelta !== undefined && Math.abs(delta) / Math.abs(prevWheelDelta) <= 2) return;
	
	      if (prevStatus !== STATUS.NORMAL || delta === 0 || this.isCurrentSlideScrolling({ delta: delta, horizontal: horizontal })) return;
	
	      var slidesCount = _react.Children.count(slides);
	      var prev = this.state.current;
	      var current = prev + (delta > 0 ? 1 : -1);
	      current = loop ? (current + slidesCount) % slidesCount : current;
	
	      if (current >= 0 && current < slidesCount) {
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
	
	      var _state4 = this.state;
	      var prev = _state4.prev;
	      var current = _state4.current;
	      var oriX = _state4.oriX;
	      var oriY = _state4.oriY;
	      var width = _state4.width;
	      var height = _state4.height;
	      var _state4$distance = _state4.distance;
	      var distance = _state4$distance === undefined ? 0 : _state4$distance;
	      var horizontal = this.props.horizontal;
	
	      var slidesCount = _react.Children.count(this.props.children);
	      var distanceDimen = horizontal ? width : height;
	
	      // new swipe started during Canceling or Forwarding tweening
	      if (status & STATUS.SWIPE_STARTED && distance !== 0) {
	        horizontal ? oriX = x - distance : oriY = y - distance;
	      }
	      distance = horizontal ? x - oriX : y - oriY;
	      var gear = distance - (this.state.distance || 0);
	
	      // swipe direction detection, if not corresponds with this.props;
	      // or if current slide can swipe;
	      // then return false to cancel this swipe
	      var xDiff = Math.abs(x - oriX);
	      var yDiff = Math.abs(y - oriY);
	      var swipeDirectionOk = (xDiff >= SWIPE_MIN_DISTANCE || yDiff >= SWIPE_MIN_DISTANCE) && (xDiff >= yDiff ? horizontal : !horizontal);
	      if (!swipeDirectionOk) return false;
	      if (this.isCurrentSlideScrolling({ delta: (gear > 0 ? -1 : 1) * (horizontal ? yDiff : xDiff), horizontal: horizontal })) return false;
	
	      if (status === STATUS.SWIPE_STARTED || status & STATUS.CANCELING) {
	        prev = current;
	      }
	
	      if (Math.abs(distance) >= distanceDimen) {
	        distance %= distanceDimen;
	        horizontal ? oriX = x - distance : oriY = y - distance;
	        prev = current;
	      }
	
	      current = prev + (distance > 0 ? -1 : 1);
	      current = this.props.loop ? (current + slidesCount) % slidesCount : current;
	
	      if (current < 0 || current >= slidesCount) {
	        return;
	      }
	
	      status = STATUS.SWIPING | (distance < 0 ? STATUS.DOWN : STATUS.UP);
	      this.setState({ prev: prev, current: current, status: status, oriX: oriX, oriY: oriY, gear: gear });
	      this.onSwitching({ distance: distance, factor: Math.abs(distance) / (horizontal ? width : height) });
	    }
	  }, {
	    key: 'handleSwipeEnd',
	    value: function handleSwipeEnd(_ref5) {
	      var x = _ref5.x;
	      var y = _ref5.y;
	      var _props2 = this.props;
	      var horizontal = _props2.horizontal;
	      var _props2$factor = _props2.factor;
	      var factor = _props2$factor === undefined ? SWIPE_FACTOR : _props2$factor;
	      var _props2$speed = _props2.speed;
	      var speed = _props2$speed === undefined ? FORWARD_SPEED : _props2$speed;
	      var _state5 = this.state;
	      var prev = _state5.prev;
	      var current = _state5.current;
	      var width = _state5.width;
	      var height = _state5.height;
	      var status = _state5.status;
	      var _state5$distance = _state5.distance;
	      var distance = _state5$distance === undefined ? 0 : _state5$distance;
	      var _state5$gear = _state5.gear;
	      var gear = _state5$gear === undefined ? 0 : _state5$gear;
	
	      gear = Math.floor(gear);
	
	      if (distance == 0) return;
	      if (status & STATUS.SWIPE_STARTED) return this.resumeTran();
	
	      var shouldForward = distance * gear >= 0 && (Math.abs(distance) / (horizontal ? width : height) >= factor || Math.abs(gear) >= speed);
	
	      if (!shouldForward) {
	        ;
	        var _ref6 = [prev, current];
	        current = _ref6[0];
	        prev = _ref6[1];
	      }status = STATUS.SWIPED | (shouldForward ? STATUS.FORWARDING : STATUS.CANCELING) | (distance > 0 ? STATUS.UP : STATUS.DOWN);
	
	      this.setState({ prev: prev, current: current, status: status });
	      this.startTran(distance, shouldForward ? (distance > 0 ? 1 : -1) * (horizontal ? width : height) : 0);
	    }
	  }, {
	    key: 'handleSwipeCancel',
	    value: function handleSwipeCancel() {
	      this.setState({ status: STATUS.NORMAL });
	    }
	
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
	      //e.preventDefault();
	      var touch = e.changedTouches[0];
	      this.handleSwipeMove({ x: touch.clientX, y: touch.clientY }) === undefined && e.preventDefault();
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
	    key: 'genSlideStyle',
	    value: function genSlideStyle(factor) {
	      var _props3 = this.props;
	      var horizontal = _props3.horizontal;
	      var loop = _props3.loop;
	      var swipe = _props3.swipe;
	      var _state6 = this.state;
	      var prev = _state6.prev;
	      var current = _state6.current;
	      var status = _state6.status;
	      var distance = _state6.distance;
	      var width = _state6.width;
	      var height = _state6.height;
	
	      var dx = horizontal ? distance + factor * width : 0;
	      var dy = !horizontal ? distance + factor * height : 0;
	      var transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)';
	      return { transform: transform, WebkitTransform: transform };
	    }
	  }, {
	    key: 'renderSlides',
	    value: function renderSlides() {
	      var _props4 = this.props;
	      var children = _props4.children;
	      var horizontal = _props4.horizontal;
	      var loop = _props4.loop;
	      var slideClasses = _props4.slideClasses;
	      var _state7 = this.state;
	      var prev = _state7.prev;
	      var current = _state7.current;
	      var status = _state7.status;
	      // const slides = Children.toArray(children);
	
	      var slides = Array.isArray(children) ? children : [children];
	      var slidesCount = _react.Children.count(slides),
	          lastIndex = slidesCount - 1;
	
	      var isSwiping = status & STATUS.SWIPING,
	          isForwarding = status & STATUS.FORWARDING,
	          isCanceling = status & STATUS.CANCELING,
	          isUping = status & STATUS.UP,
	          isDowning = status & STATUS.DOWN,
	          isNormal = status === STATUS.NORMAL;
	
	      var slidesProps = _react.Children.map(slides, function (slide, index) {
	        return (0, _defineProperty3.default)({
	          key: index, done: isNormal, classes: slideClasses
	        }, index === current ? 'current' : index < current ? 'before' : 'after', true);
	      });
	      var prevSlideProps = slidesProps[prev];
	      var currentSlideProps = slidesProps[current];
	      prevSlideProps.prev = true;
	
	      // compute transform style for current and prev Slide
	      if (prev !== current && !isNormal) {
	        var prevFactor = 0;
	        var currentFactor = current > prev ? 1 : -1;
	        if (isCanceling && isDowning) {
	          currentFactor = 0;
	          prevFactor = 1;
	        } else if (isCanceling && isUping) {
	          currentFactor = 0;
	          prevFactor = -1;
	        }
	        if (loop) {
	          if (isSwiping && isDowning) {
	            currentFactor = 1;
	          } else if (isSwiping && isUping) {
	            currentFactor = -1;
	          } else if (isForwarding && isDowning) {
	            currentFactor = 1;
	          } else if (isForwarding && isUping) {
	            currentFactor = -1;
	          }
	        }
	        prevSlideProps.style = this.genSlideStyle(prevFactor);
	        currentSlideProps.style = this.genSlideStyle(currentFactor);
	      }
	
	      currentSlideProps.ref = CURRENT_SLIDE_REF;
	      return slidesProps.map(function (props, index) {
	        return _react2.default.cloneElement(slides[index], props);
	      });
	    }
	  }, {
	    key: 'handleScroll',
	    value: function handleScroll() {
	      this.latestScroll = Date.now();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _cx;
	
	      var _props5 = this.props;
	      var children = _props5.children;
	      var current = _props5.current;
	      var horizontal = _props5.horizontal;
	      var loop = _props5.loop;
	      var swipe = _props5.swipe;
	      var wheel = _props5.wheel;
	      var slideClasses = _props5.slideClasses;
	      var props = (0, _objectWithoutProperties3.default)(_props5, ['children', 'current', 'horizontal', 'loop', 'swipe', 'wheel', 'slideClasses']);
	
	      if (wheel) {
	        props.onWheel = this.handleWheel;
	      }
	      if (swipe) {
	        props.onTouchStart = this.handleTouchStart;
	        props.onTouchMove = this.handleTouchMove;
	        props.onTouchEnd = this.handleTouchEnd;
	      }
	      props.onScroll = this.handleScroll;
	      props.className = (0, _classnames2.default)((_cx = {}, (0, _defineProperty3.default)(_cx, _style2.default.horizontalDeck, horizontal), (0, _defineProperty3.default)(_cx, _style2.default.verticalDeck, !horizontal), _cx), _style2.default.deck, props.className);
	      return _react2.default.createElement(
	        'div',
	        props,
	        this.renderSlides()
	      );
	    }
	  }]);
	  return Deck;
	}(_react.Component);
	
	Deck.STATUS = STATUS;
	Deck.Slide = _slide2.default;
	
	exports.default = Deck;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (obj, keys) {
	  var target = {};
	
	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }
	
	  return target;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(3);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23);
	module.exports = __webpack_require__(8).Object.getPrototypeOf;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(24)
	  , $getPrototypeOf = __webpack_require__(26);
	
	__webpack_require__(31)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(25);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(27)
	  , toObject    = __webpack_require__(24)
	  , IE_PROTO    = __webpack_require__(28)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(29)('keys')
	  , uid    = __webpack_require__(30);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(6)
	  , core    = __webpack_require__(8)
	  , fails   = __webpack_require__(17);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(3);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(35);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(36);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(65);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	__webpack_require__(60);
	module.exports = __webpack_require__(64).f('iterator');

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(39)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(41)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(40)
	  , defined   = __webpack_require__(25);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(42)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(43)
	  , hide           = __webpack_require__(11)
	  , has            = __webpack_require__(27)
	  , Iterators      = __webpack_require__(44)
	  , $iterCreate    = __webpack_require__(45)
	  , setToStringTag = __webpack_require__(58)
	  , getPrototypeOf = __webpack_require__(26)
	  , ITERATOR       = __webpack_require__(59)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(46)
	  , descriptor     = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(58)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(59)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(13)
	  , dPs         = __webpack_require__(47)
	  , enumBugKeys = __webpack_require__(56)
	  , IE_PROTO    = __webpack_require__(28)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(57).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(12)
	  , anObject = __webpack_require__(13)
	  , getKeys  = __webpack_require__(48);
	
	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(49)
	  , enumBugKeys = __webpack_require__(56);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(27)
	  , toIObject    = __webpack_require__(50)
	  , arrayIndexOf = __webpack_require__(53)(false)
	  , IE_PROTO     = __webpack_require__(28)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(51)
	  , defined = __webpack_require__(25);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(52);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(50)
	  , toLength  = __webpack_require__(54)
	  , toIndex   = __webpack_require__(55);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(40)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(40)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).document && document.documentElement;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(12).f
	  , has = __webpack_require__(27)
	  , TAG = __webpack_require__(59)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(29)('wks')
	  , uid        = __webpack_require__(30)
	  , Symbol     = __webpack_require__(7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	var global        = __webpack_require__(7)
	  , hide          = __webpack_require__(11)
	  , Iterators     = __webpack_require__(44)
	  , TO_STRING_TAG = __webpack_require__(59)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(62)
	  , step             = __webpack_require__(63)
	  , Iterators        = __webpack_require__(44)
	  , toIObject        = __webpack_require__(50);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(41)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(59);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(80);
	module.exports = __webpack_require__(8).Symbol;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(7)
	  , has            = __webpack_require__(27)
	  , DESCRIPTORS    = __webpack_require__(16)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(43)
	  , META           = __webpack_require__(68).KEY
	  , $fails         = __webpack_require__(17)
	  , shared         = __webpack_require__(29)
	  , setToStringTag = __webpack_require__(58)
	  , uid            = __webpack_require__(30)
	  , wks            = __webpack_require__(59)
	  , wksExt         = __webpack_require__(64)
	  , wksDefine      = __webpack_require__(69)
	  , keyOf          = __webpack_require__(70)
	  , enumKeys       = __webpack_require__(71)
	  , isArray        = __webpack_require__(74)
	  , anObject       = __webpack_require__(13)
	  , toIObject      = __webpack_require__(50)
	  , toPrimitive    = __webpack_require__(19)
	  , createDesc     = __webpack_require__(20)
	  , _create        = __webpack_require__(46)
	  , gOPNExt        = __webpack_require__(75)
	  , $GOPD          = __webpack_require__(77)
	  , $DP            = __webpack_require__(12)
	  , $keys          = __webpack_require__(48)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(76).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(73).f  = $propertyIsEnumerable;
	  __webpack_require__(72).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(42)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(30)('meta')
	  , isObject = __webpack_require__(14)
	  , has      = __webpack_require__(27)
	  , setDesc  = __webpack_require__(12).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(7)
	  , core           = __webpack_require__(8)
	  , LIBRARY        = __webpack_require__(42)
	  , wksExt         = __webpack_require__(64)
	  , defineProperty = __webpack_require__(12).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(48)
	  , toIObject = __webpack_require__(50);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(48)
	  , gOPS    = __webpack_require__(72)
	  , pIE     = __webpack_require__(73);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 73 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(52);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(50)
	  , gOPN      = __webpack_require__(76).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(49)
	  , hiddenKeys = __webpack_require__(56).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(73)
	  , createDesc     = __webpack_require__(20)
	  , toIObject      = __webpack_require__(50)
	  , toPrimitive    = __webpack_require__(19)
	  , has            = __webpack_require__(27)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 78 */
/***/ function(module, exports) {



/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69)('asyncIterator');

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69)('observable');

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(82);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(86);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(35);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	module.exports = __webpack_require__(8).Object.setPrototypeOf;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(6);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(85).set});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(14)
	  , anObject = __webpack_require__(13);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(9)(Function.call, __webpack_require__(77).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	var $Object = __webpack_require__(8).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(46)});

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_89__;

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_90__;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(21);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(34);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(81);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _flatEvent = __webpack_require__(92);
	
	var _flatEvent2 = _interopRequireDefault(_flatEvent);
	
	var _raf = __webpack_require__(93);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	var _ease2 = __webpack_require__(96);
	
	var _ease3 = _interopRequireDefault(_ease2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var STATUS = {
	  INIT: 0,
	  DONE: 1,
	  RUNNING: 2,
	  STOPPED: 3,
	  PAUSED: 4
	}; /**
	    * let tween = new Tween({});
	    * tween.reset({})
	    *      .to({})
	    *      .on('update', function(){})
	    *      .on('end', function(){});
	    */
	
	var Tween = function (_FlatEvent) {
	  (0, _inherits3.default)(Tween, _FlatEvent);
	
	  function Tween(from, easing, duration) {
	    (0, _classCallCheck3.default)(this, Tween);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tween).call(this));
	
	    _this.reset(from).ease(easing).duration(duration);
	    _this.iterate = _this.iterate.bind(_this);
	    return _this;
	  }
	
	  (0, _createClass3.default)(Tween, [{
	    key: 'reset',
	    value: function reset(from) {
	      this.stop();
	      this.from(from);
	      this._curr = this._from;
	      this._lasted = 0;
	      this._start = this._latest = 0;
	      this._status = STATUS.INIT;
	      return this;
	    }
	  }, {
	    key: 'from',
	    value: function from(_from) {
	      this._origin_from = this._from = _from;
	      return this;
	    }
	  }, {
	    key: 'to',
	    value: function to(_to) {
	      this._origin_to = this._to = _to;
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
	    key: 'ease',
	    value: function ease() {
	      var fn = arguments.length <= 0 || arguments[0] === undefined ? _ease3.default.outQuint : arguments[0];
	
	      fn = typeof fn === 'function' ? fn : _ease3.default[fn];
	      if (!fn) throw new TypeError('invalid easing function');
	      this._ease = fn;
	      return this;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this._status !== STATUS.RUNNING) return;
	      _raf2.default.cancel(this._raf);
	      this._status = STATUS.STOPPED;
	      this.emit('stopped', this._curr);
	      return this;
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this._status !== STATUS.RUNNING) return;
	      _raf2.default.cancel(this._raf);
	      this._status = STATUS.PAUSED;
	      this.emit('paused', this._curr);
	      return this;
	    }
	  }, {
	    key: 'iterate',
	    value: function iterate() {
	      var now = Date.now();
	      var lasted = now - this._latest + this._lasted;
	      var progress = lasted / this._duration;
	      this._latest = now;
	      this._lasted = lasted;
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
	        this._raf = (0, _raf2.default)(this.iterate);
	      }
	      return this;
	    }
	  }, {
	    key: 'resume',
	    value: function resume(p) {
	      if (this._status === STATUS.RUNNING) return;
	      if (p >= 0) this._lasted = p * this._duration;
	
	      this._status = STATUS.RUNNING;
	      this._latest = Date.now();
	      this._raf = (0, _raf2.default)(this.iterate);
	      this.emit('resumed');
	      return this;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      if (this._status === STATUS.RUNNING) return;
	
	      this._start = Date.now();
	      this._latest = this._start;
	
	      this._status = STATUS.RUNNING;
	      this._raf = (0, _raf2.default)(this.iterate);
	      this.emit('started');
	      return this;
	    }
	  }, {
	    key: 'back',
	    value: function back() {
	      this.stop();
	      var to = this._to === this._origin_to ? this._origin_from : this._origin_to;
	      this._from = this._curr;
	      this._to = to;
	      this._lasted = 0;
	      this._status = STATUS.INIT;
	      this.start();
	    }
	  }]);
	  return Tween;
	}(_flatEvent2.default);
	
	Tween.ease = _ease3.default;
	
	exports.default = Tween;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FlatEvent = function () {
	  function FlatEvent() {
	    (0, _classCallCheck3.default)(this, FlatEvent);
	
	    this.$events = {};
	  }
	
	  (0, _createClass3.default)(FlatEvent, [{
	    key: "on",
	    value: function on(event, fn) {
	      var listeners = this.$events[event] || (this.$events[event] = []);
	      listeners.push(fn);
	      return this;
	    }
	  }, {
	    key: "off",
	    value: function off(event, fn) {
	      if (event === undefined) {
	        this.$events = {};
	      } else if (fn === undefined) {
	        delete this.$events[event];
	      } else {
	        var listeners = this.$events[event];
	        if (Array.isArray(listeners)) {
	          var index = listeners.indexOf(fn);
	          index !== -1 && listeners.splice(index, 1);
	        }
	      }
	      return this;
	    }
	  }, {
	    key: "emit",
	    value: function emit(event) {
	      var _this = this;
	
	      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        params[_key - 1] = arguments[_key];
	      }
	
	      var listeners = this.$events[event];
	      if (!Array.isArray(listeners)) return;
	      listeners.forEach(function (listener) {
	        return listener.apply(_this, params);
	      });
	      return this;
	    }
	  }]);
	  return FlatEvent;
	}();
	
	exports.default = FlatEvent;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(94)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]
	
	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function() {
	  root.requestAnimationFrame = raf
	  root.cancelAnimationFrame = caf
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(95)))

/***/ },
/* 95 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 96 */
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
	
	exports.default = ease;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(2);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _objectWithoutProperties2 = __webpack_require__(1);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(21);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(34);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(81);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(89);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(97);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _style = __webpack_require__(99);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Slide = function (_Component) {
	  (0, _inherits3.default)(Slide, _Component);
	
	  function Slide() {
	    (0, _classCallCheck3.default)(this, Slide);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Slide).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Slide, [{
	    key: 'render',
	    value: function render() {
	      var _cx;
	
	      var _props = this.props;
	      var _props$component = _props.component;
	      var component = _props$component === undefined ? 'div' : _props$component;
	      var current = _props.current;
	      var before = _props.before;
	      var prev = _props.prev;
	      var after = _props.after;
	      var done = _props.done;
	      var _props$classes = _props.classes;
	      var classes = _props$classes === undefined ? {} : _props$classes;
	      var props = (0, _objectWithoutProperties3.default)(_props, ['component', 'current', 'before', 'prev', 'after', 'done', 'classes']);
	
	      props.className = (0, _classnames2.default)((_cx = {}, (0, _defineProperty3.default)(_cx, _style2.default.currentSlide, current && done), (0, _defineProperty3.default)(_cx, _style2.default.slideBefore, before), (0, _defineProperty3.default)(_cx, _style2.default.slideAfter, after), (0, _defineProperty3.default)(_cx, classes.current, classes.current && current && done), (0, _defineProperty3.default)(_cx, classes.entering, classes.entering && current && !done), (0, _defineProperty3.default)(_cx, classes.prev, classes.prev && prev && done), (0, _defineProperty3.default)(_cx, classes.leaving, classes.leaving && prev && !done), (0, _defineProperty3.default)(_cx, classes.before, classes.before && before), (0, _defineProperty3.default)(_cx, classes.after, classes.after && after), _cx), _style2.default.slide, props.className);
	      return _react2.default.createElement(component, props);
	    }
	  }]);
	  return Slide;
	}(_react.Component);
	
	exports.default = Slide;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(100);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(102)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?importLoaders=2&modules&localIdentName=[name]__[local]___[hash:base64:5]!./../node_modules/autoprefixer-loader/index.js?{browsers:[\"last 5 version\"]}!./../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?importLoaders=2&modules&localIdentName=[name]__[local]___[hash:base64:5]!./../node_modules/autoprefixer-loader/index.js?{browsers:[\"last 5 version\"]}!./../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(101)();
	// imports
	
	
	// module
	exports.push([module.id, ".style__deck___3GxuK {\n  position: relative;\n  overflow: hidden; }\n\n.style__slide___jy-my {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  overflow: hidden; }\n\n.style__currentSlide___1yXCC {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  overflow: auto; }\n\n.style__horizontalDeck___2PWmZ > .style__slideBefore___6l7TA {\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0); }\n\n.style__horizontalDeck___2PWmZ > .style__slideAfter___1dREn {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0); }\n\n.style__verticalDeck___1PjcF > .style__slideBefore___6l7TA {\n  -webkit-transform: translate3d(0, -100%, 0);\n          transform: translate3d(0, -100%, 0); }\n\n.style__verticalDeck___1PjcF > .style__slideAfter___1dREn {\n  -webkit-transform: translate3d(0, 100%, 0);\n          transform: translate3d(0, 100%, 0); }\n", ""]);
	
	// exports
	exports.locals = {
		"deck": "style__deck___3GxuK",
		"slide": "style__slide___jy-my",
		"currentSlide": "style__currentSlide___1yXCC",
		"horizontalDeck": "style__horizontalDeck___2PWmZ",
		"slideBefore": "style__slideBefore___6l7TA",
		"slideAfter": "style__slideAfter___1dREn",
		"verticalDeck": "style__verticalDeck___1PjcF"
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 102 */
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