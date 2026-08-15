"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa6";

interface VideoCardProps {
  src: string;
  poster: string;
  className?: string;
  /** 16:9 by default; pass e.g. "aspect-[4/5]" to override */
  aspect?: string;
  /** Autoplay muted + loop as soon as it scrolls into view (ambient mode). Still pauses off-screen. */
  ambient?: boolean;
  caption?: string;
}

export default function VideoCard({
  src,
  poster,
  className = "",
  aspect = "aspect-video",
  ambient = false,
  caption,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inView, setInView] = useState(false);

  // Pause whenever the card leaves the viewport — never run offscreen video.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ambient cards autoplay muted once visible, like a looping motion photo.
  useEffect(() => {
    if (!ambient || !videoRef.current) return;
    if (inView) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [ambient, inView]);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = ambient ? true : v.muted;
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[24px] border border-cream/10 bg-charcoal shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-shadow duration-500 hover:shadow-[0_25px_70px_-10px_rgba(212,166,87,0.15)] ${aspect} ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={ambient || !isPlaying}
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
        onEnded={() => setIsPlaying(false)}
      />

      {/* subtle top glass reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.06] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

      {!ambient && (
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full border border-cream/20 bg-charcoal/60 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-gold/40 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            {isPlaying ? (
              <FaPause className="text-cream" size={16} />
            ) : (
              <FaPlay className="ml-1 text-cream" size={18} />
            )}
          </span>
        </button>
      )}

      {caption && (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-cream/60">
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
}
