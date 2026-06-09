const ETFNOW_ORIGIN = "https://etfnow.co.kr";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return withCors(null, 204);
    }

    if (url.pathname === "/") {
      return withCors({
        ok: true,
        message: "ETFnow Dashboard Worker",
        endpoints: ["/api/etf/{code}"]
      });
    }

    const match = url.pathname.match(/^\/api\/etf\/([A-Za-z0-9]+)$/);
    if (!match) {
      return withCors({ ok: false, error: "Not found" }, 404);
    }

    const code = match[1].toUpperCase();

    try {
      const [basic, holdings] = await Promise.all([
        fetchEtfnow(`/api/etf/${code}/basic`),
        fetchEtfnow(`/api/etf/${code}/holdings`)
      ]);

      return withCors({
        ok: true,
        code,
        fetchedAt: new Date().toISOString(),
        basic,
        holdings
      });
    } catch (err) {
      return withCors({
        ok: false,
        code,
        error: String(err && err.message ? err.message : err)
      }, 502);
    }
  }
};

async function fetchEtfnow(path) {
  const res = await fetch(`${ETFNOW_ORIGIN}${path}`, {
    method: "GET",
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "referer": `${ETFNOW_ORIGIN}/`
    }
  });

  if (!res.ok) {
    throw new Error(`${path} HTTP ${res.status}`);
  }

  return await res.json();
}

function withCors(body, status = 200) {
  const headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type",
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  };

  if (body === null) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), { status, headers });
}
