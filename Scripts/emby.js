// 2023-12-14 09:00

const url = $request.url;
const isQuanX = typeof $task != "undefined";
const myStatus = isQuanX ? $response.statusCode : $response.status;
const myBoby = '{"cacheExpirationDays":999,"resultCode":"GOOD","message":"Device Valid"}';

if (url.includes("/registration/validateDevice")) {
  if (myStatus !== 200) {
    $done({
      status: "HTTP/1.1 200 OK",
      headers: $response.headers,
      body: myBoby
    });
  } else {
    $done({});
  }
} else {
  $done({});
}
