import { useEffect } from "react";

// Keep in sync with the `@keyframes ti-ripple` duration in globals.css.
const RIPPLE_ANIMATION_MS = 600;
const RIPPLE_LIFETIME_MS = RIPPLE_ANIMATION_MS + 50;

/**
 * TouchInteractions
 * ------------------------------------------------------------------
 * High-end, touch-sensitive interaction layer for the landing page.
 * Dependency-free, uses Pointer Events so it works for mouse, pen,
 * and touch uniformly.
 *
 * Features:
 *  • 3D pointer-tracking tilt for any element with [data-tilt]
 *  • Magnetic pull for elements with [data-magnetic] (CTAs)
 *  • Ripple burst on press for .btn-primary / .btn-secondary / [data-ripple]
 *  • Subtle haptic feedback on tap via navigator.vibrate (where supported)
 *  • Fully disabled when the user prefers reduced motion
 *
 * Mount once (e.g. in _app.tsx). It attaches global delegated listeners
 * and cleans them up on unmount.
 */
const TouchInteractions = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    /* ----------------------------------------------------------------
       1) 3D TILT  — [data-tilt]
       Tracks pointer over the element and applies a rotateX/rotateY
       transform plus a moving glare highlight.
    ---------------------------------------------------------------- */
    const tiltMax = 10; // degrees
    // WeakSet so detached DOM nodes can be garbage-collected together
    // with their listeners (closures hold only the element itself).
    const tiltElements = new WeakSet<HTMLElement>();

    const setupTilt = (el: HTMLElement) => {
      if (tiltElements.has(el)) return;
      tiltElements.add(el);

      el.style.transformStyle = "preserve-3d";
      el.style.willChange = "transform";
      el.style.transition = "transform 0.4s cubic-bezier(.2,.8,.2,1)";

      // Add a glare overlay if missing
      let glare = el.querySelector<HTMLElement>(":scope > .ti-glare");
      if (!glare) {
        glare = document.createElement("span");
        glare.className = "ti-glare";
        glare.setAttribute("aria-hidden", "true");
        el.appendChild(glare);
        // Make sure host can position the glare
        const cs = window.getComputedStyle(el);
        if (cs.position === "static") el.style.position = "relative";
        if (cs.overflow === "visible") el.style.overflow = "hidden";
      }

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * tiltMax * 2;
        const ry = (px - 0.5) * tiltMax * 2;
        el.style.transition = "transform 0.08s linear";
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
        if (glare) {
          glare.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)`;
          glare.style.opacity = "1";
        }
      };

      const reset = () => {
        el.style.transition = "transform 0.5s cubic-bezier(.2,.8,.2,1)";
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
        if (glare) glare.style.opacity = "0";
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", reset);
      el.addEventListener("pointercancel", reset);
      el.addEventListener("pointerup", reset);
    };

    /* ----------------------------------------------------------------
       2) MAGNETIC  — [data-magnetic]
       Element subtly follows the pointer when nearby (within bounds).
    ---------------------------------------------------------------- */
    const magneticElements = new WeakSet<HTMLElement>();
    const magnetStrength = 0.35; // 0..1
    const magnetMax = 14;        // px clamp

    const setupMagnetic = (el: HTMLElement) => {
      if (magneticElements.has(el)) return;
      magneticElements.add(el);

      el.style.willChange = "transform";
      el.style.transition = "transform 0.35s cubic-bezier(.2,.8,.2,1)";

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let dx = (e.clientX - cx) * magnetStrength;
        let dy = (e.clientY - cy) * magnetStrength;
        dx = Math.max(-magnetMax, Math.min(magnetMax, dx));
        dy = Math.max(-magnetMax, Math.min(magnetMax, dy));
        el.style.transition = "transform 0.12s ease-out";
        el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      };

      const reset = () => {
        el.style.transition = "transform 0.45s cubic-bezier(.2,.8,.2,1)";
        el.style.transform = "translate3d(0,0,0)";
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", reset);
      el.addEventListener("pointercancel", reset);
      el.addEventListener("pointerup", reset);
    };

    /* ----------------------------------------------------------------
       3) Discover + observe targets
    ---------------------------------------------------------------- */
    const scan = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>("[data-tilt]").forEach(setupTilt);
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(setupMagnetic);
    };
    scan();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) scan(n as Element);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    /* ----------------------------------------------------------------
       4) RIPPLE + HAPTIC  — delegated on pointerdown
       Triggers on .btn-primary, .btn-secondary and any [data-ripple].
    ---------------------------------------------------------------- */
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const host = target.closest<HTMLElement>(
        ".btn-primary, .btn-secondary, [data-ripple]"
      );
      if (!host) return;

      // Container needs relative positioning + clipping for the ripple
      const cs = window.getComputedStyle(host);
      if (cs.position === "static") host.style.position = "relative";
      if (cs.overflow === "visible") host.style.overflow = "hidden";

      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      const ripple = document.createElement("span");
      ripple.className = "ti-ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      host.appendChild(ripple);
      // Keep in sync with the `ti-ripple` keyframe duration in globals.css
      // (0.6s) plus a small safety margin to avoid mid-frame removal.
      window.setTimeout(() => ripple.remove(), RIPPLE_LIFETIME_MS);

      // Subtle haptic feedback (mobile only, ignored elsewhere)
      if (e.pointerType === "touch" && typeof navigator.vibrate === "function") {
        try { navigator.vibrate(8); } catch { /* noop */ }
      }
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });

    /* ----------------------------------------------------------------
       Cleanup
       Per-element pointer listeners are closures that reference only
       their own element; once those elements are detached from the DOM
       (or the page navigates away), they become eligible for GC along
       with their listeners. WeakSet registries above ensure we don't
       hold strong references that would prevent collection.
    ---------------------------------------------------------------- */
    return () => {
      observer.disconnect();
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return null;
};

export default TouchInteractions;
