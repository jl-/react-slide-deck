/**
 * let tween = new Tween({});
 * tween.reset({})
 *      .to({})
 *      .on('update', function(){})
 *      .on('end', function(){});
 */
import FlatEvent from './flat-event';
import raf from 'raf';
import ease from './ease';
const STATUS = {
  INIT: 1,
  STOPPED: 2,
  PAUSED: 4,
  DONE: 3,
};
class Tween extends FlatEvent {
  constructor(from, easing, duration) {
    super();
    this.reset(from)
        .ease(easing)
        .duration(duration);
  }
  reset(from) {
    this._from = from || this._from;
    this._curr = this._from; // no need a deep clone
    this._lasted = 0;
    this._status = STATUS.INIT;
    return this;
  }
  to(props) {
    this._to = props;
    return this;
  }
  ease(fn = ease.outCube) {
    fn = typeof fn === 'function' ? fn : ease[fn];
    if (!fn) throw new TypeError('invalid easing function');
    this._ease = fn;
    return this;
  }
  duration(ms = 800) {
    this._duration = ms;
    return this;
  }
  step() {
    let progress = this._lasted / this._duration;
    if (progress >= 1) {
      this._status = STATUS.DONE;
      this._curr = this._to;
      this.emit('update', this._curr);
      this.emit('done', this._curr);
    } else {
      let from = this._from, to = this._to, curr = this._curr = {};
      let factor = this._ease(progress);
      for (let prop in from) {
        curr[prop] = from[prop] + (to[prop] - from[prop]) * factor;
      }
      this.emit('update', curr);
    }
    return this;
  }
  stop() {
    raf.cancel(this._raf);
    this._status = STATUS.STOPPED;
    this.emit('stop', this._curr);
    return this;
  }
  pause() {
    raf.cancel(this._raf);
    this._status = STATUS.PAUSED;
    this.emit('pause', this._curr);
    return this;
  }
  iterate() {
    let status = this._status;
    if (status === STATUS.PAUSED || status === STATUS.STOPPED) {
      raf.cancel(this._raf);
      return;
    }

    let lasted = Date.now() - this._latest + this._lasted;
    if (lasted >= this._duration) {
      this._lasted = this._duration;
    } else {
      this._lasted = lasted;
      this._latest = Date.now();
      this._raf = raf(::this.iterate);
    }
    return this.step();
  }
  progress() {
    return (this._lasted / this._duration) || 0;
  }
  start() {
    this.reset();
    this._latest = this._start = Date.now();
    this.iterate();
  }
  resume() {
    this._latest = Date.now();
    this.iterate();
  }
}
Tween.ease = ease;

export default Tween;
