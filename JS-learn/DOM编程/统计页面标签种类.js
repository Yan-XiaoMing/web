var list = document.querySelectorAll("*");
var set = new Set([...list].map((node) => node.tagName));
console.log(set.size);

//统计出现次数最多的3个
var list = document.querySelectorAll("*");
var tagNameList = Array.from(list).map((tag) => tag.tagName);
var count = {};
tagNameList.reduce((total, currentValue) => {
  total[currentValue] = (total[currentValue] || 0) + 1;
  return total;
}, count);
console.log(count);
var sortArr = Object.entries(count).sort((a,b)=>{return b[1] - a[1]})
console.log(sortArr)
var result = sortArr.slice(0,3)