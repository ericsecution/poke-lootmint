import { useState, useMemo, useCallback } from "react";

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const PRODUCTS = [
  // === MEGA EVOLUTION ===
  { id: 1,  set: "Mega Evolution",                     name: "Ascended Heroes ETB",                                    type: "ETB",                retail: 59.99,  resellLow: 90,  resellHigh: 140, heat: "🔥🔥🔥",  notes: "Dragonite holo — high demand" },
  { id: 2,  set: "Mega Evolution",                     name: "Ascended Heroes First Partners Deluxe Pin Collection",   type: "Pin Collection",     retail: 34.99,  resellLow: 55,  resellHigh: 80,  heat: "🔥🔥",    notes: "AJ confirmed retail ~$30" },
  { id: 3,  set: "Mega Evolution",                     name: "Perfect Order Booster Bundle",                          type: "Booster Bundle",     retail: 44.99,  resellLow: 60,  resellHigh: 85,  heat: "🔥🔥",    notes: "6-pack bundle" },
  { id: 4,  set: "Mega Evolution",                     name: "Chaos Rising ETB",                                      type: "ETB",                retail: 59.99,  resellLow: 100, resellHigh: 160, heat: "🔥🔥🔥",  notes: "Pokemon Center exclusive — no warning drops" },
  { id: 5,  set: "Mega Evolution",                     name: "Pitch Black ETB",                                       type: "ETB",                retail: 59.99,  resellLow: 85,  resellHigh: 130, heat: "🔥🔥",    notes: "Strong resell, solid flip" },
  { id: 6,  set: "Mega Evolution",                     name: "Abyss Eye JP Set Release",                              type: "JP Set",             retail: 34.99,  resellLow: 50,  resellHigh: 90,  heat: "🔥",      notes: "Japan import — niche buyer pool" },
  { id: 7,  set: "Mega Evolution",                     name: "Storm Emeralda JP Set Release",                         type: "JP Set",             retail: 34.99,  resellLow: 50,  resellHigh: 85,  heat: "🔥",      notes: "Japan import" },
  { id: 8,  set: "Mega Evolution",                     name: "Pitch Black ENG Set Release",                           type: "Booster Box",        retail: 59.99,  resellLow: 90,  resellHigh: 180, heat: "🔥🔥🔥",  notes: "Booster box — high ceiling" },
  // === PRISMATIC EVOLUTIONS ===
  { id: 9,  set: "Prismatic Evolutions (8.5)",         name: "Elite Trainer Box",                                     type: "ETB",                retail: 59.99,  resellLow: 140, resellHigh: 220, heat: "🔥🔥🔥🔥", notes: "Still the hottest set. Evergreen demand." },
  { id: 10, set: "Prismatic Evolutions (8.5)",         name: "Mini Tin (1 Random Art)",                               type: "Mini Tin",           retail: 24.99,  resellLow: 40,  resellHigh: 65,  heat: "🔥🔥🔥",  notes: "Amazon alert format — watch for restocks" },
  { id: 11, set: "Prismatic Evolutions (8.5)",         name: "Binder Collection",                                     type: "Binder",             retail: 24.99,  resellLow: 45,  resellHigh: 75,  heat: "🔥🔥",    notes: "Sought after for the binder itself" },
  { id: 12, set: "Prismatic Evolutions (8.5)",         name: "Booster Bundle",                                        type: "Booster Bundle",     retail: 29.99,  resellLow: 55,  resellHigh: 90,  heat: "🔥🔥🔥",  notes: "6 packs — easy flip" },
  // === BLACK BOLT / WHITE FLARE ===
  { id: 13, set: "Black Bolt / White Flare",           name: "Black Bolt White Flare Binder & Post",                  type: "Binder Set",         retail: 29.99,  resellLow: 45,  resellHigh: 70,  heat: "🔥🔥",    notes: "Sam's Club April 14 drop" },
  // === STANDARD REFERENCE ===
  { id: 14, set: "Any Set",                            name: "Elite Trainer Box (ETB) — standard",                    type: "ETB",                retail: 59.99,  resellLow: null,resellHigh: null, heat: "varies",  notes: "Base MSRP for all ETBs. AJ confirmed." },
  { id: 15, set: "Any Set",                            name: "Ultra Premium Collection (UPC)",                        type: "UPC",                retail: 119.99, resellLow: 150, resellHigh: 300, heat: "🔥🔥🔥",  notes: "High margin but needs right set" },
  { id: 16, set: "Any Set",                            name: "Premium Collection Box",                                type: "Premium Collection", retail: 39.99,  resellLow: 55,  resellHigh: 90,  heat: "🔥🔥",    notes: "Mid-tier, consistent" },
  { id: 17, set: "Any Set",                            name: "Booster Bundle (6 packs)",                              type: "Booster Bundle",     retail: 29.99,  resellLow: 40,  resellHigh: 60,  heat: "🔥",      notes: "Low margin, move volume" },
  { id: 18, set: "Any Set",                            name: "Pin Collection",                                        type: "Pin Collection",     retail: 19.99,  resellLow: 30,  resellHigh: 55,  heat: "🔥",      notes: "Entry-level, good for bulk" },
  { id: 19, set: "Any Set",                            name: "Deluxe Pin Collection",                                 type: "Pin Collection",     retail: 34.99,  resellLow: 50,  resellHigh: 80,  heat: "🔥🔥",    notes: "Better margin than standard pin" },
  { id: 20, set: "Any Set",                            name: "Booster Pack (single)",                                 type: "Pack",               retail: 4.99,   resellLow: 7,   resellHigh: 12,  heat: "🔥",      notes: "Bulk only. Don't buy singles to flip." },
  { id: 21, set: "Any Set",                            name: "Booster Display Box (36 packs)",                        type: "Booster Box",        retail: 179.99, resellLow: 220, resellHigh: 380, heat: "🔥🔥🔥",  notes: "Best per-pack economics at scale" },
  // === UPCOMING ===
  { id: 22, set: "Unova Heavy Hitter",                 name: "Elite Trainer Box",                                     type: "ETB",                retail: 44.99,  resellLow: 65,  resellHigh: 110, heat: "🔥🔥",    notes: "Best Buy Aug 1 — monitor closely" },
  { id: 23, set: "Mega Moonlight Tins",                name: "Gengar + Clefairy Tin Set",                             type: "Tin",                retail: 24.99,  resellLow: 40,  resellHigh: 70,  heat: "🔥🔥",    notes: "Target Jun 5" },
  { id: 24, set: "First Partner Illustration Collection", name: "Illustration Collection Set",                        type: "Premium Collection", retail: 49.99,  resellLow: 80,  resellHigh: 140, heat: "🔥🔥🔥",  notes: "Pokemon Center Jun 19 — watch for invite drop" },
];

