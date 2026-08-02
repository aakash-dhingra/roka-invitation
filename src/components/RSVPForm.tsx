import { useState } from 'react';
import { Send, Heart, PartyPopper, XCircle } from 'lucide-react';

interface RSVPFormProps {
  rsvpDeadline?: string;
  brideName: string;
  groomName: string;
}

interface FormData {
  name: string;
  attending: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  attending: '',
  message: '',
};

type SubmitState = 'idle' | 'submitting' | 'yes' | 'no';

export function RSVPForm({ rsvpDeadline, brideName, groomName }: RSVPFormProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [noClicks, setNoClicks] = useState(0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAttendingChange(value: string) {
    setForm({ ...form, attending: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.attending) return;
    setSubmitState('submitting');
    setTimeout(() => {
      setSubmitState(form.attending === 'yes' ? 'yes' : 'no');
    }, 900);
  }

  // ── YES state ──
  if (submitState === 'yes') {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3.5rem 1.5rem',
          border: '0.5px solid rgba(200,177,149,0.4)',
          borderRadius: '2px',
          background: 'rgba(200,177,149,0.05)',
          animation: 'fadeInHero 0.8s var(--ease-premium) both',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎉</div>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--espresso)',
            marginBottom: '1rem',
            lineHeight: 1.3,
          }}
        >
          We're so glad you're coming, {form.name}!
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: 'var(--espresso-mid)',
            lineHeight: 1.75,
            maxWidth: '400px',
            margin: '0 auto 1.5rem',
          }}
        >
          {brideName} &amp; {groomName} can't wait to celebrate with you. 🌸
          <br /><br />
          Please come along with your <strong style={{ color: 'var(--espresso)', fontWeight: 600 }}>entire family</strong> — the more, the merrier!
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.5rem',
            border: '0.5px solid rgba(200,177,149,0.5)',
            borderRadius: '1px',
          }}
        >
          <Heart size={14} strokeWidth={1.5} style={{ color: 'var(--taupe)' }} fill="rgba(200,177,149,0.3)" />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--taupe)' }}>
            See you on 21st August
          </span>
        </div>
      </div>
    );
  }

  // ── NO state ──
  if (submitState === 'no') {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3.5rem 1.5rem',
          border: '0.5px solid rgba(200,177,149,0.4)',
          borderRadius: '2px',
          background: 'rgba(200,177,149,0.03)',
          animation: 'fadeInHero 0.8s var(--ease-premium) both',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>😤</div>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--espresso)',
            marginBottom: '1rem',
            lineHeight: 1.3,
          }}
        >
          That's not an option, {form.name}.
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: 'var(--espresso-mid)',
            lineHeight: 1.75,
            maxWidth: '380px',
            margin: '0 auto 2rem',
          }}
        >
          We've already added you to the guest list. 📋
          <br />Your plate is waiting. Your seat is reserved. The biryani won't eat itself.
        </p>
        <button
          className="btn-primary"
          onClick={() => setSubmitState('yes')}
          style={{ margin: '0 auto' }}
        >
          <PartyPopper size={14} strokeWidth={1.5} />
          Fine, I'll be there 🎊
        </button>
      </div>
    );
  }

  return (
    <form
      id="rsvp-form"
      onSubmit={handleSubmit}
      style={{
        border: '0.5px solid rgba(200,177,149,0.4)',
        borderRadius: '2px',
        padding: '2.5rem 2rem',
        background: 'rgba(200,177,149,0.04)',
      }}
    >


      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

        {/* Name */}
        <div>
          <label className="form-label" htmlFor="rsvp-name">Your Name</label>
          <input
            id="rsvp-name"
            className="form-field"
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Attending — button toggle */}
        <div>
          <label className="form-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Attending?</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              id="rsvp-yes-btn"
              type="button"
              onClick={() => handleAttendingChange('yes')}
              style={{
                flex: 1,
                padding: '0.85rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '1px',
                transition: 'all 0.3s var(--ease-premium)',
                border: form.attending === 'yes'
                  ? '1px solid var(--espresso)'
                  : '0.5px solid rgba(200,177,149,0.5)',
                background: form.attending === 'yes' ? 'var(--espresso)' : 'transparent',
                color: form.attending === 'yes' ? 'var(--canvas)' : 'var(--espresso)',
              }}
            >
              🎉 Joyfully Yes
            </button>
            <button
              id="rsvp-no-btn"
              type="button"
              onClick={() => {
                handleAttendingChange('no');
                setNoClicks(c => c + 1);
              }}
              style={{
                flex: 1,
                padding: '0.85rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '1px',
                transition: 'all 0.3s var(--ease-premium)',
                border: form.attending === 'no'
                  ? '1px solid rgba(200,177,149,0.8)'
                  : '0.5px solid rgba(200,177,149,0.3)',
                background: form.attending === 'no' ? 'rgba(200,177,149,0.12)' : 'transparent',
                color: form.attending === 'no' ? 'var(--espresso)' : 'var(--espresso-soft)',
              }}
            >
              {noClicks >= 2 ? '😅 Still no option' : '😞 Can\'t make it'}
            </button>
          </div>
          {form.attending === 'no' && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.8rem',
              fontStyle: 'italic',
              color: 'var(--taupe)',
              marginTop: '0.6rem',
              letterSpacing: '0.02em',
            }}>
              (This button is decorative. You're still coming. 😏)
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="form-label" htmlFor="rsvp-message">A Note for the Couple</label>
          <textarea
            id="rsvp-message"
            className="form-field"
            name="message"
            placeholder="Your warmest wishes…"
            value={form.message}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <button
          id="rsvp-submit-btn"
          type="submit"
          className="btn-primary"
          disabled={submitState === 'submitting'}
          style={{ alignSelf: 'flex-start' }}
        >
          {submitState === 'submitting' ? (
            'Sending…'
          ) : (
            <>
              <Send size={13} strokeWidth={1.5} />
              Send RSVP
            </>
          )}
        </button>
      </div>
    </form>
  );
}
