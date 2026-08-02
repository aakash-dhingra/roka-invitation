import { Calendar, MapPin, Clock } from 'lucide-react';
import { ScratchCard } from './ScratchCard';
import { TiltCard } from './TiltCard';

interface EventDetailsSectionProps {
  displayDate: string;
  displayDay: string;
  startTime: string;
  endTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  eventDate: string;
}

function buildICSContent(props: EventDetailsSectionProps, summary: string) {
  const start = new Date(`${props.eventDate}T19:00:00`);
  const end   = new Date(`${props.eventDate}T23:59:00`);

  function fmt(d: Date) {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${summary}`,
    `LOCATION:${props.venueAddress}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadICS(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function EventDetailsSection(props: EventDetailsSectionProps) {
  const {
    displayDate,
    displayDay,
    startTime,
    endTime,
    venueName,
    venueAddress,
    googleMapsUrl,
    eventDate,
  } = props;

  function handleAddToCalendar() {
    const ics = buildICSContent(props, 'Roka Ceremony');
    downloadICS(ics, 'roka-ceremony.ics');
  }

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Date card — wrapped in ScratchCard */}
        <ScratchCard>
          <div className="detail-card">
            <div className="detail-card-icon">
              <Calendar size={16} strokeWidth={1.25} />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                marginBottom: '0.5rem',
              }}
            >
              Date
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 400,
                color: 'var(--espresso)',
                lineHeight: 1.3,
                marginBottom: '0.25rem',
              }}
            >
              {displayDate}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 400,
                color: 'var(--espresso-mid)',
                letterSpacing: '0.1em',
              }}
            >
              {displayDay}
            </p>
          </div>
        </ScratchCard>

        {/* Time card wrapped in TiltCard */}
        <TiltCard>
          <div className="detail-card" style={{ height: '100%' }}>
            <div className="detail-card-icon">
              <Clock size={16} strokeWidth={1.25} />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                marginBottom: '0.5rem',
              }}
            >
              Time
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 400,
                color: 'var(--espresso)',
                lineHeight: 1.3,
                marginBottom: '0.25rem',
              }}
            >
              {startTime}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 300,
                color: 'var(--espresso-mid)',
                letterSpacing: '0.1em',
              }}
            >
              Until {endTime}
            </p>
          </div>
        </TiltCard>

        {/* Venue card wrapped in TiltCard */}
        <TiltCard>
          <div className="detail-card" style={{ height: '100%' }}>
            <div className="detail-card-icon">
              <MapPin size={16} strokeWidth={1.25} />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                marginBottom: '0.5rem',
              }}
            >
              Venue
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 400,
                color: 'var(--espresso)',
                lineHeight: 1.3,
                marginBottom: '0.25rem',
              }}
            >
              {venueName}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 300,
                color: 'var(--espresso-mid)',
                letterSpacing: '0.05em',
                lineHeight: 1.55,
              }}
            >
              {venueAddress}
            </p>
          </div>
        </TiltCard>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          id="add-to-calendar-btn"
          className="btn-primary"
          onClick={handleAddToCalendar}
        >
          <Calendar size={14} strokeWidth={1.5} />
          Add to Calendar
        </button>
        <a
          id="google-maps-link"
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <MapPin size={14} strokeWidth={1.5} />
          Get Directions
        </a>
      </div>
    </div>
  );
}
