//ES6 class版本
class OpenButton{
    onClick(){
        const modal = new Modal()
        modal.style.display = 'block'
    }
}

class Decorator{
    constructor(open_button){
        this.open_button = open_button
    }

    onClick(){
        this.open_button.onClick()
        //包装一层新逻辑
        this.changeButtonStatus()
    }

    changeButtonStatus() {
        this.changeButtonText()
        this.disableButton()
    }

    disableButton(){
        const btn = document.getElementById('open')
        btn.setAttribute('disabled',true)
    }

    changeButtonText(){
        const btn = document.getElementById('open')
        btn.innerText = '快去登录'
    }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)

document.getElementById('open').addEventListener('click',function(){
    decorator.onClick()
})