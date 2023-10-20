// 2023-10-21 07:25

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

// 强制设置的皮肤
if (url.includes("/x/resource/show/skin")) {
  if (obj.data?.common_equip) {
    delete obj.data.common_equip;
  }
} else if (url.includes("/x/resource/show/tab/v2")) {
  // 标签页
  if (obj.data?.tab) {
    obj.data.tab = obj.data.tab.filter(
      (item) =>
        item.name === "推荐" ||
        item.name === "热门" ||
        item.name === "动画" ||
        item.name === "影视"
    );
    fixPos(obj.data.tab);
  }
  if (obj.data?.top) {
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
  if (obj.data?.bottom) {
    obj.data.bottom = obj.data.bottom.filter(
      (item) =>
        item.name === "首页" ||
        item.name === "动态" ||
        item.name === "我的"
    );
    fixPos(obj.data.bottom);
  }
} else if (url.includes("/x/resource/top/activity")) {
  // 右上角活动入口
  obj = {
    code: -404,
    message: "啥都木有",
    ttl: 1,
    data: null
  };
} else if (url.includes("/x/v2/account/mine?")) {
  // 我的页面
  // 标准版：
  // 396离线缓存 397历史记录 398我的收藏 399稍后再看 171个性装扮 172我的钱包 407联系客服 410设置
  // 港澳台：
  // 534离线缓存 8历史记录 4我的收藏 428稍后再看
  // 352离线缓存 1历史记录 405我的收藏 402个性装扮 404我的钱包 544创作中心
  // 概念版：
  // 425离线缓存 426历史记录 427我的收藏 428稍后再看 171创作中心 430我的钱包 431联系客服 432设置
  // 国际版：
  // 494离线缓存 495历史记录 496我的收藏 497稍后再看 741我的钱包 742稿件管理 500联系客服 501设置
  // 622为会员购中心 425开始为概念版id
  const itemList = new Set([
    396, 397, 398, 399, 407, 410, 494, 495, 496, 497, 500, 501
  ]);
  if (obj.data?.sections_v2) {
    obj.data.sections_v2.forEach((element, index) => {
      let items = element.items.filter((e) => itemList.has(e.id));
      obj.data.sections_v2[index].button = {};
      obj.data.sections_v2[index].tip_icon = "";
      obj.data.sections_v2[index].be_up_title = "";
      obj.data.sections_v2[index].tip_title = "";
      if (
        obj.data.sections_v2[index].title === "推荐服务" ||
        obj.data.sections_v2[index].title === "更多服务" ||
        obj.data.sections_v2[index].title === "创作中心"
      ) {
        obj.data.sections_v2[index].title = "";
        obj.data.sections_v2[index].type = "";
      }
      obj.data.sections_v2[index].items = items;
      obj.data.vip_section_v2 = "";
      obj.data.vip_section = "";
      if (obj.data?.live_tip) {
        obj.data.live_tip = "";
      }
      if (obj.data?.answer) {
        obj.data.answer = "";
      }
      // 开启本地会员标识
      if (obj.data?.vip) {
        if (obj.data.vip.status === 1) {
          return false;
        } else {
          obj.data.vip_type = 2;
          obj.data.vip.type = 2;
          obj.data.vip.status = 1;
          obj.data.vip.vip_pay_type = 1;
          obj.data.vip.due_date = 2208960000; // Unix 时间戳 2040-01-01 00:00:00
          obj.data.vip.role = 3;
        }
      }
    });
  }
} else if (url.includes("/x/v2/account/mine/ipad")) {
  if (obj.data?.ipad_upper_sections) {
    // 投稿 创作首页 稿件管理 有奖活动
    delete obj.data.ipad_upper_sections;
  }
  if (obj.data?.ipad_recommend_sections) {
    // 789我的关注 790我的消息 791我的钱包 792直播中心 793大会员 794我的课程 2542我的游戏
    const itemList = [789, 790];
    obj.data.ipad_recommend_sections = obj.data.ipad_recommend_sections.filter(
      (i) => itemList.includes(i.id)
    );
  }
  if (obj.data?.ipad_more_sections) {
    // 797我的客服 798设置 1070青少年守护
    const itemList = [797, 798];
    obj.data.ipad_more_sections = obj.data.ipad_more_sections.filter((i) =>
      itemList.includes(i.id)
    );
  }
} else if (url.includes("/x/v2/account/myinfo")) {
  // 会员清晰度
  if (obj.data?.vip) {
    if (obj.data.vip.status === 1) {
      $done({});
    } else {
      obj.data.vip.type = 2;
      obj.data.vip.status = 1;
      obj.data.vip.vip_pay_type = 1;
      obj.data.vip.due_date = 2208960000; // Unix 时间戳 2040-01-01 00:00:00
      obj.data.vip.role = 3;
    }
  }
} else if (url.includes("/x/v2/feed/index?")) {
  // 推荐广告
  if (obj.data?.items) {
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
          [
            "ad_av",
            "ad_inline_3d",
            "ad_inline_eggs",
            "ad_player",
            "ad_web_gif",
            "ad_web_s"
          ].includes(cardGoto)
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
  if (obj.data?.items) {
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
  if (obj.data) {
    obj.data = {
      type: "history",
      title: "搜索历史",
      search_hotword_revision: 2
    };
  }
} else if (url.includes("/x/v2/splash")) {
  // 开屏广告
  const item = ["account", "event_list", "preload", "show"];
  if (obj.data) {
    item.forEach((i) => {
      delete obj.data[i];
    });
    if (obj.data?.max_time) {
      obj.data.max_time = 0;
    }
    if (obj.data?.min_interval) {
      obj.data.min_interval = 31536000;
    }
    if (obj.data?.pull_interval) {
      obj.data.pull_interval = 31536000;
    }
    if (obj.data?.list) {
      for (let i of obj.data.list) {
        i.duration = 0;
        i.enable_pre_download = false;
        i.end_time = 2209046399; // Unix 时间戳 2040-01-01 23:59:59
        i.begin_time = 2208960000; // Unix 时间戳 2040-01-01 00:00:00
      }
    }
  }
} else if (
  url.includes("/pgc/page/bangumi") ||
  url.includes("/pgc/page/cinema/tab")
) {
  // 观影页广告
  if (obj.result?.modules) {
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
  if (obj.data?.activity_banner_info) {
    obj.data.activity_banner_info = null;
  }
  if (obj.data?.shopping_info) {
    obj.data.shopping_info = {
      is_show: 0
    };
  }
  if (obj.data?.new_tab_info?.outer_list?.length > 0) {
    obj.data.new_tab_info.outer_list = obj.data.new_tab_info.outer_list.filter(
      (i) => i.biz_id !== 33
    );
  }
}

$done({ body: JSON.stringify(obj) });

// 修复pos
function fixPos(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].pos = i + 1;
  }
}
