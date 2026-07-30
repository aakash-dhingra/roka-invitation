import { useState, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  text: string;
  rotation: number;
}

const BIN_URL = 'https://extendsclass.com/api/json-storage/bin/fcffbbd';

function generateRotation() {
  return (Math.random() - 0.5) * 6; // between -3 and +3
}

export function WallOfLove() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch wishes from the global JSON store ──
  async function fetchWishes() {
    try {
      const response = await fetch(BIN_URL);
      if (!response.ok) {
        throw new Error('Failed to load wishes from the server.');
      }
      const data = await response.json();
      if (data && Array.isArray(data.wishes)) {
        // Show newest wishes first
        setMessages(data.wishes.reverse());
      }
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to the guestbook server. Displaying local cache.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWishes();
    // Auto-refresh wishes every 20 seconds so guests see new posts live
    const interval = setInterval(fetchWishes, 20000);
    return () => clearInterval(interval);
  }, []);

  // ── Submit a new wish ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim() || submitting) return;
    setSubmitting(true);

    try {
      // 1. Fetch current wishes first to avoid overwriting others' wishes
      const getRes = await fetch(BIN_URL);
      if (!getRes.ok) throw new Error('Failed to verify current wishes.');
      const currentData = await getRes.json();
      const currentList: Message[] = currentData?.wishes || [];

      // 2. Append new wish
      const newWish: Message = {
        id: Date.now(), // Unique ID using timestamp
        name: name.trim(),
        text: text.trim(),
        rotation: generateRotation(),
      };
      const updatedList = [...currentList, newWish];

      // 3. PUT updated list back to server
      const putRes = await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishes: updatedList }),
      });

      if (!putRes.ok) throw new Error('Failed to save your wish.');

      // 4. Update local state (newest first)
      setMessages([newWish, ...messages]);
      setName('');
      setText('');
      setError(null);
    } catch (err: any) {
      console.error(err);
      alert('Oops! We couldn\'t pin your wish. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          marginBottom: '2.5rem',
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
          Leave a note of love for Aanchal & Randeep — it will appear on the Wall below for everyone to see.
        </p>

        {error && (
          <p style={{ color: '#D32F2F', fontSize: '0.7rem', fontFamily: 'var(--font-sans)', marginBottom: '1rem' }}>
            ⚠️ {error}
          </p>
        )}

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

      {/* Wall Header with manual refresh button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#8A6F4E',
        }}>
          Guestbook Notes
        </h4>
        <button
          onClick={fetchWishes}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--taupe)',
            fontSize: '0.6rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '0.4rem',
          }}
        >
          <RefreshCw size={11} className={loading ? 'spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Loading state */}
      {loading && messages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--taupe)' }}>
          <RefreshCw size={24} className="spin" style={{ margin: '0 auto 1rem' }} />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            Reading love notes…
          </p>
        </div>
      ) : (
        /* Polaroid grid */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '2rem 1.5rem',
            paddingTop: '0.5rem',
          }}
        >
          {messages.map((msg, index) => (
            <PolaroidCard key={msg.id} message={msg} animDelay={index * 60} />
          ))}
        </div>
      )}
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
