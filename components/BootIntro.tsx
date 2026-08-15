"use client";

import { useEffect, useRef, useState } from "react";

const STATUS_LINES = [
  "Initializing traceability network…",
  "Connecting ranches, plants, and inspectors…",
  "Loading the ledger…",
  "Preparing your view…",
];

const SESSION_KEY = "beeftrace-intro-seen";

export default function BootIntro() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
  const bootStartTime = useRef(Date.now()); // Track start time to enforce minimum duration

  // Only show once per browser session, and never for reduced-motion users.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (reduced || alreadySeen) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 1200);
    return () => clearInterval(id);
  }, [visible]);

  // Safety net: if autoplay is silently blocked by the browser, the video
  // never fires onError — it just sits there, and the intro would hang
  // forever since progress never advances. If playback hasn't actually
  // started shortly after mount, fall back to the timed logo sequence.
  useEffect(() => {
    if (!visible) return;
    const watchdog = setTimeout(() => {
      const v = videoRef.current;
      if (v && (v.paused || v.readyState < 2)) {
        setVideoFailed(true);
      }
    }, 1400);
    return () => clearTimeout(watchdog);
  }, [visible]);

  // Fallback (no-video) mode: drive progress + finish on a fixed timer.
  useEffect(() => {
    if (!visible || !videoFailed) return;
    const start = Date.now();
    const duration = 10000; // ~10s, matching the video-mode minimum below
    const id = setInterval(() => {
      const pct = Math.min(1, (Date.now() - start) / duration);
      setProgress(pct);
      if (pct >= 1) finish();
    }, 50);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, videoFailed]);

  function finish() {
    if (finishedRef.current) return;

    // Enforce a minimum ~10-second load time — matches the background
    // video's real length so the intro finishes right as the clip does,
    // instead of freezing on its last frame while we wait out a timer.
    const minDuration = 10000;
    const elapsed = Date.now() - bootStartTime.current;

    if (elapsed < minDuration) {
      setTimeout(finish, minDuration - elapsed);
      return;
    }

    finishedRef.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setClosing(true);
    setTimeout(() => setVisible(false), 550);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes statusFade {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes pulse-glow-red {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.34; transform: scale(1.06); }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-hidden bg-[#070707] transition-all duration-700 ${
          closing ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {/* Premium Background Layers */}
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.08),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.05),transparent_40%)]" />
        {/* Subtle red accent — BeefTrace's maroon identity color, kept faint and confined to the intro only */}
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(107,20,24,0.16),transparent_55%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(7,7,7,0.85)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] animate-[sweep_8s_ease-in-out_infinite]" />

        {/* Video or Fallback Layout */}
        {!videoFailed ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-60 saturate-75 contrast-110 brightness-50 transition-opacity duration-700"
              src="/videos/platform-demo.mp4"
              poster="/videos/platform-demo-poster.jpg"
              preload="auto"
              autoPlay
              muted
              playsInline
              onEnded={finish}
              onError={() => setVideoFailed(true)}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress(v.currentTime / v.duration);
              }}
            />

            {/* Logo Overlay (Video Success State) */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px] animate-[pulse-glow_6s_ease-in-out_infinite]" />
                <div className="absolute h-40 w-40 rounded-full bg-amber-400/10 blur-[60px] animate-[pulse-glow_6s_ease-in-out_infinite_2s]" />
                <div className="absolute h-48 w-48 rounded-full bg-[#6B1418]/25 blur-[70px] animate-[pulse-glow-red_7s_ease-in-out_infinite_1s]" />
                <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-700 animate-[fadeInScale_0.8s_ease-out_forwards]">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-emerald-400/10" />
                  <img
                    src="/brand/logo-transparent.png"
                    alt="BeefTrace"
                    className="relative h-16 w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] filter brightness-110 md:h-20 animate-[logoFloat_6s_ease-in-out_infinite]"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Fallback Logo State (No Video) */
          <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px] animate-[pulse-glow_6s_ease-in-out_infinite]" />
              <div className="absolute h-40 w-40 rounded-full bg-amber-400/10 blur-[60px] animate-[pulse-glow_6s_ease-in-out_infinite_2s]" />
              <div className="absolute h-48 w-48 rounded-full bg-[#6B1418]/25 blur-[70px] animate-[pulse-glow-red_7s_ease-in-out_infinite_1s]" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-700 animate-[fadeInScale_0.8s_ease-out_forwards]">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-emerald-400/10" />
                <img
                  src="/brand/logo-transparent.png"
                  alt="BeefTrace"
                  className="relative h-16 w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] filter brightness-110 md:h-20 animate-[logoFloat_6s_ease-in-out_infinite]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Skip Button */}
        <button
          onClick={finish}
          className="group absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-white/10 hover:text-white hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-[#070707]"
          aria-label="Skip introduction"
        >
          <span>Skip</span>
          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Status & Progress Indicator */}
        <div className="absolute bottom-16 left-1/2 z-20 w-[min(24rem,calc(100%-3rem))] -translate-x-1/2 text-center md:bottom-20 md:w-96">
          <div className="mb-5 h-6 overflow-hidden">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/60 md:text-[11px]">
              <span
                key={statusIndex}
                className="block animate-[statusFade_500ms_ease-out] leading-relaxed"
              >
                {STATUS_LINES[statusIndex]}
              </span>
            </p>
          </div>

          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] backdrop-blur-sm ring-1 ring-white/10">
            {/* Shimmer effect on the track */}
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] animate-[shimmer_3s_linear_infinite]" />

            {/* Progress bar */}
            <div
              className="relative h-full origin-left rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4),0_0_30px_rgba(251,191,36,0.2)] transition-all duration-200 ease-linear"
              style={{ transform: `scaleX(${progress})` }}
            >
              {/* Glow at the leading edge */}
              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
