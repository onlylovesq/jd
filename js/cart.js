/**
 * Created by sq on 2016/9/1.
 */

window.onload = function(){
    deleteProduct();
}

function deleteProduct(){
    var deleteBox = document.querySelectorAll('.delete-box');
    var btnCancel = document.querySelector('.btn-cancel');
    var model = document.querySelector('#model');
    var deleteUp;

    for(var i = 0;i < deleteBox.length; i++){
        deleteBox[i].addEventListener('click',function(){
            model.style.display = 'block';
            model.querySelector('.model-info').classList.add('bounceInDown');
            deleteUp = this.querySelector('span');
            deleteUp.style.transform = "rotateZ(-45deg) translateY(3px)";
            deleteUp.style.transformOrigin = "left bottom";
            deleteUp.style.transition = "all 1s";
        });
    }

    btnCancel.addEventListener('click',function(){
        model.style.display = 'none';

        deleteUp.style.transform = "none";
        deleteUp.style.transition = "all 1s";
    });
}