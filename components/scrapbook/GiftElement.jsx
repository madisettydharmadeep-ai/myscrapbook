"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Type,
  Gift,
  X,
  PenTool,
  RefreshCw,
  Sparkles,
  Check,
  Heart,
  Star,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAudio } from "@/context/AudioContext";

const GIFT_STYLES = [
  {
    id: "classic",
    label: "Envelopes",
    options: [
      { id: "envelope", label: "Lavender Letter" },
      { id: "envelope-olive", label: "Olive Letter" },
      { id: "envelope-beige", label: "Beige Love Letter" },
      { id: "envelope-red", label: "Stardust Red" },
      { id: "envelope-mint", label: "Mint Secret" },
      { id: "envelope-peach", label: "Peach Note" },
    ],
  },
  {
    id: "scratch_section",
    label: "Scratch Cards",
    options: [
      { id: "scratch-blue-hearts", label: "Blue Hearts" },
      { id: "scratch-indigo-hearts", label: "Indigo Hearts" },
      { id: "scratch-pink-hearts", label: "Pink Hearts" },
      { id: "scratch-doodles", label: "Doodles" },
      { id: "scratch-oranges", label: "Oranges" },
    ],
  },
  {
    id: "balloon_section",
    label: "Balloon Pop",
    options: [
      { id: "balloon-kawaii", label: "Pink Heart" },
      { id: "balloon-classic", label: "Classic Red" },
      { id: "balloon-blue", label: "Sky Blue" },
      { id: "balloon-lilac", label: "Lilac Star" },
    ],
  },
  // {
  //   id: 'nostalgia_section',
  //   label: 'Internet Nostalgia',
  //   options: [
  //       { id: 'mixtape-cd', label: 'Winamp Dedication' },
  //       { id: 'retro-popup', label: "You've Got Mail" },
  //       { id: 'chat-reveal', label: 'Guestbook Entry' }
  //   ]
  // }
];

