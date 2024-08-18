// 2024-08-10 11:35

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/api/alexa/homepage/hub")) {
  // 底部标签栏
  if (obj?.result?.bottom_tabs?.length > 0) {
    // 标签栏1
    obj.result.bottom_tabs = obj.result.bottom_tabs.filter(
      (i) => !/(classification|pdd_live_tab_list|sjs_special_nine)/.test(i?.link)
    );
  }
  if (obj?.result?.buffer_bottom_tabs?.length > 0) {
    // 标签栏2
    obj.result.buffer_bottom_tabs = obj.result.buffer_bottom_tabs.filter(
      (i) => !/(classification|pdd_live_tab_list|sjs_special_nine)/.test(i?.link)
    );
  }
}

$done({ body: JSON.stringify(obj) });
