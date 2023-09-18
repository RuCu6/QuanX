// 引用地址 https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/surge_duboku.js

let Old = "</body>";
let New =
  '<link rel="stylesheet" href="https://gitlab.com/RuCu6/QuanX/-/raw/main/Css/duboku.css" type="text/css"><script type="text/javascript"  src="https://gitlab.com/RuCu6/QuanX/-/raw/main/Scripts/limbo/duboku.js"></script></body>';
let body = $response.body.replace(Old, New);
$done({ body });
