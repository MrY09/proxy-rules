/*
Claude Reset v20260624_1515
Request phase: remove stale auth cookies from Cookie header.
不打印、不上传真实 Cookie 值。
*/

let headers = $request.headers || {};

const cookieKey = Object.keys(headers).find(k => k.toLowerCase() === "cookie");

if (cookieKey && headers[cookieKey]) {
  const original = headers[cookieKey];

  const blockedNames = new Set(["sessionKey", "routingHint"]);

  const kept = original
    .split(";")
    .map(s => s.trim())
    .filter(item => {
      const name = item.split("=")[0].trim();
      return !blockedNames.has(name);
    });

  headers[cookieKey] = kept.join("; ");

  headers["X-QX-Claude-Cookie-Strip"] = "v20260624_1515";

  $notify(
    "Claude Reset v20260624_1515",
    "REQUEST strip sessionKey/routingHint",
    "Cookie names removed only, values not logged"
  );
} else {
  $notify(
    "Claude Reset v20260624_1515",
    "REQUEST no Cookie header",
    $request.url
  );
}

$done({
  headers: headers
});
