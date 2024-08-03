// 2024-08-03 08:30

const url = $request.url;
if (!$response) $done({});
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (
  url.includes("/adserviceretry.kglink.cn/v2/mobile_window?") ||
  url.includes("/adserviceretry.kglink.cn/v4/mobile_window?")
) {
  // 签到弹窗 看广告领会员弹窗
  if (obj?.data?.ads?.length > 0) {
    for (let item of obj.data.ads) {
      item.BannerUrl = "";
      item.start_time = 3818332800; // Unix 时间戳 2090-12-31 00:00:00
      item.end_time = 3818419199; // Unix 时间戳 2090-12-31 23:59:59
    }
  }
} else if (
  url.includes("/adserviceretry.kglink.cn/v4/mobile_splash?") ||
  url.includes("/adserviceretry.kglink.cn/v4/mobile_splash_sort?")
) {
  // 开屏广告
  if (obj?.data?.ads?.length > 0) {
    // 开屏广告-请求1
    for (let item of obj.data.ads) {
      item.duration = 0;
      item.image = "";
      item.miit_button_extra_info = {};
      item.miit_button_text = "";
      item.show_times = 0;
      item.start_time = "2090-12-31 00:00:00";
      item.end_time = "2090-12-31 23:59:59";
    }
  }
  if (obj?.data?.boot_ads?.length > 0) {
    // 开屏广告-请求2
    for (let item of obj.data.boot_ads) {
      item.duration = 0;
      item.image = "";
      item.miit_button_extra_info = {};
      item.miit_button_text = "";
      item.show_times = 0;
      item.start_time = "2090-12-31 00:00:00";
      item.end_time = "2090-12-31 23:59:59";
    }
  }
  if (obj?.data?.config) {
    // 开屏广告拉取配置
    obj.data.config = {};
  }
} else if (url.includes("/gateway.kugou.com/adp/ad/v1/mine_top_banner?")) {
  // 我的页面顶部横图
  if (obj?.data?.ads?.length > 0) {
    for (let item of obj.data.ads) {
      item.image = "";
      item.start_time = 3818332800; // Unix 时间戳 2090-12-31 00:00:00
      item.end_time = 3818419199; // Unix 时间戳 2090-12-31 23:59:59
    }
  }
}

$done({ body: JSON.stringify(obj) });
