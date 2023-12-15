// 2023-12-14 08:00

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes(".spotify.com/")) {
  let myUrl = url.replace(/platform=iphone/g, "platform=ipad");
  $done({ url: myUrl });
} else {
  $done({});
}
