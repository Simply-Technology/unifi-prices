// Simply Technology — weekly UniFi price + stock check.
// Reads the U.S. UI Store's own product data and writes prices.json for the quote calculator.
// Run by .github/workflows/weekly-prices.yml (Node 20+, no packages needed).
import fs from 'node:fs';

const TRACK = ["EF-Core", "EFG", "UDM-Beast", "UDM-Pro-Max", "UDM-Pro", "UDM-SE", "UCG-Fiber", "UCG-Max", "UCG-Ultra", "UCG-Industrial", "UDR-5G-Max", "UDR7", "UX7", "USW-Pro-Max-48-PoE", "USW-Pro-Max-24-PoE", "USW-Pro-XG-48-PoE", "USW-Pro-XG-24-PoE", "USW-Pro-HD-24-PoE", "ECS-24S-PoE", "ECS-48S-PoE", "USW-Pro-48-POE", "USW-Pro-24-POE", "ECS-48-PoE", "ECS-24-PoE", "ECS-24S", "ECS-48S", "EAV-XG-24-PoE", "EAV-Fiber", "USW-48-POE", "USW-24-POE", "USW-16-POE", "USW-Pro-XG-48", "ECS-Core", "USW-Pro-XG-24", "ECS-Aggregation", "USW-Pro-XG-Aggregation", "USW-Aggregation", "USW-WAN", "USW-WAN-RJ45", "USW-Pro-XG-10-PoE", "USW-Lite-16-PoE", "USW-Lite-8-PoE", "USW-Pro-Max-16-PoE", "USW-Pro-XG-8-PoE", "USW-Enterprise-8-PoE", "USW-Pro-8-PoE", "USW-Flex-2.5G-8-PoE", "USW-Flex-2.5G-8", "USW-Flex-2.5G-5", "USW-Flex-Utility", "UACC-Flex-Utility-Pro", "USW-Flex-XG", "USW-Pro-HD-24", "USW-Pro-Max-48", "USW-Pro-Max-24", "USW-Pro-Max-16", "USW-Pro-48", "USW-Pro-24", "USW-48", "USW-24", "USW-Mission-Critical", "USW-Pro-Aggregation", "E7", "U7-Pro-XGS", "U7-Pro-XG", "U7-Pro-Max", "U7-Pro", "U7-LR", "U7-Lite", "U7-Pro-XG-Wall", "U7-Pro-Wall", "U7-IW", "U7-Pro-Outdoor", "U7-Outdoor", "U7-Mesh", "U6-Enterprise", "U6-Enterprise-IW", "U6-Pro", "U6+", "U6-Mesh", "U6-Mesh-Pro", "U6-IW", "UWB-XG", "UDB-Pro-Sector", "UDB-Pro", "UDB", "UDB-IoT", "UDB-Switch", "U-AirWire", "UTR", "UVC-G6-Edge-Turret", "UVC-G6-Edge-Dome", "UVC-G6-Pro-Turret", "UVC-G6-Pro-Dome", "UVC-G6-Turret", "UVC-G6-Dome", "UVC-G6-Pro-360", "UVC-G6-180", "UVC-AI-MS-4", "UVC-G5-Turret-Ultra", "UVC-G6-Pro-Bullet", "UVC-G6-Bullet", "UVC-AI-LPR", "UVC-G6-INS", "UVC-G6-Mini-Dome", "UVC-AI-MS-2", "UVC-G6-PTZ", "UVC-AI-PTZ", "UVC-AI-PTZ-Precision", "UVC-G5-PTZ", "UVC-AI-Turret", "UVC-AI-Dome", "UVC-G5-Dome-Ultra", "UVC-AI-Pro", "UVC-G5-Pro", "UVC-G5-Flex", "UVC-G4-INS", "ENVR-Core", "ENVR", "UNVR-G2-Pro", "UNVR-G2", "UNVR-Pro", "UNVR", "UNVR-Instant", "AI-Key", "UP-AI-Port", "UP-Viewport", "UCK-G2-SSD", "ENAS", "UNAS-Pro-8", "UNAS-Pro-4", "UNAS-Pro", "UNAS-4", "UNAS-2", "UPS-2U-Pro", "UPS-2U", "UPS-Tower", "USP-RPS", "WM-W", "U-PRO-MP", "nanoHD-RetroFit-3", "nanoHD-RCM-3", "UACC-UK-Ultra-TS", "FlexHD-CM-3", "UP-FloodLight", "UACC-Adapter-PoE-USBC", "UACC-Bullet-AB", "UACC-Camera-DM", "UACC-GB-Plate", "UACC-G6-180-FM", "UACC-G6-180-PM", "UACC-AI-MS-4-AM", "UACC-AI-MS-4-PM", "UACC-AI-MS-2-AM", "UACC-AI-MS-2-PM", "UACC-AI-MS-2-WS", "UACC-AI-PTZ-Precision-CM", "UACC-AI-PTZ-Precision-PM", "UACC-Retrofit-PoE-2Wire", "UACC-Intercom-SAM", "UACC-Intercom-FM", "UACC-Intercom-Sunshield", "UACC-Intercom-WM", "UACC-Intercom-Viewer-TS", "UACC-Junction-Utility", "UACC-Retrofit-PSU-12V", "UA-Button", "UACC-DoorCloser", "UACC-PanicBar", "UACC-Uplink-SFP28-0.15M", "UACC-CM-RJ45-1G", "UACC-OM-MM-1G-D", "UACC-OM-QSFP28-SR4", "UACC-CWDM-4", "F-POE-G2", "UACC-HDD-S-1TB", "UACC-MSD-128GB", "UACC-SSD-2.5-1TB", "U-Rack-6U-TL", "UACC-Rack-Panel-Patch-Blank-24", "UACC-Keystone-Blank-Insert", "UACC-RJ45-Cover", "UACC-Rack-Shelf-CLV", "UACC-Rack-Rails-Slide", "UACC-Rack-PM-Kit", "CKG2-RM", "UACC-Pro-Max-16-RM", "UACC-AI-Port-RM", "UACC-AI-Key-RM", "UACC-UCG-Industrial-RM", "UACC-PoE+-USBC", "UACC-Adapter-AC-210W", "USP-Cable", "USW-Industrial-DIN-8-PoE", "USW-Industrial-DIN-8", "U7-Industrial", "UTR-LR", "UVC-G6-Edge-Bullet", "UXG-Enterprise", "UXG-Fiber", "UXG-Max", "UXG-Pro", "CK-Enterprise", "U5G-Max", "U5G-Max-Outdoor", "U5G", "USP-PDU-Pro", "USP-PDU-HD", "UA-G3-Flex", "UA-G3-Fingerprint", "UA-Retrofit-Reader-Fingerprint", "EAH-8", "UA-Retrofit-Hub-2", "UA-Hub-Door", "UA-Hub-Door-Mini", "UA-Hub-Gate", "UA-G3-SK-Elevator", "UA-Ultra", "UP-AirQuality", "UP-AlarmHub-Kit", "USL-GlassBreak", "USL-Environmental", "USL-Smoke", "USL-Relay", "USL-FOB", "UP-Siren-PoE", "USL-Siren", "UP-AI-Speaker", "UP-AI-Horn-Speaker", "UACC-Rack-Stacking-Kit", "UACC-Keystone-Blank-Insert-TH", "UACC-UPS-2U-Battery", "UACC-UPS-Tower-Battery", "UVC-G6-Entry", "UACC-HDD-E-8TB", "UACC-HDD-E-16TB", "UACC-DAC-SFP10-0.5M", "UACC-Rack-12U-Wall-450-G", "UACC-Rack-42U-800-G", "UACC-Cable-Patch-0.2M-W", "UACC-Keystone-Jack-C6"];
const CATS = ['all-cloud-gateways','all-switching','all-wifi','all-physical-security','all-door-access','all-integrations','accessories-cables-dacs'];
const BASE = 'https://store.ui.com';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
};
const MIN_MATCHED = 200;   // fewer than this = the store changed; fail without touching prices.json

