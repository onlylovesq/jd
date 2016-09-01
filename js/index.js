/**
 * Created by sq on 2016/8/29.
 */
window.onload = function(){
    search();
    downTime();
    slider();
}

//轮播图
function slider(){
    /**
     * 1.轮播图可以自动播放
     * 2.无缝轮播图
     * 3.轮播图要支持滑动 从左往右滑  切换到上一张 从右往左滑要换到 下一张
     * 4.滑动中要能预览上一张或者下一张
     * 5.滑动距离超过轮播图的1/3的时候才切换 如果不超过 吸附回去
     * 6.切换图片的时候小圆点也要跟着走
     */
    // 定义一个计数的变量也就是轮播图的下标（索引）
    var index = 1;
    var slider = document.querySelector('#slider');
    var sliderWidth = slider.offsetWidth;
    var sliderUl = document.querySelector('#slider ul');
    // 轮播图可以自动播放要有定时器
    var timer;
    function timerr(){
        timer =  setInterval(function(){
            index++;
            addTransition();
            addTransform(-sliderWidth*index);
            //sliderUl.style.transform = "translateX("+()+"px)";
        },1000);
    }

    timerr();
    //监听过渡结束事件
    sliderUl.addEventListener("transitionend",function(){
        if(index >=9 ){
            index = 1;
            removeTransition();
            addTransform(-sliderWidth*index);
        }else if(index <= 0){
            index = 8;
            removeTransition();
            addTransform(-sliderWidth*index);
        }
        //小圆点移动
        setPoints();
    });

    //获取小圆点
    var points = slider.querySelectorAll('ul:last-child li');
    function setPoints(){
        for(var i = 0;i<points.length;i++){
            points[i].className = '';
        }

        points[index-1].className = 'active';
    }

    var startX = 0;
    var endX = 0;
    var moveX = 0;
    var distanceX = 0;
    /**
     * 1.得知道滑动的距离 如果是正值就切换到 切换到上一张
     * 2.如果是负值就切换到下一张
     * 3.添加2个事件 touchstart touchend  获取开始和结束的位置相减
     */
    slider.addEventListener('touchstart',function(e){
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend',function(e){
        endX = e.changedTouches[0].clientX;
        if(endX - startX > 0 && Math.abs(endX - startX) > 1/3*sliderWidth){
            index--;
        }else if(endX - startX < 0 && Math.abs(endX - startX) > 1/3*sliderWidth){
            index++;
        }
        addTransform(-sliderWidth*index);
        //sliderUl.style.transform = "translateX("+(-sliderWidth*index)+"px)";
        clearInterval(timer);
        timerr();
    })
    //1.得知道滑动过程中 滑动的距离
    //2.获取到了这个距离 设置到当前的定位位置
    //3. 从上一次最后的位置加上这个距离
    slider.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        addTransition();
        addTransform(-sliderWidth*index+distanceX);
        //sliderUl.style.transform = "translateX("+()+"px)";
    });

    function removeTransition(){
        sliderUl.style.transition = "none";
    }

    function addTransition(){
        sliderUl.style.transition = "all 0.5s";
    }

    function addTransform(x){
        sliderUl.style.transform = "translateX("+x+"px)";
    }

}



//搜索框下滑
function search(){
    var sliderHeight = document.querySelector('#slider').offsetHeight;
    var topbar = document.querySelector('.topbar');
    window.onscroll = function(){
        var scrHeight = document.body.scrollTop || document.documentElement.scrollTop;
        var opcity = 0;
        if(scrHeight < sliderHeight){
            opcity = scrHeight/sliderHeight * 0.85;
        }else{
            opcity = 1;
        }

        topbar.style.backgroundColor = "rgba(201, 21, 35, " + opcity + ")";
    }
}

//倒计时
function downTime(){
    var time = 5 * 60 * 60;
    var seckillTime = document.querySelectorAll('.seckill-time span');
    var timer = setInterval(function(){
        if(time < 0){
            clearInterval(timer);
            return false;
        }
        time--;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);
        seckillTime[0].innerHTML = Math.floor(h/10);
        seckillTime[1].innerHTML = Math.floor(h%10);
        seckillTime[3].innerHTML = Math.floor(m/10);
        seckillTime[4].innerHTML = Math.floor(m%10);
        seckillTime[6].innerHTML = Math.floor(s/10);
        seckillTime[7].innerHTML = Math.floor(s%10);
    },1000);

}