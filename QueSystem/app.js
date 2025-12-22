const API_BASE = "https://script.google.com/macros/s/AKfycbxm36d7d87bKxHE7C18aMSUxyIQ0d27kyQV78OQXoaLkxW_m7DiNrkJe8cnGbKxKPev/exec";

async function postAction(action, body) {
  try {
    const url = `${API_BASE}?action=${encodeURIComponent(action)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body || {})
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Not JSON response:", text.substring(0, 100)); // Debug log first 100 chars
      throw new Error("Invalid Server Response (Not JSON). Check Web App URL.");
    }
  } catch (e) {
    console.error("API Error:", e);
    return { ok: false, error: e.message };
  }
}

async function getAction(action, params) {
  try {
    const q = new URLSearchParams({ action, ...(params || {}), _t: new Date().getTime() }).toString();
    const res = await fetch(`${API_BASE}?${q}`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Not JSON response:", text.substring(0, 100));
      throw new Error("Invalid Server Response (Not JSON). Check Web App URL.");
    }
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



