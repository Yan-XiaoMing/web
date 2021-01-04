const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'wawa', last: 'fs', year: 1830, passed: 1905 },
    { first: 'grvd', last: 'xcvxcv', year:1900, passed: 1977 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

var people = ['Albert, Einstein', 'wawa, fs', 'grvd, xcvxcv', 'Hanna, Hammarström']

/**
 *  根据这两组数组，完成以下的题目
    筛选出生于16世纪的发明家；
    以数组形式，列出其名与姓；
    根据其出生日期，并从大到小排序；
    计算所有的发明家加起来一共活了几岁；
    按照其年龄大小排序；
 */

 //filter 第一题
function bornyear(inventor){
    return inventor.year >= 1800 && inventor.year < 1900
}

var fifteen = inventors.filter(bornyear)
console.log(fifteen)
//简化操作
var fifteen = inventors.filter(inventors =>(inventors.year>=1800 && inventors.year<1900))

//map 第二题
