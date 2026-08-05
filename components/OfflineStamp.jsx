export default function OfflineStamp() {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid var(--gold)',
      color: 'var(--gold)',
      padding: '0.35rem 0.6rem',
      borderRadius: '4px',
      textTransform: 'uppercase',
      fontWeight: '600',
      fontSize: '0.65rem',
      letterSpacing: '0.12em',
      transform: 'rotate(-5deg)',
      opacity: 0.9,
      fontFamily: 'var(--font-mono)',
      boxShadow: 'inset 0 0 0 1px rgba(232, 163, 61, 0.2), 0 0 0 1px rgba(232, 163, 61, 0.2)',
      background: 'rgba(232, 163, 61, 0.05)',
      userSelect: 'none'
    }}>
      Offline Ready
    </div>
  );
}
