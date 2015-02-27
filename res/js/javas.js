/**
 * @author Federico Pacheco
 */

var script = document.createElement('script');
script.src = "http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js";
document.head.appendChild(script);

function toAnmer(){
	document.location = CryptoJS.MD5(prompt())+"/index.html";
}


$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({deg: 0}).animate({deg: angle}, args);
  });
};