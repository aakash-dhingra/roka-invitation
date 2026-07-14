// Organic SVG leaf/arch accents for atmospheric background
export function LeafAccents() {
  return (
    <>
      {/* Top-left large leaf cluster */}
      <div
        className="leaf-accent leaf-accent-1"
        style={{
          top: '-40px',
          left: '-60px',
          width: '380px',
          height: '380px',
        }}
      >
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M80 260 C80 260 20 200 40 120 C60 40 150 10 200 50 C250 90 240 180 180 220 C150 240 100 250 80 260Z"
            stroke="#C8B195"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M80 260 C80 260 120 180 160 140 C200 100 200 50 200 50"
            stroke="#C8B195"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M130 10 C130 10 60 50 50 140 C40 230 80 260 80 260"
            stroke="#C8B195"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="4 8"
          />
          <circle cx="200" cy="50" r="3" fill="#C8B195" opacity="0.6" />
          <circle cx="80" cy="260" r="2" fill="#C8B195" opacity="0.4" />
          {/* Small leaves */}
          <path d="M100 80 C110 60 140 65 130 85 C120 105 100 80 100 80Z" stroke="#C8B195" strokeWidth="0.75" fill="none" />
          <path d="M160 130 C175 115 200 125 185 140 C170 155 160 130 160 130Z" stroke="#C8B195" strokeWidth="0.75" fill="none" />
        </svg>
      </div>

      {/* Bottom-right arch accent */}
      <div
        className="leaf-accent leaf-accent-2"
        style={{
          bottom: '60px',
          right: '-30px',
          width: '300px',
          height: '360px',
        }}
      >
        <svg viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M220 280 C220 280 160 220 170 130 C180 40 240 20 240 20"
            stroke="#C8B195"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M140 250 C140 250 100 170 120 100 C140 30 200 10 200 10"
            stroke="#C8B195"
            strokeWidth="0.75"
            fill="none"
            strokeDasharray="3 6"
            strokeLinecap="round"
          />
          {/* Leaf pair */}
          <path d="M175 150 C185 135 205 145 193 160 C181 175 175 150 175 150Z" stroke="#C8B195" strokeWidth="0.8" fill="none" />
          <path d="M155 180 C165 165 183 172 172 188 C160 204 155 180 155 180Z" stroke="#C8B195" strokeWidth="0.8" fill="none" />
          <path d="M145 210 C158 197 178 207 165 222 C152 237 145 210 145 210Z" stroke="#C8B195" strokeWidth="0.6" fill="none" />
          <circle cx="200" cy="10" r="2.5" fill="#C8B195" opacity="0.5" />
        </svg>
      </div>

      {/* Top-right small flourish */}
      <div
        className="leaf-accent leaf-accent-1"
        style={{
          top: '120px',
          right: '20px',
          width: '140px',
          height: '140px',
          animationDelay: '3s',
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 90 C50 90 10 70 15 40 C20 10 55 5 70 25 C85 45 70 75 50 90Z"
            stroke="#C8B195"
            strokeWidth="0.75"
            fill="none"
          />
          <path d="M50 90 C55 60 65 40 70 25" stroke="#C8B195" strokeWidth="0.4" fill="none" />
        </svg>
      </div>
    </>
  );
}
