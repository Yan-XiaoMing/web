const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

wss.on("connection", function connection(ws) {
  ws.isAlive = true;
  ws.on("pong", heartbeat);
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);
