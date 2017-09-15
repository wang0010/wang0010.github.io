window.onload = function () {
    /*左侧栏滑动  自己实现*/
    leftSwipe();
    /*右侧栏滑动  插件实现*/
    rightSwipe();
}
var leftSwipe = function () {
    /*
    * 1.允许在可滑动的区间内容滑动
    * 2.超出了定位区间  吸附
    * */

    /*获取dom*/
    var parentBox = document.querySelector('.jd_cateLeft');
    var childBox = parentBox.querySelector('ul');


    /*确定定位区间*/
    var maxPosition = 0;
    var minPosition = parentBox.offsetHeight - childBox.offsetHeight;
    /*确定滑动区间*/
    var distance = 100;
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

    /*公用函数*/
    var addTransition = function () {
        childBox.style.transition = 'all 0.2s';
        childBox.style.webkitTransition = 'all 0.2s';
    }
    var removeTransition = function () {
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    }
    var setTranslateY = function (translateY) {
        childBox.style.transform = 'translateY('+translateY+'px)';
        childBox.style.webkitTransform = 'translateY('+translateY+'px)';
    }

    /*关键点  当前定位*/
    var currentY = 0;

    /*滑动效果*/
    var startY = 0;
    var isMove = false;
    var distanceY = 0;
    childBox.addEventListener('touchstart',function (e) {
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function (e) {
        var moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        /*滑动*/
        /*计算将要去做定位的位置*/
        var translateY = currentY + distanceY;
        /*判断是不是在区间内*/
        if(translateY < maxSwipe && translateY > minSwipe){
            removeTransition();
            setTranslateY(translateY);
        }
        isMove = true;
    });
    childBox.addEventListener('touchend',function (e) {

        if(isMove){
            /*超过了最大  最大定位*/
            if((currentY + distanceY) > maxPosition){
                currentY = maxPosition;
                addTransition();
                setTranslateY(currentY);
            }
            /*超过了最小  最小定位*/
            else if((currentY + distanceY) < minPosition){
                currentY = minPosition;
                addTransition();
                setTranslateY(currentY);
            }else{
                /*记录当前定位 下一次滑动的时候需要使用*/
                currentY = currentY + distanceY;
            }
        }

        startY = 0;
        isMove = false;
        distanceY = 0;

    });
}
var rightSwipe = function () {
    /*使用iscroll插件区域滚动*/
    /*下载：https://github.com/cubiq/iscroll/*/
    /*初始化  确定：结构父容器套一个子容器  子容器要比父容器大*/
    new IScroll('.jd_cateRight',{
        scrollY:false,
        scrollX:true
    });
}