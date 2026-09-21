"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function ScrollBridge() {
  const pathname = usePathname();
  const lenis = useLenis();

  // Instant scroll reset on route change without frame locks
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    // Refresh ScrollTrigger cleanly after DOM route update
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, lenis]);

  // Synchronize Lenis scroll with GSAP ScrollTrigger
  useEffect(() => {
    if (!lenis) return;

    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={true}
      options={{
        lerp: 0.08,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <ScrollBridge />
      {children}
    </ReactLenis>
  );
}

