// 引用地址 https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/contentFarm/surge_contentFarm_qx.js

let rHead = "<head>";
let newStyle =
  '<head><link rel="stylesheet" href="https://gitlab.com/RuCu6/QuanX/-/raw/main/Css/contentFarm.css">';
let rBody = "</body>";
let newJavaScript =
  '<script src="https://gitlab.com/RuCu6/QuanX/-/raw/main/Scripts/limbo/contentFarm.js"></script></body>';
let body = $response.body.replace(rHead, newStyle).replace(rBody, newJavaScript);
$done({ body });
