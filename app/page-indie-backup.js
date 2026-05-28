"use client";
import React from "react";
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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-800 font-sans selection:bg-rose-100">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "MyScrapbook",
            applicationCategory: "DesignApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description:
              "Create cute digital scrapbooks and memory books. A passion project made with love.",
          }),
        }}
      />

      {/* Simple Header */}
      <header className="px-6 py-5 flex justify-between items-center max-w-4xl mx-auto">
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
          <Link
            href="/scrapbook"
            className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-all"
          >
            create →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Hero - Personal & Warm */}
        <section className="mb-20">
          <div className="flex items-center gap-2 text-rose-400 mb-6">
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">
              a tiny puku passion project
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Make little books for the people you love.
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            myscrapbook is a simple tool to create cute, flippable digital
            scrapbooks. Add photos, write messages, pick pretty themes — then
            share it with a link. That's it.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/scrapbook"
              className="inline-flex items-center gap-2 bg-rose-400 text-white px-6 py-3 rounded-full font-medium hover:bg-rose-500 transition-all hover:scale-105"
            >
              <span>start making</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://ko-fi.com/kazama_studiooo"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border-2 border-[#ffbdd5] bg-[#fff4f8] px-5 py-3 font-black text-[#5c4351] shadow-[0_5px_0_0_#f8b6ca] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_7px_0_0_#f8b6ca] active:translate-y-0.5 active:shadow-[0_2px_0_0_#f8b6ca]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-inner shadow-rose-100 transition-transform group-hover:rotate-[-6deg] group-hover:scale-110">
                <img src="/kofi_symbol.png" alt="" className="h-5 w-5 object-contain" />
              </span>
              <span>Support me on Ko-fi</span>
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gray-200"></div>
          <Sparkles className="w-4 h-4 text-amber-300" />
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* About Section - Personal Story */}
        <section className="mb-20">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
            the story
          </h2>

          <div className="prose prose-gray">
            <p className="text-gray-600 leading-relaxed mb-4">
              hi! i'm a 22 year old AI/ML Engineer who's already a bit fed up
              with corporate life. 😅
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              but here's what keeps me going — i absolutely love building cute
              little passion projects. websites that make people smile. apps
              that feel warm and personal.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              myscrapbook is one of those creations i'm really proud of. it
              started as a simple idea — what if you could make a digital gift
              that actually feels like a gift? something you can flip through,
              like those scrapbooks people used to make by hand.
            </p>
            <p className="text-gray-600 leading-relaxed">
              so yeah, this is my little corner of the internet where cute
              things happen. hope you like it! 💕
            </p>
          </div>
        </section>

        {/* What You Can Do */}
        <section className="mb-20">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-6">
            what you can do
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Camera,
                label: "add photos",
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: PenLine,
                label: "write notes",
                color: "bg-rose-50 text-rose-500",
              },
              {
                icon: Palette,
                label: "pick themes",
                color: "bg-violet-50 text-violet-500",
              },
              {
                icon: Volume2,
                label: "flip sounds",
                color: "bg-sky-50 text-sky-500",
              },
              {
                icon: BookOpen,
                label: "3d flip",
                color: "bg-emerald-50 text-emerald-500",
              },
              {
                icon: Link2,
                label: "share link",
                color: "bg-orange-50 text-orange-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-gray-100 hover:border-gray-200 transition-all group"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform`}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Perfect For */}
        <section className="mb-20">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-6">
            perfect for
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Cake,
                label: "birthdays",
                color: "bg-pink-50 text-pink-500",
              },
              {
                icon: Heart,
                label: "anniversaries",
                color: "bg-red-50 text-red-400",
              },
              {
                icon: Globe,
                label: "long distance",
                color: "bg-blue-50 text-blue-500",
              },
              {
                icon: Gift,
                label: "thank you",
                color: "bg-purple-50 text-purple-500",
              },
              {
                icon: MessageCircle,
                label: "just because",
                color: "bg-teal-50 text-teal-500",
              },
              {
                icon: Sparkles,
                label: "any moment",
                color: "bg-yellow-50 text-yellow-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-gray-100 hover:border-gray-200 transition-all group"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform`}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center py-12 px-6 bg-gradient-to-br from-rose-50 to-amber-50 rounded-3xl border border-rose-100/50">
          <p className="text-gray-500 mb-4">ready to make something cute?</p>
          <Link
            href="/scrapbook"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-all text-lg"
          >
            <span>create your first book</span>
            <Heart className="w-4 h-4" />
          </Link>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gray-200"></div>
          <Coffee className="w-4 h-4 text-amber-400" />
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Personal Note / Footer */}
        <section className="text-center text-sm text-gray-400">
          <p className="mb-4">made with lots of chai ☕ and late nights 🌙</p>
          <p className="mb-6">
            if you like this, tell a friend. that means a lot. 💕
          </p>

          <div className="flex justify-center gap-6 text-gray-400">
            <a
              href="https://www.instagram.com/myscrapbook.app/"
              className="hover:text-rose-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram
            </a>
            <Link
              href="/privacy"
              className="hover:text-gray-600 transition-colors"
            >
              privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-600 transition-colors"
            >
              terms
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
