"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "covered" | "revealing";

interface TransitionCtx {
  phase: Phase;
  navigate: (href: string) => void;
  onCoverComplete: () => void;
  onRevealComplete: () => void;
  pendingHref: string | null;
}

const Ctx = createContext<TransitionCtx | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      if (phase !== "idle") return;
      pendingHref.current = href;
      setPhase("covering");
    },
    [phase]
  );

  const onCoverComplete = useCallback(() => {
    setPhase("covered");
    if (pendingHref.current) {
      router.push(pendingHref.current);
    }
    // Give the new route a tick to mount before revealing
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase("revealing");
      });
    });
  }, [router]);

  const onRevealComplete = useCallback(() => {
    setPhase("idle");
    pendingHref.current = null;
  }, []);

  return (
    <Ctx.Provider
      value={{
        phase,
        navigate,
        onCoverComplete,
        onRevealComplete,
        pendingHref: pendingHref.current,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}
