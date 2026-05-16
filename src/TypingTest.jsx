import { useState, useEffect, useRef, useCallback } from "react";

const CS_SENTENCES = [
  "tapailai hamro customer service ma swagat cha tapailai kasari sahayog garna sakchu",
  "kripaya aafno order number dinus ma turant check garchu ra solution diunchu",
  "tapailako complaint hamile receive garisakekou chau samasya herne koshish garchu",
  "tapailako problem ko lagi hami mafi maagchau ra chaaadai solution diunchu",
  "kripaya ek chin pratiksha garnu hola ma tapailako account verify garchu",
  "tapailako refund process garna teen karya diwas lagcha hamile initiate garisakekou chau",
  "tapailako payment safaltapurvak receive bhaisakekou cha receipt email ma pathaisakekou chau",
  "tapailako order aaj ship bhaisakekou cha tracking number aile pathaunchhu",
  "kripaya tapailako registered email address confirm garnu hola OTP pathaaunchhu",
  "hamile tapailako ticket open garisakekou chau case number note garnu hola",
  "tapailako samasya hamro technical team kura lagaincha chaaadai thik huncha",
  "kripaya aafno account password reset garnu hola link email ma pathaisakekou chau",
  "tapailako account ma kei gadbad bhako chaina sabai information sahi cha",
  "hamile tapailako order cancel garisakekou chau full refund tin din bhitra aaucha",
  "kripaya error ko screenshot pathaaunu hola problem ramrari bujhna sakos",
  "tapailako delivery address update garisakekou chau naya thegana ma pathaaunchhu",
  "hamro customer support chhabbis chaar ghanta uplabdha cha jaba pani call garna saknu huncha",
  "tapailako problem aile solve garne koshish garchu pratiksha garnu hola",
  "kripaya chat band nagarnuhos ma senior agent sanga connect garaaunchhu",
  "tapailako valuable feedback le hamro seva sudhaar garchha dhanyabad bhanu hola",
  "hamile tapailako account reactivate garisakekou chau aba login garna milincha",
  "tapailako order status herne hamro website ma track garna saknu huncha",
  "kripaya naya support ticket khol ra problem ko details ramrari lekh",
  "hamile tapailako complaint escalate garisakekou chau manager herne chhan",
  "tapailako warranty abhai valid cha free repair service paincha nearest center ma",
  "kripaya damaged product return garna nearest store ma laajaaunu hola bill linus",
  "hamile tapailako billing details check garisakekou chau sab thik dekhinccha",
  "tapailako premium subscription next month auto renew huncha notification pathaaunchhu",
  "kripaya aafno registered phone number update garnu hola security ko lagi",
  "hamro server temporarily down thiyo aba fully restored bhaisakekou cha",
  "tapailako special discount coupon apply garisakekou chau checkout ma dekhincha",
  "kripaya delivery ko lagi thap ek do karya diwas pratiksha garnu hola",
  "hamile tapailako request priority queue ma rakha garisakekou chau",
  "tapailako naya order successfully confirmed bhaisakekou cha confirmation email hernu",
  "kripaya preferred delivery time slot select garnu hola website ma option cha",
  "hamile tapailako account ma cashback credit jorisakekou chau next order ma use garna saknu huncha",
  "tapailako issue resolve bhayema please hamile janaaunu hola satisfaction survey pathaaunchhu",
  "kripaya hamro mobile app install garnu hola real time tracking ko lagi",
  "tapailako feedback hamro quality team le review garcha improvement garchha",
  "hamile tapailako unique case ID generate garisakekou chau future reference ko lagi rakhnu hola",
  "kripaya delivery napaako bhaye photo liyera hamile pathaaunu hola",
  "tapailako payment gateway issue identify garisakekou chau technical team fix garcha",
  "hamile tapailako shipping address re-confirm garna chahanchhu ek palta check garnu hola",
  "tapailako order dui teen working days bhitra doorstep deliver huncha",
  "kripaya hamro FAQ section hernu hola dherai common questions ko answers tyaha chan",
  "hamile tapailako formal complaint system ma record garisakekou chau",
  "tapailako account active nai cha kei suspend bhako chaina login garna milincha",
  "kripaya registered email inbox check garnu hola verification link pathaisakekou chau",
  "tapailai hamro service use garnu bhako dhanyabad pheri kei chahiye bhane janaaunu hola",
  "tapailako concern hamile bujhisakekou chau best possible solution diunchu kripaya ek chin",
  "hamile tapailako order dispatch confirmation send garisakekou chau email check garnu hola",
  "kripaya product ko barcode number dinus ma database ma check garchu",
  "tapailako issue ko lagi again mafi maagchau hamro service quality sudhaar garchhu",
  "hamile tapailako account history check garisakekou chau sabai transactions thik dekhinccha",
  "kripaya aafno delivery preferences update garnu hola profile settings ma option cha",
  "tapailako return request approved bhaisakekou chau pickup agent aaunu huncha",
  "hamile tapailako coupon code validate garisakekou chau valid cha use garna milincha",
  "kripaya hamro live chat feature use garnu hola fastest response paincha",
  "tapailako complain herne team ma assign garisakekou chau twenty four ghanta bhitra reply aaucha",
  "hamile tapailako issue log garisakekou chau monitoring ma rakha garisakekou chau",
  "kripaya aafno name ra order details ek palta confirm garnu hola process garchu",

  // batch 2 — 40 new sentences
  "tapailako invoice copy email ma pathaisakekou chau check garnu hola",
  "hamile tapailako product exchange request accept garisakekou chau naya item pathaaunchhu",
  "kripaya aafno date of birth verify garnu hola account security ko lagi",
  "tapailako delivery out for delivery cha aaj sanjh samma paincha",
  "hamile tapailako loyalty points check garisakekou chau account ma cha use garna saknu huncha",
  "kripaya hamro terms and conditions ek palta hernu hola clear hunchha",
  "tapailako naya product hami le dispatch garnu aaj bela lagchha sorry for the delay",
  "hamile tapailako grievance register garisakekou chau resolution chaaadai aaucha",
  "kripaya aafno profile photo update garnu hola settings ma option cha",
  "tapailako issue hamro backend team le herne chha fix hune bittikkai janaaunchhu",
  "hamile tapailako previous order ko detail pull garisakekou chau ek chin",
  "kripaya payment slip ko photo pathaaunu hola confirm garchu",
  "tapailako order accidentally wrong address ma gayo re-route garisakekou chau",
  "hamile tapailako account two factor authentication enable garisakekou chau surakshit cha",
  "kripaya chat ID note garnu hola future reference ko lagi kaam lagcha",
  "tapailako product defective bhaye hamile replace garcha kripaya unbox video pathaaunu hola",
  "hamile tapailako membership upgrade garisakekou chau naya benefits aile nai activate hunchha",
  "kripaya hamro survey form bhar dinu hola hami sudhaar garna chahanchhu",
  "tapailako pending refund finance team ma escalate garisakekou chau",
  "hamile tapailako duplicate charge identify garisakekou chau refund process garchu",
  "kripaya aafno delivery OTP driver lai dinu hola parcel lina ko lagi",
  "tapailako subscription pause garisakekou chau resume garna paayo pheri janaaunu hola",
  "hamile tapailako account password manually reset garisakekou chau naya password pathaaunchhu",
  "kripaya hamro new offer checkout page ma automatically apply hunchha check garnu hola",
  "tapailako product ko size exchange garna hamro store ma laajaaunu hola",
  "hamile tapailako ko-thi number verify garisakekou chau sahi cha",
  "kripaya aafno email spam folder check garnu hola hamro mail tyaha jaan sakcha",
  "tapailako issue priority basis ma handle garisakekou chau response chaaadai aaucha",
  "hamile tapailako purana address delete garisakekou chau naya add garisakekou chau",
  "kripaya bank statement liyera bank sanga kura garnu hola payment hold ma cha",
  "tapailako free trial period aaja expire hunchha upgrade garna chahanu huncha bhane janaaunu hola",
  "hamile tapailako app account sync garisakekou chau aba mobile ma pani dekhincha",
  "kripaya product receive gareko din dekhi saat din bhitra return garna paaincha",
  "tapailako bulk order ko lagi special discount available cha hamro sales team sanga kura garnu hola",
  "hamile tapailako last payment ko receipt regenerate garisakekou chau email ma pathaaunchhu",
  "kripaya aafno account notification settings off garnu hola profile settings ma cha",
  "tapailako complaint status active cha herne team le kaam gariraakheko cha",
  "hamile tapailako naya order ko estimated delivery date confirm garisakekou chau",
  "kripaya hamro helpdesk portal ma login garnu hola ticket status track garna saknu huncha",
  "tapailai hamile sabai possible help garchhu kripaya sabai details share garnu hola",
];

