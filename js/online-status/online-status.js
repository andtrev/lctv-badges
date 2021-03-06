/* LCTV online status badge - initial custom prototype

  to use this badge on your website:

  1. add this A and IMG tag to your HTML
       <a id="MY_LCTV_CHANNEL_NAME" class="lctv-badge-a">
         <img id="lctv-online-status" class="lctv-badge-img" width="100" height="24" />
       </a>
  2. include this SCRIPT tag
       <script type="text/javascript" src="https://bill-auger.github.io/lctv-badges/js/online-status/online-status.js"></script>
*/
console.log("online-status.js:IN") ;


var BADGE_IMG_ID     = 'lctv-online-status' ;
var LCTV_URL         = "https://www.livecoding.tv/" ;
var LCTV_API_URL     = "https://www.livecoding.tv/livestreams/" ;
var XHR_STATUS_READY = 4 ;

var BadgeImg    = document.getElementById(BADGE_IMG_ID) ;
var BadgeA      = BadgeImg.parentNode ;
var ChannelName = BadgeA.id ;
BadgeA.href     = LCTV_URL + ChannelName ;


function getStatus()
{
console.log("online-status.js:getStatus() ChannelName=" + ChannelName) ;
// var stats_url = LCTV_API_URL + ChannelName + "/stats.json" ;
// e.g. {"views_live": 4, "item_class": "livestream", "views_overall": 6958}

  var xhr        = new XMLHttpRequest() ;
  var status_url = LCTV_API_URL ;

  xhr.open("GET" , status_url , true) ;
  xhr.setRequestHeader("Content-type" , "application/json") ;
  xhr.onreadystatechange = function() { parseJSON(xhr) ; } ;
  xhr.send() ;
}

function parseJSON(xhr)
{
  if (xhr.readyState != XHR_STATUS_READY) return ;

  var is_online = !!(~xhr.responseText.indexOf("/video/livestream/" + ChannelName + "/thumbnail")) ;

console.log("online-status.js:parseJSON() is_online=" + is_online) ;

  createBadge(is_online) ;
}

function createBadge(is_online)
{
  var status_img_filename = (is_online) ? "lctv-online.png" : "lctv-offline.png" ;
  BadgeImg.src = "../img/" + status_img_filename ;

console.log("online-status.js:OUT") ;
}


window.onload = function() { getStatus() ; } ;
