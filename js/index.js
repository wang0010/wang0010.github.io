window.onload = function () {
    /*1.为什么不用jquery  (1.X兼容性好IE678 93K )  zepto.js */
    /*2.完成京东这个例子 h5 api */
    
    /*完成的功能*/
    /*搜索*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
}
var search = function () {
    /*
    * 1.默认透明颜色
    * 2.当卷曲页面的长度不超过 轮播图的时候   颜色逐渐的加深
    * 3.当卷曲页面的长度超过 轮播图的时候   颜色不变
    * */

    /*获取dom元素*/
    var search = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;

    /*监听页面滚动*/
    window.onscroll = function () {
        /*console.log(document.body.scrollTop);*/
        /*console.log(document.documentElement.scrollTop); ie*/
        var scrollTop = document.body.scrollTop;
        /*计算透明度*/
        var opacity = 0;
        if(scrollTop > height){
            opacity = 0.85;
        }else{
            opacity = scrollTop/height * 0.85;
        }
        /*不断去改变样式*/
        search.style.background = 'rgba(201, 21, 35, '+opacity+')';
    }


}
var banner = function () {
    /*
    * 1.自动无缝轮播（滑动无缝）  定时器  过渡
    * 2.点需要对应改变当前样式    classList
    * 3.滑动功能                 随着手指做定位（transform:translate）
    * 4.吸附（滑动的距离不够的时候吸附回去） 过渡
    * 5.切换（滑动的距离足够的时候上一张或者下一张） 过渡
    * */

    /*获取需要操作的dom元素*/
    /*大容器*/
    var banner = document.querySelector('.jd_banner');
    /*屏幕宽度*/
    var width = banner.offsetWidth;
    /*图片盒子  滑动的盒子*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有点*/
    var points = pointBox.querySelectorAll('li');

    var addTransition = function () {
        /*加过渡*//*css  -webkit-  js webkit属性*/
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        /*去过渡*/
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        /*做定位*/
        imageBox.style.transform = 'translateX('+translateX+'px)';
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
    }


    /*1.自动无缝轮播（滑动无缝）  定时器  过渡*/
    /*核心点  索引*/
    var index = 1;
    var timer = setInterval(function () {
        index ++;
        /*加过渡*//*css  -webkit-  js webkit属性*/
        addTransition();
        /*做定位*/
        setTranslateX(-index*width);

        /*假设这个时候判断  过渡没有完成 不行的*/
    },3000);

    /*transitionend:过渡结束事件*/
    imageBox.addEventListener('transitionend',function () {
        /*等每一次过渡完成 去判断当前是不是索引9 最后一张  瞬间定位  索引1的图片*/
        if(index >= 9){
            /*无缝的滚动*/
            index = 1;
            /*去过渡*/
            removeTransition();
            /*做定位*/
            setTranslateX(-index*width);
        }else if(index <= 0){
            /*无缝的滑动*/
            index = 8;
            /*去过渡*/
            removeTransition();
            /*做定位*/
            setTranslateX(-index*width);
        }

        /*等过渡执行完成  改变点的样式  问题：当前索引的范围？*/
        /*index 1-8  点索引 0 - 7 */
        setPoint();
    });

    /*2.点需要对应改变当前样式    classList*/
    var setPoint = function () {
        /*index范围 1-8 */
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        points[index-1].classList.add('now');
    }


    /*3.滑动功能  随着手指做定位（transform:translate）*/

    var startX = 0;
    var distance = 0;
    /*为了更严谨的判断  默认是没有滑动的*/
    var isMove = false;

    imageBox.addEventListener('touchstart',function (e) {
        /*清除定时器*/
        clearInterval(timer);
        /*获取刚刚触发到屏幕的点坐标*/
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function (e) {
        /*获取滑动的时候触摸点坐标*/
        var moveX = e.touches[0].clientX;
        /*计算改变的距离  有正负*/
        distance = moveX - startX;
        /*根据距离去改变图片盒子的定位  达到滑动效果*/
        /*计算当前图片盒子需要的定位  参照之前的定位*/
        var translateX = -index*width + distance;
        /*不需要过渡*/
        removeTransition();
        /*定位*/
        setTranslateX(translateX);

        isMove = true;
    });
    imageBox.addEventListener('touchend',function (e) {
        /*滑动结束*/
        /*
        * 假设  1/3
        * 4.吸附（滑动的距离不够的时候吸附回去） 过渡
        * 5.切换（滑动的距离足够的时候上一张或者下一张） 过渡
        * */
        if(isMove){
            if(Math.abs(distance) < 1/3*width){
                addTransition();
                setTranslateX(-index*width);
            }else{
                /*上一张*/
                if(distance > 0){
                    index --;
                }
                /*下一张*/
                else{
                    index ++;
                }
                addTransition();
                setTranslateX(-index*width);
            }
        }

        /*1.避免变量的复用  重置参数*/
        startX = 0;
        distance = 0;
        isMove =false;
        /*2.加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index ++;
            /*加过渡*//*css  -webkit-  js webkit属性*/
            addTransition();
            /*做定位*/
            setTranslateX(-index*width);
            /*假设这个时候判断  过渡没有完成 不行的*/
        },3000);
    });



}
var downTime = function () {
    /*
    * 1. 需要倒计时的时间   假设  11 小时
    * 2. 每一秒显示时间  格式化
    * */

    var spans = document.querySelectorAll('.sk_time span');

    var time = 11*60*60;
    var timer = setInterval(function () {
        time -- ;

        /*格式化*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;
        /*显示*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    },1000);

}