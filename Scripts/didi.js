// 2023-08-08 08:55

/**
 * [rewrite_local]
 * # 滴滴车主
 * ^https:\/\/guard\.sec\.xiaojukeji\.com\/api\/driverGuard\/getShieldStatus\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/didi.js
 * ^https:\/\/gw\.am\.xiaojukeji\.com\/driverlife\/client\/driver\/homepage\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/didi.js
 * 
 * [mitm]
 * hostname = g*.xiaojukeji.com
 */

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/driverGuard/getShieldStatus")) {
  if (obj.data?.shieldInfo) {
    obj.data.shieldInfo = [];
  }
} else if (url.includes("/driverlife/client/driver/homepage")) {
  if (obj.data?.cardList?.length > 0) {
    obj.data.cardList = obj.data.cardList.filter(
      (i) => i?.componentId === "diamond-fixed"
    );
  }
}

$done({ body: JSON.stringify(obj) });
