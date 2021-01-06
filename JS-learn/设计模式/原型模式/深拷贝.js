//简单版
function deepClone(obj) {
  //如果是 值类型或者 null 直接return
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let copy = {};

  if (obj.constructor === Array) {
    copy = [];
  }

  for (let key in obj) {
    //如果key是对象的自有属性
    if (obj.hasOwnProperty(key)) {
      //递归
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}

function createData(deep, breadth) {
  var data = {};
  var temp = data;
  for (let i = 0; i < deep; i++) {
    temp = temp["data"] = {};
    for (let j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }
  return data;
}
createData(1, 3); // 1层深度，每层有3个数据 {data: {0: 0, 1: 1, 2: 2}}
createData(3, 0); // 3层深度，每层有0个数据 {data: {data: {data: {}}}}

//最简单的深拷贝
var a1 = { b: { c: { d: 1 } } };

/**
 * 没有对参数做检验
 * 判断是否对象的逻辑不够严谨
 * 没有考虑数组的兼容
 */
function deepClone1(source) {
  var target = {};
  for (let i in source) {
    if (source.hasOwnProperty(i)) {
      target[i] = deepClone(source[i]);
    } else {
      target[i] = source[i];
    }
  }
  return target;
}

//防止爆栈
function deepCLone2(source) {
  const root = {};

  //栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: source,
    },
  ];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}
