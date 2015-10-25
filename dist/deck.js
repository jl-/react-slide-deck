(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDeck"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDeck"] = factory(root["React"], root["ReactDom"]);
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
	 * <Deck vertical|horizontal loop swipe dura=1400 factor=0.4 current=2>
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _slide = __webpack_require__(4);
	
	var _slide2 = _interopRequireDefault(_slide);
	
	var _styleScss = __webpack_require__(5);
	
	var _styleScss2 = _interopRequireDefault(_styleScss);
	
	var SWIPE_DURA = 1400; // default transition duration
	var SWIPE_ONSET = 6;
	var SWIPE_FACTOR = 0.4;
	
	var DECK_STATUS = {
	  SWIPE_STARTED: 1,
	  SWIPING_UP: 2,
	  SWIPING_DOWN: 3,
	  SWIPE_FORWARDING_UP: 4,
	  SWIPE_FORWARDING_DOWN: 5,
	  SWIPE_CONFIRMED_UP: 6,
	  SWIPE_CONFIRMED_DOWN: 7,
	  SWIPE_CANCELED_UP: 8,
	  SWIPE_CANCELED_DOWN: 9,
	  NORMAL: 0
	};
	
	var Deck = (function (_Component) {
	  _inherits(Deck, _Component);
	
	  function Deck(props, context) {
	    _classCallCheck(this, Deck);
	
	    _get(Object.getPrototypeOf(Deck.prototype), 'constructor', this).call(this, props, context);
	    var current = props.current;
	
	    this.currIndex = 0;
	    this.state = { current: current, prev: current + 1 };
	  }
	
	  _createClass(Deck, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.status = DECK_STATUS.NORMAL;
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      if (this.status === DECK_STATUS.SWIPE_STARTED) return false;
	      return true;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var current = nextProps.current,
	          prev = this.state.current;
	      this.status = DECK_STATUS.NORMAL;
	      this.setState({ current: current, prev: prev });
	    }
	  }, {
	    key: 'normalizeIndex',
	    value: function normalizeIndex(index) {
	      var slidesCount = _react.Children.count(this.props.children);
	      return (index + slidesCount) % slidesCount;
	    }
	  }, {
	    key: 'handleWheel',
	    value: function handleWheel(e) {
	      var _this = this;
	
	      if (this.status !== DECK_STATUS.NORMAL || e.deltaY === 0) return;
	
	      this.status = e.deltaY < 0 ? DECK_STATUS.SWIPE_FORWARDING_DOWN : DECK_STATUS.SWIPE_FORWARDING_UP;
	      var prev = this.state.current,
	          current = prev + (this.status === DECK_STATUS.SWIPE_FORWARDING_DOWN ? 1 : -1);
	      var slidesCount = _react.Children.count(this.props.children);
	      current = this.props.loop ? (current + slidesCount) % slidesCount : current;
	
	      if (current >= 0 && current < slidesCount) {
	        this.setState({ current: current, prev: prev });
	        setTimeout(function () {
	          return _this.status = DECK_STATUS.NORMAL;
	        }, this.props.dura || SWIPE_DURA);
	      }
	    }
	  }, {
	    key: 'handleTouchStart',
	    value: function handleTouchStart(e) {
	      var touch = e.changedTouches[0];
	      var dom = _reactDom2['default'].findDOMNode(this);
	      this.setState({
	        x: this.props.horizontal ? touch.clientX : 0,
	        y: this.props.vertical ? touch.clientY : 0,
	        width: dom.offsetWidth,
	        height: dom.offsetHeight
	      });
	      this.status = DECK_STATUS.SWIPE_STARTED;
	    }
	  }, {
	    key: 'handleTouchMove',
	    value: function handleTouchMove(e) {
	      var touch = e.changedTouches[0];
	      var _state = this.state;
	      var prev = _state.prev;
	      var current = _state.current;
	      var x = _state.x;
	      var y = _state.y;
	
	      var dx = this.props.horizontal ? touch.clientX - x : 0,
	          dy = this.props.vertical ? touch.clientY - y : 0;
	      var slidesCount = _react.Children.count(this.props.children),
	          distance = dx + dy;
	      if (distance !== 0) {
	        this.status = distance < 0 ? DECK_STATUS.SWIPING_DOWN : DECK_STATUS.SWIPING_UP;
	        prev = current + (this.status === DECK_STATUS.SWIPING_DOWN ? 1 : -1);
	        prev = this.props.loop ? (prev + slidesCount) % slidesCount : prev;
	        if (Math.abs(distance) > SWIPE_ONSET && prev >= 0 && prev < slidesCount) {
	          this.setState({ dx: dx, dy: dy, prev: prev });
	        }
	      }
	    }
	  }, {
	    key: 'handleTouchEnd',
	    value: function handleTouchEnd(e) {
	      if (this.status !== DECK_STATUS.SWIPING_UP && this.status !== DECK_STATUS.SWIPING_DOWN) {
	        this.status = DECK_STATUS.NORMAL;
	        return;
	      }
	      var touch = e.changedTouches[0],
	          factor = this.props.factor || SWIPE_FACTOR;
	      var _state2 = this.state;
	      var prev = _state2.prev;
	      var current = _state2.current;
	      var x = _state2.x;
	      var y = _state2.y;
	      var width = _state2.width;
	      var height = _state2.height;
	
	      var distance = this.props.horizontal ? touch.clientX - x : touch.clientY - y;
	      var shouldForward = Math.abs(distance) / (this.props.horizontal ? width : height) > factor;
	      if (shouldForward) {
	        ;
	        var _ref = [current, prev];
	        prev = _ref[0];
	        current = _ref[1];
	      }this.setState({ prev: prev, current: current });
	      this.status = !shouldForward ? distance > 0 ? DECK_STATUS.SWIPE_CANCELED_UP : DECK_STATUS.SWIPE_CANCELED_DOWN : distance > 0 ? DECK_STATUS.SWIPE_CONFIRMED_UP : DECK_STATUS.SWIPE_CONFIRMED_DOWN;
	    }
	  }, {
	    key: 'handleTouchCancel',
	    value: function handleTouchCancel(e) {
	      this.status = DECK_STATUS.SWIPE_CANCELED;
	    }
	  }, {
	    key: 'setSlideStyle',
	    value: function setSlideStyle(isPrev) {
	      var _state3 = this.state;
	      var width = _state3.width;
	      var height = _state3.height;
	      var dx = _state3.dx;
	      var dy = _state3.dy;
	
	      var style = {};
	      if (isPrev) {
	        if (this.props.horizontal) {
	          dx = (dx > 0 ? -width : width) + dx;
	        } else if (this.props.vertical) {
	          dy = (dy > 0 ? -height : height) + dy;
	        }
	      }
	      style.WebkitTransform = style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)';
	      return style;
	    }
	  }, {
	    key: 'updateSlides',
	    value: function updateSlides() {
	      var _props = this.props;
	      var children = _props.children;
	      var horizontal = _props.horizontal;
	      var vertical = _props.vertical;
	      var loop = _props.loop;
	      var _state4 = this.state;
	      var prev = _state4.prev;
	      var current = _state4.current;
	      var dx = _state4.dx;
	      var dy = _state4.dy;
	
	      var slidesCount = _react.Children.count(children),
	          lastIndex = slidesCount - 1;
	      var slides = [];var prevSlideProps = { style: {} };
	      var currentSlideProps = { style: {} };
	
	      var isSameSlideIndex = prev === current;
	      var swipingUp = this.status === DECK_STATUS.SWIPING_UP,
	          swipingDown = this.status === DECK_STATUS.SWIPING_DOWN,
	          swipeForwardingUp = this.status === DECK_STATUS.SWIPE_FORWARDING_UP,
	          swipeForwardingDown = this.status === DECK_STATUS.SWIPE_FORWARDING_DOWN,
	          swipeConfirmedUp = this.status === DECK_STATUS.SWIPE_CONFIRMED_UP,
	          swipeConfirmedDown = this.status === DECK_STATUS.SWIPE_CONFIRMED_DOWN,
	          swipeCanceledUp = this.status === DECK_STATUS.SWIPE_CANCELED_UP,
	          swipeCanceledDown = this.status === DECK_STATUS.SWIPE_CANCELED_DOWN,
	          normal = this.status === DECK_STATUS.NORMAL;
	
	      /*
	      swipingUp && console.log('swipingUp');
	      swipingDown && console.log('swipingDown');
	      swipeForwardingUp && console.log('swipeForwardingUp');
	      swipeForwardingDown && console.log('swipeForwardingDown');
	      swipeConfirmedUp && console.log('swipeConfrimedUp');
	      swipeConfirmedDown && console.log('swipeConfrimedDown');
	      swipeCanceledUp && console.log('swipeCanceledUp');
	      swipeCanceledDown && console.log('swipeCanceledDown');
	      normal && console.log('normal');
	      */
	
	      loop = loop && !normal;
	      if (isSameSlideIndex) prev = this.normalizeIndex(current + 1);
	
	      if (swipingUp || swipingDown) {
	        prevSlideProps.style = this.setSlideStyle(true);
	        currentSlideProps.style = this.setSlideStyle(false);
	      } else {
	        currentSlideProps.current = prevSlideProps.prev = true;
	        currentSlideProps.reset = current > prev ? 'after' : 'before';
	        prevSlideProps[prev < current ? 'before' : 'after'] = true;
	        if (loop) {
	          if (prev === 0 && current === lastIndex && (swipeConfirmedUp || swipeForwardingUp || swipeCanceledDown)) {
	            prevSlideProps.after = true;prevSlideProps.before = false;
	            currentSlideProps.reset = 'before';
	          } else if (prev === lastIndex && current === 0 && (swipeConfirmedDown || swipeForwardingDown || swipeCanceledUp)) {
	            prevSlideProps.after = false;prevSlideProps.before = true;
	            currentSlideProps.reset = 'after';
	          }
	        }
	        if (isSameSlideIndex) {
	          currentSlideProps.reset = prevSlideProps.prev = false;
	        }
	        if (swipeConfirmedUp || swipeConfirmedDown || swipeCanceledUp || swipeCanceledDown) {
	          this.status = DECK_STATUS.NORMAL;
	          currentSlideProps.reset = false;
	        }
	      }
	
	      this.currIndex = swipingUp || swipingDown || swipeCanceledUp || swipeCanceledDown ? this.currIndex : +(isSameSlideIndex && this.currIndex === 1 || !isSameSlideIndex && this.currIndex === 0);
	
	      prevSlideProps.key = +!this.currIndex;
	      currentSlideProps.key = this.currIndex;
	      slides[+!this.currIndex] = _react2['default'].cloneElement(children[prev], prevSlideProps);
	      slides[this.currIndex] = _react2['default'].cloneElement(children[current], currentSlideProps);
	
	      return slides;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _cns;
	
	      var _props2 = this.props;
	      var children = _props2.children;
	      var current = _props2.current;
	      var vertical = _props2.vertical;
	      var horizontal = _props2.horizontal;
	      var loop = _props2.loop;
	      var swipe = _props2.swipe;
	      var className = _props2.className;
	
	      var rest = _objectWithoutProperties(_props2, ['children', 'current', 'vertical', 'horizontal', 'loop', 'swipe', 'className']);
	
	      if (swipe) {
	        rest.onWheel = this.handleWheel.bind(this);
	        rest.onTouchStart = this.handleTouchStart.bind(this);
	        rest.onTouchMove = this.handleTouchMove.bind(this);
	        rest.onTouchEnd = this.handleTouchEnd.bind(this);
	      }
	      className = (0, _classnames2['default'])((_cns = {}, _defineProperty(_cns, className, !!className), _defineProperty(_cns, 'deck--horizontal', horizontal), _defineProperty(_cns, 'deck--vertical', vertical), _cns), 'deck');
	      return _react2['default'].createElement(
	        'div',
	        _extends({ className: className }, rest),
	        this.updateSlides()
	      );
	    }
	  }]);
	
	  return Deck;
	})(_react.Component);
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
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
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Slide = (function (_Component) {
	  _inherits(Slide, _Component);
	
	  function Slide() {
	    _classCallCheck(this, Slide);
	
	    _get(Object.getPrototypeOf(Slide.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Slide, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.reset(nextProps.reset);
	    }
	  }, {
	    key: 'reset',
	    value: function reset(status) {
	      if (!status) return;
	      var slide = _reactDom2['default'].findDOMNode(this);
	      slide.className = 'slide slide--' + status;
	      slide.offsetWidth;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	      var current = _props.current;
	      var before = _props.before;
	      var prev = _props.prev;
	      var after = _props.after;
	      var reset = _props.reset;
	      var className = _props.className;
	      var touching = _props.touching;
	
	      var rest = _objectWithoutProperties(_props, ['children', 'current', 'before', 'prev', 'after', 'reset', 'className', 'touching']);
	
	      className = (0, _classnames2['default'])({
	        'slide--current': current,
	        'slide--before': before,
	        'slide--after': after,
	        'slide--prev': prev
	      }, className, 'slide');
	      return _react2['default'].createElement(
	        'div',
	        _extends({ className: className }, rest),
	        children
	      );
	    }
	  }]);
	
	  return Slide;
	})(_react.Component);
	
	exports['default'] = Slide;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".deck {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.deck .slide {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.deck .slide--current,\n.deck .slide--prev {\n  -webkit-transition: -webkit-transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1);\n          transition: transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1); }\n\n.deck .slide--current {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0); }\n\n.deck--horizontal .slide--before {\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0); }\n\n.deck--horizontal .slide--after {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0); }\n\n.deck--vertical .slide--before {\n  -webkit-transform: translate3d(0, -100%, 0);\n          transform: translate3d(0, -100%, 0); }\n\n.deck--vertical .slide--after {\n  -webkit-transform: translate3d(0, 100%, 0);\n          transform: translate3d(0, 100%, 0); }\n", ""]);
	
	// exports


/***/ },
/* 7 */
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
/* 8 */
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