/*
Quantumult X Claude debug
只测试 /api/account 是否命中脚本
*/

const method = $request.method || "UNKNOWN";
const url = $request.url || "";

$notify("QX Claude Debug", "REQUEST matched", method + " " + url);

console.log("[QX Claude Debug] REQUEST matched: " + method + " " + url);

// 不修改请求，直接放行
$done({});
