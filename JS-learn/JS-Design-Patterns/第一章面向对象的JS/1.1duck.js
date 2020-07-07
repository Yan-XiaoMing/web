/**
 * 从前在JavaScript 王国里，有一个国王，他觉得世界上最美妙的声音就是鸭子的叫
声，于是国王召集大臣，要组建一个1000 只鸭子组成的合唱团。大臣们找遍了全国，
终于找到999 只鸭子，但是始终还差一只，最后大臣发现有一只非常特别的鸡，它的叫
声跟鸭子一模一样，于是这只鸡就成为了合唱团的最后一员。
 */

var duck = {
    duckSinging:function(){
        console.log('嘎嘎嘎');
    }
};

var chicken = {
    duckSinging:function(){
        console.log('嘎嘎嘎');
    }
};

var choir = [];//合唱团

var joinChoir = function(animal){
    if(animal && typeof animal.duck === 'function'){
        choir.push(animal);
        console.log('恭喜你加入合唱团');
        console.log('合唱团已有成员数量： '+choir.length);
    }
}

joinChoir(duck);
joinChoir(chicken);