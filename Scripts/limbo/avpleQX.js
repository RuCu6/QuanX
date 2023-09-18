// 引用地址 https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/surge_avple.js

let rHead = "<head>";
let newStyle =
  '<head><link rel="stylesheet" href="https://gitlab.com/RuCu6/QuanX/-/raw/main/Css/avple.css" type="text/css">';
let rBody = "</body>";
let newJavaScript =
  '<script type="text/javascript" src="https://gitlab.com/RuCu6/QuanX/-/raw/main/Scripts/limbo/avple.js"></script></body>';
let body = $response.body.replace(rHead, newStyle).replace(rBody, newJavaScript);
$done({ body });
