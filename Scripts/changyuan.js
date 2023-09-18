// 2023-07-27 20:25

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/common/getReceipt")) {
  if (obj.payload?.adInfo) {
    delete obj.payload.adInfo;
  }
} else if (url.includes("/user/message/equipmentPara")) {
  if (obj.payload?.payAfterAd) {
    obj.payload.payAfterAd = false;
  }
}

$done({ body: JSON.stringify(obj) });
