import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(`${targetDate}T11:00:00`).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

interface CountdownTimerProps {
  eventDate: string;
}

export function CountdownTimer({ eventDate }: CountdownTimerProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(eventDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft(eventDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Mins', value: time.minutes },
    { label: 'Secs', value: time.seconds },
  ];

  return (
    <div className="countdown-container">
      {units.map((unit, i) => (
        <div key={unit.label} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="countdown-unit">
            <span
              className="countdown-number"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              {pad(unit.value)}
            </span>
            <span className="countdown-label">{unit.label}</span>
          </div>
          {i < units.length - 1 && (
            <span
              className="countdown-separator"
              style={{ fontSize: '1.5rem', marginTop: '-0.5rem', opacity: 0.4 }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
