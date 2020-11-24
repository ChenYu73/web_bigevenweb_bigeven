//1.为了页面上所有基于jq的Aja请求发送之前，对参数对象做处理
$.ajaxPrefilter(function (ajaxOpt) {
    //
    ajaxOpt.url = 'http://ajax.frontend.itheimnet' + ajaxOpt.url;
});