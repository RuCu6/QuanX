/*
Skip the redirect page.

Quantumult X:
[rewrite_local]
# 简书
^https:\/\/links\.jianshu\.com\/go\?to= url script-echo-response https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
^https:\/\/www\.jianshu\.com\/go-wild\?ac=\d&url= url script-echo-response https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
# 知乎
^https:\/\/link\.zhihu\.com\/\?target=(https?)?(%3A|:)?(\/\/|%2F%2F)?(.*?)(&source.*)?$ url 302 http://$4
# ^https:\/\/link\.zhihu\.com\/\?target= url script-echo-response https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
# 微博
^https?:\/\/weibo\.cn\/sinaurl\?(.*&)?(u|toasturl|goto)= url script-echo-response https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
^https:\/\/shop\.sc\.weibo\.com\/h5\/jump\/error\?(.*&)?url= url script-echo-response https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
^https?:\/\/(sinaurl|t)\.cn\/ url script-response-header https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js

Surge:
[URL Rewrite]
^https:\/\/link\.zhihu\.com\/\?target=(https?)?(%3A|:)?(\/\/|%2F%2F)?(.*?)(&source.*)?$ http://$4 302

[Script]
# 简书
Jianshu_no_redirect = type=http-request,pattern=^https:\/\/links\.jianshu\.com\/go\?to=,script-path=https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
Jianshu_no_redirect2 = type=http-request,pattern=^https:\/\/www\.jianshu\.com\/go-wild\?ac=\d&url=,script-path=https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
# 知乎
# Zhihu_no_redirect = type=http-request,pattern=^https:\/\/link\.zhihu\.com\/\?target=,script-path=https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
# 微博
Weibo_no_redirect = type=http-request,pattern=^https?:\/\/weibo\.cn\/sinaurl\?(.*&)?(u|toasturl|goto)=,script-path=https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
Weibo_no_redircet2 = type=http-request,pattern=^https:\/\/shop\.sc\.weibo\.com\/h5\/jump\/error\?(.*&)?url=(.*),script-path=https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js
Weibo_no_redirect3 = type=http-response,pattern=^https?:\/\/(sinaurl|t)\.cn\/,script-path=https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/no_redirect.js

[mitm]
hostname = links.jianshu.com, www.jianshu.com, link.zhihu.com, weibo.cn, t.cn, sinaurl.cn, shop.sc.weibo.com
*/

const jianshur = /https:\/\/links\.jianshu\.com\/go\?to=(.*)/;
const jianshur2 = /https:\/\/www\.jianshu\.com\/go-wild\?ac=\d&url=(.*)/;
const zhihur = /https:\/\/link\.zhihu\.com\/\?target=(.*)/;
const weibor = /https?:\/\/weibo\.cn\/sinaurl\?(.*&)?(u|toasturl|goto)=(.*?)(&.*)?$/;
const weibor2 = /https:\/\/shop\.sc\.weibo\.com\/h5\/jump\/error\?(.*&)?url=(.*)/;

const oldurl = $request.url;
let newurl = "";
if (oldurl.indexOf("links.jianshu.com/go") !== -1) {
  newurl = decodeURIComponent(jianshur.exec(oldurl)[1]);
} else if (oldurl.indexOf("www.jianshu.com/go") !== -1) {
  newurl = decodeURIComponent(jianshur2.exec(oldurl)[1]);
} else if (oldurl.indexOf("link.zhihu.com/?target") !== -1) {
  newurl = decodeURIComponent(zhihur.exec(oldurl)[1].replace(/&source=.*/, ""));
} else if (oldurl.indexOf("weibo.cn/sinaurl") !== -1) {
  newurl = decodeURIComponent(weibor.exec(oldurl)[3]);
} else if (oldurl.indexOf("shop.sc.weibo.com/h5/jump/error") !== -1) {
  newurl = decodeURIComponent(weibor2.exec(oldurl)[2]);
} else if (oldurl.indexOf("sinaurl.cn") !== -1 || oldurl.indexOf("t.cn") !== -1) {
  let headers = $response.headers;
  newurl = headers.Location || headers.location;
}

newurl = newurl.indexOf("http") == 0 ? newurl : "http://" + newurl;
const isQuanX = typeof $notify != "undefined";
const isLoon = typeof $loon != "undefined";
const newstatus = isQuanX ? "HTTP/1.1 302 Temporary Redirect" : 302;
const noredirect = isLoon
  ? { status: newstatus, body: "loon", headers: { Location: newurl } }
  : { status: newstatus, headers: { Location: newurl } };

let resp = isQuanX ? noredirect : { response: noredirect };
resp = typeof $response != "undefined" ? noredirect : resp;
$done(resp);
