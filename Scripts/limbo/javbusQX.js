// 引用地址 https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/surge_javbus.js

var Oldone = "<head>";
var Newone =
  '<head><link rel="stylesheet" href="https://gitlab.com/RuCu6/QuanX/-/raw/main/Css/javbus.css" type="text/css"><script type="text/javascript"  src="//limbopro.com/Adguard/javbus.js"></script>';
let body = $response.body.replace(Oldone, Newone);
$done({ body });
