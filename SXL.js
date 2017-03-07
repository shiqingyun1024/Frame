      /*仿jQ框架*/
  (function(w){
      var $$ = function(){};
      $$.prototype = {
          // 将一个对象的属性拷贝给另外一个对象
          extend:function(tar,source) {
              //遍历对象
              for(var i in source){
                  tar[i] = source[i];
              }
              return tar;
          }
      };
      var $$ = new $$();
      /*模块化*/

      /*基础*/
      $$.extend($$,{

      });

      /*数据类型判断*/
      $$.extend($$,{
          //数据类型检测
          // 数值型
          isNumber:function (val){
              return typeof val === 'number' && isFinite(val)
          },
          // 布尔型
          isBoolean:function (val) {
              return typeof val ==="boolean";
          },
          // 字符串型
          isString:function (val) {
              return typeof val === "string";
          },
          // 未定义型
          isUndefined:function (val) {
              return typeof val === "undefined";
          },
          // 对象型
          isObj:function (str){
              if(str === null || typeof str === 'undefined'){
                  return false;
              }
              return typeof str === 'object';
          },
          // 是否为空值
          isNull:function (val){
              return  val === null;
          },
          // 数组型
          isArray:function (arr) {
              if(arr === null || typeof arr === 'undefined'){
                  return false;
              }
              //constructor 属性返回对创建此对象的数组函数的引用
              return arr.constructor === Array;
          }
      });

      /*字符串操作*/
      $$.extend($$,{
          //去除左边空格
          ltrim:function(str){
              return str.replace(/(^\s*)/g,'');
          },
          //去除右边空格
          rtrim:function(str){
              return str.replace(/(\s*$)/g,'');
          },
          //去除空格
          trim:function(str){
              return str.replace(/(^\s*)|(\s*$)/g, '');
          },
          //简单的数据绑定formateString
          formateString:function(str, data){
              return str.replace(/@\((\w+)\)/g, function(match, key){
                  return typeof data[key] === "undefined" ? '' : data[key]});
          },
      });

      /*数字操作*/
      $$.extend($$,{
          //随机数
          random: function (begin, end) {
              return Math.floor(Math.random() * (end - begin)) + begin;
          },
      });

      /*数组操作*/
      $$.extend($$,{

      });

      /*日期操作*/
      $$.extend($$,{
          // 倒计时函数
          CountDown : function(endtime,demo){
              // 定义现在的时间
              var nowtime = new Date();
              // 用最终时间总微秒数减去现在的时间总微秒数，除以1000，得总秒数，然后得到剩余天数，小时，分钟，秒
              // 定义秒数
              var second = parseInt((endtime.getTime()-nowtime.getTime())/1000);
              //定义天数
              var d = parseInt(second/3600/24);
              //定义小时数
              var h = parseInt(second/3600%24);
              //定义分钟
              var m = parseInt(second/60%60);
              //定义秒数
              var s = parseInt(second%60);
              d<10 ? d="0"+d :d;
              h<10 ? h="0"+h :h;
              m<10 ? m="0"+m :m;
              s<10 ? s="0"+s :s;
              demo.innerHTML = "距离最后截止日还有"+d+"天"+h+"小时"+m+"分钟"+s+"秒";
          }
      });

      /*ajax框架*/
      $$.extend($$,{
          //ajax
          myAjax:function(URL,fn){
              var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
              xhr.open("get",URL,true);
              xhr.onreadystatechange = function(){
                  if(xhr.readyState === 4){
                      if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                          fn(xhr.responseText);
                      }else{
                          alert("错误的文件！");
                      }
                  }
              };
              xhr.send();
              //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
              function createXHR() {
                  //本函数来自于《JavaScript高级程序设计 第3版》第21章
                  if (typeof XMLHttpRequest != "undefined") {
                      return new XMLHttpRequest();
                  } else if (typeof ActiveXObject != "undefined") {
                      if (typeof arguments.callee.activeXString != "string") {
                          var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                              "MSXML2.XMLHttp"
                          ],
                              i, len;
                          for (i = 0, len = versions.length; i < len; i++) {
                              try {
                                  new ActiveXObject(versions[i]);
                                  arguments.callee.activeXString = versions[i];
                                  break;
                              } catch (ex) {
                                  //skip
                              }
                          }
                      }
                      return new ActiveXObject(arguments.callee.activeXString);
                  } else {
                      throw new Error("No XHR object available.");
                  }
              }
          },
      });

      /*事件框架*/
      $$.extend($$,{
          // on 事件绑定
          on : function(id, type, fn){
              //var dom = document.getElementById(id);
              var dom = $$.isString(id)?document.getElementById(id):id;
              // 支持w3c版本--火狐，谷歌等大多浏览器
              // 如果你想检测对象是否支持某个属性，方法，可以通过这种方式
              if(dom.addEventListener){
                  dom.addEventListener(type, fn, false);
              }
              // 如果是IE 的话，考虑到兼容性
              else if(dom.attachEvent){
                  dom.attachEvent('on' + type, fn);
              }
          },
          // 解除绑定
          un : function(id, type, fn){
              var dom = $$.isString(id)?document.getElementById(id):id;
              if(dom.removeEventListener){
                  dom.removeEventListener(type, fn);
              }else if(dom.detachEvent){
                  dom.detachEvent(type, fn);
              }
          },
          // click 点击
          click : function(id, fn){},
          //事件基础
          getEvent:function(event){
              return event?event:window.event;
          },
          //获取目标
          GetTarget :function(event){
              var e = $$.getEvent(event);
              return e.target|| e.srcElement;
          },
          //阻止默认行为
          preventDefault:function(event){
              var event = $$.getEvent(event);
              if(event.preventDefault){
                  event.preventDefault();
              }else{
                  event.returnValue = false;
              }
          },
          //阻止冒泡
          stopPropagation:function(event){
              var event = $$.getEvent(event);
              if(event.stopPropagation){
                  event.stopPropagation();
              }else{
                  event.cancelBubble = true;
              }
          }
      });

      /*选择框架*/
      $$.extend($$,{
          // id 选择器
          $id : function(id){
              return document.getElementById(id);
          },
          // 标签选择器
          $tag : function(tag,context){
              if(typeof context == 'string'){
                  context = $$.$id(context);
              }
              if(context){
                  return context.getElementsByTagName(tag);
              }else{
                  return document.getElementsByTagName(tag);
              }
          },
          //class选择器
          $class : function(className,context){
              var elements;
              var dom;
              //如果传递过来的是字符串 ，则转化成元素对象
              if($$.isString(context)){
                  context = document.getElementById(context);
              }else{
                  context = document;
              }
              //如果兼容getElementsByClassName
              if(context.getElementsByClassName){
                  return context.getElementsByClassName(className);
              }else{
                  //如果浏览器不支持
                  dom = context.getElementsByTagName('*');
                  for(var i,len=dom.length;i<len;i++) {
                      if(dom[i].className && dom[i].className ==className ) {
                          elements.push(dom[i]);
                      }
                  }
              }
              return elements;
          },
          // 分组选择器
          $group : function(context){
              //总体思路： 个个击破
              //找到个个 ---放在数组里面 ---遍历--个个击破
              //三种情况 类选择器 id选择器 标签选择器
              //		  doms充当中间变量
              //        arr保存待处理的字符串集合
              var arr = [], doms = [], result = [];
              arr = $$.trim(context).split(',');
              for(var i = 0; i < arr.length; i++){
                  var item = $$.trim(arr[i]);
                  var first = item.charAt(0);
                  if(first === '.'){
                      doms = $$.$class(item.slice(1));
                      //每次循环将doms保存在reult中
                      //result.push(doms);//错误来源
                      //陷阱1解决
                      /*for(var j = 0; j < doms.length; j++){
                        result.push(doms[j]);
                        }*/
    // 封装了一个函数 可以代替上面的代码
pushArray(doms,result);
}else if(first === '#'){
    doms = [$$.$id(item.slice(1))];//陷阱2：之前我们定义的doms是数组，但是$id获取的不是数组，而是单个元素
    /* for(var j = 0; j < doms.length; j++){
     result.push(doms[j]);
     }*/
    // 封装了一个函数 可以代替上面的代码
    pushArray(doms,result);
}else{
    //console.log(item);
    doms = $$.$tag(item);
    //console.log(doms);
    pushArray(doms,result);
}
}
return result;

//封装重复的代码
function pushArray(doms,result){
    for(var j= 0, domlen = doms.length; j < domlen; j++){
        result.push(doms[j])
    }
}
},

//html5实现的选择器
$all : function(selector,context){
    context = context || document;
    return  context.querySelectorAll(selector);
},
});

      /*css样式框架*/
      $$.extend($$,{
          //设置元素的样式属性 css（'test'，'color','red'）；
          //该函数包含两个功能：
          // 1获取id为id元素的样式值 比如 高度 100 透明度0.5 宽度30，
          // 2如果value不为空则表示设置样式的值，比如高度100
          // 设置和获取样式
          css : function(context,key,value){
              var dom = $$.isString(context)?$$.$all(context):context;
              //如果传入的context是一个id值之类的已经定义好的，那么它就不是数组了，所以分为两种情况
              if(dom.length){// 数组的情况
                  if(value){// 有value 是设置
                      for(var i = dom.length - 1; i >= 0; i--){
                          // 这个地方不能加return，如果加了直接return就结束了
                          setStyle(dom[i],key,value);
                      }
                  }else{//  没有value 是获取
                      return getStyle(dom[0],key);
                  }
              }else{// 单个的情况
                  if(value){// 有value 是设置
                      return setStyle(dom,key,value);
                  }else{//  没有value 是获取
                      return getStyle(dom,key);
                  }
              }
              // 封装起来 设置样式
              function setStyle1(doms,key,value){
                  for(var i = 0; i < doms.length; i++){
                      // 点语法
                      //doms[i].style.color = 'yellow';
                      // 键值对 第二种在封装框架中经常用到
                      doms[i].style[key] = value;
                  };
              };
              // 封装一个单个的时候
              function setStyle(dom,key,value){
                  dom.style[key] = value;
              }
              //封装起来 获取样式
              function getStyle(doms,key){
                  // 考虑到iE兼容性
                  if(doms.currentStyle){
                      return doms.currentStyle[key];
                  }else{
                      return window.getComputedStyle(doms,null)[key];
                  }
              };
          },
          //    parseFloat() 函数可解析一个字符串，并返回一个浮点数。
          //    该函数指定字符串中的首个字符是否是数字。
          //    如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。
          //    cssNum用于显示css()方法中获取的数字，也就是获取不带单位的数字
          cssNum : function(context, key){
              return parseFloat($$.css(context, key));
          },
          // 隐藏样式
          hide : function(context){
              var doms = $$.$all(context);
              for(var i = 0, len = doms.length; i < len; i++){
                  $$.css(doms[i],'display','none');
              }
          },
          // 显示样式
          show : function(context){
              var doms = $$.$all(context);
              for(var i = 0, len = doms.length; i < len; i++){
                  $$.css(doms[i],'display','block');
              }
          },
          // 获取元素宽度
          Width : function (id){
              return $$.$id(id).clientWidth;
          },
          // 获取元素高度
          Height : function(id){
              return $$.$id(id).clientHeight;
          },
      });

      /*属性框架*/
      $$.extend($$,{
         // 设置或获取元素的属性
         attr : function(context,key,value){
             var doms = $$.$all(context);
             if(doms.length){// 数组 多个元素的情况下
                 if(value){// 如果有value 是设置属性
                     for(var i = 0, len = doms.length; i < len; i++){
                         doms[i].setAttribute(key,value);
                     }
                 }else{// 如果没有value 是获取属性
                     return doms[0].getAttribute(key);
                 }
             }else{ // 单个元素的情况下
                 if(value){// 如果有value 是设置属性
                     doms.setAttribute(key,value);
                 }else{// 如果没有value 是获取属性
                     return doms.getAttribute(key);
                 }
             }
         },

         // 动态添加class
         addClass : function(context,name){
             var doms = $$.$all(context);
             if(doms.length){ //数组 多个元素的情况下 如果获取的是集合
                 for(var i = 0, len = doms.length; i < len; i++){
                     addName(doms[i]);
                 }
             }else{// 单个元素的情况下 如果获取的不是集合
                 addName(doms);
             }
             function addName(dom){
                 dom.className = dom.className + ' ' + name;
             }
         },

         // 移除class
         removeClass : function(context,name){
             var doms = $$.$all(context);
             if(doms.length){ //数组 多个元素的情况下 如果获取的是集合
                 for(var i = 0, len = doms.length; i < len; i++){
                     removeName(doms[i]);
                 }
             }else{// 单个元素的情况下 如果获取的不是集合
                 removeName(doms);
             }
             function removeName(dom){
                 dom.className = dom.className.replace(name,'');
             };
         },
      });

      /*内容框架*/
      $$.extend($$,{
         // 设置或获取元素的内容
         html : function(context,value){
             var doms = $$.$all(context);
             if(value){
                 for(var i = 0, len = doms.length; i < len; i++){
                     doms[i].innerHTML = value;
                 }
             }else{
                 return doms[0].innerHTML;
             }
         },
      });

      w.$$ = $$;
  })(window);


















