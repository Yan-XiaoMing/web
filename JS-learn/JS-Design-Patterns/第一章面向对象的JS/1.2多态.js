/**
 * 主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令
时，鸭会“嘎嘎嘎”地叫，而鸡会“咯咯咯”地叫。这两只动物都会以自己的方式来发
出叫声。它们同样“都是动物，并且可以发出叫声”，但根据主人的指令，它们会各自
发出不同的叫声。
 */

var makeSound = function (animal) {
  if (animal instanceof Duck) {
    console.log("嘎嘎嘎");
  } else if (animal instanceof Chicken) {
    console.log("咯咯哒");
  }
};

var Duck = function () {};

var Chicken = function () {};

makeSound(new Duck());
makeSound(new Chicken());

//改写
/*
 现在我们向鸭和鸡都发出“叫唤”的消息，它们接到消息后分别作出了不同的反应。如果有
一天动物世界里又增加了一只狗，这时候只要简单地追加一些代码就可以了，而不用改动以前的
makeSound 函数
 */

var makeSound = function (animal) {
  animal.sound();
};

var Duck = function () {};

Duck.prototype.sound = function () {
  console.log("嘎嘎嘎");
};

var Chicken = function () {};
Chicken.prototype.sound = function () {
  console.log("咯咯咯");
};

makeSound(new Duck());
makeSound(new Chicken());

var Dog = function () {};

Dog.prototype.sound = function () {
  console.log("汪汪汪");
};

makeSound(new Dog());
