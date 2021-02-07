export default class HttpUtils {
  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: this.changeData(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static changeData(obj) {
    var prop,
      str = "";
    var i = 0;
    for (prop in obj) {
      if (!prop) {
        return;
      }
      if (i == 0) {
        str += prop + "=" + obj[prop];
      } else {
        str += "&" + prop + "=" + obj[prop];
      }
    }
  }
}

function Ajax(type, url, data, success, failed) {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var type = type.toUpperCase();
  if (type === "GET") {
    if (data) {
      xhr.open("GET", url + "?" + data, true);
    }
    xhr.send();
  }
  else if(type === 'POST'){
    xhr.open('POST',url,true)
    xhr.setRequestHeader('Content-type','application/x-www/form-urlencoded')
    xhr.send(data)
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.state === 200){
        success(xhr.responseText)
      }
      else{
        if(failed){
          failed(xhr.status)
        }
      }
    }
  }
}

async function AjaxAdapter(type,url,data,success,failed){
  const type = type.toUpperCase()
  let result
  try{
    if(type === 'GET'){
      result = await HttpUtils.get(url) || {}
    }
    else if(type === 'POST'){
      result = await HttpUtils.post(url,data) || {}
    }
    //假定请求成功的状态码为1
    result.statusCode === 1 && success ? success(result) : failed(result.statusCode)
  }catch(error){
    if(failed){
      failed(error.statusCode)
    }
  }
}