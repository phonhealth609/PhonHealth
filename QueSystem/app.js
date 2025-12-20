const API_BASE = "https://script.google.com/macros/s/AKfycbyjjqNFskrdUfL5wgvN8aSrYKtRnOqj1dMaRoCFD-eDvvPQURCWOdtugdlOAisR0og/exec";

async function postAction(action, body) {
  try {
    const url = `${API_BASE}?action=${encodeURIComponent(action)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // GAS often requires text/plain to avoid CORS preflight issues with JSON
      body: JSON.stringify(body || {})
    });
    return await res.json();
  } catch (e) {
    console.error("API Error:", e);
    return { ok: false, error: e.message };
  }
}

async function getAction(action, params) {
  try {
    const q = new URLSearchParams({ action, ...(params||{}) }).toString();
    const res = await fetch(`${API_BASE}?${q}`);
    return await res.json();
  } catch (e) {
    console.error("API Error:", e);
    return { ok: false, error: e.message };
  }
}

// Utility to format queue number with color
function formatQueueColor(status) {
  switch (status) {
    case 'CALLED': return 'text-green-600';
    case 'SERVED': return 'text-gray-400';
    default: return 'text-blue-600';
  }
}
