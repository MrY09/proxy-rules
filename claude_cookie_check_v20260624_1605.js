/*
Claude Cookie Check v20260624_1605
只读取 Cookie 名，不读取/输出 Cookie 值。
*/

const VERSION = "v20260624_1605";
const headers = $request.headers || {};

function getHeader(obj, name) {
  const key = Object.keys(obj).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? obj[key] : "";
}

const cookieHeader = getHeader(headers, "Cookie");

let cookieNames = [];

if (cookieHeader) {
  cookieNames = cookieHeader
    .split(";")
    .map(item => item.trim().split("=")[0])
    .filter(Boolean);
}

const hasSessionKey = cookieNames.includes("sessionKey");
const hasRoutingHint = cookieNames.includes("routingHint");

const summary =
  "sessionKey:" + (hasSessionKey ? "YES" : "NO") +
  " routingHint:" + (hasRoutingHint ? "YES" : "NO");

const namesText = cookieNames.length
  ? cookieNames.join(", ")
  : "NO Cookie header";

// 通知里只显示 cookie 名，不显示值
$notify(
  "Claude Cookie Check " + VERSION,
  summary,
  namesText.slice(0, 240)
);

console.log("[Claude Cookie Check " + VERSION + "] " + summary);
console.log("[Claude Cookie Check " + VERSION + "] cookie names: " + namesText);

// 不修改请求
$done({});
