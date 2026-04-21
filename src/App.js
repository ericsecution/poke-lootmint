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
// ─── CONFIG ───────────────────────────────────────────────────
const FEE_RATE = 0.13;
// ─── HELPERS ──────────────────────────────────────────────────

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
// ─── FOUND SECTION ───────────────────────────────────────────

function FoundSection({ productId, foundItems, setFoundItems }) {
	const [pendingStore, setPendingStore] = useState('');
	const [showInput, setShowInput] = useState(false);
	const entry = foundItems[productId];
	if (entry) {
		return (
			<div>
				{' '}
				<div style={styles.foundInfo}>
					{' '}
					✓ Spotted at {entry.store} · {entry.ts}{' '}
				</div>{' '}
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
					{' '}
					✕ REMOVE SIGHTING{' '}
				</button>{' '}
			</div>
		);
	}
	if (showInput) {
		return (
			<div onClick={(e) => e.stopPropagation()}>
				{' '}
				<div style={styles.storeInputRow}>
					{' '}
					<input
						style={styles.storeInput}
						placeholder='Store name'
						value={pendingStore}
						onChange={(e) => setPendingStore(e.target.value)}
					/>{' '}
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
						{' '}
						LOG{' '}
					</button>{' '}
				</div>{' '}
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
			{' '}
			📍 MARK AS FOUND{' '}
		</button>
	);
}

// ─── PRODUCT CARD ───────────────────────────────────────────

function ProductCard({ p, isOpen, onToggle, foundItems, setFoundItems }) {
	const [customPrice, setCustomPrice] = useState('');
	const effectiveRetail =
		customPrice !== '' ? parseFloat(customPrice) || p.retail : p.retail;
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
			}}>
			{' '}
			<div style={styles.cardTop}>
				{' '}
				<div style={styles.cardLeft}>
					{' '}
					<div style={styles.badgeRow}>
						{' '}
						<span style={styles.typeBadge}>{p.type}</span>{' '}
						<span>{p.heat}</span>{' '}
						{isFound && <span style={styles.foundTag}>✓</span>}{' '}
					</div>{' '}
					<div style={styles.cardName}>{p.name}</div>{' '}
					<div style={styles.cardSet}>{p.set}</div>{' '}
				</div>{' '}
				<div style={styles.cardRight}>
					{' '}
					{m ? (
						<>
							{' '}
							<div style={{ ...styles.profitMain, color: bc }}>
								{' '}
								+${m.netLow}-{m.netHigh}{' '}
							</div>{' '}
							<div
								style={{
									...styles.signalBadge,
									background: signal.color + '22',
									color: signal.color,
								}}>
								{' '}
								{signal.label}{' '}
							</div>{' '}
							<div style={styles.profitSub}>after fees</div>{' '}
						</>
					) : (
						<div style={styles.profitMain}>—</div>
					)}{' '}
				</div>{' '}
			</div>{' '}
			{m && (
				<div style={styles.barWrap}>
					{' '}
					<div
						style={{
							...styles.barFill,
							width: `${Math.min(pct, 100)}%`,
							background: bc,
						}}
					/>{' '}
				</div>
			)}{' '}
			{isOpen && (
  <div style={styles.detail} onClick={(e) => e.stopPropagation()}>

    {/* 🔹 CUSTOM PRICE INPUT */}
    <div style={{ marginBottom: 10 }}>
      <input
        value={customPrice}
        onChange={(e) => setCustomPrice(e.target.value)}
        placeholder="Enter custom price"
        style={{
          width: '100%',
          padding: '6px',
          background: '#111',
          border: '1px solid #333',
          color: '#fff'
        }}
      />
    </div>

    {/* 🔹 EXISTING CONTENT BELOW (leave yours here) */}
    <a
      href={ebayUrl(p.name)}
      target="_blank"
      rel="noreferrer"
      style={styles.ebayBtn}
    >
      VIEW SOLD ON EBAY →
    </a>

    <FoundSection
      productId={p.id}
      foundItems={foundItems}
      setFoundItems={setFoundItems}
    />

  </div>
)}
      {' '}
		</div>
	);
}
// ─── APP ─────────────────────────────────────────────────────

