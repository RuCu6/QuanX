// 2024-02-16 18:00

const url = $request.url;
const header = $request.headers;
const opt12306 = header["Operation-Type"] || header["operation-type"];
const ua = header["User-Agent"] || header["user-agent"];
const isQuanX = typeof $task !== "undefined";

if (url.includes("/amdc/mobileDispatch")) {
  if (
    ua.includes("AMapiPhone") || // 高德地图
    ua.includes("Alibaba") || // 阿里巴巴
    ua.includes("Cainiao4iPhone") || // 菜鸟
    ua.includes("%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C") // 飞猪旅行
  ) {
    if (isQuanX) {
      $done({ status: "HTTP/1.1 404 Not Found" });
    } else {
      $done();
    }
  } else {
    $done({});
  }
} else if (url.includes("/mobile.12306.cn/otsmobile/")) {
  const list12306 = [
    // "com.cars.otsmobile.bangbangSafe.deciveInfo", // 设备序列号
    // "com.cars.otsmobile.checkLoginStatus", // 登录信息
    "com.cars.otsmobile.city",
    "com.cars.otsmobile.initCountry",
    "com.cars.otsmobile.initNewSysCache",
    "com.cars.otsmobile.initProvince",
    "com.cars.otsmobile.integration.activityBanner", // 活动横幅
    "com.cars.otsmobile.memberInfo.getMemberQa", // 铁路会员 常见问题
    // "com.cars.otsmobile.memberInfo.integrationHomeInit", // 铁路会员 会员信息
    // "com.cars.otsmobile.newHomePage.getWeatherByStationCode", // 天气信息
    "com.cars.otsmobile.newHomePage.initData",
    "com.cars.otsmobile.newHomePageBussData",
    "com.cars.otsmobile.newHomePageRefresh"
  ];
  if (isQuanX) {
    if (list12306?.includes(opt12306)) {
      $done({ status: "HTTP/1.1 404 Not Found" });
    } else {
      $done({});
    }
  } else {
    if (list12306?.includes(opt12306)) {
      $done();
    } else {
      $done({});
    }
  }
} else {
  $done({});
}
