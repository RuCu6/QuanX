// 2023-11-24 13:45

const url = $request.url;
const header = $request.headers;
const ua = header["User-Agent"] || header["user-agent"];
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (ua.includes("iPhone CHSP")) {
  // 云闪付
  if (url.includes("/app/inApp/sys/appShowGroup")) {
    // 云闪付首页
    if (obj?.params?.groups?.length > 0) {
      let newGroups = [];
      for (let group of obj.params.groups) {
        if (group?.webShortcuts?.length > 0) {
          let newShorts = [];
          for (let item of group.webShortcuts) {
            // 保留项目列表
            if (
              [
                "8021", // 首页顶栏-生活便利区
                "8022", // 快捷功能栏
                "8800", // 首页顶栏-搜索按钮
                "9003", // 首页信息流-本地专区
                "9302", // 我的页面-右上角功能区
                "9305", // 我的页面-功能项列表
                "9360", // 我的页面-功能项列表1-管家&账单
                "9361", // 我的页面-功能项列表2-奖励&积分
                "9362", // 我的页面-功能项列表3-商家服务
                "9363" // 我的页面-功能项列表4-我的客服
              ]?.includes(item?.listTp)
            ) {
              if (item?.shortAndApps?.length > 0) {
                let newApps = [];
                for (let i of item.shortAndApps) {
                  // 移除项目列表
                  if (
                    [
                      "10167", // 首页顶栏-理财信贷
                      "1055", // 首页顶栏-党费缴纳
                      "10829", // 首页信息流-权益精选
                      "20210824", // 快捷功能栏-关爱版
                      "20210902", // 我的页面-小程序
                      "2117", // 我的页面-积分
                      "23445", // 快捷功能栏-我的奖励
                      "23446", // 我的页面-合作共赢
                      "23451", // 我的页面-精选列表
                      "23451", // 我的页面-精选服务
                      "281988", // 首页顶栏-商城
                      "284486", // 我的页面-商家服务
                      "289722", // 快捷功能栏-小程序榜单
                      "289722", // 我的页面-小程序榜单
                      "62225", // 首页顶栏-充值中心
                      "62249", // 首页顶栏-借款
                      "62375", // 首页信息流-境外服务
                      "62666", // 首页信息流-云影票
                      "62851", // 我的页面-借款
                      "62914", // 我的页面-会员中心
                      "62988", // 首页顶栏-新人礼包
                      "758", // 首页顶栏-申请信用卡
                      "911", // 首页顶栏-银联无界卡
                      "9888", // 首页信息流-出行服务
                      "9994" // 首页顶栏-计划礼券
                    ]?.includes(i?.shortcut?.appId)
                  ) {
                    continue;
                  } else {
                    newApps.push(i);
                  }
                }
                item.shortAndApps = newApps;
              }
              newShorts.push(item);
            } else {
              continue;
            }
          }
          group.webShortcuts = newShorts;
        }
        newGroups.push(group);
      }
      obj.params.groups = newGroups;
    }
  }
}

$done({ body: JSON.stringify(obj) });
