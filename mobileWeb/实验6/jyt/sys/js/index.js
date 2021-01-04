$(init)

function init() {
    jsonData(HEADER_TMPL, HEADER_DATA, cbRenderHeader, cbErr);
    jsonData(SLIDER_TMPL, SLIDER_DATA, cbRenderSlider, cbErr);
    jsonData(HOMEINFO_TMPL, HONEINFO_DATA, cbRenderHomeinfo, cbErr);
    jsonData(FOOTER_TMPL, HEADER_DATA, cbRenderFooter, cbErr);

    setInterval(doSlider, 3000);
}

function cbErr(ret) {
    console.log(ret);
}

function cbRenderSlider(ret, doc) {
    tmpl = $.templates(ret[0]);
    $(".intro").append(tmpl.render(doc[0]));

    $(".intro-item").children().eq(0).addClass('active');
    $(".m-list").children().eq(0).children().addClass('active');
}

function cbRenderHeader(ret, doc) {
    tmpl = $.templates(ret[0]);
    $("header").append(tmpl.render(doc[0]));
}

function cbRenderHomeinfo(ret, doc) {
    tmpl = $.templates(ret[0]);
    $(".home-infos").append(tmpl.render(doc[0]));
}

function cbRenderFooter(ret, doc) {
    tmpl = $.templates(ret[0]);
    $("footer").append(tmpl.render(doc[0]));
}

function doSlider() {
    index = parseInt($(".active").index());
    (index+1>3)?index=index%3:index++;

    $(".active").removeClass('active');
    $(".intro-item").children().eq(index).addClass('active');
    $(".m-list").children().eq(index).children().addClass('active');
}