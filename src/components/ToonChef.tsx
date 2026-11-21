/**
 * Toon Chef Ahsan - a hand-drawn-style flat SVG cartoon chef.
 * Animations (CSS, see index.css):
 *  - waves hello with his raised arm
 *  - blinks every few seconds
 *  - stirs a bubbling pot with a spoon
 *  - bobs gently, with steam rising from the pot
 */
const ToonChef = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 420 470" className={className} role="img" aria-label="Cartoon Chef Ahsan waving and stirring a pot">
    <g className="toon-bob">
      {/* ---- Waving arm (behind body) ---- */}
      <g className="toon-wave">
        <path
          d="M152 268 Q112 248 98 206"
          stroke="#FFFDF8"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="96" cy="194" r="16" fill="#EFC39A" />
        {/* fingers */}
        <path d="M88 182 q-4 -10 4 -12 M98 180 q-2 -11 6 -12 M108 182 q0 -11 8 -10" stroke="#EFC39A" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>

      {/* ---- Chef hat ---- */}
      <circle cx="168" cy="72" r="36" fill="#FFFDF8" stroke="#E5DDCB" strokeWidth="3" />
      <circle cx="212" cy="52" r="42" fill="#FFFDF8" stroke="#E5DDCB" strokeWidth="3" />
      <circle cx="254" cy="72" r="36" fill="#FFFDF8" stroke="#E5DDCB" strokeWidth="3" />
      <ellipse cx="211" cy="94" rx="72" ry="24" fill="#FFFDF8" stroke="#E5DDCB" strokeWidth="3" />
      <rect x="146" y="90" width="130" height="26" rx="10" fill="#FFFDF8" stroke="#E5DDCB" strokeWidth="3" />

      {/* ---- Head ---- */}
      <circle cx="147" cy="172" r="11" fill="#EFC39A" />
      <circle cx="275" cy="172" r="11" fill="#EFC39A" />
      <ellipse cx="211" cy="172" rx="63" ry="70" fill="#EFC39A" />

      {/* Beard (dark, like his photo) */}
      <path
        d="M151 180 Q148 246 211 250 Q274 246 271 180 Q266 214 240 222 Q211 230 182 222 Q156 214 151 180 Z"
        fill="#221C18"
      />
      {/* Smile on the beard */}
      <path d="M196 224 Q211 234 226 224" stroke="#FFFDF8" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Moustache */}
      <ellipse cx="197" cy="202" rx="17" ry="7.5" fill="#221C18" transform="rotate(-8 197 202)" />
      <ellipse cx="225" cy="202" rx="17" ry="7.5" fill="#221C18" transform="rotate(8 225 202)" />

      {/* Nose */}
      <ellipse cx="211" cy="182" rx="8" ry="11" fill="#E8B183" />

      {/* Eyes (blink) */}
      <g className="toon-blink">
        <ellipse cx="188" cy="160" rx="7" ry="9" fill="#191817" />
        <ellipse cx="234" cy="160" rx="7" ry="9" fill="#191817" />
      </g>
      <circle cx="190.5" cy="157" r="2.2" fill="#FFFDF8" />
      <circle cx="236.5" cy="157" r="2.2" fill="#FFFDF8" />

      {/* Eyebrows */}
      <path d="M176 140 Q188 132 200 140" stroke="#191817" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M222 140 Q234 132 246 140" stroke="#191817" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* ---- Body / apron ---- */}
      <path
        d="M150 252 Q211 232 272 252 L286 402 Q286 422 266 422 L156 422 Q136 422 136 402 Z"
        fill="#FFFDF8"
        stroke="#E5DDCB"
        strokeWidth="3"
      />
      {/* Neckerchief */}
      <path d="M186 246 L211 278 L236 246 L226 238 L196 238 Z" fill="#E4572E" />
      {/* Buttons */}
      <circle cx="211" cy="302" r="5" fill="#E4572E" />
      <circle cx="211" cy="342" r="5" fill="#E4572E" />
      {/* Pocket */}
      <rect x="186" y="362" width="50" height="36" rx="8" fill="#FAF6EF" stroke="#E5DDCB" strokeWidth="2" />

      {/* ---- Stirring arm + spoon ---- */}
      <g className="toon-stir">
        <path
          d="M272 266 Q312 286 324 320"
          stroke="#FFFDF8"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="326" cy="322" r="14" fill="#EFC39A" />
        {/* Spoon */}
        <path d="M326 322 L308 372" stroke="#C9A86A" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="306" cy="378" rx="10" ry="13" fill="#C9A86A" />
      </g>

      {/* ---- Pot ---- */}
      {/* Steam */}
      <path d="M286 336 q6 -12 0 -24 q-6 -12 0 -22" stroke="#B9AE97" strokeWidth="4" fill="none" strokeLinecap="round" className="steam-wisp" />
      <path d="M312 330 q6 -12 0 -24 q-6 -12 0 -22" stroke="#B9AE97" strokeWidth="4" fill="none" strokeLinecap="round" className="steam-wisp" style={{ animationDelay: '0.9s' }} />
      <path d="M338 336 q6 -12 0 -24 q-6 -12 0 -22" stroke="#B9AE97" strokeWidth="4" fill="none" strokeLinecap="round" className="steam-wisp" style={{ animationDelay: '1.7s' }} />
      {/* Pot body */}
      <path
        d="M252 384 L372 384 L362 442 Q360 454 346 454 L278 454 Q264 454 262 442 Z"
        fill="#1E4D3B"
        stroke="#16382B"
        strokeWidth="3"
      />
      <rect x="244" y="374" width="136" height="18" rx="9" fill="#E4572E" />
      {/* Bubbling contents */}
      <ellipse cx="312" cy="382" rx="56" ry="10" fill="#F2A007" />
      <circle cx="286" cy="378" r="5" fill="#FFF3D6" className="toon-bubble" />
      <circle cx="312" cy="374" r="6.5" fill="#FFF3D6" className="toon-bubble" style={{ animationDelay: '0.6s' }} />
      <circle cx="338" cy="378" r="4.5" fill="#FFF3D6" className="toon-bubble" style={{ animationDelay: '1.2s' }} />
      {/* Pot handles */}
      <path d="M252 396 q-18 2 -16 16 q2 10 16 8" stroke="#16382B" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M372 396 q18 2 16 16 q-2 10 -16 8" stroke="#16382B" strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

export default ToonChef;
