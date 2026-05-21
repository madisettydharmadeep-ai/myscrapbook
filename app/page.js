"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Sparkles,
  User,
  Coffee,
  Camera,
  PenLine,
  Palette,
  Volume2,
  BookOpen,
  Link2,
  Cake,
  Gift,
  Globe,
  MessageCircle,
  Plus,
  Check,
  Infinity,
  Instagram,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import SupportButton from "@/components/SupportButton";

// Avatar gifs for random selection
const AVATAR_GIFS = [
  "https://media1.tenor.com/m/EvV2yv9uuhEAAAAC/luffy-luffing.gif",
  "https://media1.tenor.com/m/l54b4QxkuRUAAAAC/luffy-luffy-one-piece.gif",
  "https://media1.tenor.com/m/6OJbJR-mRTsAAAAC/bleach-watching.gif",
  "https://media.tenor.com/KUXIWC9D5_UAAAAi/my-hero-academia-boku-no-hero-academia.gif",
  "https://media1.tenor.com/m/sVZ7b5BkkJAAAAAC/gojo-satoru-yakana.gif",
];

export default function Home() {
  const { user, loading } = useAuth();

  // Pick a random avatar on each page load
  const randomAvatar = useMemo(() => {
    return AVATAR_GIFS[Math.floor(Math.random() * AVATAR_GIFS.length)];
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-800 font-sans selection:bg-rose-100 flex flex-col relative overflow-hidden">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                name: "myscrapbook",
                url: "https://myscrapbook.thestorybits.com",
                applicationCategory: "DesignApplication",
                operatingSystem: "Web Browser",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                description:
                  "Create adorable, aesthetic digital scrapbooks with interactive features. The cutest way to make personalized gifts for birthdays, anniversaries, and long-distance relationships.",
                featureList: [
                  "Interactive scratch cards",
                  "Secret envelope reveals",
                  "Polaroid photo galleries",
                  "3D page flip animation",
                  "Cute kawaii themes",
                  "Easy sharing via link",
                ],
                screenshot: "https://myscrapbook.thestorybits.com/og-image.png",
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  ratingCount: "150",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is myscrapbook?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "myscrapbook is a free online tool to create cute, interactive digital scrapbooks. You can add photos, write notes, use scratch cards, and share your creation with a simple link.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is myscrapbook free to use?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes! myscrapbook is completely free to use. Create as many scrapbooks as you want and share them with anyone.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What occasions is myscrapbook good for?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "myscrapbook is perfect for birthdays, anniversaries, Valentine's Day, long-distance relationship gifts, thank you notes, graduation gifts, and any time you want to create a heartfelt, personalized gift.",
                    },
                  },
                ],
              },
              {
                "@type": "Organization",
                name: "myscrapbook",
                url: "https://myscrapbook.thestorybits.com",
                logo: "https://myscrapbook.thestorybits.com/heart-favicon.ico",
                sameAs: ["https://www.instagram.com/myscrapbook.app/"],
              },
            ],
          }),
        }}
      />

      {/* Simple Header - Increased max-width */}
      <header className="px-6 md:px-10 py-5 flex justify-between items-center max-w-5xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/heart-favicon.ico"
            alt="Logo"
            className="w-8 h-8 group-hover:rotate-12 transition-transform"
          />
          <span className="font-bold text-gray-700">myscrapbook</span>
        </Link>

        <div className="flex items-center gap-2">
          {!loading &&
            (user ? (
              <Link
                href="/profile"
                className="p-2 hover:bg-rose-50 rounded-full transition-colors"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name?.charAt(0)}
                  </div>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2"
              >
                sign in
              </Link>
            ))}
        </div>
      </header>

      {/* Main Content - Increased max-width */}
      <main className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24 w-full flex-1 relative z-10">
        {/* Hero - Personal & Warm */}
        <section className="mb-24 md:text-center md:flex md:flex-col md:items-center">
          <div className="flex items-center gap-2 text-rose-400 mb-6">
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">
              a tiny puk passion project
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-6 max-w-4xl tracking-tight">
            Make little books for the people you love.
          </h1>

          <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl">
            myscrapbook is a simple tool to create cute, flippable digital
            scrapbooks. Add photos, write messages, pick pretty themes — then
            share it with a link. That's it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/scrapbook"
              className="inline-flex items-center gap-2 bg-rose-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-500 transition-all hover:scale-105 shadow-xl shadow-rose-200"
            >
              <span>start making</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </Link>

            <a
              href="https://ko-fi.com/kazama_studiooo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg bg-[#FFDD00] text-[#1a1a1a] transition-all duration-200 hover:brightness-95 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 shadow-[0_4px_0_0_#d9bc00] hover:shadow-[0_6px_0_0_#d9bc00] active:shadow-none"
            >
              <img
                src="/kofi_symbol.png"
                alt="Ko-fi"
                className="w-6 h-6 object-contain"
              />
              <span>Support me on Ko-fi</span>
            </a>
          </div>
        </section>

        {/* Examples / Inspiration Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center w-full">
              made with myscrapbook
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Example 1: The Real Link */}
            <a
              href="https://myscrapbook.thestorybits.com/scrapbook/xxvdve57h8jdtwfs"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] bg-cover bg-center rounded-2xl border-2 border-gray-100 p-6 flex flex-col items-center justify-end text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{
                backgroundImage:
                  'url("https://i.pinimg.com/736x/d4/60/e0/d460e0af73404d8cad2d440b2eacd9e3.jpg")',
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-0 inset-x-0 h-2 bg-white/10" />
              <div className="absolute right-0 inset-y-0 w-2 bg-gradient-to-l from-white/10 to-transparent" />
              <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/30 to-transparent z-10" />

              <div className="relative z-10 w-full">
                <h3 className="font-bold text-white text-xl mb-2 shadow-black/50 drop-shadow-md uppercase leading-tight tracking-wide">
                  HI, LET ME SHOW YOU AROUND ✿
                </h3>
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-bold text-white border border-white/30 group-hover:bg-white group-hover:text-rose-500 transition-all mt-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  Open Book
                </span>
              </div>
            </a>

            {/* Example 2: Small Book */}
            <a
              href="https://myscrapbook.thestorybits.com/scrapbook/54t3dcrtzor2hrr7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] bg-cover bg-center rounded-2xl border-2 border-gray-100 p-6 flex flex-col items-center justify-end text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{
                backgroundImage:
                  'url("https://i.pinimg.com/1200x/62/c8/b3/62c8b3c16f4f34b715a4179f47d391c6.jpg")',
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-0 inset-x-0 h-2 bg-white/10" />
              <div className="absolute right-0 inset-y-0 w-2 bg-gradient-to-l from-white/10 to-transparent" />
              <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/30 to-transparent z-10" />

              <div className="relative z-10 w-full">
                <h3 className="font-bold text-white text-xl mb-2 shadow-black/50 drop-shadow-md leading-tight tracking-wide">
                  hi. i'm a small book.
                </h3>
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-bold text-white border border-white/30 group-hover:bg-white group-hover:text-rose-500 transition-all mt-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  Open Book
                </span>
              </div>
            </a>

            {/* Example 3: Little Things */}
            <a
              href="https://myscrapbook.thestorybits.com/scrapbook/4mzvey2hojelu8vh"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] bg-cover bg-center rounded-2xl border-2 border-gray-100 p-6 flex flex-col items-center justify-end text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{
                backgroundImage:
                  'url("https://i.pinimg.com/1200x/cd/99/95/cd9995acea99d40f0915211e59046c61.jpg")',
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-0 inset-x-0 h-2 bg-white/10" />
              <div className="absolute right-0 inset-y-0 w-2 bg-gradient-to-l from-white/10 to-transparent" />
              <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/30 to-transparent z-10" />

              <div className="relative z-10 w-full">
                <h3 className="font-bold text-white text-xl mb-2 shadow-black/50 drop-shadow-md leading-tight tracking-wide">
                  Little things about me
                </h3>
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-bold text-white border border-white/30 group-hover:bg-white group-hover:text-rose-500 transition-all mt-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  Open Book
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 my-16 max-w-3xl mx-auto">
          <div className="flex-1 h-px bg-gray-200"></div>
          <Sparkles className="w-4 h-4 text-amber-300" />
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* About Section - Cute Story Card */}
        <section className="mb-24 mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-rose-100 shadow-xl bg-white/60 backdrop-blur-xl px-6 sm:px-12 py-10 sm:py-16 flex flex-col md:flex-row gap-8 sm:gap-14 items-center group">
            {/* Avatar */}
            <div className="shrink-0 flex flex-col items-center gap-4">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-8 border-white shadow-2xl ring-4 ring-rose-100 transition-transform duration-700 group-hover:scale-105">
                <img
                  src={randomAvatar}
                  alt="me"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                the story
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="font-bold text-4xl md:text-5xl text-gray-800 mb-6 leading-tight tracking-tight">
                hey, it's me! 👋
              </p>

              <div className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-md mx-auto md:mx-0 mb-8 space-y-4 font-medium">
                <p>
                  ai/ml engineer by day, but my heart's all about creating
                  things that feel
                  <span className="text-rose-400 font-bold"> warm </span>
                  and
                  <span className="text-amber-500 font-bold"> cozy</span>.
                </p>
                <p>
                  this is my little corner — where digital gifts actually{" "}
                  <em className="text-gray-700 font-bold not-italic">feel</em>{" "}
                  like gifts. 💌
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                {[
                  { text: "hates corporate", icon: "🙃" },
                  { text: "tea person", icon: "☕" },
                  { text: "night owl", icon: "🌙" },
                  { text: "cute only", icon: "🎀" },
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border border-gray-200 text-gray-500 bg-gray-50 hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-default shadow-sm"
                  >
                    <span>{tag.icon}</span>
                    <span>{tag.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── What you can do ── */}
        <section className="mb-24">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 block text-center md:text-left">
            what you can do
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: Camera,
                title: "drop in photos",
                desc: "Upload memories safely and easily. Arrange them perfectly on your pages.",
                accent: "border-rose-200 bg-rose-50/50",
                iconColor: "text-rose-500 bg-rose-100 shadow-rose-200/50",
              },
              {
                icon: PenLine,
                title: "write little notes",
                desc: "Capture a feeling, a funny quote, or an inside joke. No pressure to be perfect.",
                accent: "border-amber-200 bg-amber-50/50",
                iconColor: "text-amber-600 bg-amber-100 shadow-amber-200/50",
              },
              {
                icon: Palette,
                title: "pick cute themes",
                desc: "Paint your pages with soft pastel colors, fun stickers, and aesthetic vibes.",
                accent: "border-purple-200 bg-purple-50/50",
                iconColor: "text-purple-500 bg-purple-100 shadow-purple-200/50",
              },
              {
                icon: Link2,
                title: "share anywhere",
                desc: "Send a magic link to your loved ones so they can flip through your book.",
                accent: "border-sky-200 bg-sky-50/50",
                iconColor: "text-sky-500 bg-sky-100 shadow-sky-200/50",
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className={`rounded-2xl border-2 ${f.accent} p-8 flex gap-6 items-start hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group`}
              >
                <span
                  className={`shrink-0 mt-0.5 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 group-hover:rotate-6 ${f.iconColor}`}
                >
                  <f.icon className="w-7 h-7" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-bold text-gray-800 text-xl mb-2 tracking-tight">
                    {f.title}
                  </p>
                  <p className="text-gray-500 text-base font-medium leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="mb-24">
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.18em] mb-3 block">
              simple pricing
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight tracking-tight">
              free, forever.
              <br />
              <span className="text-gray-400 font-medium text-2xl md:text-3xl">
                or buy a coffee if you love it.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Free tier */}
            <div className="relative rounded-2xl border-2 border-gray-100 bg-white p-8 md:p-10 flex flex-col shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    always free
                  </p>
                  <p className="text-5xl font-bold text-gray-800 tracking-tight">
                    $0
                  </p>
                  <p className="text-gray-400 text-sm mt-2 font-medium">
                    no card, no catch
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-400 fill-current" />
                </div>
              </div>
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {[
                  "unlimited digital scrapbooks",
                  "all cute themes and stickers",
                  "3d page flip animations",
                  "audio sounds and interactions",
                  "easy link sharing",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-base font-medium text-gray-600"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check
                        className="w-3.5 h-3.5 text-emerald-600"
                        strokeWidth={3}
                      />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/scrapbook" className="w-full">
                <button className="w-full py-4 rounded-xl border-2 border-gray-100 font-bold text-gray-800 hover:border-gray-300 transition-all active:scale-[0.98] text-base">
                  get started — free
                </button>
              </Link>
            </div>

            {/* Buy me a coffee */}
            <div className="relative rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-rose-50 p-8 md:p-10 flex flex-col overflow-hidden shadow-sm">
              <div className="relative flex-1 flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
                  <Coffee className="w-6 h-6 text-amber-600" />
                </div>

                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
                  from the maker
                </p>

                <p className="text-2xl font-bold text-gray-800 leading-snug mb-5 tracking-tight">
                  hey, i built this for you.
                  <br />
                  completely free.
                </p>

                <p className="text-gray-600 text-base font-medium leading-relaxed mb-5">
                  myscrapbook is a passion project — just me, late nights, and a
                  lot of coffee. there's no company behind this, no investors,
                  no ads. just someone who wanted a cute little way to send
                  digital gifts.
                </p>

                <p className="text-gray-600 text-base font-medium leading-relaxed mb-8">
                  if it made someone's day a little brighter, a coffee would
                  genuinely mean the world to me. no pressure — ever.
                </p>

                <div className="mt-auto self-start md:self-stretch">
                  <a
                    href="https://ko-fi.com/kazama_studiooo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg bg-[#FFDD00] text-[#1a1a1a] transition-all duration-200 hover:brightness-95 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 shadow-[0_4px_0_0_#d9bc00] hover:shadow-[0_6px_0_0_#d9bc00] active:shadow-none"
                  >
                    <img
                      src="/kofi_symbol.png"
                      alt="Ko-fi"
                      className="w-6 h-6 object-contain"
                    />
                    <span>Support me on Ko-fi</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-gray-400">
            <Infinity className="w-5 h-5" strokeWidth={2} />
            <span>
              the free plan is genuinely unlimited — no hidden walls, ever.
            </span>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-md min-h-[320px] flex flex-col md:flex-row bg-white">
            {/* Left image area */}
            <div className="md:w-2/5 shrink-0 relative min-h-[220px] md:min-h-0 bg-rose-50">
              <img
                src="https://i.pinimg.com/1200x/cd/99/95/cd9995acea99d40f0915211e59046c61.jpg"
                alt="scrapbook preview"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70 mix-blend-multiply grayscale-[0.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white hidden md:block" />
            </div>

            {/* Right content */}
            <div className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start px-10 py-14">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                psst...
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4 tracking-tight">
                ready to start
                <br />
                your scrapbook?
              </p>
              <p className="text-gray-500 font-medium mb-10 text-base md:text-lg">
                wanna make something cute? It only takes a second. 💕
              </p>
              <Link
                href="/scrapbook"
                className="inline-flex items-center gap-2 bg-rose-400 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-rose-500 transition-all active:scale-[0.97] shadow-lg shadow-rose-200"
              >
                yes, let's go{" "}
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative w-full border-t border-gray-200 bg-white overflow-hidden mt-10">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#fce7f3 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            opacity: 0.6,
          }}
        />
        {/* Soft blobed accents */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-rose-100 rounded-full blur-[100px] pointer-events-none opacity-60" />
        <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-amber-100 rounded-full blur-[100px] pointer-events-none opacity-60" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-12">
          {/* Top row: brand + pills */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                </div>
                <span className="font-bold text-2xl text-gray-800 tracking-tight">
                  myscrapbook
                </span>
              </div>
              <p className="text-gray-500 text-base font-medium leading-relaxed max-w-sm">
                make little books for the people you love. the cutest way to
                send digital gifts.
              </p>
            </div>

            {/* Feature pills & Socials */}
            <div className="flex flex-col items-start md:items-end gap-6">
              <div className="flex flex-wrap md:justify-end gap-2.5">
                {[
                  {
                    icon: Palette,
                    label: "cute themes",
                    color: "text-rose-500 border-rose-200 bg-rose-50",
                  },
                  {
                    icon: BookOpen,
                    label: "3d flip",
                    color: "text-amber-600 border-amber-200 bg-amber-50",
                  },
                  {
                    icon: Volume2,
                    label: "audio",
                    color: "text-purple-500 border-purple-200 bg-purple-50",
                  },
                  {
                    icon: Link2,
                    label: "shareable",
                    color: "text-sky-500 border-sky-200 bg-sky-50",
                  },
                ].map((f) => (
                  <span
                    key={f.label}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider ${f.color}`}
                  >
                    <f.icon className="w-3.5 h-3.5" strokeWidth={2} />
                    {f.label}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/myscrapbook.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://kazamastudio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50 transition-all"
                  aria-label="Portfolio"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Giant wordmark */}
          <div className="border-t border-gray-200 pt-10 mb-10">
            <p
              className="font-bold leading-none tracking-[-0.05em] select-none text-center md:text-left"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                background:
                  "linear-gradient(135deg, #fda4af 0%, #fb7185 50%, #fcd34d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              myscrapbook
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-sm font-medium text-gray-400 tracking-wide">
              made with lots of ☕ and late nights 🌙 — © 2026 myscrapbook
            </p>
            <div className="flex flex-wrap justify-center items-center gap-5 text-xs font-bold text-gray-400 uppercase tracking-[0.18em]">
              <a href="/" className="hover:text-rose-400 transition-colors">
                home
              </a>
              <span className="text-gray-200">·</span>
              <a
                href="/privacy"
                className="hover:text-gray-700 transition-colors"
              >
                privacy
              </a>
              <span className="text-gray-200">·</span>
              <a
                href="/terms"
                className="hover:text-gray-700 transition-colors"
              >
                terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
