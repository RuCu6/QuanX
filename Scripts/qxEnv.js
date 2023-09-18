$request;
$response;
$task.fetch
$notify(title, subtitle, message);
console.log(message);

$request.scheme = [];
$request.method = [];
$request.url = [];
$request.path = [];
$request.headers = [];
$response.statusCode = [
  "HTTP/1.1 200 OK",
  "HTTP/1.1 204 No Content",
  "HTTP/1.1 301 Moved Permanently",
  "HTTP/1.1 302 Found",
  "HTTP/1.1 404 Not Found",
  "HTTP/1.1 408 Request Timeout"
];
$response.headers = [];

$done();
$done(body);
$done({ body: modifiedBody, path: modifiedPath, headers: modifiedHeaders, status: modifiedStatus });
