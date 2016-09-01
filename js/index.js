/**
 * Created by sq on 2016/8/29.
 */
window.onload = function(){
    search();
    downTime();
    slider();
}

//�ֲ�ͼ
function slider(){
    /**
     * 1.�ֲ�ͼ�����Զ�����
     * 2.�޷��ֲ�ͼ
     * 3.�ֲ�ͼҪ֧�ֻ��� �������һ�  �л�����һ�� ��������Ҫ���� ��һ��
     * 4.������Ҫ��Ԥ����һ�Ż�����һ��
     * 5.�������볬���ֲ�ͼ��1/3��ʱ����л� ��������� ������ȥ
     * 6.�л�ͼƬ��ʱ��СԲ��ҲҪ������
     */
    // ����һ�������ı���Ҳ�����ֲ�ͼ���±꣨������
    var index = 1;
    var slider = document.querySelector('#slider');
    var sliderWidth = slider.offsetWidth;
    var sliderUl = document.querySelector('#slider ul');
    // �ֲ�ͼ�����Զ�����Ҫ�ж�ʱ��
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
    //�������ɽ����¼�
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
        //СԲ���ƶ�
        setPoints();
    });

    //��ȡСԲ��
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
     * 1.��֪�������ľ��� �������ֵ���л��� �л�����һ��
     * 2.����Ǹ�ֵ���л�����һ��
     * 3.���2���¼� touchstart touchend  ��ȡ��ʼ�ͽ�����λ�����
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
    //1.��֪������������ �����ľ���
    //2.��ȡ����������� ���õ���ǰ�Ķ�λλ��
    //3. ����һ������λ�ü����������
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



//�������»�
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

//����ʱ
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