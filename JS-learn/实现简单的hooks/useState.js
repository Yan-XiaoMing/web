//script1
function useState(initialValue){
    var state = initialValue
    function setState(newState){
        state = newState
        render();
    }
    return [state,setState]
}
//scrip2
/*
    在1中触发的时候并不会发生变化,因为每次的state都是重置的了
*/
var _state;//把state存储在外面
function useState(initialValue){
    _state = _state || initialValue //如果之前的state没有值就把初始值附给他
    function setState(newState){
        _state = newState
        render()
    }
    return [_state,setState]
}

