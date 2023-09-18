function current() {
  var d = new Date(),
    ear = d.getFullYear();
  onth = d.getMonth();
  atex = d.getDate();
  if (d.getHours() < 10) {
    ours = "0" + d.getHours();
  } else {
    ours = d.getHours();
  }
  inutes = d.getMinutes();
  return ear + "-" + onth + "-" + atex + "%2" + ours + "%3A" + inutes + "%3A" + "01";
}
let strx = "CFWztgFirstShowTime_2899_Cookie = ";
let timex = current();
let total = strx + timex;
document.cookie = total;
var rTitle = document.title;
var rKeyword = "Attention";
var rKeyword2 = "Cloudflare";
var rValues = rTitle.search(rKeyword);
var rValues2 = rTitle.search(rKeyword2);
var rFalse = "0";
if (rValues >= rFalse || rValues2 >= rFalse) {
  window.location.reload();
}
