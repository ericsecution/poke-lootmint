import { useState, useMemo, useCallback } from 'react';

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const PRODUCTS = [
	// === MEGA EVOLUTION ===
	{
		id: 1,
		set: 'Mega Evolution',
		name: 'Ascended Heroes ETB',
		type: 'ETB',
		retail: 59.99,
		resellLow: 90,
		resellHigh: 140,
		heat: '🔥🔥🔥',
		notes: 'Dragonite holo — high demand',
	},
	{
		id: 2,
		set: 'Mega Evolution',
		name: 'Ascended Heroes First Partners Deluxe Pin Collection',
		type: 'Pin Collection',
		retail: 34.99,
		resellLow: 55,
		resellHigh: 80,
		heat: '🔥🔥',
		notes: 'AJ confirmed retail ~$30',
	},
	{
		id: 3,
		set: 'Mega Evolution',
		name: 'Perfect Order Booster Bundle',
		type: 'Booster Bundle',
		retail: 44.99,
		resellLow: 60,
		resellHigh: 85,
		heat: '🔥🔥',
		notes: '6-pack bundle',
	},
	{
		id: 4,
		set: 'Mega Evolution',
		name: 'Chaos Rising ETB',
		type: 'ETB',
		retail: 59.99,
		resellLow: 100,
		resellHigh: 160,
		heat: '🔥🔥🔥',
		notes: 'Pokemon Center exclusive — no warning drops',
	},
	{
		id: 5,
		set: 'Mega Evolution',
		name: 'Pitch Black ETB',
		type: 'ETB',
		retail: 59.99,
		resellLow: 85,
		resellHigh: 130,
		heat: '🔥🔥',
		notes: 'Strong resell, solid flip',
	},
	{
		id: 6,
		set: 'Mega Evolution',
		name: 'Abyss Eye JP Set Release',
		type: 'JP Set',
		retail: 34.99,
		resellLow: 50,
		resellHigh: 90,
		heat: '🔥',
		notes: 'Japan import — niche buyer pool',
	},
	{
		id: 7,
		set: 'Mega Evolution',
		name: 'Storm Emeralda JP Set Release',
		type: 'JP Set',
		retail: 34.99,
		resellLow: 50,
		resellHigh: 85,
		heat: '🔥',
		notes: 'Japan import',
	},
	{
		id: 8,
		set: 'Mega Evolution',
		name: 'Pitch Black ENG Set Release',
		type: 'Booster Box',
		retail: 59.99,
		resellLow: 90,
		resellHigh: 180,
		heat: '🔥🔥🔥',
		notes: 'Booster box — high ceiling',
	},
	// === PRISMATIC EVOLUTIONS ===
	{
		id: 9,
		set: 'Prismatic Evolutions (8.5)',
		name: 'Elite Trainer Box',
		type: 'ETB',
		retail: 59.99,
		resellLow: 140,
		resellHigh: 220,
		heat: '🔥🔥🔥🔥',
		notes: 'Still the hottest set. Evergreen demand.',
	},
	{
		id: 10,
		set: 'Prismatic Evolutions (8.5)',
		name: 'Mini Tin (1 Random Art)',
		type: 'Mini Tin',
		retail: 24.99,
		resellLow: 40,
		resellHigh: 65,
		heat: '🔥🔥🔥',
		notes: 'Amazon alert format — watch for restocks',
	},
	{
		id: 11,
		set: 'Prismatic Evolutions (8.5)',
		name: 'Binder Collection',
		type: 'Binder',
		retail: 24.99,
		resellLow: 45,
		resellHigh: 75,
		heat: '🔥🔥',
		notes: 'Sought after for the binder itself',
	},
	{
		id: 12,
		set: 'Prismatic Evolutions (8.5)',
		name: 'Booster Bundle',
		type: 'Booster Bundle',
		retail: 29.99,
		resellLow: 55,
		resellHigh: 90,
		heat: '🔥🔥🔥',
		notes: '6 packs — easy flip',
	},
	// === BLACK BOLT / WHITE FLARE ===
	{
		id: 13,
		set: 'Black Bolt / White Flare',
		name: 'Black Bolt White Flare Binder & Post',
		type: 'Binder Set',
		retail: 29.99,
		resellLow: 45,
		resellHigh: 70,
		heat: '🔥🔥',
		notes: "Sam's Club April 14 drop",
	},
	// === STANDARD REFERENCE ===
	{
		id: 14,
		set: 'Any Set',
		name: 'Elite Trainer Box (ETB) — standard',
		type: 'ETB',
		retail: 59.99,
		resellLow: null,
		resellHigh: null,
		heat: 'varies',
		notes: 'Base MSRP for all ETBs. AJ confirmed.',
	},
	{
		id: 15,
		set: 'Any Set',
		name: 'Ultra Premium Collection (UPC)',
		type: 'UPC',
		retail: 119.99,
		resellLow: 150,
		resellHigh: 300,
		heat: '🔥🔥🔥',
		notes: 'High margin but needs right set',
	},
	{
		id: 16,
		set: 'Any Set',
		name: 'Premium Collection Box',
		type: 'Premium Collection',
		retail: 39.99,
		resellLow: 55,
		resellHigh: 90,
		heat: '🔥🔥',
		notes: 'Mid-tier, consistent',
	},
	{
		id: 17,
		set: 'Any Set',
		name: 'Booster Bundle (6 packs)',
		type: 'Booster Bundle',
		retail: 29.99,
		resellLow: 40,
		resellHigh: 60,
		heat: '🔥',
		notes: 'Low margin, move volume',
	},
	{
		id: 18,
		set: 'Any Set',
		name: 'Pin Collection',
		type: 'Pin Collection',
		retail: 19.99,
		resellLow: 30,
		resellHigh: 55,
		heat: '🔥',
		notes: 'Entry-level, good for bulk',
	},
	{
		id: 19,
		set: 'Any Set',
		name: 'Deluxe Pin Collection',
		type: 'Pin Collection',
		retail: 34.99,
		resellLow: 50,
		resellHigh: 80,
		heat: '🔥🔥',
		notes: 'Better margin than standard pin',
	},
	{
		id: 20,
		set: 'Any Set',
		name: 'Booster Pack (single)',
		type: 'Pack',
		retail: 4.99,
		resellLow: 7,
		resellHigh: 12,
		heat: '🔥',
		notes: "Bulk only. Don't buy singles to flip.",
	},
	{
		id: 21,
		set: 'Any Set',
		name: 'Booster Display Box (36 packs)',
		type: 'Booster Box',
		retail: 179.99,
		resellLow: 220,
		resellHigh: 380,
		heat: '🔥🔥🔥',
		notes: 'Best per-pack economics at scale',
	},
	// === UPCOMING ===
	{
		id: 22,
		set: 'Unova Heavy Hitter',
		name: 'Elite Trainer Box',
		type: 'ETB',
		retail: 44.99,
		resellLow: 65,
		resellHigh: 110,
		heat: '🔥🔥',
		notes: 'Best Buy Aug 1 — monitor closely',
	},
	{
		id: 23,
		set: 'Mega Moonlight Tins',
		name: 'Gengar + Clefairy Tin Set',
		type: 'Tin',
		retail: 24.99,
		resellLow: 40,
		resellHigh: 70,
		heat: '🔥🔥',
		notes: 'Target Jun 5',
	},
	{
		id: 24,
		set: 'First Partner Illustration Collection',
		name: 'Illustration Collection Set',
		type: 'Premium Collection',
		retail: 49.99,
		resellLow: 80,
		resellHigh: 140,
		heat: '🔥🔥🔥',
		notes: 'Pokemon Center Jun 19 — watch for invite drop',
	},
];

