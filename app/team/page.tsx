"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FaLinkedin,
  FaTiktok,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa6";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;

  linkedin?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;

  expertise: string[];
  years: number;
  projects: string[];
  department: string;

  // Optional academic/institutional information
  affiliation?: string;
  isSupervisor?: boolean;
}

export default function ProfileCard({
  member,
}: {
  member: TeamMember;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [8, -8]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-8, 8]),
    {
      stiffness: 200,
      damping: 20,
    }
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative rounded-3xl border p-6 backdrop-blur-xl transition-colors duration-300 ${
        member.isSupervisor
          ? "border-gold/30 bg-gold/5"
          : "border-cream/10 bg-charcoal-raised/60"
      } hover:border-gold/40`}
    >
      {/* Border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: "0 0 40px 4px rgba(212,166,87,0.12)",
        }}
      />

      {/* Supervisor badge */}
      {member.isSupervisor && (
        <div className="relative mb-5">
          <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gold-soft">
            Project Leadership
          </span>
        </div>
      )}

      {/* Profile header */}
      <div className="relative flex items-center gap-4">
        <img
          src={member.photo}
          alt={member.name}
          className={`h-24 w-24 shrink-0 object-cover ${
            member.isSupervisor
              ? "rounded-2xl ring-2 ring-gold/30"
              : "rounded-2xl"
          }`}
        />

        <div>
          <p className="font-display text-lg font-700 text-cream">
            {member.name}
          </p>

          <p className="text-xs font-semibold text-emerald">
            {member.role}
          </p>

          {member.affiliation && (
            <p className="mt-1 text-[11px] font-medium text-gold-soft/80">
              {member.affiliation}
            </p>
          )}

          {member.years > 0 && (
            <p className="mt-0.5 text-[11px] text-cream/35">
              {member.years} yrs experience
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className="relative mt-4 text-sm leading-relaxed text-cream/50">
        {member.bio}
      </p>

      {/* Expertise */}
      {member.expertise.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {member.expertise.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cream/10 px-2.5 py-1 text-[10px] text-cream/50"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Social links */}
      <div className="relative mt-5 flex items-center gap-3 border-t border-cream/5 pt-4">
        <a
          href={member.linkedin || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors hover:border-gold/40 hover:text-gold-soft"
        >
          <FaLinkedin size={13} />
        </a>

        <a
          href={member.email ? `mailto:${member.email}` : "#"}
          aria-label={`Email ${member.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors hover:border-gold/40 hover:text-gold-soft"
        >
          <FaEnvelope size={12} />
        </a>

        <a
          href={member.instagram || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on Instagram`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors hover:border-gold/40 hover:text-gold-soft"
        >
          <FaInstagram size={13} />
        </a>

        <a
          href={member.tiktok || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on TikTok`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 text-cream/50 transition-colors hover:border-gold/40 hover:text-gold-soft"
        >
          <FaTiktok size={12} />
        </a>
      </div>
    </motion.div>
  );
}