async function get(url, type) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const r = await fetch(url, { headers: { ...HEADERS, Accept: type === 'json' ? 'application/json' : 'text/html' } });
    if (r.ok) return type === 'json' ? r.json() : r.text();
    if (attempt === 3) throw new Error(`${url} -> HTTP ${r.status}`);
    await new Promise(res => setTimeout(res, 3000 * attempt));
  }
}
const money = m => (m && typeof m.amount === 'number') ? m.amount / 100 : null;
function stockText(status, restock) {
  if (status === 'Available') return 'In Stock';
  if (status === 'SoldOut') {
    if (!restock) return 'Sold out · no restock date';
    const d = new Date(restock); return `Sold out · restock ${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
  }
  if (status === 'ComingSoon') return 'Coming soon';
  return status || 'Unknown';
}

const html = await get(`${BASE}/us/en/category/all-switching`, 'html');
const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (!m) throw new Error('Store page layout changed: no __NEXT_DATA__ found');
const buildId = JSON.parse(m[1]).buildId;

const all = {};
for (const c of CATS) {
  const j = await get(`${BASE}/_next/data/${buildId}/us/en/category/${c}.json`, 'json');
  for (const s of (j.pageProps?.subCategories || [])) for (const p of (s.products || [])) for (const v of (p.variants || [])) {
    const k = v.sku.toLowerCase();
    if (!all[k]) all[k] = { sku: v.sku, base: money(v.displayPrice), cost: money(v.displayPriceWithSurcharges), status: v.status, restock: v.restockEtaAt };
  }
}

const SUF = ['', '-us', '-w', '-b', '-w-us', '-white'];
const find = s => { const k = s.toLowerCase(); for (const f of SUF) if (all[k + f]) return all[k + f]; return null; };
const items = [], missing = [];
for (const t of TRACK) {
  const hit = find(t);
  if (!hit || !hit.cost) { missing.push(t); continue; }
  let status = hit.status, restock = hit.restock;
  if (status !== 'Available') for (const f of ['-w', '-b']) { const o = all[t.toLowerCase() + f]; if (o && o.status === 'Available') { status = 'Available'; restock = null; } }
  items.push([t, hit.base, hit.cost, stockText(status, restock)]);
}
if (items.length < MIN_MATCHED) throw new Error(`Only ${items.length} SKUs matched (store has ${Object.keys(all).length}). Not updating prices.json.`);

let prev = null;
try { prev = JSON.parse(fs.readFileSync('prices.json', 'utf8')); } catch {}
const prevMap = new Map((prev?.items || []).map(r => [r[0], r]));
const changes = [];
for (const [sku, base, cost, stock] of items) {
  const p = prevMap.get(sku); if (!p) continue;
  if (Math.abs(p[2] - cost) > 0.005) changes.push({ sku, field: 'price', from: p[2], to: cost, pct: +((cost - p[2]) / p[2] * 100).toFixed(1) });
  if (p[3] !== stock) changes.push({ sku, field: 'stock', from: p[3], to: stock });
}

const out = {
  checked: new Date().toISOString().slice(0, 10),
  source: 'https://store.ui.com/us/en (U.S. store, price incl. surcharge)',
  count: items.length,
  previous_checked: prev?.checked || null,
  missing,
  changes,
  items,
};
fs.writeFileSync('prices.json', JSON.stringify(out, null, 0).replace(/\],\[/g, '],\n['));
console.log(`Matched ${items.length}/${TRACK.length}. Missing: ${missing.join(', ') || 'none'}. Changes: ${changes.length}`);
for (const c of changes) console.log(`  ${c.sku} ${c.field}: ${c.from} -> ${c.to}${c.pct !== undefined ? ` (${c.pct}%)` : ''}`);
