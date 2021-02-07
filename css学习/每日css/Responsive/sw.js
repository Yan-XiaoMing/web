console.log("service  worker 注册成功");

self.addEventListener("install", (event) => {
  //跳过等待
  self.skipWating();
  //引入 event.waitUntil
  event.waitUntil(
    new Promise((resolve, reject) => {
      resolve("安装成功");
      console.log("service worker 安装成功");
    })
  );
});

self.addEventListener("activate", () => {
  console.log("service worker 激活成功");
});

self.addEventListener("fetch", (event) => {
  console.log("service worker 抓取请求成功: " + event.request.url);
});
