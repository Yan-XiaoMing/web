//正则表达式是匹配模式，要么匹配字符，要么匹配位置。

//精准匹配
var regex = /hello/;
console.log(regex.test('hello'))

//横向模糊匹配
//实现的方式是使用量词。譬如 {m,n}，表示连续出现最少 m 次，最多 n 次。
//g 是正则的一个修饰符。表示全局匹配，即，在目标字符串中按顺序找到满足匹配模式的所有子串，强调的是“所有”，而不只是“第一个”
//g 是单词 global 的首字母。
var regex = /ab{2,4}c/g;
var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
console.log( string.match(regex) );

//纵向模糊匹配
//纵向模糊指的是，一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能。
var regex = /a[123]b/g;
var string = 'a0b a1b a2b a3b a4b';
console.log(string.match(regex));

//字符组
//虽叫字符组（字符类），但只是其中一个字符
//例如 [abc]，表示匹配一个字符，它可以是 "a"、"b"、"c" 之一。

//范围表示法
//[123456abcdefGHIJKLM]，可以写成 [1-6a-fG-M]。用连字符 - 来省略和简写。

//连字符的转义
//要匹配 "a"、"-"、"z" 这三者中任意一个字符
//可以写成如下的方式：[-az] 或 [az-] 或 [a\-z]。

//贪婪匹配与惰性匹配
//贪婪的，它会尽可能多的匹配。在能力范围内，越多越好。
var regex = /\d{2,5}/g;
var string = "123 1234 12345 123456"
console.log(string.match(regex));
//["123", "1234", "12345", "12345"]

//惰性匹配，就是尽可能少的匹配
///\d{2,5}?/ 表示，虽然 2 到 5 次都行，当 2 个就够的时候，就不再往下尝试
var regex = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log(string.match(regex));
//["12", "12", "34", "12", "34", "12", "34", "56"]

var regex = /xiao|mi/g;
var string = "xiao mi xiaoMing";
console.log(string.match(regex));
//["xiao", "mi", "xiao"]

var regex = /xiaomi|xiao/g;
var string = "xiaomi xiaoMing";
console.log(string.match(regex));
//["xiaomi", "xiao"]

//匹配
//#ffbbad
//#Fc01DF
//#FFF
//#ffE
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
var string  = "#ffbbad #Fc01DF #FFF #ffE";
console.log( string.match(regex) );
//["#ffbbad", "#Fc01DF", "#FFF", "#ffE"]

//#### 匹配时间
//以 24 小时制为例。
var regex = /^([01][0-9]|[2][03]):[0-5][0-9]$/;
console.log( regex.test("23:59") );
console.log( regex.test("02:07") );

//#### 匹配日期
//比如 yyyy-mm-dd 格式为例。
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
console.log(regex.test("2020-07-13"));


//匹配window操作系统文件路径
var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
console.log( regex.test("F:\\study\\javascript\\regex\\regular expression.pdf") );
console.log( regex.test("F:\\study\\javascript\\regex\\") );
console.log( regex.test("F:\\study\\javascript") );
console.log( regex.test("F:\\") );


//匹配颜色
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/
var string = '#fff #abcfff #672212'
console.log(string.match(regex))

//匹配时间
var regex = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/

//匹配日期
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/