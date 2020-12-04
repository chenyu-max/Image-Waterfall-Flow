// ajax: async javascript and xml (json) "{}"
//        异步的JavaScript 和 xml（json）
//        同步：一行一行  （按顺序执行）
//        异步：同时进行的
//        用途： 数据交互


// 用 问问题来举例  类比  网络请求
// 问问题：
// 问的问题内容：   --->    请求参数
// 问的是谁：       --->    接口
// 通过什么方式去问  --->    请求方式
// 说话的方式       --->    请求头
// 收到数据做什么处理 --->   作为一个成功的回调函数


/**
*  @params {Object} options
            method  请求方式
            url     请求地址
            isAsync 是否异步
            data        请求参数（发送的数据）
            success   拿到数据之后的回调函数
*/

function AJAX(options) {
    var method = options.method.toUpperCase();
    var url = options.url;
    var isAsync = options.isAsync;
    var data = options.data;
    var dataStr = '';
    var success = options.success || function() {};
    var xhr = null;


    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
        // 兼容性写法，兼容IE6 以下， 括号内的参数 是 固定参数
    } else {
        return alert('当前浏览器不支持XMLHTTPRequest');
    }

    // 判断传递过来的数据是否是对象类型的  如果是对象类型的转换成字符串  key=value&key1=value1
    if (typeof data === 'object') {
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                dataStr += prop + '=' + data[prop] + '&';
            }
        }
    } else {
        dataStr = data.toString();
    }

    // 监听readyState属性的变化   readyState属性是用来记录当前数据交互的过程状态的
    // readyState的值 0 - 4   
    // 0 代表还没有进行数据交互  
    // 1 代表还没有建立连接     (open方法还没有执行) 
    // 2 代表连接已经建立了     (open方法已经执行)
    // 3 代表数据传递完成       (send方法执行完成)
    // 4 代表对方已经给了响应 

    xhr.onreadystatechange = function() {
        // console.log(xhr.readyState)
        if (xhr.readyState === 4) {
            // xhr.status
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText))
            }
        }
    }

    // 将请求方式全部转换成大写
    var method = options.method.toUpperCase();
    // 判断请求方式为get类型   GET类型的特点：数据拼接在地址当中
    if (method === 'GET') {
        // 建立连接
        xhr.open(method, url + '?' + dataStr, isAsync);
        // 发送数据
        xhr.send();
    } else {
        // 请求方式为非get请求的   那么需要单独传递请求参数（数据） 就需要告诉对方你的数据编码方式（通过请求头设置） 
        xhr.open(method, url, isAsync);
        // key=value&key1=value1&key2=value2.....   ContentType 代表的是编码方式  
        //     "{key: value, key1: value1}"         application/json
        //     传入两个参数  第一个 是 请求头要的名字   
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(dataStr);
    }

}