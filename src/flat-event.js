class FlatEvent {
  constructor() {
    this.$events = {};
  }
  on(event, fn) {
    let listeners = this.$events[event] || (this.$events[event] = []);
    listeners.push(fn);
    return this;
  }
  off (...params) {
    let event = params[0];
    if (params.length === 0) {
      this.$events = {};
    } else if (params.length === 1) {
      delete this.$events[event];
    } else {
      let listeners = this.$events[event] || (this.$events[event] = []);
      let index = listeners.indexOf(params[1]);
      index !== -1 && listeners.splice(index, 1);
    }
    return this;
  }
  emit(event, ...params) {
    let listeners = this.$events[event] || (this.$events[event] = []);
    listeners.forEach(listener => listener.apply(this, params));
    return this;
  }
}

export default FlatEvent;
