/**
 * Created by sq on 2016/8/30.
 */
window.onload = function(){
    swipeLeft();
}

function swipeLeft(){
    /**
     * 1.��������˵�֧�����»��� ��ֱ����
     * 2.����������һ������λ��  ��С������λ��
     * 3.ul��������λ����Y���ƶ���ֵ 0 ���и�ul������СY���ƶ���λ�� cate-left - ul �߶�
     * 4.��������Ǹ�����ƶ�ֵ ����С�� ��С�ƶ�ֵ ������ȥ
     * 5.���ĳһ������li��ʱ��Ҫ�����li���������˵�λ��
     * 6.�����ʱ��������� ����ƶ�ֵ ����С�� ��С�ƶ�ֵ ��������
     * */
    var categoryLeft = document.querySelector('.category-left');
    var swipeUl = document.querySelector('.category-left ul');
    var startY = 0;
    var endY = 0;
    var moveY = 0;
    //��ǰλ��
    var currentY = 0;
    //����
    var distanceY = 0;
    //���λ�ƾ���
    var maxPoisition = 0;
    //��Сλ�ƾ���
    var minPoisition = categoryLeft.offsetHeight - swipeUl.offsetHeight;
    //������������
    var maxSwipe = maxPoisition + 150;
    //��������С����
    var minSwipe = minPoisition - 150;

    swipeUl.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });

    swipeUl.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY-startY;
        removeTransition();
        //�жϻ����ľ�����û�г��������������λ�� �� ������С�Ļ���λ�ã�����Ļ�����
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
