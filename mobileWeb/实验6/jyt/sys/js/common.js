var HEADER_TMPL = './tmpl/header.tmpl';
var HEADER_DATA = "./data/header.json";
var SLIDER_TMPL = "./tmpl/slider.tmpl";
var SLIDER_DATA = "./data/slider.json";
var HOMEINFO_TMPL = "./tmpl/homeinfo.tmpl";
var HONEINFO_DATA = "./data/homeinfo.json";
var FOOTER_TMPL = "./tmpl/footer.tmpl";
var FOOTER_DATA = "./data/footer.json";

function tmplData(method,url, data, cb) {
  var promise = $.ajax({
    type: method,
    url: url,
    contentType: "application/json",
    data:data
  });
  promise.done(cb);
}


function jsonData(urlTmpl, urlData, cb, err) {
  $.when($.ajax(urlTmpl), $.ajax(urlData)).done(cb).fail(err);
}


function promiseData(method, url, data, cb) {
  var promise = $.ajax({
    type: method,
    url: url,
    dataType: "json",
    contentType: "application/json",
    data:data
  });
  promise.done(cb);
}

