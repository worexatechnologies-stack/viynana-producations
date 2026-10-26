import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Detect touch-primary devices — on these, native scroll is better than Lenis
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsTouch(
        window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0
      );
    check();
  }, []);
  return isTouch;
}

function ScrollBridge() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  // Instant scroll reset on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, lenis]);

  return null;
}

// Fallback for touch devices — just resets scroll on route change
function TouchScrollBridge({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return <>{children}</>;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const isTouch = useIsTouchDevice();

  // On touch/mobile devices, skip Lenis entirely — native scroll is smoother
  if (isTouch) {
    return <TouchScrollBridge>{children}</TouchScrollBridge>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={true}
      options={{
        lerp: 0.1,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      <ScrollBridge />
      {children}
    </ReactLenis>
  );
}
