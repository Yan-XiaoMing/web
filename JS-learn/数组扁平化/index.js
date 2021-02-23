let arr = [1, [2, [3, [4, 5]]], 6]; // -> [1, 2, 3, 4, 5, 6]
let arrJson = JSON.stringify(arr); //"[1,[2,[3,[4,5]]],6]"

let arr1 = arr.flat(Infinity);
console.log(arr1); //[1, 2, 3, 4, 5, 6]

let arr2 = [];
let fn = function (arr) {
  for (let i of arr) {
    let item = i;
    if (Array.isArray(i)) {
      fn(item);
    } else {
      arr2.push(item);
    }
  }
};
function flatten(arr) {
  let res = [];
  for (let i of arr) {
    if (Array.isArray(i)) {
      res = res.concat(flatten(i));
    } else {
      res.push(i);
    }
  }
  return res;
}
console.log(arr2); //[1, 2, 3, 4, 5, 6]

let arr3 = [];
function flat(arr) {
  while (arr.some((item) => {
      return Array.isArray(item);
    })) {
    arr = [].concat(...arr);
  }
  return arr;
}
arr3 = flat(arr);
console.log(arr3);
