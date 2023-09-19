// 2023-09-19 18:35

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/api/getsyscfg?")) {
  const switchs = [
    "active_sigin_text", // 签到文案
    "ai_search_h5", // ai搜索
    "album_story_config", // 首页视频故事卡片开关配置
    "bdnc_commerce_expire_alert_area", // 商业化到期提醒开关
    "bdnc_commerce_video_ad_area_pad", // 视频贴片广告跳转链接
    "business_ad_config_area", // 各种插入广告
    "certification_user_area", // 我的页面 网盘认证
    "enterprise_banner_area", // 企业运营位
    "enterprise_bottom_banner", // 企业版banner
    "enterprise_hot_tools_area", // 企业首页热门工具
    "enterprise_share_file_list", // 企业空间
    "enterprise_space_area", // 企业空间
    "enterprise_space_config_area", // 企业入口
    "enterprise_space_document_pay_guide", // 开通企业套餐尊享PDF工具
    "flutter_business_area", // Flutter配置
    "home_card_area", // 首页卡片
    "home_recnet_chasing_card_switch", // 首页最近在追tab开关
    "home_tool_area_all_tool_item_area", // 全部工具角标
    "ios_carplay_config_area", // 网盘iOS端CarPlay引导功能节点
    "local_push", // 本地Push
    "magictrick", // 神机-Sugs区显示灵感库开关配置
    "magictrick_inspiration_area", // 学霸神器 玩点有趣 社交情感
    "my_person_service", // 度小满
    "my_share_tag_area", // 企业权益
    "new_user_card", // 新人必看
    "ocr_ai_scan_entrance_area", // 拍一拍home页相机入口飘条
    "private_background_upload", // 后台传输
    "public_guide_config", // 引导飘条
    "public_home_config", // 首页运营
    "public_imprint_config", // 印迹频道节点配置
    "push_active_area", // push弹窗
    "share_Im_idol_area", // idol特权解锁展示
    "share_tool_area", // 共享页顶部图标
    "splash_advertise_fetch_config_area", // 开屏广告
    "splash_advertise_type_area", // 开屏广告
    "theme_skin_active_area", // 十周年皮肤配置节点
    "thrid_ad_buads_service", // 穿山甲SDK初始化开关
    "thrid_ad_funads_service", // 小熊SDK初始化开关
    "universal_card_area", // 各种卡片
    "upload_retrieve" // 自动上报配置
  ];
  for (let i of switchs) {
    if (obj?.[i]?.cfg_list?.length > 0) {
      for (let ii of obj[i].cfg_list) {
        if (ii?.switch) {
          ii.switch = "0";
        }
        if (ii?.open) {
          ii.open = "0";
        }
      }
    }
  }
} else if (url.includes("/membership/user?")) {
  obj = {
    product_infos: [
      {
        cur_svip_type: "Crack",
        product_name: "svip2_nd",
        product_description: "解锁倍速+画质",
        function_num: 510004015,
        start_time: 1672502400,
        buy_description: "无下载加速",
        buy_time: 980784000,
        product_id: "问好",
        auto_upgrade_to_svip: 0,
        end_time: 4070880000,
        cluster: "vip",
        detail_cluster: "svip",
        status: 0
      }
    ],
    level_info: {
      current_level: 10
    }
  };
}

$done({ body: JSON.stringify(obj) });
