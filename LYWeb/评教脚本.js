var element = document.getElementsByClassName('radio-pjf')
/*
    自定义等级评定方法: 
    0: 好
    1: 较好
    2: 一般
    3: 较差
    4: 差
*/
var level = 0

for(let i = level;i<element.length - 5;i+=5){
    element[i].click()
}

element[element.length - 4].click()
var btnTj = document.getElementById('btn_xspj_tj')
btnTj.click()

setTimeout(()=>{
    var btnOk = document.getElementById('btn_ok')
    btnOk.click()
},0)