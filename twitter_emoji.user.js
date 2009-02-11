// ==UserScript==
// @name           twitteremoji
// @namespace      http://sekimura.vox.com
// @include        http://twitter.com/*
// ==/UserScript==

(function() {

function charToImgTag(whole, p1) {
    var charCode = p1.charCodeAt(0);
    var baseDir;
    if (0xE00E <= charCode && charCode <= 0xE05A) {
        baseDir = 'E001';
    }
    if (0xE101 <= charCode && charCode <= 0xE15A) {
        baseDir = 'E101';
    }
    if (0xE201 <= charCode && charCode <= 0xE253) {
        baseDir = 'E201';
    }
    if (0xE301 <= charCode && charCode <= 0xE34D) {
        baseDir = 'E301';
    }
    if (0xE401 <= charCode && charCode <= 0xE44C) {
        baseDir = 'E401';
    }
    if (0xE501 <= charCode && charCode <= 0xE537) {
        baseDir = 'E501';
    }
    return [
      '<img src="http://creation.mb.softbank.jp/web/img/',
      baseDir,
      '/',
      p1.charCodeAt(0).toString(16).toUpperCase(),
      '_20.gif" />'].join('');
}

var xpathExp = 'id("timeline")/li/span[@class="status-body"]/span[@class="entry-content"]';
var xpathResult = document.evaluate(xpathExp, 
                                    document, 
                                    null, 
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                    null);
var emojiRe = /([\ue00e-\ue05a|\ue101-\ue15a|\ue201-\ue253|\ue301-\ue34D|\ue401-\ue44c|\ue501-\ue537])/g; 

for (var i = 0; i < xpathResult.snapshotLength; i++) {
    var el = xpathResult.snapshotItem(i);
    if (el.textContent.match(emojiRe)) {
	el.innerHTML = el.textContent.replace(emojiRe, charToImgTag);
    }
}

})();
