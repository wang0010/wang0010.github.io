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


    

    /*1.自动无缝轮播（滑动无缝）  定时器  过渡*/
    /*核心点  索引*/
    var index = 1;
    var timer = setInterval(function () {
        index ++;
        /*加过渡*//*css  -webkit-  js webkit属性*/
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
        /*做定位*/
        imageBox.style.transform = 'translateX('+(-index*width)+'px)';
        imageBox.style.webkitTransform = 'translateX('+(-index*width)+'px)';

        /*假设这个时候判断  过渡没有完成 不行的*/
    },1000);

    /*transitionend:过渡结束事件*/
    imageBox.addEventListener('transitionend',function () {
        /*等每一次过渡完成 去判断当前是不是索引9 最后一张  瞬间定位  索引1的图片*/
        if(index >= 9){
            index = 1;
            /*去过渡*/
            imageBox.style.transition = 'none';
            imageBox.style.webkitTransition = 'none';
            /*做定位*/
            imageBox.style.transform = 'translateX('+(-index*width)+'px)';
            imageBox.style.webkitTransform = 'translateX('+(-index*width)+'px)';
        }
    });



}
var downTime = function () {

}