const DURATION = 60;
const FLOAT_LETTERS = ["A","B","C","D","E","F","G","H","J","K","M","N","P","R","S","T","U","Y","a","b","c","d","e","f","g","h","k","m","n","p","r","s","t","u","y"];

function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickRandom(count) {
  // Pick `count` unique random sentences from the pool
  return shuffled(CS_SENTENCES).slice(0, count);
}

function buildText() {
  // Pick 18–25 sentences at random so every test feels genuinely different
  const count = 18 + Math.floor(Math.random() * 8);
  return pickRandom(count).join(" ");
}

function extendText(current) {
  // Append another random batch (avoiding the last used start)
  const count = 15 + Math.floor(Math.random() * 8);
  return current + " " + pickRandom(count).join(" ");
}

// Pre-generate float letter positions so they're stable
const FLOATERS = Array.from({ length: 20 }, (_, i) => ({
  letter: FLOAT_LETTERS[i % FLOAT_LETTERS.length],
  top: `${5 + (i * 4.5) % 88}%`,
  left: `${2 + (i * 7.3) % 94}%`,
  size: `${1 + (i % 3) * 0.5}rem`,
  opacity: 0.06 + (i % 4) * 0.03,
  rotate: `${-30 + (i * 17) % 60}deg`,
}));

