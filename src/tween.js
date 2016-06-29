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
  INIT: 0,
  DONE: 1,
  RUNNING: 2,
  STOPPED: 3,
  PAUSED: 4
};
class Tween extends FlatEvent {
  constructor(from, easing, duration) {
    super();
    this.reset(from).ease(easing).duration(duration);
    this.iterate = ::this.iterate;
  }
  reset(from) {
    this.stop();
    this.from(from);
    this._curr = this._from;
    this._lasted = 0;
    this._start = this._latest = 0;
    this._status = STATUS.INIT;
    return this;
  }
  from(_from) {
    this._origin_from = this._from = _from;
    return this;
  }
  to(_to) {
    this._origin_to = this._to = _to;
    return this;
  }
  duration(ms = 1600) {
    this._duration = ms;
    return this;
  }
  ease(fn = ease.outQuint) {
    fn = typeof fn === 'function' ? fn : ease[fn];
    if (!fn) throw new TypeError('invalid easing function');
    this._ease = fn;
    return this;
  }
  stop() {
    if (this._status !== STATUS.RUNNING) return;
    raf.cancel(this._raf);
    this._status = STATUS.STOPPED;
    this.emit('stopped', this._curr);
    return this;
  }
  pause() {
    if (this._status !== STATUS.RUNNING) return;
    raf.cancel(this._raf);
    this._status = STATUS.PAUSED;
    this.emit('paused', this._curr);
    return this;
  }
  iterate() {
    const now = Date.now();
    const lasted = now - this._latest + this._lasted;
    const progress = lasted / this._duration;
    this._latest = now;
    this._lasted = lasted;
    if (progress >= 1) {
      this._status = STATUS.DONE;
      this._curr = this._to;
      this.emit('updating', this._curr);
      this.emit('done', this._curr);
    } else {
      const from = this._from, to = this._to, curr = this._curr = {};
      const factor = this._ease(progress);
      for (let prop in from) {
        curr[prop] = from[prop] + (to[prop] - from[prop]) * factor;
      }
      this.emit('updating', curr);
      this._raf = raf(this.iterate);
    }
    return this;
  }
  resume(p) {
    if (this._status === STATUS.RUNNING) return;
    if (p >= 0) this._lasted = p * this._duration;

    this._status = STATUS.RUNNING;
    this._latest = Date.now();
    this._raf = raf(this.iterate);
    this.emit('resumed');
    return this;
  }
  start() {
    if (this._status === STATUS.RUNNING) return;

    this._start = Date.now();
    this._latest = this._start;

    this._status = STATUS.RUNNING;
    this._raf = raf(this.iterate);
    this.emit('started');
    return this;
  }
  back() {
    this.stop();
    const to = this._to === this._origin_to ? this._origin_from : this._origin_to;
    this._from = this._curr;
    this._to = to;
    this._lasted = 0;
    this._status = STATUS.INIT;
    this.start();
  }
}
Tween.ease = ease;

export default Tween;

