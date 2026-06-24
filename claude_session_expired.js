/*
Claude iOS stale session reset
仅用于本机清理陈旧 session。
成功出现登录页后，请立即关闭 Quantumult X 里的本重写规则。
*/

let headers = $response.headers || {};

delete headers["Content-Length"];
delete headers["content-length"];
delete headers["Content-Encoding"];
delete headers["content-encoding"];

headers["Content-Type"] = "application/json; charset=utf-8";
headers["Cache-Control"] = "no-store";

// 关键：Set-Cookie 必须是响应头，不是请求头。
// 这里先严格按照 Charles 教程的两个 cookie 来。
headers["Set-Cookie"] = [
  "sessionKey=; Path=/; Domain=.claude.ai; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=Lax",
  "routingHint=; Path=/; Domain=.claude.ai; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=Lax"
];

const body = '{"type":"error","error":{"type":"session_expired","message":"Session expired"}}';

$notify("Claude Reset", "script hit", $request.url);

$done({
  status: "HTTP/1.1 401 Unauthorized",
  headers: headers,
  body: body
});
