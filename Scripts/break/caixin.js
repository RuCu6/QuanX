// 2023-12-13 16:00

var url = $request.url;
var header = $request.headers;
const isQuanX = typeof $task !== "undefined";

// 到期时间 即将到期
const myAppinfo = "";
const myUid = "uid=12983287";
const myCode = "code=C4CE1DC9446504809B719B97D4DAA5FF";
const myDevice = "device=4877567e479337d1c4b5d7e327883b3677c2b16e";

if (url.includes("/validateAudioAuth") || url.includes("/groupImageValidate")) {
  // 会员数据
  header["appinfo"] = myAppinfo;
  delete header["authentication"];
  if (isQuanX) {
    delete header["Cookie"];
    delete header["User-Agent"];
    delete header["requestTime"];
  } else {
    delete header["cookie"];
    delete header["requesttime"];
    delete header["user-agent"];
  }
  $done({ headers: header });
} else if (url.includes("/validate?")) {
  // 会员数据
  url = url
    .replace(/uid=\d+/g, myUid)
    .replace(/code=\w+/g, myCode)
    .replace(/device=\w+/g, myDevice)
    .replace(/deviceType=\d+/g, "deviceType=1")
    .replace(/&_t=\d+/g, "");
  if (isQuanX) {
    delete header["Cookie"];
    delete header["Referer"];
    delete header["User-Agent"];
  } else {
    delete header["cookie"];
    delete header["referer"];
    delete header["user-agent"];
  }
  $done({ url: url, headers: header });
} else {
  if (url.includes("/gg.caixin.com/s")) {
    // 开屏广告
    let body = $response.body;
    if (body === undefined) {
      $done({});
    } else {
      body = body
        .replace(/"showfrequency":\d+/g, '"showfrequency":0')
        .replace(/"showintval":\d+/g, '"showintval":0')
        .replace(/"showcycle":\d+/g, '"showcycle":604800')
        .replace(/"intval":\d+/g, '"intval":0')
        .replace(/"sday":"[^"]*"/g, '"sday":"2090-12-31 00:00:00"')
        .replace(/"eday":"[^"]*"/g, '"eday":"2090-12-31 23:59:59"')
        .replace(/"banner":/g, "ban0:");
      $done({ body });
    }
  } else {
    let obj = JSON.parse($response.body);
    if (url.includes("/api/dataplus/columns")) {
      // 首页-数据通
      const items = ["buttonColor", "buttonText", "buyUrl", "descText"];
      if (obj?.data?.length > 0) {
        for (let item of obj.data) {
          for (let i of items) {
            delete item[i];
          }
        }
      }
    } else if (url.includes("/articlev5/")) {
      // 文章底部-相关阅读
      if (obj?.data?.relatarticle?.length > 0) {
        obj.data.relatarticle = [];
      }
    } else if (url.includes("/caixinapp/appinfo")) {
      // 文章详情页
      if (obj?.data?.articlePromotionList?.length > 0) {
        // 文章底部推广图
        obj.data.articlePromotionList = [];
      }
    } else if (url.includes("/channelv5/list")) {
      // 首页-顶部分类列表
      delete obj.data.ios_ad_513;
      delete obj.data.android_ad_513;
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
    } else if (url.includes("/index_page_v5")) {
      // 首页-信息流
      delete obj.data.ios_ad_513;
      delete obj.data.android_ad_513;
      if (obj?.data?.list?.length > 0) {
        obj.data.list = obj.data.list.filter((i) => !["金融我闻", "财新数据通"]?.includes(i?.channel_name));
      }
    } else if (url.includes("/search/getkeyword")) {
      // 搜索框填充词
      if (obj?.data?.keys?.length > 0) {
        obj.data.keys = [];
      }
    }
    $done({ body: JSON.stringify(obj) });
  }
}
