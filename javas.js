/**
 * @author Federico Pacheco
 */

var script = document.createElement('script');
script.src = "http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js";
document.head.appendChild(script);

function toAnmer(){
	document.location = CryptoJS.MD5(prompt())+"/index.html";
}
