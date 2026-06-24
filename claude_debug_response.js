/*
Quantumult X Claude response debug
测试 script-response-body 是否执行
*/

let headers = $response.headers || {};

delete headers["Content-Length"];
delete headers["content-length"];
delete headers["Content-Encoding"];
delete headers["content-encoding"];

headers["Content-Type"] = "application/json; charset=utf-8";
headers["Cache-Control"] = "no-store";
headers["X-QX-Claude-Response-Debug"] = "hit";

const body = JSON.stringify({
  qx_debug: "response_script_hit",
  type: "error",
  error: {
    type: "session_expired",
    message: "Session expired"
  }
});

$notify("QX Claude Debug", "RESPONSE matched", $request.url);

console.log("[QX Claude Debug] RESPONSE matched: " + $request.url);

$done({
  status: "HTTP/1.1 401 Unauthorized",
  headers: headers,
  body: body
});
