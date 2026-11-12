 "use client";

import { useEffect, useMemo, useState } from "react";
import { Zap, MessageCircle, Sparkles, Copy, Check, Share2, Crown, Languages, ShieldCheck, ArrowUpRight, Menu, X, LockKeyhole, WandSparkles, Coins, ChevronDown } from "lucide-react";

type Mood = "savage" | "smart" | "chill" | "pro";
type Reply = { text: string; tag: string };

const moods: { id: Mood; icon: string; en: string; si: string; hint: string }[] = [
  { id: "savage", icon: "🔥", en: "Savage & Witty", si: "සැර & witty", hint: "Sharp, playful, never cruel" },
  { id: "smart", icon: "🧠", en: "Smart & Logical", si: "බුද්ධිමත්", hint: "Calm logic with confidence" },
  { id: "chill", icon: "😎", en: "Chill & Short", si: "Chill & කෙටි", hint: "Effortless and brief" },
  { id: "pro", icon: "💼", en: "Professional", si: "වෘත්තීය", hint: "Polished and respectful" }
];

const copy = {
  en: {
    navLogin: "Login / Register", tokens: "Tokens", eyebrow: "YOUR PERSONAL COMEBACK ENGINE",
    headlineA: "Outsmart the Noise.", headlineB: "Instant Replies, Zero Effort.",
    sub: "Turn awkward messages into your best response. Smart, witty, and always on point.",
    inputTitle: "What's the situation?", inputSub: "Paste a message, argument, or anything you need a reply to.",
    placeholder: "Drop the message here… We’ll handle the words.",
    mood: "CHOOSE YOUR VIBE", generate: "Generate Zinger", generating: "Crafting your zingers…",
    output: "Your zingers are ready", outputSub: "Three ways to own the conversation. Pick your favourite.",
    copy: "Copy reply", copied: "Copied!", share: "WhatsApp", empty: "Your next great reply starts here.",
    emptySub: "Add a message, choose your vibe, and let Zinger do its thing.",
    upgrade: "Out of free tokens", upgradeSub: "You’ve used your 10 free zingers. Get more tokens or unlock Pro for unlimited comebacks.",
    getTokens: "Get more tokens", goPro: "Go Pro", close: "Maybe later",
    free: "10 free zingers to get started", privacy: "Your words stay yours. No ads. No noise.",
    footer: "Made for the moments when words matter.", loginTitle: "Welcome to Zinger AI",
    loginSub: "Sign-in is ready to connect to your auth provider.", email: "Email address", continue: "Continue",
    pricing: "Simple plans. Serious comebacks.", monthly: "Monthly", oneTime: "One-time",
    proPrice: "Pro plan", packPrice: "Token pack", best: "BEST VALUE", checkout: "Continue to secure checkout",
    loginNote: "Authentication provider not configured yet."
  },
  si: {
    navLogin: "Login / Register", tokens: "Tokens", eyebrow: "ඔයාගේ PERSONAL COMEBACK ENGINE",
    headlineA: "කතාවට උත්තර දෙන්න.", headlineB: "ක්ෂණික Replies. කිසිම මහන්සියක් නෑ.",
    sub: "අමාරු messages වලට සුපිරි reply එකක්. Smart, witty සහ හරියටම point එකට.",
    inputTitle: "මොකක්ද සිද්ධිය?", inputSub: "Reply එකක් ඕන message එක මෙතන paste කරන්න.",
    placeholder: "Message එක මෙතන දාන්න… ඉතුරු ටික අපි බලාගන්නම්.",
    mood: "ඔයාගේ VIBE එක තෝරන්න", generate: "Zinger එක හදන්න", generating: "Replies හදමින්…",
    output: "ඔයාගේ Zingers ලෑස්තියි", outputSub: "කතාව ඔයාගේ පැත්තට හරවන්න replies තුනක්.",
    copy: "Copy කරන්න", copied: "Copied!", share: "WhatsApp", empty: "ඔයාගේ සුපිරි reply එක මෙතනින් පටන් ගන්න.",
    emptySub: "Message එක දාලා vibe එක තෝරන්න. ඉතුරු ටික Zinger බලාගනී.",
    upgrade: "Free tokens ඉවරයි", upgradeSub: "ඔයාගේ free zingers 10ම භාවිතා කරලා. තව tokens ගන්න නැත්නම් Pro වෙන්න.",
    getTokens: "තව Tokens ගන්න", goPro: "Pro වෙන්න", close: "පස්සේ බලමු",
    free: "පටන් ගන්න free zingers 10ක්", privacy: "ඔයාගේ messages ඔයාගේමයි. Ads නෑ. කරදර නෑ.",
    footer: "වචන වැදගත් වෙන හැම මොහොතකටම.", loginTitle: "Zinger AI වෙත සාදරයෙන් පිළිගනිමු",
    loginSub: "ඔයාගේ authentication provider එක සම්බන්ධ කිරීමට සූදානම්.", email: "Email ලිපිනය", continue: "ඉදිරියට යන්න",
    pricing: "සරල මිල ගණන්. සුපිරි replies.", monthly: "මාසික", oneTime: "එක්වරක්", proPrice: "Pro Plan",
    packPrice: "Token Pack", best: "වටිනාම තේරීම", checkout: "ආරක්ෂිත checkout වෙත යන්න",
    loginNote: "Authentication provider එක තවම සකසා නැත."
  }
};