export default function App() {
	const [search, setSearch] = useState('');
	const [expandedId, setExpandedId] = useState(null);
	const [foundItems, setFoundItems] = useState({});
  const [typeFilter, setTypeFilter] = useState('All');
	const toggleCard = useCallback((id) => {
		setExpandedId((prev) => (prev === id ? null : id));
	}, []);
const filtered = useMemo(() => {
  const q = search.toLowerCase();

  return PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(q);
    const matchesType = typeFilter === 'All' || p.type === typeFilter;

    return matchesSearch && matchesType;
  });
}, [search, typeFilter]);
	return (
		<div style={styles.root}>
			{' '}
			<input
				style={styles.searchBox}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Search...'
			/>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
  {TYPES.map((t) => (
    <button
      key={t}
      onClick={() => setTypeFilter(t)}
      style={{
        padding: '4px 10px',
        background: typeFilter === t ? '#ffd700' : '#222',
        color: typeFilter === t ? '#000' : '#aaa',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer'
      }}
    >
      {t}
    </button>
  ))}
</div>
      {' '}
			{filtered.map((p) => (
				<ProductCard
					key={p.id}
					p={p}
					isOpen={expandedId === p.id}
					onToggle={() => toggleCard(p.id)}
					foundItems={foundItems}
					setFoundItems={setFoundItems}
				/>
			))}{' '}
		</div>
	);
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
	root: {
		minHeight: '100vh',
		background: '#0a0a0f',
		fontFamily: "'Courier New', monospace",
		color: '#e8e0d0',
		paddingBottom: 80,
	},
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
	legend: {
		display: 'flex',
		gap: 14,
		padding: '8px 14px',
		fontSize: 10,
		color: '#555',
		borderBottom: '1px solid #ffffff08',
		flexWrap: 'wrap',
	},
	cardList: { padding: '8px 10px' },
	card: {
		background: '#ffffff04',
		border: '1px solid #ffffff0a',
		borderRadius: 10,
		padding: '11px 13px',
		marginBottom: 7,
		cursor: 'pointer',
	},
	cardOpen: { background: '#ffffff08', borderColor: '#ffd70044' },
	cardFound: { borderColor: '#00ff8844', background: '#00ff880a' },
	cardTop: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		gap: 8,
	},
	cardLeft: { flex: 1, minWidth: 0 },
	badgeRow: {
		display: 'flex',
		alignItems: 'center',
		gap: 5,
		marginBottom: 3,
	},
	typeBadge: {
		background: '#ffffff10',
		color: '#888',
		fontSize: 9,
		padding: '2px 6px',
		borderRadius: 4,
		fontWeight: 700,
	},
	heat: { fontSize: 12 },
	foundTag: {
		background: '#00ff8820',
		color: '#00ff88',
		fontSize: 9,
		padding: '2px 6px',
		borderRadius: 4,
		fontWeight: 700,
	},
	cardName: {
		fontSize: 13,
		fontWeight: 700,
		color: '#e8e0d0',
		lineHeight: 1.3,
		marginBottom: 2,
	},
	cardSet: { fontSize: 10, color: '#666' },
	cardRight: {
		textAlign: 'right',
		flexShrink: 0,
		marginTop: 6,
	},
	retailPrice: { fontSize: 19, fontWeight: 700, color: '#ffd700' },
	retailLabel: { fontSize: 9, color: '#555', marginBottom: 3 },
	flipRange: { fontSize: 13, fontWeight: 700 },
	flipAfter: { fontSize: 10, color: '#777' },
	barWrap: {
		marginTop: 9,
		height: 3,
		background: '#ffffff08',
		borderRadius: 2,
	},
	barFill: { height: '100%', borderRadius: 2 },
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
	calcSection: {
		marginTop: 8,
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
		width: 100,
		outline: 'none',
		fontFamily: 'inherit',
	},
	calcResult: { fontSize: 12, color: '#888' },
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
	storeInputRow: { display: 'flex', gap: 6, marginTop: 5 },
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
	},
	noResults: {
		textAlign: 'center',
		padding: '40px 20px',
		color: '#444',
		fontSize: 12,
	},
	profitMain: {
		fontSize: 28,
		fontWeight: 800,
		letterSpacing: 0.5,
	},

	profitSub: {
		fontSize: 10,
		color: '#777',
		marginBottom: 6,
	},

	retailWrap: {
		marginTop: 4,
	},

	retailPriceSmall: {
		fontSize: 13,
		color: '#aaa',
		fontWeight: 600,
	},

	retailLabelSmall: {
		fontSize: 9,
		color: '#555',
	},
	signalBadge: {
		marginTop: 4,
		fontSize: 10,
		fontWeight: 700,
		padding: '2px 6px',
		borderRadius: 6,
		display: 'inline-block',
	},
};
