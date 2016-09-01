/**
 * Created by sq on 2016/8/30.
 */
window.onload = function(){
    swipeLeft();
}

function swipeLeft(){
    /**
     * 1.让左侧分类菜单支持上下滑动 垂直滑动
     * 2.滑动有最大的一个滑动位置  最小滑动的位置
     * 3.ul允许的最大位置在Y轴移动的值 0 还有个ul允许最小Y轴移动的位置 cate-left - ul 高度
     * 4.如果超过那个最大移动值 或者小于 最小移动值 吸附回去
     * 5.点击某一个分类li的时候要让这个li滑动到顶端的位置
     * 6.点击的时候如果超过 最大移动值 或者小于 最小移动值 不让吸顶
     * */
    var categoryLeft = document.querySelector('.category-left');
    var swipeUl = document.querySelector('.category-left ul');
    var startY = 0;
    var endY = 0;
    var moveY = 0;
    //当前位置
    var currentY = 0;
    //距离
    var distanceY = 0;
    //最大位移距离
    var maxPoisition = 0;
    //最小位移距离
    var minPoisition = categoryLeft.offsetHeight - swipeUl.offsetHeight;
    //允许滑动最大距离
    var maxSwipe = maxPoisition + 150;
    //允许滑动最小距离
    var minSwipe = minPoisition - 150;

    swipeUl.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });

    swipeUl.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY-startY;
        removeTransition();
        //判断滑动的距离有没有超过最大允许滑动的位置 和 大于最小的滑动位置（合理的滑动）
        if((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe){
            addTransform(currentY + distanceY);
        }
    });

    swipeUl.addEventListener('touchend',function(e){
        currentY += distanceY;
        if(currentY > maxPoisition){
            currentY = 0;
            addTransition();
            addTransform(currentY);
        }else if(currentY < minPoisition){
            currentY = minPoisition;
            addTransition();
            addTransform(currentY);
        }
    });

    swipeUl.addEventListener('click',function(e){
        var li = e.target.parentNode;
        var ArrayLi = document.querySelectorAll('.category-left ul>li');
        for(var i = 0;i < ArrayLi.length;i++){
            ArrayLi[i].className = "";
            ArrayLi[i].index = i;
        }

        li.className = "active";

        var Liheight = li.offsetHeight;
        var disY = -Liheight*li.index;

        if(disY < minPoisition){
            currentY = minPoisition
            addTransition();
            addTransform(currentY);
        }else{
            currentY = disY;
            addTransition();
            addTransform(currentY);
        }
    });

    function addTransition(){
        swipeUl.style.transition = "all 0.4s";
    }

    function addTransform(y){
        swipeUl.style.transform = "translateY("+y+"px)";
    }

    function removeTransition(){
        swipeUl.style.transition = "none";
    }
}
