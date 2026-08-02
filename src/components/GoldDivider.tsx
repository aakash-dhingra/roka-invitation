export function GoldDivider({ flip = false, opacity = 0.85 }: { flip?: boolean; opacity?: number }) {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '1rem 0',
      overflow: 'hidden',
    }}>
      <img
        src="/gold-divider.png"
        alt=""
        aria-hidden="true"
        style={{
          maxWidth: '600px',
          width: '90%',
          height: 'auto',
          opacity,
          transform: flip ? 'scaleY(-1)' : undefined,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
}
