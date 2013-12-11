/*More aggressive settings, working fine*/
chrome.webRequest.onHeadersReceived.addListener(function (object) {
	'use strict';
	if (object) {
		var object_type = object.type.toLowerCase();
		if ((object_type !== 'main_frame') && (object_type !== 'sub_frame') && (object_type !== 'xmlhttprequest')) {
			var headers = object.responseHeaders,
			len = headers.length - 1,
			f = false,
			elem = null;
			do {
				elem = headers[len];
				switch (elem.name.toLowerCase()) {
				case 'cache-control':
					/*if (!f) {
						f = true;
						headers[len].value = 'private, max-age=' + txt_cache;
					}
					
					break;*/
				case 'expires':
				case 'last-modified':
				case 'etag':
					headers.splice(len, 1);
					break;
				default:
					break;
				}
			} while (len--);
			//if (!f) {
				var obj = {
					'name' : 'Cache-Control',
					'value' : 'private, max-age=' + txt_cache
				};
				headers.push(obj);
			//}
			return {
				responseHeaders : headers
			};
		}
	}
}, {
	urls : ['<all_urls>']
}, ['blocking', 'responseHeaders']);
var txt_cache = '31536000';
chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.local.set({
		'txt_cache' : '31536000'
	});
});
chrome.storage.local.get(function (object) {
	txt_cache = object['txt_cache'];
});