const TYPES = ["All","ETB","UPC","Booster Bundle","Booster Box","Pin Collection","Tin","Mini Tin","Binder","Binder Set","Premium Collection","Pack","JP Set"];
const FEE_RATE = 0.13;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function calcMargin(retail, low, high) {
  if (!low) return null;
  return {
    netLow:  Math.round(low  * (1 - FEE_RATE) - retail),
    netHigh: Math.round(high * (1 - FEE_RATE) - retail),
  };
}

function roiPct(netHigh, retail) {
  return Math.round((netHigh / retail) * 100);
}

function barColor(pct) {
  if (pct > 80) return "#00ff88";
  if (pct > 40) return "#ffd700";
  if (pct > 15) return "#ff9900";
  return "#ff4444";
}

function ebayUrl(name) {
  return `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent("pokemon " + name)}&LH_Sold=1&LH_Complete=1`;
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function FoundSection({ productId, foundItems, setFoundItems }) {
  const [pendingStore, setPendingStore] = useState("");
  const [showInput, setShowInput] = useState(false);
  const entry = foundItems[productId];

  if (entry) {
    return (
      <div>
        <div style={styles.foundInfo}>✓ Spotted at {entry.store} · {entry.ts}</div>
        <button
          style={{ ...styles.foundBtn, ...styles.unfindBtn }}
          onClick={e => { e.stopPropagation(); setFoundItems(prev => { const n = { ...prev }; delete n[productId]; return n; }); }}
        >✕ REMOVE SIGHTING</button>
      </div>
    );
  }

  if (showInput) {
    return (
      <div onClick={e => e.stopPropagation()}>
        <div style={styles.storeInputRow}>
          <input
            style={styles.storeInput}
            placeholder="Store name (e.g. Walmart Chandler)"
            value={pendingStore}
            onChange={e => setPendingStore(e.target.value)}
          />
          <button
            style={styles.confirmBtn}
            onClick={e => {
              e.stopPropagation();
              setFoundItems(prev => ({
                ...prev,
                [productId]: { store: pendingStore.trim() || "Unknown Store", ts: new Date().toLocaleString() }
              }));
              setShowInput(false);
              setPendingStore("");
            }}
          >LOG IT</button>
        </div>
      </div>
    );
  }

  return (
    <button style={styles.foundBtn} onClick={e => { e.stopPropagation(); setShowInput(true); }}>
      📍 MARK AS FOUND
    </button>
  );
}

function ProductCard({ p, isOpen, onToggle, foundItems, setFoundItems }) {
  const [customPrice, setCustomPrice] = useState("");

  const effectiveRetail = customPrice !== "" ? (parseFloat(customPrice) || p.retail) : p.retail;
  const m = calcMargin(effectiveRetail, p.resellLow, p.resellHigh);
  const pct = m ? roiPct(m.netHigh, effectiveRetail) : 0;
  const bc = barColor(pct);
  const usingCustom = customPrice !== "";
  const isFound = !!foundItems[p.id];

  return (
    <div
      onClick={onToggle}
      style={{
        ...styles.card,
        ...(isOpen ? styles.cardOpen : {}),
        ...(isFound ? styles.cardFound : {}),
      }}
    >
      {/* TOP ROW */}
      <div style={styles.cardTop}>
        <div style={styles.cardLeft}>
          <div style={styles.badgeRow}>
            <span style={styles.typeBadge}>{p.type}</span>
            <span style={styles.heat}>{p.heat}</span>
            {isFound && <span style={styles.foundTag}>✓ SPOTTED</span>}
          </div>
          <div style={styles.cardName}>{p.name}</div>
          <div style={styles.cardSet}>{p.set}</div>
        </div>
        <div style={styles.cardRight}>
          <div style={styles.retailPrice}>${usingCustom ? effectiveRetail.toFixed(2) : p.retail}</div>
          <div style={styles.retailLabel}>{usingCustom ? "YOUR PRICE" : "RETAIL"}</div>
          {m ? (
            <>
              <div style={{ ...styles.flipRange, color: bc }}>+${m.netLow}–${m.netHigh}</div>
              <div style={styles.flipAfter}>after fees</div>
            </>
          ) : (
            <div style={{ ...styles.flipRange, color: "#555" }}>—</div>
          )}
        </div>
      </div>

      {/* MARGIN BAR */}
      {m && (
        <div style={styles.barWrap}>
          <div style={{ ...styles.barFill, width: `${Math.min(pct, 100)}%`, background: bc }} />
        </div>
      )}

      {/* EXPANDED DETAIL */}
      {isOpen && (
        <div style={styles.detail} onClick={e => e.stopPropagation()}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>MSRP / Retail</span>
            <span style={{ ...styles.detailVal, color: "#ffd700" }}>${p.retail}</span>
          </div>
          {p.resellLow && (
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>eBay Resell Range</span>
              <span style={styles.detailVal}>${p.resellLow} – ${p.resellHigh}</span>
            </div>
          )}
          {m && (
            <>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Est. Profit (after ~13% fees)</span>
                <span style={{ ...styles.detailVal, color: "#00ff88" }}>${m.netLow} – ${m.netHigh}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>ROI %</span>
                <span style={{ ...styles.detailVal, color: bc }}>
                  {Math.round((m.netLow / effectiveRetail) * 100)}% – {pct}%
                </span>
              </div>
            </>
          )}

          <div style={styles.notesBox}>💡 {p.notes}</div>

          {p.resellLow && (
            <a
              href={ebayUrl(p.name)}
              target="_blank"
              rel="noreferrer"
              style={styles.ebayBtn}
              onClick={e => e.stopPropagation()}
            >↗ VIEW SOLD LISTINGS ON EBAY</a>
          )}

          {/* PROFIT CALCULATOR */}
          <div style={styles.calcSection}>
            <div style={styles.calcLabel}>PROFIT CALCULATOR — ENTER YOUR ACTUAL PRICE</div>
            <div style={styles.calcRow}>
              <input
                style={styles.calcInput}
                type="number"
                placeholder={`$${p.retail}`}
                value={customPrice}
                step="0.01"
                min="0"
                onClick={e => e.stopPropagation()}
                onChange={e => setCustomPrice(e.target.value)}
              />
              {m && usingCustom ? (
                <span style={styles.calcResult}>
                  → net <span style={{ color: bc, fontWeight: 700 }}>${m.netLow}–${m.netHigh}</span>
                </span>
              ) : (
                <span style={styles.calcResult}>type to recalc</span>
              )}
            </div>
          </div>

          {/* MARK AS FOUND */}
          <FoundSection
            productId={p.id}
            foundItems={foundItems}
            setFoundItems={setFoundItems}
          />
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [flipOnly, setFlipOnly]     = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [foundItems, setFoundItems] = useState({});

  const toggleCard = useCallback(id => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PRODUCTS.filter(p => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.set.toLowerCase().includes(q) || p.type.toLowerCase().includes(q);
      const matchType = typeFilter === "All" || p.type === typeFilter;
      if (!matchQ || !matchType) return false;
      if (flipOnly) {
        const m = calcMargin(p.retail, p.resellLow, p.resellHigh);
        if (!m || roiPct(m.netHigh, p.retail) < 30) return false;
      }
      return true;
    });
  }, [search, typeFilter, flipOnly]);

  return (
    <div style={styles.root}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <span style={styles.logoIcon}>🎴</span>
          <div>
            <div style={styles.logoTitle}>POKE LOOTMINT</div>
            <div style={styles.logoSub}>PRICE RADAR v1 · HYPE SYSTEMS</div>
          </div>
        </div>
        <input
          style={styles.searchBox}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search set, product, type..."
        />
        <div style={styles.filterRow}>
          {TYPES.map(t => (
            <button
              key={t}
              style={{ ...styles.pill, ...(typeFilter === t ? styles.pillActive : {}) }}
              onClick={() => setTypeFilter(t)}
            >{t}</button>
          ))}
        </div>
        <div style={styles.toggleRow}>
          <span style={styles.toggleLabel}>FLIP FILTER</span>
          <button
            style={{ ...styles.toggleBtn, ...(flipOnly ? styles.toggleOn : {}) }}
            onClick={() => setFlipOnly(f => !f)}
          >{flipOnly ? "ON · ≥30% ROI ONLY" : "OFF · SHOW ALL"}</button>
        </div>
      </div>

      {/* LEGEND */}
      <div style={styles.legend}>
        <span><span style={{ color: "#00ff88" }}>■</span> Hot flip (&gt;80%)</span>
        <span><span style={{ color: "#ffd700" }}>■</span> Good (&gt;40%)</span>
        <span><span style={{ color: "#ff9900" }}>■</span> Thin (&gt;15%)</span>
        <span>~13% fees baked in</span>
      </div>

      {/* CARD LIST */}
      <div style={styles.cardList}>
        {filtered.length === 0 && (
          <div style={styles.noResults}>No products match. Try a different filter.</div>
        )}
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            p={p}
            isOpen={expandedId === p.id}
            onToggle={() => toggleCard(p.id)}
            foundItems={foundItems}
            setFoundItems={setFoundItems}
          />
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div style={styles.bottomBar}>
        {filtered.length} products · Tap any card for margin breakdown · eBay sold link inside
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
  root: { minHeight: "100vh", background: "#0a0a0f", fontFamily: "'Courier New', monospace", color: "#e8e0d0", paddingBottom: 80 },
  header: { background: "linear-gradient(135deg,#1a1008,#0d0d1a 50%,#0a1a0a)", borderBottom: "1px solid #ffd70033", padding: "16px 14px 12px", position: "sticky", top: 0, zIndex: 20 },
  logoRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  logoIcon: { fontSize: 22 },
  logoTitle: { fontSize: 17, fontWeight: 700, letterSpacing: 2, color: "#ffd700" },
  logoSub: { fontSize: 10, color: "#666", letterSpacing: 3 },
  searchBox: { width: "100%", background: "#ffffff0d", border: "1px solid #ffd70044", borderRadius: 8, padding: "9px 13px", color: "#e8e0d0", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  filterRow: { display: "flex", gap: 6, marginTop: 9, overflowX: "auto", paddingBottom: 2 },
  pill: { background: "#ffffff08", color: "#888", border: "none", borderRadius: 20, padding: "5px 11px", fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", cursor: "pointer", letterSpacing: 0.5, fontFamily: "inherit" },
  pillActive: { background: "#ffd700", color: "#0a0a0f" },
  toggleRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px solid #ffffff14" },
  toggleLabel: { fontSize: 11, color: "#888", letterSpacing: 0.5 },
  toggleBtn: { background: "#ffffff08", border: "1px solid #ffffff14", borderRadius: 12, padding: "3px 10px", fontSize: 10, color: "#888", cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 },
  toggleOn: { background: "#00ff8822", borderColor: "#00ff8844", color: "#00ff88" },
  legend: { display: "flex", gap: 14, padding: "8px 14px", fontSize: 10, color: "#555", borderBottom: "1px solid #ffffff08", flexWrap: "wrap" },
  cardList: { padding: "8px 10px" },
  card: { background: "#ffffff04", border: "1px solid #ffffff0a", borderRadius: 10, padding: "11px 13px", marginBottom: 7, cursor: "pointer" },
  cardOpen: { background: "#ffffff08", borderColor: "#ffd70044" },
  cardFound: { borderColor: "#00ff8844", background: "#00ff880a" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
  cardLeft: { flex: 1, minWidth: 0 },
  badgeRow: { display: "flex", alignItems: "center", gap: 5, marginBottom: 3 },
  typeBadge: { background: "#ffffff10", color: "#888", fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 700 },
  heat: { fontSize: 12 },
  foundTag: { background: "#00ff8820", color: "#00ff88", fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 700 },
  cardName: { fontSize: 13, fontWeight: 700, color: "#e8e0d0", lineHeight: 1.3, marginBottom: 2 },
  cardSet: { fontSize: 10, color: "#666" },
  cardRight: { textAlign: "right", flexShrink: 0 },
  retailPrice: { fontSize: 19, fontWeight: 700, color: "#ffd700" },
  retailLabel: { fontSize: 9, color: "#555", marginBottom: 3 },
  flipRange: { fontSize: 13, fontWeight: 700 },
  flipAfter: { fontSize: 10, color: "#777" },
  barWrap: { marginTop: 9, height: 3, background: "#ffffff08", borderRadius: 2 },
  barFill: { height: "100%", borderRadius: 2 },
  detail: { marginTop: 12, paddingTop: 12, borderTop: "1px solid #ffffff0d", display: "flex", flexDirection: "column", gap: 7 },
  detailRow: { display: "flex", justifyContent: "space-between", fontSize: 12 },
  detailLabel: { color: "#555" },
  detailVal: { fontWeight: 700 },
  notesBox: { background: "#ffffff08", borderRadius: 6, padding: "7px 9px", fontSize: 11, color: "#aaa" },
  ebayBtn: { display: "block", background: "#0064d244", border: "1px solid #0064d288", borderRadius: 6, padding: "7px 10px", fontSize: 11, color: "#4da6ff", textAlign: "center", textDecoration: "none", fontWeight: 700, letterSpacing: 0.5 },
  calcSection: { marginTop: 8, paddingTop: 8, borderTop: "1px solid #ffffff0d" },
  calcLabel: { fontSize: 10, color: "#666", letterSpacing: 0.5, marginBottom: 5 },
  calcRow: { display: "flex", gap: 7, alignItems: "center" },
  calcInput: { background: "#ffffff0d", border: "1px solid #ffd70044", borderRadius: 6, padding: "5px 9px", color: "#e8e0d0", fontSize: 13, width: 100, outline: "none", fontFamily: "inherit" },
  calcResult: { fontSize: 12, color: "#888" },
  foundBtn: { background: "#00ff8810", border: "1px solid #00ff8833", borderRadius: 6, padding: "6px 10px", fontSize: 10, color: "#00ff88", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, letterSpacing: 0.5, width: "100%", textAlign: "center" },
  unfindBtn: { background: "#ff444410", borderColor: "#ff444433", color: "#ff4444" },
  storeInputRow: { display: "flex", gap: 6, marginTop: 5 },
  storeInput: { background: "#ffffff0d", border: "1px solid #ffffff20", borderRadius: 6, padding: "4px 8px", color: "#e8e0d0", fontSize: 11, outline: "none", fontFamily: "inherit", flex: 1 },
  confirmBtn: { background: "#00ff8822", border: "1px solid #00ff8866", borderRadius: 6, padding: "4px 10px", fontSize: 10, color: "#00ff88", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, whiteSpace: "nowrap" },
  foundInfo: { fontSize: 10, color: "#555", marginBottom: 4 },
  bottomBar: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a0a0f", borderTop: "1px solid #ffd70022", padding: "9px 14px", fontSize: 10, color: "#444", textAlign: "center" },
  noResults: { textAlign: "center", padding: "40px 20px", color: "#444", fontSize: 12 },
};