// 2023-11-26 09:25

var url = $request.url;
var header = $request.headers;
const isQuanX = typeof $task !== "undefined";
const appinfo = "";

if (url.includes("/api/dataplus/columns")) {
  // 首页-数据通
  let obj = JSON.parse($response.body);
  const items = ["buttonColor", "buttonText", "buyUrl", "descText"];
  if (obj?.data?.length > 0) {
    for (let item of obj.data) {
      for (let i of items) {
        delete item[i];
      }
    }
  }
  $done({ body: JSON.stringify(obj) });
} else if (url.includes("/caixinapp/appinfo")) {
  // 文章详情页
  let obj = JSON.parse($response.body);
  if (obj?.data?.articlePromotionList?.length > 0) {
    // 文章底部推广图
    obj.data.articlePromotionList = [];
  }
  $done({ body: JSON.stringify(obj) });
} else if (url.includes("/channelv5/list")) {
  // 首页-顶部分类列表
  let obj = JSON.parse($response.body);
  delete obj.data.ios_ad_513;
  delete obj.data.android_ad_513;
  $done({ body: JSON.stringify(obj) });
} else if (url.includes("/fm/index/list")) {
  // 首页-财新fm
  const items = ["androidAdList", "headlines", "iosAdList"];
  if (obj?.data) {
    for (let i of items) {
      if (obj?.data?.[i]?.length > 0) {
        obj.data[i] = [];
      }
    }
  }
} else if (url.includes("/gg.caixin.com/s")) {
  // 开屏广告
  let body = $response.body;
  if (body === undefined) {
    $done({});
  } else {
    const items = {
      showfrequency: 0,
      showintval: 0,
      showcycle: 604800,
      intval: 0,
      sday: "2090-12-31 00:00:00",
      eday: "2090-12-31 23:59:59"
    };
    body = body
      .replace(/"showfrequency":\d+/g, items["showfrequency"])
      .replace(/"showintval":\d+/g, items["showintval"])
      .replace(/"showcycle":\d+/g, items["showcycle"])
      .replace(/"intval":\d+/g, items["intval"])
      .replace(/"sday":"[^"]*"/g, items["sday"])
      .replace(/"eday":"[^"]*"/g, items["eday"])
      .replace(/"banner":/g, "ban0:");
    $done({ body });
  }
} else if (url.includes("/index_page_v5")) {
  // 首页-信息流
  let obj = JSON.parse($response.body);
  delete obj.data.ios_ad_513;
  delete obj.data.android_ad_513;
  if (obj?.data?.list?.length > 0) {
    obj.data.list = obj.data.list.filter((i) => !["金融我闻", "财新数据通"]?.includes(i?.channel_name));
  }
  $done({ body: JSON.stringify(obj) });
} else if (url.includes("/validateAudioAuth") || url.includes("/groupImageValidate")) {
  // 会员数据
  header.appinfo = appinfo;
  delete header.authentication;
  if (isQuanX) {
    delete header.Accept;
    delete header.Connection;
    delete header.Cookie;
    delete header.requestTime;
    delete header["Accept-Encoding"];
    delete header["Accept-Language"];
    delete header["User-Agent"];
  } else {
    delete header.accept;
    delete header.cookie;
    delete header.requesttime;
    delete header["accept-encoding"];
    delete header["accept-language"];
    delete header["user-agent"];
  }
  $done({ headers: header });
} else if (url.includes("/validate?")) {
  // 会员数据
  url = url
    .replace(/uid=\d+/g, "uid=")
    .replace(/code=\w+/g, "code=")
    .replace(/device=\w+/g, "device=")
    .replace(/deviceType=\d+/g, "deviceType=1")
    .replace(/&_t=\d+/g, "");
  if (isQuanX) {
    delete header.Accept;
    delete header.Connection;
    delete header.Cookie;
    delete header.Referer;
    delete header["Accept-Encoding"];
    delete header["Accept-Language"];
    delete header["User-Agent"];
  } else {
    delete header.accept;
    delete header.cookie;
    delete header.referer;
    delete header["accept-encoding"];
    delete header["accept-language"];
    delete header["user-agent"];
  }
  $done({ url: url, headers: header });
} else {
  $done({});
}