export default function GiftElement({
  content,
  onUpdate,
  isCover,
  readOnly,
  onOpenDrawer,
}) {
  const [isOpen, setIsOpen] = useState(false); // For Envelope/Bottle/Balloon open state
  const [uploadType, setUploadType] = useState(null); // For edit mode selection
  const [imageInputMode, setImageInputMode] = useState("url");
  const [urlInput, setUrlInput] = useState("");

  // Use centralized audio context
  const { playSound } = useAudio();

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput) {
      onUpdate({ ...giftContent, type: "image", data: urlInput });
      setUploadType(null);
      setUrlInput("");
      // Reset mode for next time
      setImageInputMode("url");
    }
  };

  const giftContent = content || { type: null, data: null, style: "envelope" };
  let currentStyle = giftContent.style || "envelope";

  // Backward compatibility mappings
  if (currentStyle === "scratch") currentStyle = "scratch-blue-hearts";
  if (currentStyle === "scratch-blue") currentStyle = "scratch-blue-hearts";
  if (currentStyle === "balloon") currentStyle = "balloon-kawaii";

  // --- HANDLERS ---

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ ...giftContent, type: "image", data: event.target.result });
        setUploadType(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSubmit = (text) => {
    if (text.trim()) {
      onUpdate({ ...giftContent, type: "text", data: text });
      setUploadType(null);
    }
  };

  const handleStyleSelect = (styleId) => {
    onUpdate({ ...giftContent, style: styleId });
  };

  // --- RENDERERS ---

  // 1. Envelope Renderer (Dynamic Colors)
  const renderEnvelope = () => {
    // Envelope Color Themes
    const themes = {
      envelope: {
        // Lavender
        body: "#8b7ab8",
        flap: "#6b5b95",
        back: "#6b5b95",
        left: "#7d6fa8",
        accent: "#9b8bc4",
        decoration: null,
      },
      "envelope-olive": {
        body: "#959572",
        flap: "#747458",
        back: "#747458",
        left: "#858565",
        accent: "#B0B092",
        decoration: "heart-white",
      },
      "envelope-beige": {
        body: "#EFE6DD",
        flap: "#DBC8B6",
        back: "#DBC8B6",
        left: "#CDBCAD",
        accent: "#F5EFEB",
        decoration: "heart-pink",
      },
      "envelope-red": {
        body: "#EF5350",
        flap: "#D32F2F",
        back: "#C62828",
        left: "#B71C1C",
        accent: "#FFCDD2",
        decoration: "stars",
      },
      "envelope-mint": {
        body: "#A7F3D0",
        flap: "#5EEAD4",
        back: "#2DD4BF",
        left: "#6EE7B7",
        accent: "#ECFDF5",
        decoration: "heart-white",
      },
      "envelope-peach": {
        body: "#FDBA74",
        flap: "#FB923C",
        back: "#F97316",
        left: "#FDAC74",
        accent: "#FFEDD5",
        decoration: "heart-pink",
      },
    };

    const theme = themes[currentStyle] || themes["envelope"];

    return (
      <div
        className="relative cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen) {
            playSound("pop");
          }
          setIsOpen(!isOpen);
        }}
        style={{
          width: "300px",
          height: "400px",
          perspective: "1000px",
        }}
      >
        {/* Animated Envelope */}
        <div
          className="absolute transition-all duration-500 ease-in-out"
          style={{
            height: "225px",
            width: "300px",
            top: "50%",
            left: "50%",
            transform: isOpen
              ? "translate(-50%, -50%) translateY(100px)"
              : "translate(-50%, -50%) translateY(0px)",
          }}
        >
          {/* Envelope Body (bottom triangle) */}
          <div
            className="absolute bottom-0 left-0"
            style={{
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 0 150px 300px",
              borderColor: `transparent transparent ${theme.body} transparent`,
              zIndex: 2,
            }}
          />

          {/* Top Fold (flap) */}
          <div
            className="absolute transition-all duration-500 ease-in-out"
            style={{
              top: "75px",
              left: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "75px 150px 0 150px",
              transformOrigin: "50% 0%",
              transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
              borderColor: `${theme.flap} transparent transparent transparent`,
              zIndex: isOpen ? 0 : 3,
              transitionDelay: isOpen ? "0s" : "0.4s",
            }}
          >
            {/* Decorations (Heart/Stars) */}
            {!isOpen && (
              <>
                {theme.decoration === "heart-white" && (
                  <div className="absolute -top-[45px] -left-[16px] drop-shadow-md scale-110">
                    <Heart
                      className="w-8 h-8 text-white fill-white"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
                {theme.decoration === "heart-pink" && (
                  <div className="absolute -top-[45px] -left-[16px] drop-shadow-md scale-110">
                    <Heart
                      className="w-8 h-8 text-rose-500 fill-rose-400"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
                {theme.decoration === "stars" && (
                  <div className="absolute -top-[60px] -left-[30px] flex">
                    <Star className="w-6 h-6 text-yellow-300 fill-yellow-300 absolute top-4 left-8 animate-pulse" />
                    <Star className="w-4 h-4 text-yellow-200 fill-yellow-100 absolute top-0 left-2" />
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 absolute top-8 left-0" />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Back Fold */}
          <div
            className="absolute bottom-0 left-0"
            style={{
              width: "300px",
              height: "150px",
              background: theme.back,
              zIndex: 0,
            }}
          />

          {/* Left Fold (shadow) */}
          <div
            className="absolute bottom-0 left-0"
            style={{
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "75px 0 75px 150px",
              borderColor: `transparent transparent transparent ${theme.left}`,
              zIndex: 2,
            }}
          />

          {/* Letter Inside */}
          <div
            className="absolute bg-white overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              left: "30px",
              bottom: "0px",
              width: "240px",
              height: isOpen ? "360px" : "90px",
              zIndex: 1,
              transitionDelay: isOpen ? "0.2s" : "0s",
            }}
          >
            {/* Letter Border (decorative stripes) */}
            <div
              className="w-full"
              style={{
                height: "15px",
                background: `repeating-linear-gradient(-45deg, ${theme.accent}, ${theme.accent} 12px, transparent 12px, transparent 27px)`,
              }}
            />

            {/* Letter Content */}
            {isOpen && (
              <div
                className="p-4 pt-20 animate-in fade-in duration-700 delay-300 overflow-y-auto flex flex-col justify-start items-center h-full"
                style={{ maxHeight: "345px" }}
              >
                {giftContent.type === "image" ? (
                  <img
                    src={giftContent.data}
                    alt="Gift surprise"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                ) : (
                  <div className="space-y-4">
                    <p className="text-lg font-light text-gray-800 text-center whitespace-pre-wrap leading-relaxed">
                      {giftContent.data}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Letter placeholder lines (when closed) */}
            {!isOpen && (
              <>
                <div
                  className="mt-4 ml-3 h-3 w-2/5 opacity-30"
                  style={{ backgroundColor: theme.accent }}
                />
                <div
                  className="mt-4 ml-3 h-3 w-1/5 opacity-30"
                  style={{ backgroundColor: theme.accent }}
                />
                <div
                  className="mt-12 ml-36 rounded-full h-11 w-11 opacity-20"
                  style={{ backgroundColor: theme.accent }}
                />
              </>
            )}
          </div>
        </div>

        {/* "Click Me" text when closed */}
        {!isOpen && (
          <div
            className="absolute transition-all duration-300"
            style={{
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <p className="text-sm font-medium text-gray-600 uppercase tracking-widest animate-pulse">
              Click Me
            </p>
          </div>
        )}

        {/* Close button when open */}
        {isOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute -top-4 -right-4 w-10 h-10 bg-gray-900 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-all z-50 shadow-xl animate-in zoom-in duration-300 delay-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  };

  // 2. Scratch Card Renderer
  const RenderScratchCard = ({ variant }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const scratchAudioRef = useRef(null);
    const isDragging = useRef(false);

    // Scratch audio handled by centralized context

    // --- THEMES CONFIGURATION ---
    const getThemeLogic = () => {
      switch (variant) {
        case "scratch-blue-hearts":
          return {
            id: "blue-hearts",
            imageSrc: "/polaroid/polaroid-blue-hearts.webp",
            brushSize: 40,
          };
        case "scratch-indigo-hearts":
          return {
            id: "indigo-hearts",
            imageSrc: "/polaroid/polaroid-indigo-hearts.webp",
            brushSize: 40,
          };
        case "scratch-pink-hearts":
          return {
            id: "pink-hearts",
            imageSrc: "/polaroid/polaroid-pink-hearts.webp",
            brushSize: 40,
          };
        case "scratch-doodles":
          return {
            id: "doodles",
            imageSrc: "/polaroid/polaroid-doodles.webp",
            brushSize: 40,
          };
        case "scratch-oranges":
          return {
            id: "oranges",
            imageSrc: "/polaroid/polaroid-oranges.webp",
            brushSize: 40,
          };
        default:
          return {
            id: "blue-hearts",
            imageSrc: "/polaroid/polaroid-blue-hearts.webp",
            brushSize: 40,
          };
      }
    };

    const theme = getThemeLogic();

    // --- CANVAS DRAWING ---
    useEffect(() => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { width, height } = canvas;

      // Special handling for Image-based scratch cards
      if (theme.imageSrc) {
        const img = new Image();
        img.src = theme.imageSrc;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
        };
        return;
      }

      // Standard Fill & Pattern
      ctx.fillStyle = theme.scratchColor;
      ctx.fillRect(0, 0, width, height);

      theme.renderPattern(ctx, width, height);

      ctx.fillStyle = theme.text.color;
      ctx.font = theme.text.font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (theme.id === "gold") {
        ctx.fillText(theme.text.label, width / 2, height / 2);
      } else {
        ctx.save();
        ctx.translate(width - 50, 50);
        ctx.rotate(Math.PI / 8);
        ctx.strokeStyle = "#A3B6DA";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText("SCRATCH", 0, -8);
        ctx.fillText("HERE", 0, 8);
        ctx.restore();
      }
    }, [theme]);

    const handleScratch = (e) => {
      if (!readOnly) return;
      isDragging.current = true;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      const clientX = e.clientX || e.touches?.[0]?.clientX;
      const clientY = e.clientY || e.touches?.[0]?.clientY;

      if (clientX === undefined || clientY === undefined) return;

      // Calculate scale factors (drawing buffer size / CSS displayed size)
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      const ctx = canvas.getContext("2d");
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, theme.brushSize, 0, Math.PI * 2);
      ctx.fill();

      if (!isDragging.current) {
        playSound("scratching");
      }
    };

    // --- RENDER LAYOUTS based on Variant ---

    // 1. MYSTICAL CRYSTAL BALL (Formerly Luxury Gold)
    // Updated: The entire black card is scratchable!
    // Generic render for image-based scratch cards
    if (variant.startsWith("scratch")) {
      return (
        <div
          className="relative group cursor-pointer select-none w-full h-full flex flex-col items-center justify-center p-4 gap-4"
          ref={containerRef}
        >
          {/* Scratch Hint (Complete Outside Text) */}
          {!isRevealed && readOnly && (
            <div className="pointer-events-none z-30 mb-2">
              <div className="px-6 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                <p className="font-handwriting text-2xl text-gray-800 tracking-wide text-shadow-sm rotate-[-2deg]">
                  Scratch to reveal...
                </p>
              </div>
            </div>
          )}

          {/*  Simple Container for the Image Scratch Card */}
          <div className="w-full h-auto max-w-[400px] aspect-[400/540] relative rounded-xl shadow-xl overflow-hidden bg-white">
            {/* Hidden Content */}
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              {giftContent.type === "image" ? (
                <img
                  src={giftContent.data}
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="font-handwriting text-2xl text-gray-800 font-bold">
                  {giftContent.data}
                </p>
              )}
            </div>

            {/* Scratch Canvas (The Image) */}
            <canvas
              ref={canvasRef}
              width={400}
              height={540}
              className={`absolute inset-0 w-full h-full touch-none z-20 ${!readOnly ? "opacity-80" : ""}`}
              onMouseMove={(e) => e.buttons === 1 && handleScratch(e)}
              onTouchMove={handleScratch}
              onMouseDown={(e) => {
                isDragging.current = false;
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                isDragging.current = false;
                e.stopPropagation();
              }}
              onClick={(e) => {
                if (isDragging.current) e.stopPropagation();
              }}
            />
          </div>
        </div>
      );
    }
  };

  // 3. Balloon Pop (With Variants)
  const RenderBalloon = ({ variant }) => {
    // Configs
    const styles = {
      "balloon-kawaii": {
        color: "#EC4899",
        gradient: ["#FBCFE8", "#EC4899"],
        bow: "🎀",
        type: "heart",
        confetti: ["#F9A8D4", "#FDE047", "#67E8F9"],
      },
      "balloon-classic": {
        color: "#EF4444",
        gradient: ["#FCA5A5", "#EF4444"],
        bow: "🧶",
        type: "round",
        confetti: ["#EF4444", "#3B82F6", "#10B981", "#F59E0B"],
      },
      "balloon-blue": {
        color: "#3B82F6",
        gradient: ["#93C5FD", "#3B82F6"],
        bow: "⭐",
        type: "round",
        confetti: ["#3B82F6", "#60A5FA", "#DBEAFE"],
      },
      "balloon-lilac": {
        color: "#A78BFA",
        gradient: ["#DDD6FE", "#A78BFA"],
        bow: "✦",
        type: "heart",
        confetti: ["#C4B5FD", "#F9A8D4", "#FDE68A"],
      },
    };

    const theme = styles[variant] || styles["balloon-kawaii"];

    const handlePop = (e) => {
      e.stopPropagation();
      if (isOpen) return;

      playSound("balloon-burst");

      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        origin: { x, y },
        particleCount: 150,
        spread: 80,
        colors: theme.confetti,
        shapes: ["circle", "star"],
      });

      setIsOpen(true);
    };

    return (
      <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
        {!isOpen ? (
          <div
            onClick={(e) => {
              console.log("POP CLICKED");
              handlePop(e);
            }}
            className="relative cursor-pointer group hover:-translate-y-3 transition-transform duration-500 ease-in-out"
          >
            {/* --- THE BALLOON --- */}
            <div className="relative z-20 hover:scale-105 transition-transform duration-300 drop-shadow-xl">
              {theme.type === "heart" ? (
                // Heart Shape
                <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
                  <path
                    d="M100 180C100 180 10 120 10 60C10 25 40 5 70 5C88 5 95 15 100 25C105 15 112 5 130 5C160 5 190 25 190 60C190 120 100 180 100 180Z"
                    fill={`url(#grad-${variant})`}
                  />
                  <defs>
                    <radialGradient
                      id={`grad-${variant}`}
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(70 40) rotate(90) scale(120)"
                    >
                      <stop stopColor={theme.gradient[0]} />
                      <stop offset="1" stopColor={theme.gradient[1]} />
                    </radialGradient>
                  </defs>
                  <ellipse
                    cx="60"
                    cy="50"
                    rx="20"
                    ry="10"
                    transform="rotate(-45 60 50)"
                    fill="white"
                    fillOpacity="0.4"
                  />
                </svg>
              ) : (
                // Round Shape
                <div
                  className="w-40 h-48 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] relative"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${theme.gradient[0]}, ${theme.gradient[1]})`,
                    boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="absolute top-8 left-8 w-8 h-4 bg-white/40 rounded-[50%] rotate-[-45deg] filter blur-[2px]"></div>
                </div>
              )}

              {/* Kawaii Face (Only on Kawaii variant) */}
              {theme.type === "heart" && (
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80">
                  <div className="flex gap-8 mb-1">
                    <div className="w-3 h-3 bg-[#831843] rounded-full animate-blink"></div>
                    <div className="w-3 h-3 bg-[#831843] rounded-full animate-blink"></div>
                  </div>
                  <div className="w-4 h-2 border-b-2 border-[#831843] rounded-full"></div>
                </div>
              )}
            </div>

            {/* Ribbon/Knot */}
            <div className="absolute top-[170px] left-1/2 -translate-x-1/2 text-4xl z-30 drop-shadow-md rotate-[-5deg] grayscale-[0.2]">
              {theme.bow}
            </div>

            {/* String */}
            <svg
              width="40"
              height="150"
              viewBox="0 0 40 150"
              className="absolute top-[170px] left-[calc(50%-20px)] z-10 opacity-60"
            >
              <path
                d="M20,0 Q30,20 20,40 Q10,60 20,80 Q30,100 20,120"
                fill="none"
                stroke={theme.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : (
          <div
            className="animate-in fade-in zoom-in-95 duration-500 max-w-sm w-full px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Note */}
              <div
                className="
        bg-white/90
        backdrop-blur-sm
        rounded-3xl
        px-8
        py-8
        shadow-[0_12px_40px_rgba(0,0,0,0.08)]
      "
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-rose-300" />
                </div>

                {giftContent.type === "image" ? (
                  <img
                    src={giftContent.data}
                    className="w-full h-auto rounded-2xl object-contain"
                  />
                ) : (
                  <p
                    className="
            text-center
            text-[18px]
            leading-9
            text-zinc-700
            whitespace-pre-wrap
            font-light
          "
                  >
                    {giftContent.data}
                  </p>
                )}

                <div className="mt-6 text-center">
                  <span className="text-zinc-300 text-xl">♡</span>
                </div>
              </div>

              {readOnly && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="
          absolute
          -top-2
          -right-2
          w-8
          h-8
          rounded-full
          bg-white
          shadow-md
          flex
          items-center
          justify-center
          text-zinc-400
          hover:text-zinc-700
        "
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const RevealContent = ({ tone = "rose" }) => {
    const toneClass =
      {
        rose: "border-rose-100 bg-rose-50 text-rose-900",
        blue: "border-sky-100 bg-sky-50 text-sky-900",
        lime: "border-lime-100 bg-lime-50 text-lime-900",
      }[tone] || "border-rose-100 bg-rose-50 text-rose-900";

    return (
      <div className={`w-full rounded-2xl border-2 p-4 shadow-sm ${toneClass}`}>
        {giftContent.type === "image" ? (
          <img
            src={giftContent.data}
            alt=""
            className="mx-auto max-h-56 w-full rounded-xl object-contain"
          />
        ) : (
          <p className="whitespace-pre-wrap text-center text-lg font-bold leading-relaxed">
            {giftContent.data}
          </p>
        )}
      </div>
    );
  };

  const RenderMixtapeCd = () => (
    <div className="flex h-full w-full items-center justify-center bg-[#B8D6F3] p-8">
      <div className="w-full max-w-sm border-4 border-[#1f2937] bg-[#C0C0C0] p-2 shadow-[10px_10px_0_0_#111827]">
        <div className="mb-2 flex items-center justify-between bg-gradient-to-r from-[#001B5E] to-[#4E7BFF] px-2 py-1 text-white">
          <p className="text-[11px] font-black tracking-widest">
            WINAMP - LOVE_DEDICATION.MP3
          </p>
          <div className="flex gap-1">
            <span className="h-3 w-3 border border-white/70 bg-[#C0C0C0]" />
            <span className="h-3 w-3 border border-white/70 bg-[#C0C0C0]" />
          </div>
        </div>
        <div className="border-2 border-[#808080] bg-[#111827] p-4 text-lime-300">
          <div className="mb-4 flex items-end gap-1">
            {[18, 35, 24, 48, 30, 54, 28, 42, 22, 38, 20, 32].map(
              (height, index) => (
                <span
                  key={index}
                  className={`w-3 ${isOpen ? "animate-pulse" : ""}`}
                  style={{
                    height,
                    backgroundColor: index % 3 === 0 ? "#FDE047" : "#84CC16",
                  }}
                />
              ),
            )}
          </div>
          <div className="mb-3 rounded bg-black px-3 py-2 font-mono text-sm shadow-inner">
            <p className="truncate">
              {isOpen
                ? "003. secret message loaded"
                : "001. double click to play"}
            </p>
            <p className="text-[10px] text-lime-500">
              00:{isOpen ? "42" : "00"} / forever
            </p>
          </div>
          {!isOpen ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!readOnly) return;
                playSound("cute-click");
                setIsOpen(true);
              }}
              className="w-full border-2 border-[#808080] bg-[#C0C0C0] px-4 py-2 font-mono text-xs font-black uppercase text-gray-900 shadow-[3px_3px_0_0_#000]"
            >
              play dedication
            </button>
          ) : (
            <RevealContent tone="lime" />
          )}
        </div>
      </div>
    </div>
  );

  const RenderRetroPopup = () => (
    <div className="flex h-full w-full items-center justify-center bg-[#008080] p-8">
      <div className="w-full max-w-sm border-4 border-white border-b-[#404040] border-r-[#404040] bg-[#C0C0C0] p-1 shadow-[10px_10px_0_0_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084D0] px-2 py-1">
          <p className="text-xs font-black uppercase tracking-widest text-white">
            inbox - unread message
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!readOnly) return;
              playSound("cute-click");
              setIsOpen(!isOpen);
            }}
            className="grid h-6 w-6 place-items-center border border-white border-b-[#404040] border-r-[#404040] bg-[#C0C0C0] font-black text-gray-900"
          >
            x
          </button>
        </div>
        <div className="p-5 font-mono">
          <div className="mb-4 flex items-center gap-3 rounded border border-[#808080] bg-white p-3">
            <div className="text-4xl">✉</div>
            <div>
              <p className="text-sm font-black text-gray-900">
                You&apos;ve got mail!
              </p>
              <p className="text-[11px] font-bold text-gray-500">
                from: someone_special@heart.net
              </p>
            </div>
          </div>
          {!isOpen ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!readOnly) return;
                playSound("pop");
                setIsOpen(true);
              }}
              className="w-full border-2 border-white border-b-[#404040] border-r-[#404040] bg-[#C0C0C0] px-4 py-4 text-center text-sm font-black text-gray-900 active:border-[#404040] active:border-b-white active:border-r-white"
            >
              open attachment
            </button>
          ) : (
            <RevealContent tone="blue" />
          )}
        </div>
      </div>
    </div>
  );

  const RenderChatReveal = () => (
    <div className="flex h-full w-full items-center justify-center bg-[#FDE68A] p-8">
      <div className="w-full max-w-sm border-4 border-pink-400 bg-[#FFF7ED] p-4 shadow-[8px_8px_0_0_#F472B6]">
        <div className="mb-4 flex items-center gap-3 border-b-2 border-dashed border-pink-300 pb-3">
          <div className="grid h-10 w-10 place-items-center border-2 border-pink-400 bg-white text-lg font-black text-pink-500">
            GB
          </div>
          <div>
            <p className="font-black text-gray-900">guestbook</p>
            <p className="text-xs font-bold text-pink-500">
              visitor #000143 signed
            </p>
          </div>
        </div>
        {!isOpen ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!readOnly) return;
              playSound("cute-click");
              setIsOpen(true);
            }}
            className="w-full border-2 border-pink-300 bg-white px-5 py-4 text-left text-sm font-black text-gray-900 shadow-[4px_4px_0_0_#F9A8D4] transition-transform hover:-translate-y-1"
          >
            + view new guestbook entry
          </button>
        ) : (
          <div className="bg-white p-4 shadow-inner">
            <div className="mb-3 flex gap-1">
              {["bestie", "forever", "ily"].map((label) => (
                <span
                  key={label}
                  className="border border-pink-200 bg-pink-50 px-2 py-1 text-[10px] font-black uppercase text-pink-500"
                >
                  {label}
                </span>
              ))}
            </div>
            {giftContent.type === "image" ? (
              <img
                src={giftContent.data}
                alt=""
                className="max-h-56 w-full object-contain"
              />
            ) : (
              <p className="whitespace-pre-wrap text-base font-semibold leading-relaxed text-gray-900">
                {giftContent.data}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-1">
              {["88x31", "blinkie", "webring"].map((label) => (
                <span
                  key={label}
                  className="border border-gray-400 bg-gradient-to-r from-sky-200 to-pink-200 px-2 py-0.5 text-[9px] font-black uppercase text-gray-700"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- MAIN RENDER ---

  const renderContent = () => {
    if (currentStyle?.startsWith("scratch"))
      return <RenderScratchCard variant={currentStyle} />;
    if (currentStyle?.startsWith("balloon"))
      return <RenderBalloon variant={currentStyle} />;
    if (currentStyle === "mixtape-cd") return <RenderMixtapeCd />;
    if (currentStyle === "retro-popup") return <RenderRetroPopup />;
    if (currentStyle === "chat-reveal") return <RenderChatReveal />;
    return renderEnvelope();
  };

  // EDIT MODE - INITIAL STATE (No Content)
  if (!giftContent.type) {
    if (readOnly) return null; // Should not happen in readOnly if empty
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-6 max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Add Surprise Gift</h3>
          {!uploadType ? (
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => setUploadType("image")}
                className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all group"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <Upload className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-bold text-gray-900">Upload Image</h4>
                  <p className="text-xs text-gray-500">
                    Photo, coupon, ticket...
                  </p>
                </div>
              </button>
              <button
                onClick={() => setUploadType("text")}
                className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all group"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <Type className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-bold text-gray-900">Write Message</h4>
                  <p className="text-xs text-gray-500">
                    Secret note, code, riddle...
                  </p>
                </div>
              </button>
            </div>
          ) : uploadType === "image" ? (
            <div className="w-full relative">
              {/* Tabs */}
              <div className="absolute top-0 right-0 flex gap-2 mb-2 z-10">
                <button
                  onClick={() => setImageInputMode("url")}
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${imageInputMode === "url" ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  URL
                </button>
                <button
                  onClick={() => setImageInputMode("file")}
                  className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${imageInputMode === "file" ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  Upload
                </button>
              </div>

              {imageInputMode === "url" ? (
                <form
                  onSubmit={handleUrlSubmit}
                  className="mt-8 flex flex-col gap-3"
                >
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.png"
                    className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 focus:border-black focus:outline-none bg-white font-mono text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-xl font-bold uppercase hover:scale-105 transition-transform"
                  >
                    Use Image
                  </button>
                </form>
              ) : (
                <label className="block w-full cursor-pointer mt-8">
                  <div className="border-2 border-dashed border-gray-300 bg-white rounded-xl p-8 text-center hover:border-gray-900 hover:bg-gray-50 transition-all">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="font-bold text-gray-900">Click to upload</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              <button
                onClick={() => setUploadType(null)}
                className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="w-full">
              <textarea
                placeholder="Type your secret here..."
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-gray-900"
                onBlur={(e) => {
                  if (e.target.value.trim()) handleTextSubmit(e.target.value);
                }}
                autoFocus
              />
              <button
                onClick={() => setUploadType(null)}
                className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // VIEW MODE (Builder & Preview)
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-visible">
      {/* The Gift Render */}
      {renderContent()}

      {/* Builder Controls */}
      {!readOnly && (
        <div className="absolute top-4 right-4 flex gap-2 z-50">
          <button
            onClick={() =>
              onOpenDrawer(
                "STYLE",
                { categories: GIFT_STYLES, currentStyle },
                handleStyleSelect,
                "Gift Style",
              )
            }
            className="bg-white text-black p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black] hover:scale-105 transition-transform"
            title="Change Style"
          >
            <PenTool className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
