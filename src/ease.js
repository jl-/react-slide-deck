let ease = {};
ease.linear = function(n){
  return n;
};

ease.inQuad = function(n){
  return n * n;
};

ease.outQuad = function(n){
  return n * (2 - n);
};

ease.inOutQuad = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n;
  return - 0.5 * (--n * (n - 2) - 1);
};

ease.inCube = function(n){
  return n * n * n;
};

ease.outCube = function(n){
  return --n * n * n + 1;
};

ease.inOutCube = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n;
  return 0.5 * ((n -= 2 ) * n * n + 2);
};

ease.inQuart = function(n){
  return n * n * n * n;
};

ease.outQuart = function(n){
  return 1 - (--n * n * n * n);
};

ease.inOutQuart = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n;
  return -0.5 * ((n -= 2) * n * n * n - 2);
};

ease.inQuint = function(n){
  return n * n * n * n * n;
}

ease.outQuint = function(n){
  return --n * n * n * n * n + 1;
}

ease.inOutQuint = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n * n;
  return 0.5 * ((n -= 2) * n * n * n * n + 2);
};

ease.inSine = function(n){
  return 1 - Math.cos(n * Math.PI / 2 );
};

ease.outSine = function(n){
  return Math.sin(n * Math.PI / 2);
};

ease.inOutSine = function(n){
  return .5 * (1 - Math.cos(Math.PI * n));
};

ease.inExpo = function(n){
  return 0 == n ? 0 : Math.pow(1024, n - 1);
};

ease.outExpo = function(n){
  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
};

ease.inOutExpo = function(n){
  if (0 == n) return 0;
  if (1 == n) return 1;
  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};

ease.inCirc = function(n){
  return 1 - Math.sqrt(1 - n * n);
};

ease.outCirc = function(n){
  return Math.sqrt(1 - (--n * n));
};

ease.inOutCirc = function(n){
  n *= 2
  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
};

ease.inBack = function(n){
  var s = 1.70158;
  return n * n * (( s + 1 ) * n - s);
};

ease.outBack = function(n){
  var s = 1.70158;
  return --n * n * ((s + 1) * n + s) + 1;
};

ease.inOutBack = function(n){
  var s = 1.70158 * 1.525;
  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
};

ease.inBounce = function(n){
  return 1 - ease.outBounce(1 - n);
};

ease.outBounce = function(n){
  if ( n < ( 1 / 2.75 ) ) {
    return 7.5625 * n * n;
  } else if ( n < ( 2 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
  } else if ( n < ( 2.5 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
  } else {
    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
  }
};

ease.inOutBounce = function(n){
  if (n < .5) return ease.inBounce(n * 2) * .5;
  return ease.outBounce(n * 2 - 1) * .5 + .5;
};

ease.inElastic = function(n){
  var s, a = 0.1, p = 0.4;
  if ( n === 0 ) return 0;
  if ( n === 1 ) return 1;
  if ( !a || a < 1 ) { a = 1; s = p / 4; }
  else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
  return - ( a * Math.pow( 2, 10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) );
};

ease.outElastic = function(n){
  var s, a = 0.1, p = 0.4;
  if ( n === 0 ) return 0;
  if ( n === 1 ) return 1;
  if ( !a || a < 1 ) { a = 1; s = p / 4; }
  else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
  return ( a * Math.pow( 2, - 10 * n) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) + 1 );
};

ease.inOutElastic = function(n){
  var s, a = 0.1, p = 0.4;
  if ( n === 0 ) return 0;
  if ( n === 1 ) return 1;
  if ( !a || a < 1 ) { a = 1; s = p / 4; }
  else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
  if ( ( n *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) );
  return a * Math.pow( 2, -10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
};

ease.outCirc = function (n) {
  return Math.sqrt(1 - --n * n);
};
ease.outExpo = function (n) {
  return n === 1 ? n : -Math.pow(2, -10 * n) + 1
};

export default ease;

