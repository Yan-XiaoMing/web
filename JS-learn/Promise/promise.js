const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  let _this = this;
  _this.currentState = PENDING;
  _this.value = undefined;

  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  _this.resolve = function (value) {
    if (value instanceof MyPromise) {
      return value.then(_this.resolve, _this.reject);
    }
    setTimeout(() => {
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED;
        _this.value = value;
        _this.resolvedCallbacks.forEach((callback) => callback());
      }
    });
  };
  _this.reject = function (reason) {
    setTimeout(() => {
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED;
        _this.value = reason;
        _this.rejectedCallbacks.forEach((callback) => callback());
      }
    });
  };
  try {
    fn(_this.resolve, _this.reject);
  } catch (e) {
    _this.reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2;
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，同时也实现了透传
  // Promise.resolve(4).then().then((value) => console.log(value))
  onResolved = typeof onResolved === "function" ? onResolved : (v) => v;
  onRejected = typeof onRejected === "function" ? onRejected : (err) => {throw err;};

  if (self.currentState === RESOLVED) {
    promise2 = new MyPromise(function (resolve, reject) {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      // 所以用了 setTimeout 包裹下
      setTimeout(function () {
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
    return promise2;
  }

  if (self.currentState === REJECTED) {
    promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function(){
        try{
          var x =  onRejected(self.value)
          resolutionProcedure(promise2,x,resolve,reject)
        }catch(reason){
          reject(reason)
        }
      })
    });
    return promise2
  }

  if (self.currentState === PENDING) {
    promise2 = new MyPromise(function (resolve, reject) {
      self.resolvedCallbacks.push(function () {
        //考虑会有报错的情况使用try/catch包裹
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
      self.rejectedCallbacks.push(function () {
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
    });
    return promise2
  }
};

//规范2.3
function resolutionProcedure(promise2,x,resolve,reject){
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if(promise2 === 2){
    return reject(new TypeError('Error'))
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if(x instanceof MyPromise){
    if(x.currentState === PENDING){
      x.then(function(value){
        // 再次调用该函数是为了确认 x resolve 的参数是什么类型，如果是基本类型就再次 resolve把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      },reject)
    }
    else{
      x.then(resolve,reject)
    }
    return
  }
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false
  //判断 x 是否为对象或者函数
  if(x !== null && (typeof x === 'object' || typeof x === 'function')){
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try{
      let then = x.then
      // 如果 then 是函数，调用 x.then
      if(typeof then === 'function'){
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            // 规范 2.3.3.3.1
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      }
      else{
        resolve(x)
      }
    }catch(err){
      if(called)return
      called = true
      reject(err)
    }
  }else{
    //x为基本类型
    resolve(x)
  }
}