const TYPES = [
	'All',
	'ETB',
	'UPC',
	'Booster Bundle',
	'Booster Box',
	'Pin Collection',
	'Tin',
	'Mini Tin',
	'Binder',
	'Binder Set',
	'Premium Collection',
	'Pack',
	'JP Set',
];

// ─── CONFIG ────────────────────────────────────────────────────────────────
const FEE_RATE = 0.13;

// ─── HELPERS ───────────────────────────────────────────────────────────────
function calcMargin(retail, low, high) {
	if (!low) return null;
	return {
		netLow: Math.round(low * (1 - FEE_RATE) - retail),
		netHigh: Math.round(high * (1 - FEE_RATE) - retail),
	};
}
function roiPct(netHigh, retail) {
	return Math.round((netHigh / retail) * 100);
}
function barColor(pct) {
	if (pct > 80) return '#00ff88';
	if (pct > 40) return '#ffd700';
	if (pct > 15) return '#ff9900';
	return '#ff4444';
}
function ebayUrl(name) {
	return `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent('pokemon ' + name)}&LH_Sold=1&LH_Complete=1`;
}
function getSignal(pct) {
	if (pct >= 60) return { label: 'BUY', color: '#00ff88' };
	if (pct >= 25) return { label: 'HOLD', color: '#ffd700' };
	return { label: 'SKIP', color: '#ff4444' };
}

