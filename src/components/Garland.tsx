import { useMemo } from 'react';

export function Garland() {
  // Generate a row of marigold flower dots
  const items = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      // Alternate between yellow, orange, and green leaf strings
      type: i % 3 === 0 ? 'yellow' : i % 3 === 1 ? 'orange' : 'green',
    }));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '35px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 5,
        background: 'transparent',
        marginTop: '-1px',
      }}
    >
      {items.map(item => {
        // Render strings of hanging flowers
        const color = item.type === 'yellow' ? '#FFC20E' : item.type === 'orange' ? '#FF7A00' : '#4CAF50';
        const height = item.type === 'green' ? '18px' : '28px';

        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '8px',
            }}
          >
            {/* Hanging thread */}
            <div style={{ width: '1px', height, background: 'rgba(212, 175, 55, 0.4)' }} />
            {/* Flower ball */}
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: color,
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                marginTop: '-4px',
              }}
            />
            {/* Additional double marigold logic */}
            {item.type !== 'green' && (
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: item.type === 'yellow' ? '#FF7A00' : '#FFC20E',
                  marginTop: '2px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
