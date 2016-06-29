class FlatEvent {
  constructor() {
    this.$events = {};
  }
  on(event, fn) {
    const listeners = this.$events[event] || (this.$events[event] = []);
    listeners.push(fn);
    return this;
  }
  off (event, fn) {
    if (event === undefined) {
      this.$events = {};
    } else if (fn === undefined) {
      delete this.$events[event];
    } else {
      const listeners = this.$events[event];
      if (Array.isArray(listeners)) {
        const index = listeners.indexOf(fn);
        (index !== -1) && listeners.splice(index, 1);
      }
    }
    return this;
  }
  emit(event, ...params) {
    const listeners = this.$events[event];
    if (!Array.isArray(listeners)) return;
    listeners.forEach(listener => listener.apply(this, params));
    return this;
  }
}

export default FlatEvent;