// ─── FOUND SECTION ─────────────────────────────────────────────────────────
function FoundSection({ productId, foundItems, setFoundItems }) {
	const [pendingStore, setPendingStore] = useState('');
	const [showInput, setShowInput] = useState(false);
	const entry = foundItems[productId];

	if (entry) {
		return (
			<div>
				<div style={styles.foundInfo}>✓ Spotted at {entry.store} · {entry.ts}</div>
				<button
					style={{ ...styles.foundBtn, ...styles.unfindBtn }}
					onClick={(e) => {
						e.stopPropagation();
						setFoundItems((prev) => {
							const n = { ...prev };
							delete n[productId];
							return n;
						});
					}}>
					✕ REMOVE SIGHTING
				</button>
			</div>
		);
	}

	if (showInput) {
		return (
			<div onClick={(e) => e.stopPropagation()}>
				<div style={styles.storeInputRow}>
					<input
						style={styles.storeInput}
						placeholder='Store name'
						value={pendingStore}
						onChange={(e) => setPendingStore(e.target.value)}
					/>
					<button
						style={styles.confirmBtn}
						onClick={(e) => {
							e.stopPropagation();
							setFoundItems((prev) => ({
								...prev,
								[productId]: {
									store: pendingStore.trim() || 'Unknown',
									ts: new Date().toLocaleString(),
								},
							}));
							setShowInput(false);
							setPendingStore('');
						}}>
						LOG
					</button>
				</div>
			</div>
		);
	}

	return (
		<button
			style={styles.foundBtn}
			onClick={(e) => {
				e.stopPropagation();
				setShowInput(true);
			}}>
			📍 MARK AS FOUND
		</button>
	);
}

