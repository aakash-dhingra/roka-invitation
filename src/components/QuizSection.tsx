import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import type { Question } from '../config';
import { TiltCard } from './TiltCard';

interface QuizSectionProps {
  questions: Question[];
  brideName: string;
  groomName: string;
}

export function QuizSection({ questions, brideName, groomName }: QuizSectionProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);

  const question = questions[currentQ];
  const isAnswered = selected !== null;

  function handleSelect(optionIndex: number) {
    if (isAnswered) return;
    setSelected(optionIndex);

    setTimeout(() => {
      const correct = optionIndex === question.correctIndex;
      const newAnswered = [...answered, correct];
      setAnswered(newAnswered);

      if (currentQ < questions.length - 1) {
        setTimeout(() => {
          setCurrentQ(currentQ + 1);
          setSelected(null);
        }, 600);
      } else {
        setCompleted(true);
        setTimeout(() => setShowPhoto(true), 400);
      }
    }, 800);
  }

  const correctCount = answered.filter(Boolean).length;

  if (completed) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          className={`couple-photo-reveal ${showPhoto ? 'show' : ''}`}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-12px',
                border: '0.5px solid rgba(200,177,149,0.4)',
                borderRadius: '2px',
                pointerEvents: 'none',
              }}
            />
            <img
              src="/couple.png"
              alt={`${brideName} & ${groomName}`}
              style={{
                width: '100%',
                maxWidth: '420px',
                height: 'auto',
                display: 'block',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>

        <div
          className={`couple-photo-reveal ${showPhoto ? 'show' : ''}`}
          style={{ transitionDelay: '0.25s' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontStyle: 'italic',
              color: 'var(--espresso)',
              fontWeight: 300,
              marginBottom: '0.75rem',
            }}
          >
            You got {correctCount} of {questions.length} right!
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--espresso-mid)',
              fontWeight: 300,
            }}
          >
            {correctCount === questions.length
              ? "You know them like family — we can't wait to celebrate with you."
              : correctCount >= 2
              ? "Pretty well! There's always more love stories to discover."
              : 'Come celebrate and learn more about this beautiful journey!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <TiltCard>
      <div className="quiz-card">
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {questions.map((_, i) => (
            <div
              key={i}
              className={`quiz-progress-dot ${
                i < currentQ ? 'done' : i === currentQ ? 'active' : ''
              }`}
            />
          ))}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'var(--taupe)',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Question {currentQ + 1} of {questions.length}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)',
            fontWeight: 400,
            color: 'var(--espresso)',
            lineHeight: 1.35,
            marginBottom: '1.75rem',
          }}
        >
          {question.question}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {question.options.map((option, i) => {
            let btnClass = 'quiz-option-btn';
            if (selected !== null) {
              if (i === question.correctIndex) btnClass += ' correct';
              else if (i === selected && selected !== question.correctIndex)
                btnClass += ' incorrect';
            }
            return (
              <button
                key={i}
                id={`quiz-option-${currentQ}-${i}`}
                className={btnClass}
                onClick={() => handleSelect(i)}
              >
                <span
                  style={{
                    opacity: 0.4,
                    marginRight: '0.75rem',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                  }}
                >
                  {String.fromCharCode(65 + i)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </TiltCard>
  );
}
