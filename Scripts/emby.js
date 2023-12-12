// 2023-12-12 18:00

const url = $request.url;
const isQuanX = typeof $task != "undefined";
const myBoby = '{"cacheExpirationDays":999,"resultCode":"GOOD","message":"Device Valid"}';

if (url.includes("/registration/validateDevice")) {
  if (isQuanX) {
    if ($response.status !== "HTTP/1.1 200 OK") {
      $done({
        status: "HTTP/1.1 200 OK",
        headers: $response.headers,
        body: myBoby
      });
    } else {
      $done({});
    }
  } else {
    if ($response.status !== 200) {
      $done({
        status: 200,
        headers: $response.headers,
        body: myBoby
      });
    } else {
      $done({});
    }
  }
} else {
  $done({});
}
