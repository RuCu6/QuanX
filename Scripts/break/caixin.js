// 2023-11-19 19:20

var url = $request.url;
var header = $request.headers;
const appinfo =
  "75SU0e5TW70SSqRtJ%2FF6dN60qhTR%2FVmZTj9JQB4m3Uwq7sM2Mqb98MREjWVGnHiGpDH5Q80ed3A0v%2BbS1ACgVPD9%2Fcpk8JsH1A5FGW9OTWkBTJsvZzW68HAsTKWfL3xCqqc%2Fierlw7aDi17EzsfMqpuZ3tcdE4xkXghFWRE2yY4KLLqdg9BJkKYBwzrh0YlTvH5pyRFnEFUnRe2IHwB7HJK96Byf3x9xU2CPOgRbY92NvJQX%2B3WpH5cIkEHKXREqzreuT%2FJRZjCT9uqZkG%2BeREegUABGvIDZUSnOkabksWuTsBwHWwLuPwiHmIIBnpjJZPVpe52RmlmN4Ch9VTaaiUZ7LTX00MCh%2F0kauQuf7aOocojO%2FsYGnkDBH%2F%2B8e2LJcwGMCuwVgrz%2B12fstCUKawLvXZjYI6BVrtmPmy2nSTV7bkUfVhU6yBhhfzlpZkcidH09qEkTPnoETLbmfpjmF5bEWCbbGmphN0LLM7QfjhR2ORSDp9MciBlNH3WcqWM2";

if (url.includes("/caixinapp/appinfo")) {
  let obj = JSON.parse($response.body);
  if (obj?.data?.articlePromotionList?.length > 0) {
    // 文章底部推广图
    obj.data.articlePromotionList = [];
  }
  $done({ body: JSON.stringify(obj) });
} else if (url.includes("/channelv5/list")) {
  let obj = JSON.parse($response.body);
  delete obj.data.ios_ad_513;
  delete obj.data.android_ad_513;
  $done({ body: JSON.stringify(obj) });
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
} else if (url.includes("index_page_v5")) {
  let obj = JSON.parse($response.body);
  delete obj.data.ios_ad_513;
  delete obj.data.android_ad_513;
  for (let i = 0; i < obj.data.list.length; i++) {
    obj.data.list[i].ui_type = "2";
  }
  obj.data.list = obj.data.list.filter((i) => !(i.channel_name && i.channel_name.includes("数据通")));
  obj.data.list.sort((item1, item2) => (item1.time < item2.time ? 1 : -1));
  $done({ body: JSON.stringify(obj) });
} else if (url.includes("/validateAudioAuth") || url.includes("/groupImageValidate")) {
  header.appinfo = appinfo;
  delete header["User-Agent"];
  delete header["Accept-Language"];
  delete header.Connection;
  delete header.Accept;
  delete header["Accept-Encoding"];
  delete header.Cookie;
  delete header.requestTime;
  delete header.authentication;
  $done({ headers: header });
} else if (url.includes("/validate?")) {
  // 会员数据
  url = url
    .replace(/uid=\d+/g, "uid=12983287")
    .replace(/code=\w+/g, "code=F6C7B45843D12A61572AE3927FE7AFA4")
    .replace(/device=\w+/g, "device=af491839f424cf75f07d7f4d6b7a30bde3296ea2")
    .replace(/deviceType=\d+/g, "deviceType=1")
    .replace(/&_t=\d+/g, "");
  delete header["User-Agent"];
  delete header["Accept-Language"];
  delete header.Connection;
  delete header.Accept;
  delete header["Accept-Encoding"];
  delete header.Referer;
  delete header.Cookie;
  $done({ url: url, headers: header });
} else {
  $done({});
}
