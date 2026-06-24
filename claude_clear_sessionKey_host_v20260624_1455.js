/*
Claude Reset v20260624_1455
Step 1: clear host-only sessionKey only.
*/

let headers = $response.headers || {};

delete headers["Content-Length"];
delete headers["content-length"];
delete headers["Content-Encoding"];
delete headers["content-encoding"];

headers["Content-Type"] = "application/json; charset=utf-8";
headers["Cache-Control"] = "no-store";
headers["WWW-Authenticate"] = 'Bearer error="invalid_token", error_description="Session expired"';

// 先清 host-only cookie：不带 Domain
headers["Set-Cookie"] = "sessionKey=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Lax";

const body = JSON.stringify({
  type: "error",
  error: {
    type: "session_expired",
    message: "Session expired"
  }
});

$notify("Claude Reset v20260624_1455", "clear sessionKey HOST only", $request.url);

$done({
  status: "HTTP/1.1 401 Unauthorized",
  headers: headers,
  body: body
});
