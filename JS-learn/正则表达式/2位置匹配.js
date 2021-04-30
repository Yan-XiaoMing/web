var result = 'hello'.replace(/^|$/g,'#');
console.log(result);
// => "#hello#"
//多行匹配模式（即有修饰符 m）时，二者是行的概念
var result = "I\nlove\njavascript".replace(/^|$/gm,'#');
console.log(result);
/*
#I#
#love#
#javascript#
*/

//  \b是单词边界 \B是非单词边界
var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
console.log(result);
//"[#JS#] #Lesson_01#.#mp4#"

var result = "[JS] Lesson_01.mp4".replace(/\B/g, '#');
console.log(result);
//#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4

var result = "hello".replace(/(?=l)/g,'#');
console.log(result);
//he#l#lo

var result = "hello".replace(/(?!l)/g,'#')
console.log(result);
//#h#ell#o#

var string = "12345678 123456789",
var result = "12345678".replace('/\B(?=(\d{3})+\b)/g',',');
console.log(result);