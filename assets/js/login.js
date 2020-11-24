$(function() {
    //1.点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    });

    //2.为layui添加登录校验规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格~'
        ],
        //形参pwd2是确认密码框中的密码
        repwd: function (pwd2) {
            //1.获取密码框密码
            let pwd1 = $('.reg-box [name=password]').val();
            //2.比较两个密码是否相同
            if (pwd1 != pwd2) return '两次密码好像不一样哦~亲~~~';
        }
    });
    //3.注册表单提交事件
    $("#regForm").on('submit', submitData);
    //4.注册表单提交事件（登录）
    $('#formLogin').on('submit', function (e) {
        e.preventDefault();
        //a.获取登录表单数据
        let dataStr = $(this).serialize();
        //b.异步提交到登录接口
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: dataStr,
            success(res) {
                //登录失败
                if (res.status !=0) return layui.layer.msg(res.message)
                //登陆成功
                layui.layer.msg(res.message, {
                    icon: 6,
                    time: 1500//1.5秒关闭 （如果不配置，默认是3秒）
                }), function () {
                    //a.保存 token 值到localstorage
                    localStorage.setItem('token', res.token);
                    //b.跳转到index.html
                    location.href = '/index.html'
                }
            }
        })
    })
})
//根路径
let baseUrl = 'http://ajax.frontend.itheima.net';
//1.注册函数
function submitData(e) {
    e.preventDefault();//阻断表单默认提交
    //a.获取表单数据
    let dataStr = $(this).serialize();
    //b.发送异步请求
    $.ajax({
        url: baseUrl + '/api/reguser',
        method: 'post',
        data: dataStr,
        success(res) {
            //不论成功与否，都显示信息
            layui.layer.msg(res.message);
            //注册出错
            if (res.status != 0) return;
            //注册成功
            //清空注册表单
            $('#regForm')[0].reset();
            //将用户名密码自动填充到登录表单中
            let uname = $('.reg-box [name=username]').val().trim();
            $('.login-box [name=username] ').val(uname);
            let upwd = $('.reg-box [name=password] ').val().trim();
            $('.login-box [name=password] ').val(upwd);
            //切换到登录div
            $('#link_login').click();
        }
    });
}
