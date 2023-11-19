// 2023-11-19 11:45

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

// 强制设置的皮肤
if (url.includes("/x/resource/show/skin")) {
  if (obj?.data?.common_equip) {
    delete obj.data.common_equip;
  }
} else if (url.includes("/x/resource/show/tab/v2")) {
  // 标签页
  if (obj?.data?.tab) {
    obj.data.tab = obj.data.tab.filter(
      (item) => item.name === "推荐" || item.name === "热门" || item.name === "动画" || item.name === "影视"
    );
    fixPos(obj.data.tab);
  }
  if (obj?.data?.top) {
    obj.data.top = [
      {
        id: 176,
        icon: "http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png",
        tab_id: "消息Top",
        name: "消息",
        uri: "bilibili://link/im_home",
        pos: 1
      }
    ];
  }
  if (obj?.data?.bottom) {
    obj.data.bottom = obj.data.bottom.filter((item) => item.name === "首页" || item.name === "动态" || item.name === "我的");
    fixPos(obj.data.bottom);
  }
} else if (url.includes("/x/resource/top/activity")) {
  // 右上角活动入口
  obj = { code: -404, message: "啥都木有", ttl: 1, data: null };
} else if (url.includes("/x/v2/account/mine?")) {
  // 我的页面
  const del = ["rework_v1", "vip_section", "vip_section_v2"];
  for (let i of del) {
    // 不必要项目
    delete obj.data[i];
  }
  if (obj?.data?.sections_v2?.length > 0) {
    let newSects = [];
    for (let item of obj.data.sections_v2) {
      if (item?.button) {
        delete item.button;
      }
      if (item?.style) {
        if (item?.style === 1 || item?.style === 2) {
          if (item?.title) {
            if (item?.title === "创作中心" || item?.title === "推荐服务") {
              // 创作中心 推荐服务
              continue;
            } else if (item?.title === "更多服务") {
              delete item.title;
              if (item?.items?.length > 0) {
                let newItems = [];
                for (let i of item.items) {
                  if (/user_center\/feedback/?.test(i?.uri)) {
                    // 联系客服
                    newItems.push(i);
                  } else if (/user_center\/setting/?.test(i?.uri)) {
                    // 设置
                    newItems.push(i);
                  } else {
                    continue;
                  }
                }
                item.items = newItems;
              }
            }
          }
        } else {
          // 其他style
          continue;
        }
      }
      newSects.push(item);
    }
    obj.data.sections_v2 = newSects;
  }
  // 非会员开启本地会员标识
  if (obj?.data?.vip) {
    if (obj?.data?.vip?.status === 0) {
      obj.data.vip_type = 2;
      obj.data.vip.type = 2;
      obj.data.vip.status = 1;
      obj.data.vip.due_date = 3818419199; // Unix 时间戳 2090-12-31 23:59:59
      obj.data.vip.label = { "path": "", "text": "年度大会员", "label_theme": "annual_vip", "text_color": "#FFFFFF", "bg_style": 1, "bg_color": "#FB7299", "border_color": "", "image": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png" };
      obj.data.vip.nickname_color = "#FB7299";
      obj.data.vip.role = 3;
    }
  }
} else if (url.includes("/x/v2/account/mine/ipad")) {
  if (obj?.data?.ipad_upper_sections) {
    // 投稿 创作首页 稿件管理 有奖活动
    delete obj.data.ipad_upper_sections;
  }
  if (obj?.data?.ipad_recommend_sections?.length > 0) {
    // 789我的关注 790我的消息 791我的钱包 792直播中心 793大会员 794我的课程 2542我的游戏
    const itemList = [789, 790];
    obj.data.ipad_recommend_sections = obj.data.ipad_recommend_sections.filter((i) => itemList.includes(i.id));
  }
  if (obj?.data?.ipad_more_sections?.length > 0) {
    // 797我的客服 798设置 1070青少年守护
    const itemList = [797, 798];
    obj.data.ipad_more_sections = obj.data.ipad_more_sections.filter((i) => itemList.includes(i.id));
  }
} else if (url.includes("/x/v2/account/myinfo")) {
  // 非会员开启会员专属清晰度
  if (obj?.data?.vip) {
    if (obj?.data?.vip?.status === 0) {
      obj.data.vip.type = 2;
      obj.data.vip.status = 1;
      obj.data.vip.due_date = 3818419199; // Unix 时间戳 2090-12-31 23:59:59
      obj.data.vip.role = 3;
    }
  }
} else if (url.includes("/x/v2/feed/index?")) {
  // 推荐广告
  if (obj?.data?.items?.length > 0) {
    obj.data.items = obj.data.items.filter((i) => {
      const { card_type: cardType, card_goto: cardGoto } = i;
      if (cardType && cardGoto) {
        if (cardType.includes("banner") && cardGoto.includes("banner")) {
          // 去除判断条件 首页横版内容全部去掉
          // if (i.banner_item) {
          // for (const v of i.banner_item) {
          //   if (v.type) {
          //     if (v.type === "ad") return false;
          //   }
          // }
          // return false;
          // }
          return false;
        } else if (
          ["cm_v1", "cm_v2"].includes(cardType) &&
          ["ad_av", "ad_inline_3d", "ad_inline_eggs", "ad_player", "ad_web_gif", "ad_web_s"].includes(cardGoto)
        ) {
          return false;
        } else if (cardType === "small_cover_v9" && cardGoto === "live") {
          // 直播内容
          return false;
        } else if (cardType === "small_cover_v10" && cardGoto === "game") {
          // 游戏广告
          return false;
        } else if (cardType === "cm_double_v9" && cardGoto === "ad_inline_av") {
          // 创作推广 大视频广告
          return false;
        } else if (cardType === "ogv_small_cover" && cardGoto === "bangumi") {
          // 纪录片
          return false;
        } else if (cardType === "small_cover_v2" && cardGoto === "pgc") {
          // 纪录片
          return false;
        }
      }
      return true;
    });
  }
} else if (url.includes("/x/v2/feed/index/story")) {
  if (obj?.data?.items?.length > 0) {
    // vertical_live 直播内容
    // vertical_pgc 大会员专享
    obj.data.items = obj.data.items.filter(
      (i) =>
        !(
          i.hasOwnProperty("ad_info") ||
          i.hasOwnProperty("story_cart_icon") ||
          ["ad", "vertical_live", "vertical_pgc"].includes(i.card_goto)
        )
    );
  }
} else if (url.includes("/x/v2/search/square")) {
  // 热搜广告
  if (obj?.data) {
    obj.data = { type: "history", title: "搜索历史", search_hotword_revision: 2 };
  }
} else if (url.includes("/x/v2/splash")) {
  // 开屏广告
  if (obj?.data) {
    const item = ["account", "event_list", "preload", "show"];
    item.forEach((i) => {
      delete obj.data[i];
    });
    if (obj?.data?.max_time) {
      obj.data.max_time = 0;
    }
    if (obj?.data?.min_interval) {
      obj.data.min_interval = 31536000;
    }
    if (obj?.data?.pull_interval) {
      obj.data.pull_interval = 31536000;
    }
    if (obj?.data?.list?.length > 0) {
      for (let i of obj.data.list) {
        i.duration = 0;
        i.enable_pre_download = false;
        i.begin_time = 3818332800; // Unix 时间戳 2090-12-31 00:00:00
        i.end_time = 3818419199; // Unix 时间戳 2090-12-31 23:59:59
      }
    }
  }
} else if (url.includes("/pgc/page/bangumi") || url.includes("/pgc/page/cinema/tab")) {
  // 观影页广告
  if (obj.result?.modules?.length > 0) {
    obj.result.modules.forEach((i) => {
      if (i.style.startsWith("banner")) {
        i.items = i.items.filter((ii) => ii.link.includes("play"));
      } else if (i.style.startsWith("function")) {
        i.items = i.items.filter((ii) => ii.blink.startsWith("bilibili"));
      } else if ([241, 1283, 1284, 1441].includes(i.module_id)) {
        i.items = [];
      } else if (i.style.startsWith("tip")) {
        i.items = [];
      }
    });
  }
} else if (url.includes("/xlive/app-room/v1/index/getInfoByRoom")) {
  // 直播广告
  if (obj?.data?.activity_banner_info) {
    delete obj.data.activity_banner_info;
  }
  if (obj?.data?.shopping_info) {
    obj.data.shopping_info = { is_show: 0 };
  }
  if (obj?.data?.new_tab_info?.outer_list?.length > 0) {
    obj.data.new_tab_info.outer_list = obj.data.new_tab_info.outer_list.filter((i) => i.biz_id !== 33);
  }
}

$done({ body: JSON.stringify(obj) });

// 修复pos
function fixPos(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].pos = i + 1;
  }
}
