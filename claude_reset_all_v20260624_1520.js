/*
Claude Reset v20260624_1520
Try to expire sessionKey/routingHint across common Domain + Path combinations.
Use once, then disable rewrite and reopen Claude.
*/

let headers = $response.headers || {};

delete headers["Content-Length"];
delete headers["content-length"];
delete headers["Content-Encoding"];
delete headers["content-encoding"];

headers["Content-Type"] = "application/json; charset=utf-8";
headers["Cache-Control"] = "no-store";
headers["WWW-Authenticate"] = 'Bearer error="invalid_token", error_description="Session expired"';
headers["X-Claude-Reset-Version"] = "v20260624_1520";

const expired = "Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; Secure; HttpOnly; SameSite=Lax";

headers["Set-Cookie"] = [
  // sessionKey: host-only
  `sessionKey=; Path=/; ${expired}`,
  `sessionKey=; Path=/api; ${expired}`,
  `sessionKey=; Path=/api/account; ${expired}`,

  // sessionKey: Domain=claude.ai
  `sessionKey=; Path=/; Domain=claude.ai; ${expired}`,
  `sessionKey=; Path=/api; Domain=claude.ai; ${expired}`,
  `sessionKey=; Path=/api/account; Domain=claude.ai; ${expired}`,

  // sessionKey: Domain=.claude.ai
  `sessionKey=; Path=/; Domain=.claude.ai; ${expired}`,
  `sessionKey=; Path=/api; Domain=.claude.ai; ${expired}`,
  `sessionKey=; Path=/api/account; Domain=.claude.ai; ${expired}`,

  // routingHint: host-only
  `routingHint=; Path=/; ${expired}`,
  `routingHint=; Path=/api; ${expired}`,
  `routingHint=; Path=/api/account; ${expired}`,

  // routingHint: Domain=claude.ai
  `routingHint=; Path=/; Domain=claude.ai; ${expired}`,
  `routingHint=; Path=/api; Domain=claude.ai; ${expired}`,
  `routingHint=; Path=/api/account; Domain=claude.ai; ${expired}`,

  // routingHint: Domain=.claude.ai
  `routingHint=; Path=/; Domain=.claude.ai; ${expired}`,
  `routingHint=; Path=/api; Domain=.claude.ai; ${expired}`,
  `routingHint=; Path=/api/account; Domain=.claude.ai; ${expired}`
];

const body = JSON.stringify({
  type: "error",
  error: {
    type: "session_expired",
    message: "Session expired"
  },
  qx_debug: "Claude Reset v20260624_1520"
});

$notify("Claude Reset v20260624_1520", "expire all domain/path cookies", $request.url);

$done({
  status: "HTTP/1.1 401 Unauthorized",
  headers: headers,
  body: body
});