function makeReplies(message: string, mood: Mood, lang: "en" | "si"): Reply[] {
  const clean = message.trim().replace(/\s+/g, " ");
  const excerpt = clean.length > 90 ? clean.slice(0, 87) + "…" : clean;
  if (lang === "si") {
    const sets: Record<Mood, string[]> = {
      savage: [
        "ඔයාගේ point එක තේරුණා. ඒත් confidence එකට facts ටිකකුත් එකතු කළා නම් තවත් ලස්සනයි. 😌",
        "මේකට reply එකක් දෙන්න කලින් මම හිතුවා… පස්සේ මට මතක් වුණා මගේ time එක වටිනවා කියලා. 😉",
        "කතාව දිගයි, point එක පොඩියි. අපි facts වලට එමුද?"
      ],
      smart: [
        "ඔයා කියන දේ තේරෙනවා. හැබැයි අපි අදහස්වලට වඩා facts සහ logic අනුව බලමු.",
        "ඒක එක පැත්තකින් බලන්න පුළුවන්. නමුත් සම්පූර්ණ picture එකට තව කරුණු කිහිපයක් තියෙනවා.",
        "මගේ අදහස වෙනස් වෙන්න පුළුවන්, ඒකට හොඳ හේතු සහ සාක්ෂි තිබුණොත්."
      ],
      chill: [
        "හරි හරි, ඔයා කියන එක තේරුණා 😎",
        "ඒකත් අදහසක් තමයි. මම නම් වෙනස් විදිහට දකිනවා.",
        "No worries. අපි මේක ලොකු දෙයක් කරගන්න ඕන නෑ."
      ],
      pro: [
        "ඔබේ අදහසට ස්තූතියි. මේ පිළිබඳව කරුණු මත පදනම්ව තවදුරටත් සාකච්ඡා කරමු.",
        "ඔබේ ස්ථාවරය මට පැහැදිලියි. මගේ පැත්තෙන් වෙනත් කරුණු කිහිපයක් ඉදිරිපත් කිරීමට කැමතියි.",
        "මෙය වඩාත් ඵලදායීව විසඳා ගැනීමට අපි ප්‍රධාන කරුණු වෙත අවධානය යොමු කරමු."
      ]
    };
    return sets[mood].map((text, i) => ({ text: i === 0 && excerpt ? `${text}` : text, tag: ["THE OPENER", "THE FOLLOW-UP", "THE MIC DROP"][i] }));
  }
  const sets: Record<Mood, string[]> = {
    savage: [
      "I’d respond properly, but I don’t want to make this a competition you’re not ready for. 😉",
      "That’s a confident take. The evidence, however, seems to be on vacation.",
      "I see the point you’re trying to make. Let me know when it arrives."
    ],
    smart: [
      "I hear you. But let’s separate what we know from what we’re assuming, then we can have a real conversation.",
      "That’s one interpretation. There are a few missing details worth considering before we call it a conclusion.",
      "I’m open to changing my mind — just bring a stronger argument than an assumption."
    ],
    chill: [
      "Fair enough. We can agree to see this differently. 😎",
      "Got you. Not every conversation needs a winner.",
      "All good — let's keep it moving."
    ],
    pro: [
      "Thank you for sharing your perspective. I see it differently, and I’d be happy to clarify the reasoning behind my position.",
      "I appreciate the feedback. Let’s focus on the key points and find a constructive way forward.",
      "Understood. To move this forward, could we align on the facts and the outcome we're aiming for?"
    ]
  };
  return sets[mood].map((text, i) => ({ text, tag: ["THE OPENER", "THE FOLLOW-UP", "THE MIC DROP"][i] }));
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "si">("en");
  const [mood, setMood] = useState<Mood>("savage");
  const [message, setMessage] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState(10);
  const [modal, setModal] = useState<"upgrade" | "login" | "pricing" | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const saved = Number(localStorage.getItem("zinger_tokens"));
    if (Number.isFinite(saved) && saved >= 0) setTokens(saved);
  }, []);
  useEffect(() => { localStorage.setItem("zinger_tokens", String(tokens)); }, [tokens]);

  const currency = useMemo(() => {
    if (typeof navigator !== "undefined" && navigator.language.toLowerCase().includes("lk")) return "LKR";
    return "USD";
  }, []);
  const price = currency === "LKR" ? "Rs. 1,500" : "$4.99";

  async function generate() {
    if (!message.trim() || loading) return;
    if (tokens <= 0) { setModal("upgrade"); return; }
    setLoading(true); setReplies([]);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, mood, lang }) });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.replies) && data.replies.length) setReplies(data.replies.slice(0, 3));
        else setReplies(makeReplies(message, mood, lang));
      } else {
        setReplies(makeReplies(message, mood, lang));
      }
    } catch { setReplies(makeReplies(message, mood, lang)); }
    setTokens(v => Math.max(0, v - 1));
    setLoading(false);
  }

  async function copyReply(text: string, index: number) {
    await navigator.clipboard.writeText(text);
    setCopied(index); window.setTimeout(() => setCopied(null), 1600);
  }

  function checkout() {
    const url = process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else alert("Add NEXT_PUBLIC_LEMON_CHECKOUT_URL to .env.local to enable secure checkout.");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0B0E]">
      <div className="fixed inset-0 pointer-events-none grid-bg opacity-70" />
      <div className="fixed -top-40 left-[15%] w-[480px] h-[480px] bg-cyan-500 orb" />
      <div className="fixed top-[38%] -right-48 w-[520px] h-[520px] bg-purple-700 orb orb-two" />
      <nav className="sticky top-0 z-40 border-b border-white/[.07] bg-[#0B0B0E]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/[.08] text-cyan-300 shadow-[0_0_24px_rgba(0,240,255,.15)]"><Zap size={23} fill="currentColor" /></span>
            <span className="font-['Space_Grotesk'] text-[21px] font-bold tracking-tight">zinger<span className="text-cyan-300">.ai</span></span>
          </a>
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-xs text-slate-300"><Coins size={14} className="text-cyan-300" /> {t.tokens}: <b className="text-white">{tokens}</b></div>
            <div className="flex rounded-full border border-white/10 bg-white/[.035] p-1 text-xs">
              <button onClick={() => setLang("en")} className={`rounded-full px-3 py-1.5 transition ${lang === "en" ? "bg-white/10 text-white" : "text-slate-500"}`}>English</button>
              <button onClick={() => setLang("si")} className={`rounded-full px-3 py-1.5 transition ${lang === "si" ? "bg-white/10 text-white" : "text-slate-500"}`}>සිංහල</button>
            </div>
            <button onClick={() => setModal("login")} className="rounded-full border border-cyan-300/35 px-4 py-2.5 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-300/10">{t.navLogin}</button>
          </div>
          <button className="text-slate-300 md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
        </div>
        {mobileMenu && <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 md:hidden"><div className="text-sm text-slate-300">{t.tokens}: {tokens}</div><div className="flex gap-2"><button onClick={() => setLang("en")} className="rounded-lg bg-white/10 px-3 py-2 text-sm">English</button><button onClick={() => setLang("si")} className="rounded-lg bg-white/10 px-3 py-2 text-sm">සිංහල</button></div><button onClick={() => setModal("login")} className="rounded-lg border border-cyan-300/30 px-3 py-2 text-left text-sm text-cyan-200">{t.navLogin}</button></div>}
      </nav>

      <section className="relative mx-auto max-w-7xl px-5 pb-14 pt-20 text-center md:px-8 md:pb-20 md:pt-28">
        <div className="absolute inset-0 -z-10 overflow-hidden"><div className="absolute left-1/2 top-10 h-[380px] w-[780px] -translate-x-1/2 rounded-full border border-cyan-300/[.06] blur-[1px]" /><div className="absolute left-1/2 top-20 h-[300px] w-[600px] -translate-x-1/2 rounded-full border border-purple-400/[.08]" /></div>
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[.06] px-4 py-2 text-[10px] font-bold tracking-[.22em] text-cyan-200"><Sparkles size={13} /> {t.eyebrow}</div>
        <h1 className="mx-auto max-w-4xl font-['Space_Grotesk'] text-4xl font-bold leading-[1.08] tracking-[-.045em] sm:text-6xl md:text-[76px]">
          <span className="block text-white">{t.headlineA}</span><span className="gradient-text">{t.headlineB}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">{t.sub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500"><span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-cyan-300" /> {t.privacy}</span><span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" /><span className="flex items-center gap-1.5"><Zap size={13} className="text-purple-300" /> {t.free}</span></div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-6 px-5 pb-24 md:grid-cols-[1.05fr_.95fr] md:px-8">
        <div className="glass neon-border rounded-3xl p-5 md:p-7">
          <div className="mb-5 flex items-start justify-between gap-3"><div><div className="flex items-center gap-2 text-lg font-bold"><MessageCircle size={19} className="text-cyan-300" /> {t.inputTitle}</div><p className="mt-1 text-xs text-slate-500">{t.inputSub}</p></div><span className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-slate-500">01 / INPUT</span></div>
          <textarea value={message} onChange={e => setMessage(e.target.value)} maxLength={3000} placeholder={t.placeholder} className="min-h-[190px] w-full rounded-2xl border border-white/10 bg-[#08090d]/80 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:shadow-[0_0_25px_rgba(0,240,255,.07)]" />
          <div className="mt-2 flex justify-between text-[10px] text-slate-600"><span>Paste or type up to 3,000 characters</span><span>{message.length}/3000</span></div>
          <div className="mb-3 mt-8 flex items-center justify-between"><span className="text-[10px] font-bold tracking-[.2em] text-slate-400">{t.mood}</span><span className="text-[10px] text-slate-600">02 / VIBE</span></div>
          <div className="grid grid-cols-2 gap-2">
            {moods.map(m => <button key={m.id} onClick={() => setMood(m.id)} className={`flex min-h-[62px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${mood === m.id ? "pill-active" : "border-white/10 bg-white/[.025] text-slate-300 hover:border-white/20 hover:bg-white/[.05]"}`}><span className="text-xl">{m.icon}</span><span className="min-w-0"><span className="block text-xs font-bold">{lang === "en" ? m.en : m.si}</span><span className={`mt-1 block truncate text-[9px] ${mood === m.id ? "text-black/60" : "text-slate-600"}`}>{m.hint}</span></span></button>)}
          </div>
          <button onClick={generate} disabled={!message.trim() || loading} className="primary-btn mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-extrabold text-[#071014] disabled:cursor-not-allowed disabled:opacity-40">
            {loading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" /> {t.generating}</> : <><WandSparkles size={18} /> {t.generate} <ArrowUpRight size={17} /></>}
          </button>
          <p className="mt-3 text-center text-[10px] text-slate-600">One token per generation · {tokens} remaining</p>
        </div>

        <div className="glass rounded-3xl p-5 md:p-7">
          <div className="mb-6 flex items-start justify-between"><div><div className="flex items-center gap-2 text-lg font-bold"><Sparkles size={19} className="text-purple-300" /> {t.output}</div><p className="mt-1 text-xs text-slate-500">{t.outputSub}</p></div><span className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-slate-500">03 / OUTPUT</span></div>
          {loading ? <div className="flex min-h-[390px] flex-col items-center justify-center text-center"><div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/[.06] text-cyan-300 dot-pulse"><Zap size={30} /></div><p className="text-sm font-semibold text-white">{t.generating}</p><div className="mt-4 flex gap-1.5">{[0,1,2].map(x => <span key={x} className="h-1.5 w-1.5 rounded-full bg-cyan-300 dot-pulse" style={{animationDelay:`${x*.2}s`}} />)}</div></div> :
          replies.length ? <div className="space-y-3">{replies.map((r,i) => <article key={i} className="animate-pop rounded-2xl border border-white/[.09] bg-[#08090d]/65 p-4" style={{animationDelay:`${i*.08}s`}}><div className="mb-3 flex items-center justify-between"><span className="text-[9px] font-bold tracking-[.2em] text-cyan-300">{r.tag || ["THE OPENER","THE FOLLOW-UP","THE MIC DROP"][i]}</span><span className="text-[10px] text-slate-600">0{i+1}</span></div><p className="text-sm leading-7 text-slate-200">{r.text}</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => copyReply(r.text,i)} className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[10px] font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200">{copied === i ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}{copied === i ? t.copied : t.copy}</button><a href={`https://wa.me/?text=${encodeURIComponent(r.text)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/[.06] px-3 py-2 text-[10px] font-semibold text-emerald-200 transition hover:bg-emerald-400/10"><Share2 size={13} />{t.share}</a></div></article>)}</div> :
          <div className="flex min-h-[390px] flex-col items-center justify-center text-center"><div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[.025] text-slate-600"><MessageCircle size={32} strokeWidth={1.2} /></div><p className="text-sm font-semibold text-slate-300">{t.empty}</p><p className="mt-2 max-w-[230px] text-xs leading-6 text-slate-600">{t.emptySub}</p><div className="mt-7 flex items-center gap-2 text-[10px] text-slate-600"><span className="h-px w-8 bg-white/10" /> WAITING FOR INPUT <span className="h-px w-8 bg-white/10" /></div></div>}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="glass rounded-3xl border border-purple-300/15 p-8 text-center md:p-12">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300"><Crown size={23} /></div>
          <p className="mb-3 text-[10px] font-bold tracking-[.24em] text-purple-300">LEVEL UP YOUR REPLIES</p>
          <h2 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight md:text-4xl">{t.pricing}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">More tokens. More control. Same zero-noise experience.</p>
          <div className="mx-auto mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5"><div className="text-xs text-slate-400">{t.packPrice}</div><div className="mt-2 text-3xl font-bold">{currency === "LKR" ? "Rs. 650" : "$2.49"}<span className="text-xs font-normal text-slate-500"> / 50 tokens</span></div><button onClick={() => setModal("pricing")} className="mt-5 w-full rounded-xl border border-white/15 py-3 text-xs font-bold text-white hover:bg-white/[.05]">{t.getTokens}</button></div>
            <div className="relative rounded-2xl border border-cyan-300/30 bg-cyan-300/[.045] p-5"><span className="absolute right-4 top-4 rounded-full bg-cyan-300/15 px-2 py-1 text-[8px] font-bold tracking-wider text-cyan-200">{t.best}</span><div className="text-xs text-slate-400">{t.proPrice}</div><div className="mt-2 text-3xl font-bold">{price}<span className="text-xs font-normal text-slate-500"> / month</span></div><ul className="mt-4 space-y-2 text-xs text-slate-400"><li>✓ Unlimited AI replies*</li><li>✓ Every tone, every language</li><li>✓ Priority generation</li></ul><button onClick={() => setModal("pricing")} className="primary-btn mt-5 w-full rounded-xl py-3 text-xs font-extrabold text-[#071014]">{t.goPro}</button></div>
          </div>
          <p className="mt-5 text-[10px] text-slate-600">*Plan entitlements are illustrative until billing and server-side usage enforcement are configured.</p>
        </div>
      </section>

      <footer className="border-t border-white/[.07] px-5 py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"><div className="flex items-center gap-2 text-sm font-bold"> <Zap size={16} className="text-cyan-300" /> zinger<span className="text-cyan-300">.ai</span></div><p className="text-[11px] text-slate-600">{t.footer} © 2025 Zinger AI</p><div className="flex items-center gap-2 text-[10px] text-slate-600"><LockKeyhole size={12} /> Private by design · Zero ads</div></div></footer>

      {modal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md" onClick={() => setModal(null)}><div onClick={e => e.stopPropagation()} className="glass w-full max-w-md rounded-3xl border border-cyan-300/20 p-6 shadow-[0_0_80px_rgba(0,240,255,.1)]"><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2 text-lg font-bold"><span className="text-cyan-300"><Zap size={20} /></span>{modal === "login" ? t.loginTitle : modal === "upgrade" ? t.upgrade : t.pricing}</div><button onClick={() => setModal(null)} className="rounded-lg p-2 text-slate-500 hover:bg-white/10"><X size={18} /></button></div>
        {modal === "login" ? <><p className="mb-5 text-sm leading-6 text-slate-400">{t.loginSub}</p><input type="email" placeholder={t.email} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-cyan-300/50" /><button onClick={() => alert(t.loginNote)} className="primary-btn mt-3 w-full rounded-xl py-3 text-sm font-bold text-black">{t.continue}</button></> :
        <><p className="mb-6 text-sm leading-6 text-slate-400">{modal === "upgrade" ? t.upgradeSub : "Choose a plan and continue to the secure Lemon Squeezy checkout."}</p><div className="space-y-3"><button onClick={checkout} className="primary-btn flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-black">{t.getTokens} <ArrowUpRight size={16} /></button><button onClick={checkout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-400/10 py-3.5 text-sm font-bold text-purple-200">{t.goPro} <Crown size={16} /></button></div></>}
        <button onClick={() => setModal(null)} className="mt-4 w-full py-2 text-xs text-slate-600 hover:text-slate-300">{t.close}</button></div></div>}
    </main>
  );
}