export default function TypingTest() {
  const fullTextRef = useRef(buildText());
  const [, forceUpdate] = useState(0);

  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [errors, setErrors] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const inputValRef = useRef("");
  const textLineRef = useRef(null);

  const computeStats = useCallback((currentInput) => {
    const full = fullTextRef.current;
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === full[i]) correct++;
      else incorrect++;
    }
    const totalTyped = currentInput.length;
    const acc = totalTyped === 0 ? 100 : Math.round((correct / totalTyped) * 100);
    return { correct, incorrect, acc };
  }, []);

  const finish = useCallback((currentInput) => {
    clearInterval(timerRef.current);
    setFinished(true);
    setStarted(false);
    const { correct, incorrect, acc } = computeStats(currentInput);
    const minutes = DURATION / 60;
    setWpm(Math.round((correct / 5) / minutes));
    setCpm(Math.round(correct / minutes));
    setAccuracy(acc);
    setCorrectChars(correct);
    setErrors(incorrect);
  }, [computeStats]);

  useEffect(() => {
    if (started) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) { finish(inputValRef.current); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started, finish]);

  // Auto-scroll the text line so cursor stays visible
  useEffect(() => {
    if (textLineRef.current) {
      const cursor = textLineRef.current.querySelector(".cursor-char");
      if (cursor) {
        cursor.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      }
    }
  }, [input]);

  const handleInput = (e) => {
    const value = e.target.value;
    if (finished) return;
    if (!started && value.length > 0) setStarted(true);

    inputValRef.current = value;
    setInput(value);

    if (value.length > fullTextRef.current.length - 300) {
      fullTextRef.current = extendText(fullTextRef.current);
      forceUpdate((n) => n + 1);
    }

    const { correct, incorrect, acc } = computeStats(value);
    const elapsed = DURATION - timeLeft;
    const minutes = elapsed / 60;
    setWpm(minutes > 0 ? Math.round((correct / 5) / minutes) : 0);
    setCpm(minutes > 0 ? Math.round(correct / minutes) : 0);
    setAccuracy(acc);
    setCorrectChars(correct);
    setErrors(incorrect);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    fullTextRef.current = buildText();
    inputValRef.current = "";
    setInput("");
    setTimeLeft(DURATION);
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setErrors(0);
    forceUpdate((n) => n + 1);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Circular timer
  const radius = 44;
  const circ = 2 * Math.PI * radius;
  const dashOffset = circ * (1 - timeLeft / DURATION);
  const timerDanger = timeLeft <= 10;

  const renderTextLine = () => {
    const full = fullTextRef.current;
    const cursor = input.length;
    // If the char to type is a space, show the cursor on the next char instead
    const visualCursor = full[cursor] === " " ? cursor + 1 : cursor;
    // Show a window: 30 chars behind cursor to 120 ahead
    const start = Math.max(0, cursor - 30);
    const end = Math.min(full.length, cursor + 150);
    const chars = [];

    for (let i = start; i < end; i++) {
      const char = full[i];
      let cls = "text-gray-600";
      let extra = "";

      if (i < cursor) {
        cls = input[i] === char ? "font-medium" : "font-medium";
        // correct = blue, wrong = red (inline style handles color)
      } else if (i === visualCursor) {
        extra = "cursor-char";
      }

      const isCorrect = i < cursor && input[i] === char;
      const isWrong   = i < cursor && input[i] !== char;
      const isCursor  = i === visualCursor;

      chars.push(
        <span
          key={i}
          className={`${extra} relative`}
          style={{
            color: isCorrect ? "#4ade80" : isWrong ? "#f87171" : "#9ca3af",
            fontWeight: isCorrect || isWrong ? 500 : 400,
            borderLeft: isCursor ? "2.5px solid #F59E0B" : undefined,
            marginLeft: isCursor ? "-1px" : undefined,
          }}
        >
          {char === " " ? " " : char}
        </span>
      );
    }
    return chars;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0f1117", fontFamily: "'Inter', sans-serif" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Floating background letters */}
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none font-bold"
          style={{
            top: f.top,
            left: f.left,
            fontSize: f.size,
            opacity: f.opacity * 0.6,
            transform: `rotate(${f.rotate})`,
            color: "#ffffff",
          }}
        >
          {f.letter}
        </span>
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">

        {/* Title */}
        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
          Typing Speed Test
        </p>
        <h1 className="text-5xl font-extrabold text-white mb-10 text-center leading-tight">
          Test your typing skills
        </h1>

        {/* Stats row */}
        <div className="flex items-center gap-5 mb-12">

          {/* Circular timer */}
          <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
            <svg width="110" height="110" className="absolute" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="55" cy="55" r={radius} fill="none" stroke="#1e2130" strokeWidth="6" />
              <circle
                cx="55" cy="55" r={radius}
                fill="none"
                stroke={timerDanger ? "#ef4444" : "#F59E0B"}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className={`text-3xl font-extrabold tabular-nums ${timerDanger ? "text-red-400" : "text-white"}`}>
                {timeLeft}
              </span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">seconds</span>
            </div>
          </div>

          {/* Stat cards */}
          {[
            { value: wpm, label: "words/min" },
            { value: cpm, label: "chars/min" },
            { value: accuracy, label: "% accuracy" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center rounded-2xl"
              style={{ width: 110, height: 110, background: "#1a1d27", border: "1px solid #2a2d3a" }}
            >
              <span className="text-3xl font-extrabold text-white tabular-nums">{value}</span>
              <span className="text-[11px] text-gray-500 mt-1 font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Text display box */}
        {!finished && (
          <div className="w-full relative">
            {/* "Start typing" tooltip */}
            {!started && (
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-md text-sm font-semibold text-gray-900 z-10 shadow"
                style={{ background: "#F59E0B", whiteSpace: "nowrap" }}
              >
                Start typing
                <span
                  className="absolute left-1/2 -translate-x-1/2 top-full"
                  style={{
                    width: 0, height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "7px solid #F59E0B",
                  }}
                />
              </div>
            )}

            {/* Single-line text strip */}
            <div
              className="w-full rounded-2xl px-8 flex items-center"
              style={{
                height: 90,
                background: "#1a1d27",
                border: "1px solid #2a2d3a",
                overflow: "hidden",
              }}
            >
              <div
                ref={textLineRef}
                className="flex items-center whitespace-nowrap text-2xl"
                style={{
                  fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
                  letterSpacing: "normal",
                  wordSpacing: "0.15em",
                  overflowX: "hidden",
                  width: "100%",
                }}
              >
                {renderTextLine()}
              </div>
            </div>

            {/* Hidden real input */}
            <input
              ref={inputRef}
              value={input}
              onChange={handleInput}
              disabled={finished}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="absolute opacity-0 w-0 h-0 pointer-events-none"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </div>
        )}

        {/* Reset link */}
        {!finished && (
          <button
            onClick={(e) => { e.stopPropagation(); reset(); }}
            className="mt-5 text-xs text-gray-600 hover:text-gray-400 underline underline-offset-2 transition-colors"
          >
            Reset / New Text
          </button>
        )}

        {/* Results */}
        {finished && (
          <div
            className="w-full rounded-2xl p-8 text-center"
            style={{ background: "#1a1d27", border: "1px solid #2a2d3a" }}
          >
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Results</p>
            <h2 className="text-3xl font-extrabold text-white mb-7">Your typing speed</h2>
            <div className="grid grid-cols-2 gap-4 mb-7">
              {[
                { label: "Words / min", value: wpm, color: "#F59E0B" },
                { label: "Chars / min", value: cpm, color: "#818cf8" },
                { label: "Accuracy", value: `${accuracy}%`, color: "#34d399" },
                { label: "Errors", value: errors, color: "#f87171" },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="rounded-2xl p-5 text-left"
                  style={{ background: "#0f1117", border: "1px solid #2a2d3a" }}
                >
                  <div className="text-4xl font-extrabold mb-1" style={{ color }}>{value}</div>
                  <div className="text-sm text-gray-500 font-medium">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mb-6">
              {wpm >= 70
                ? "Outstanding! You are an expert customer support agent."
                : wpm >= 50
                ? "Great speed! You handle customer queries efficiently."
                : wpm >= 35
                ? "Good job! Keep practicing to reach professional speed."
                : "Keep going — consistent practice will improve your speed."}
            </p>
            <button
              onClick={reset}
              className="px-10 py-3 rounded-full font-bold text-gray-900 text-base transition-colors hover:opacity-90"
              style={{ background: "#F59E0B" }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tip */}
        {!started && !finished && (
          <p className="mt-6 text-xs text-gray-600 text-center">
            Customer Support • Roman Nepali • Text is infinite for the full 60 seconds
          </p>
        )}
      </div>
    </div>
  );
}
