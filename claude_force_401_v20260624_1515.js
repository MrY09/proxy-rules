/*
Claude Reset v20260624_1515
Response phase: force /api/account to return session_expired.
*/

let headers = $response.headers || {};

delete headers["Content-Length"];
delete headers["content-length"];
delete headers["Content-Encoding"];
delete headers["content-encoding"];

headers["Content-Type"] = "application/json; charset=utf-8";
headers["Cache-Control"] = "no-store";
headers["WWW-Authenticate"] = 'Bearer error="invalid_token", error_description="Session expired"';

headers["Set-Cookie"] = [
  "sessionKey=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; Secure; HttpOnly; SameSite=Lax",
  "routingHint=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; Secure; HttpOnly; SameSite=Lax"
];

const body = JSON.stringify({
  type: "error",
  error: {
    type: "session_expired",
    message: "Session expired"
  }
});

$notify(
  "Claude Reset v20260624_1515",
  "RESPONSE 401 session_expired",
  $request.url
);

$done({
  status: "HTTP/1.1 401 Unauthorized",
  headers: headers,
  body: body
});
