/*
Claude iOS stale session reset
仅用于本机清理陈旧 session。
不要填入、记录、上传真实 Cookie。
成功出现登录页后，请立即关闭 Quantumult X 里的本重写规则。
*/

let headers = $response.headers || {};

// body 类重写时 Quantumult X 会自动处理长度/编码相关字段，
// 这里删除是为了避免部分服务端响应残留导致冲突。
delete headers["Content-Length"];
delete headers["content-length"];
delete headers["Content-Encoding"];
delete headers["content-encoding"];

headers["Content-Type"] = "application/json; charset=utf-8";
headers["Cache-Control"] = "no-store";

// 关键：Set-Cookie 必须是响应头，不是请求头。
// 如果你的 Quantumult X 版本不支持数组形式，见下方“兼容方案”。
headers["Set-Cookie"] = [
  "sessionKey=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=.claude.ai; Secure; HttpOnly; SameSite=Lax",
  "routingHint=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=.claude.ai; Secure; HttpOnly; SameSite=Lax"
];

const body = JSON.stringify({
  type: "error",
  error: {
    type: "session_expired",
    message: "Session expired"
  }
});

$done({
  status: "HTTP/1.1 401 Unauthorized",
  headers: headers,
  body: body
});
