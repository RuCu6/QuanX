// 2023-11-22 17:45

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/app_index/get_app_tab")) {
  // 底部tab
  if (obj?.data?.selected_list?.length > 0) {
    obj.data.selected_list = obj.data.selected_list.filter((i) => !["购物", "商城"]?.includes(i?.name));
  }
} else if (url.includes("/bafconfigcenter_intf/config/get")) {
  // 整体配置
  const items = [
    "pregnancy__find_group_guide_image_url", // 加入的圈子
    "pregnancy__home_left_icon", // 直播图标
    "pregnancy__home_left_icon_new", // 直播图标
    "pregnancy__home_left_icon_static", // 直播图标
    "pregnancy__video_white_list" // 宝宝视频
  ];
  if (obj?.data) {
    for (let i of items) {
      if (obj?.data?.[i]) {
        obj.data[i] = "";
      }
    }
  }
} else if (url.includes("/cms_column/get_column_list")) {
  // 首页顶部tab
  if (obj?.data?.list?.length > 0) {
    let newLists = [];
    for (let item of obj.data.list) {
      if (item?.data_source_list?.length > 0) {
        let newDatas = [];
        for (let i of item.data_source_list) {
          if (i?.tab_name?.includes("精品秒杀")) {
            continue;
          } else {
            newDatas.push(i);
          }
        }
        item.data_source_list = newDatas;
      }
      newLists.push(item);
    }
    obj.data.list = newLists;
  }
} else if (url.includes("/user/get_user_info")) {
  // 我的页面
  if (obj?.data?.video_show) {
    // 顶部婴儿视频
    delete obj.data.video_show;
  }
}

$done({ body: JSON.stringify(obj) });
