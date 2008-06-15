// ==UserScript==
// @name           tweak TZ for tv.yahoo.co.jp
// @namespace      http://sekimura.vox.com/
// @include        http://tv.yahoo.co.jp/vhf/*
// @include        http://tv.yahoo.co.jp/bs_digital/*
// @include        http://tv.yahoo.co.jp/radio/*
// ==/UserScript==

(function() {

var tzDiff = 9 + new Date().getTimezoneOffset()/60;
var pad = function (val, len) {
    val = new String(val);
    len = parseInt(len) || 2;
    while(val.length < len) {
        val = "0" + val;
    }
    return val;
};

var xpathExp = "/html[1]/body[1]/center[1]/table/tbody[1]/tr/td/table[1]/tbody[1]/tr[1]/td[2]/small[1]/b[1]";
var xpathResult = document.evaluate(xpathExp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < xpathResult.snapshotLength; i++) {
  var el = xpathResult.snapshotItem(i);
  var re = /(\d+):(\d+)/;
  var result = re.exec(el.textContent);
  if (result[1]) {
    var d = new Date();
    d.setHours(result[1] - tzDiff);
    el.innerHTML = pad(d.getHours()) + ":" + result[2];
  }
}

})();
