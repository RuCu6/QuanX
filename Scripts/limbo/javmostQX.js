// 引用地址 https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/surge_javmost.js

let regex_1 = "<title>";
let body_1 =
  '<link rel="stylesheet" href="https://gitlab.com/RuCu6/QuanX/-/raw/main/Css/javmost.css" type="text/css"><script type="text/javascript" async="async" src="https://gitlab.com/RuCu6/QuanX/-/raw/main/Scripts/limbo/javmost.js"></script><title>';
let body = $response.body.replace(regex_1, body_1);
$done({ body });
