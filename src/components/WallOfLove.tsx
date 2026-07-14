import { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  text: string;
  rotation: number;
  offsetX: number;
}

// Starter messages — replace or remove
const SEED_MESSAGES: Message[] = [
  {
    id: 1,
    name: 'Aunty Meera',
    text: 'So proud of you both. May your lives be filled with endless love and laughter!',
    rotation: -2,
    offsetX: 0,
  },
  {
    id: 2,
    name: 'Rahul & Tanya',
    text: "We've been waiting for this day forever! Congratulations, you two beautiful humans.",
    rotation: 1.5,
    offsetX: 0,
  },
  {
    id: 3,
    name: 'Dadi Ji',
    text: 'Bahut bahut shubh kamnaaen. Khush raho, phalo phulo.',
    rotation: -1,
    offsetX: 0,
  },
];

let nextId = 10;

function generateRotation() {
  return (Math.random() - 0.5) * 5; // between -2.5 and +2.5
}

export function WallOfLove() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);

    setTimeout(() => {
      const newMsg: Message = {
        id: nextId++,
        name: name.trim(),
        text: text.trim(),
        rotation: generateRotation(),
        offsetX: 0,
      };
      setMessages(prev => [newMsg, ...prev]);
      setName('');
      setText('');
      setSubmitting(false);
    }, 500);
  }

  return (
    <div>
      {/* Submit form */}
      <form
        id="guestbook-form"
        onSubmit={handleSubmit}
        style={{
          border: '0.5px solid rgba(200,177,149,0.4)',
          borderRadius: '2px',
          padding: '1.75rem',
          background: 'rgba(200,177,149,0.04)',
          marginBottom: '3rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'var(--espresso-mid)',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}
        >
          Leave a note of love for Priya & Arjun — it will appear on the Wall below.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="form-label" htmlFor="guestbook-name">Your Name</label>
            <input
              id="guestbook-name"
              className="form-field"
              type="text"
              placeholder="Who is sending love?"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              maxLength={50}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="guestbook-message">Your Message</label>
            <textarea
              id="guestbook-message"
              className="form-field"
              placeholder="Write something heartfelt…"
              value={text}
              onChange={e => setText(e.target.value)}
              required
              rows={3}
              maxLength={240}
            />
          </div>
          <button
            id="guestbook-submit-btn"
            type="submit"
            className="btn-primary"
            disabled={submitting}
            style={{ alignSelf: 'flex-start' }}
          >
            {submitting ? (
              'Pinning…'
            ) : (
              <>
                <Send size={13} strokeWidth={1.5} />
                Pin to Wall
              </>
            )}
          </button>
        </div>
      </form>

      {/* Polaroid grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '2rem 1.5rem',
          paddingTop: '1rem',
        }}
      >
        {messages.map((msg, index) => (
          <PolaroidCard key={msg.id} message={msg} animDelay={index * 80} />
        ))}
      </div>
    </div>
  );
}

function PolaroidCard({ message, animDelay }: { message: Message; animDelay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="polaroid-card"
      style={{
        transform: hovered
          ? `rotate(${message.rotation > 0 ? message.rotation + 1.5 : message.rotation - 1.5}deg) translateY(-6px)`
          : `rotate(${message.rotation}deg)`,
        animationDelay: `${animDelay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="polaroid-tape" />
      {/* Faux photo area */}
      <div
        style={{
          width: '100%',
          height: '90px',
          background: 'linear-gradient(135deg, rgba(200,177,149,0.15) 0%, rgba(247,244,239,0.8) 100%)',
          marginBottom: '1rem',
          borderRadius: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
        }}
      >
        ♡
      </div>
      <p className="polaroid-message">"{message.text}"</p>
      <p className="polaroid-author">— {message.name}</p>
    </div>
  );
}
