/*
2022-05-28
*/

var body = $response.body
  .replace(
    /<head>/,
    '<head><link rel="stylesheet" href="https://gitlab.com/RuCu6/QuanX/-/raw/main/Css/lezhu.css" type="text/css">'
  )
  .replace(/jquerys.js\?v/g, "ddgksf2013.js?v");
$done({ body });