// ─── PRODUCT CARD ───────────────────────────────────────────────────────────
// v3: BUY/HOLD/SKIP is the hero. Everything else supports it.
function ProductCard({ p, isOpen, onToggle, foundItems, setFoundItems }) {
	const [customPrice, setCustomPrice] = useState('');

	// Use custom price if entered, fall back to retail
	const effectiveRetail = customPrice !== '' ? parseFloat(customPrice) || p.retail : p.retail;
	const m = calcMargin(effectiveRetail, p.resellLow, p.resellHigh);
	const pct = m ? roiPct(m.netHigh, effectiveRetail) : 0;
	const bc = barColor(pct);
	const signal = getSignal(pct);
	const isFound = !!foundItems[p.id];

	return (
		<div
			onClick={onToggle}
			style={{
				...styles.card,
				...(isOpen ? styles.cardOpen : {}),
				...(isFound ? styles.cardFound : {}),
				// Left border color signals the decision at a glance before eyes even focus
				borderLeft: m ? `3px solid ${signal.color}66` : '3px solid #ffffff0a',
			}}>

			{/* ── ROW 1: SIGNAL HERO + HEAT ── */}
			{/* BUY/HOLD/SKIP is the first and largest element. No exceptions. */}
			<div style={styles.signalRow}>
				<div
					style={{
						...styles.signalHero,
						color: m ? signal.color : '#444',
					}}>
					{m ? signal.label : '—'}
				</div>
				<div style={styles.signalRowRight}>
					<span style={styles.heat}>{p.heat}</span>
					{isFound && <span style={styles.foundTag}>✓ IN STORE</span>}
				</div>
			</div>

			{/* ── ROW 2: PROFIT RANGE ── */}
			{m && (
				<div style={{ ...styles.profitRange, color: bc }}>
					+${m.netLow}–${m.netHigh}{' '}
					<span style={styles.afterFees}>after fees</span>
				</div>
			)}

			{/* ── ROW 3: PRODUCT NAME ── */}
			<div style={styles.cardName}>{p.name}</div>

			{/* ── ROW 4: TYPE BADGE + RETAIL (supporting info) ── */}
			<div style={styles.supportingRow}>
				<span style={styles.typeBadge}>{p.type}</span>
				<span style={styles.retailSmall}>${p.retail} retail</span>
				{!m && <span style={{ ...styles.typeBadge, color: '#555' }}>no data</span>}
			</div>

			{/* ── MARGIN BAR (visual reinforcement) ── */}
			{m && (
				<div style={styles.barWrap}>
					<div
						style={{
							...styles.barFill,
							width: `${Math.min(pct, 100)}%`,
							background: bc,
						}}
					/>
				</div>
			)}

			{/* ── EXPANDED DETAIL (tap to open) ── */}
			{isOpen && (
				<div style={styles.detail} onClick={(e) => e.stopPropagation()}>

					{/* Detail rows: eBay range, margin, ROI */}
					{m && (
						<>
							<div style={styles.detailRow}>
								<span style={styles.detailLabel}>eBay low (est.)</span>
								<span style={styles.detailVal}>${p.resellLow}</span>
							</div>
							<div style={styles.detailRow}>
								<span style={styles.detailLabel}>eBay high (est.)</span>
								<span style={styles.detailVal}>${p.resellHigh}</span>
							</div>
							<div style={styles.detailRow}>
								<span style={styles.detailLabel}>Net profit range</span>
								<span style={{ ...styles.detailVal, color: bc }}>+${m.netLow}–${m.netHigh}</span>
							</div>
							<div style={styles.detailRow}>
								<span style={styles.detailLabel}>ROI (high estimate)</span>
								<span style={{ ...styles.detailVal, color: bc }}>{pct}%</span>
							</div>
							<div style={styles.detailRow}>
								<span style={styles.detailLabel}>eBay fee rate</span>
								<span style={styles.detailVal}>{(FEE_RATE * 100).toFixed(0)}%</span>
							</div>
						</>
					)}

					{/* Notes */}
					{p.notes && <div style={styles.notesBox}>{p.notes}</div>}

					{/* Custom price override — recalculates everything above */}
					<div style={styles.calcSection}>
						<div style={styles.calcLabel}>CUSTOM PRICE OVERRIDE</div>
						<div style={styles.calcRow}>
							<input
								value={customPrice}
								onChange={(e) => setCustomPrice(e.target.value)}
								placeholder={`$${p.retail} (default)`}
								style={styles.calcInput}
							/>
							{customPrice && m && (
								<span style={{ ...styles.calcResult, color: bc }}>
									→ {pct}% ROI
								</span>
							)}
						</div>
					</div>

					{/* eBay sold listings deep link */}
					<a
						href={ebayUrl(p.name)}
						target="_blank"
						rel="noreferrer"
						style={styles.ebayBtn}>
						VIEW SOLD ON EBAY →
					</a>

					{/* Mark as Found with store + timestamp */}
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

// ─── APP ────────────────────────────────────────────────────────────────────
export default function App() {
	const [search, setSearch] = useState('');
	const [expandedId, setExpandedId] = useState(null);
	const [foundItems, setFoundItems] = useState({});
	const [typeFilter, setTypeFilter] = useState('All');
	const [worthFlipping, setWorthFlipping] = useState(false); // ROI ≥ 30% filter

	const toggleCard = useCallback((id) => {
		setExpandedId((prev) => (prev === id ? null : id));
	}, []);

	const filtered = useMemo(() => {
		const q = search.toLowerCase();
		return PRODUCTS.filter((p) => {
			const matchesSearch = p.name.toLowerCase().includes(q);
			const matchesType = typeFilter === 'All' || p.type === typeFilter;
			if (!matchesSearch || !matchesType) return false;
			// Worth Flipping toggle: only show cards with ROI ≥ 30%
			if (worthFlipping) {
				const m = calcMargin(p.retail, p.resellLow, p.resellHigh);
				if (!m) return false;
				return roiPct(m.netHigh, p.retail) >= 30;
			}
			return true;
		});
	}, [search, typeFilter, worthFlipping]);

	return (
		<div style={styles.root}>

			{/* ── HEADER ── */}
			<div style={styles.header}>
				<div style={styles.logoRow}>
					<span style={styles.logoIcon}>⚡</span>
					<div>
						<div style={styles.logoTitle}>POKEMINT</div>
						<div style={styles.logoSub}>FLIP INTELLIGENCE · v3</div>
					</div>
				</div>

				{/* Search */}
				<input
					style={styles.searchBox}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search products...'
				/>

				{/* Type filter pills */}
				<div style={styles.filterRow}>
					{TYPES.map((t) => (
						<button
							key={t}
							onClick={() => setTypeFilter(t)}
							style={{
								...styles.pill,
								...(typeFilter === t ? styles.pillActive : {}),
							}}>
							{t}
						</button>
					))}
				</div>

				{/* Worth Flipping toggle */}
				<div style={styles.toggleRow}>
					<span style={styles.toggleLabel}>⚡ WORTH FLIPPING ONLY (ROI ≥ 30%)</span>
					<button
						onClick={() => setWorthFlipping((v) => !v)}
						style={{ ...styles.toggleBtn, ...(worthFlipping ? styles.toggleOn : {}) }}>
						{worthFlipping ? 'ON' : 'OFF'}
					</button>
				</div>
			</div>

			{/* ── CARD LIST ── */}
			<div style={styles.cardList}>
				{filtered.length === 0 && (
					<div style={styles.noResults}>No products match your filters.</div>
				)}
				{filtered.map((p) => (
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

			{/* ── BOTTOM BAR ── */}
			<div style={styles.bottomBar}>POKEMINT · HYPE SYSTEMS · v3.0.0</div>
		</div>
	);
}

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = {
	// ── Layout
	root: {
		minHeight: '100vh',
		background: '#0a0a0f',
		fontFamily: "'Courier New', monospace",
		color: '#e8e0d0',
		paddingBottom: 80,
	},

	// ── Header
	header: {
		background: 'linear-gradient(135deg,#1a1008,#0d0d1a 50%,#0a1a0a)',
		borderBottom: '1px solid #ffd70033',
		padding: '16px 14px 12px',
		position: 'sticky',
		top: 0,
		zIndex: 20,
	},
	logoRow: {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		marginBottom: 12,
	},
	logoIcon: { fontSize: 22 },
	logoTitle: {
		fontSize: 17,
		fontWeight: 700,
		letterSpacing: 2,
		color: '#ffd700',
	},
	logoSub: { fontSize: 10, color: '#666', letterSpacing: 3 },
	searchBox: {
		width: '100%',
		background: '#ffffff0d',
		border: '1px solid #ffd70044',
		borderRadius: 8,
		padding: '9px 13px',
		color: '#e8e0d0',
		fontSize: 13,
		outline: 'none',
		boxSizing: 'border-box',
		fontFamily: 'inherit',
	},
	filterRow: {
		display: 'flex',
		gap: 6,
		marginTop: 9,
		overflowX: 'auto',
		paddingBottom: 2,
	},
	pill: {
		background: '#ffffff08',
		color: '#888',
		border: 'none',
		borderRadius: 20,
		padding: '5px 11px',
		fontSize: 10,
		fontWeight: 700,
		whiteSpace: 'nowrap',
		cursor: 'pointer',
		letterSpacing: 0.5,
		fontFamily: 'inherit',
	},
	pillActive: { background: '#ffd700', color: '#0a0a0f' },
	toggleRow: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 8,
		paddingTop: 8,
		borderTop: '1px solid #ffffff14',
	},
	toggleLabel: { fontSize: 11, color: '#888', letterSpacing: 0.5 },
	toggleBtn: {
		background: '#ffffff08',
		border: '1px solid #ffffff14',
		borderRadius: 12,
		padding: '3px 10px',
		fontSize: 10,
		color: '#888',
		cursor: 'pointer',
		fontFamily: 'inherit',
		letterSpacing: 0.5,
	},
	toggleOn: {
		background: '#00ff8822',
		borderColor: '#00ff8844',
		color: '#00ff88',
	},

	// ── Card list
	cardList: { padding: '8px 10px' },
	noResults: {
		textAlign: 'center',
		padding: '40px 20px',
		color: '#444',
		fontSize: 12,
	},

	// ── Card shell
	card: {
		background: '#ffffff04',
		border: '1px solid #ffffff0a',
		borderRadius: 10,
		padding: '12px 13px',
		marginBottom: 7,
		cursor: 'pointer',
	},
	cardOpen: { background: '#ffffff08', borderColor: '#ffd70044' },
	cardFound: { background: '#00ff880a' },

	// ── v3 SIGNAL HERO — row 1
	// Signal is the first element. Largest text. No exceptions.
	signalRow: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 2,
	},
	signalHero: {
		fontSize: 34,        // Hero size. Elias flagged it. Calen set it. Locked.
		fontWeight: 800,
		letterSpacing: 1,
		lineHeight: 1.1,
	},
	signalRowRight: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		gap: 4,
	},
	heat: { fontSize: 16 },
	foundTag: {
		background: '#00ff8820',
		color: '#00ff88',
		fontSize: 9,
		padding: '2px 6px',
		borderRadius: 4,
		fontWeight: 700,
	},

	// ── v3 PROFIT RANGE — row 2
	profitRange: {
		fontSize: 16,
		fontWeight: 700,
		marginBottom: 6,
	},
	afterFees: {
		fontSize: 11,
		color: '#666',
		fontWeight: 400,
	},

	// ── v3 PRODUCT NAME — row 3
	cardName: {
		fontSize: 13,
		fontWeight: 700,
		color: '#e8e0d0',
		lineHeight: 1.3,
		marginBottom: 4,
	},

	// ── v3 SUPPORTING INFO — row 4 (type badge + retail price)
	supportingRow: {
		display: 'flex',
		alignItems: 'center',
		gap: 8,
		marginBottom: 6,
	},
	typeBadge: {
		background: '#ffffff10',
		color: '#888',
		fontSize: 9,
		padding: '2px 6px',
		borderRadius: 4,
		fontWeight: 700,
	},
	retailSmall: {
		fontSize: 11,
		color: '#666',
	},

	// ── MARGIN BAR — row 5 (visual reinforcement)
	barWrap: {
		marginTop: 4,
		height: 3,
		background: '#ffffff08',
		borderRadius: 2,
	},
	barFill: { height: '100%', borderRadius: 2 },

	// ── EXPANDED DETAIL
	detail: {
		marginTop: 12,
		paddingTop: 12,
		borderTop: '1px solid #ffffff0d',
		display: 'flex',
		flexDirection: 'column',
		gap: 7,
	},
	detailRow: {
		display: 'flex',
		justifyContent: 'space-between',
		fontSize: 12,
	},
	detailLabel: { color: '#555' },
	detailVal: { fontWeight: 700 },
	notesBox: {
		background: '#ffffff08',
		borderRadius: 6,
		padding: '7px 9px',
		fontSize: 11,
		color: '#aaa',
	},
	calcSection: {
		marginTop: 4,
		paddingTop: 8,
		borderTop: '1px solid #ffffff0d',
	},
	calcLabel: {
		fontSize: 10,
		color: '#666',
		letterSpacing: 0.5,
		marginBottom: 5,
	},
	calcRow: { display: 'flex', gap: 7, alignItems: 'center' },
	calcInput: {
		background: '#ffffff0d',
		border: '1px solid #ffd70044',
		borderRadius: 6,
		padding: '5px 9px',
		color: '#e8e0d0',
		fontSize: 13,
		width: 140,
		outline: 'none',
		fontFamily: 'inherit',
	},
	calcResult: { fontSize: 12, fontWeight: 700 },
	ebayBtn: {
		display: 'block',
		background: '#0064d244',
		border: '1px solid #0064d288',
		borderRadius: 6,
		padding: '7px 10px',
		fontSize: 11,
		color: '#4da6ff',
		textAlign: 'center',
		textDecoration: 'none',
		fontWeight: 700,
		letterSpacing: 0.5,
	},

	// ── FOUND SECTION
	foundBtn: {
		background: '#00ff8810',
		border: '1px solid #00ff8833',
		borderRadius: 6,
		padding: '6px 10px',
		fontSize: 10,
		color: '#00ff88',
		cursor: 'pointer',
		fontFamily: 'inherit',
		fontWeight: 700,
		letterSpacing: 0.5,
		width: '100%',
		textAlign: 'center',
	},
	unfindBtn: {
		background: '#ff444410',
		borderColor: '#ff444433',
		color: '#ff4444',
	},
	storeInputRow: { display: 'flex', gap: 6 },
	storeInput: {
		background: '#ffffff0d',
		border: '1px solid #ffffff20',
		borderRadius: 6,
		padding: '4px 8px',
		color: '#e8e0d0',
		fontSize: 11,
		outline: 'none',
		fontFamily: 'inherit',
		flex: 1,
	},
	confirmBtn: {
		background: '#00ff8822',
		border: '1px solid #00ff8866',
		borderRadius: 6,
		padding: '4px 10px',
		fontSize: 10,
		color: '#00ff88',
		cursor: 'pointer',
		fontFamily: 'inherit',
		fontWeight: 700,
		whiteSpace: 'nowrap',
	},
	foundInfo: { fontSize: 10, color: '#555', marginBottom: 4 },

	// ── Bottom bar
	bottomBar: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		background: '#0a0a0f',
		borderTop: '1px solid #ffd70022',
		padding: '9px 14px',
		fontSize: 10,
		color: '#444',
		textAlign: 'center',
		letterSpacing: 1,
	},
};