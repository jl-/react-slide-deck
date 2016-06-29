/**
 * window.on('scroll', throttle(fn, 20, 200));
 */
function throttle(func, delay, mustRun = delay, context = null, ...params) {
  var tid, firstInvokedAt;
  function wrapped(...args) {
    clearTimeout(tid);
    const lastInvokedAt= Date.now();
    firstInvokedAt = firstInvokedAt || lastInvokedAt;

    const remaining = mustRun - (lastInvokedAt - firstInvokedAt);
    tid = setTimeout(() => {
      firstInvokedAt = undefined;
      func.apply(context, params.concat(args));
    }, remaining > delay ? delay : remaining > 0 ? remaining : 0);
  }
  return wrapped;
}

export default throttle

