import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export type OverlayThumb = {
  /** Whether the axis overflows and a thumb should render. */
  visible: boolean;
  /** Thumb length along the axis, in pixels. */
  size: number;
  /** Thumb offset from the track start, in pixels. */
  offset: number;
};

export type OverlayScrollbar = {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  vertical: OverlayThumb;
  horizontal: OverlayThumb;
  onThumbPointerDown: (axis: "x" | "y") => (event: ReactPointerEvent<HTMLDivElement>) => void;
};

const HIDDEN: OverlayThumb = { visible: false, size: 0, offset: 0 };

function thumbFor(track: number, viewport: number, content: number, scroll: number): OverlayThumb {
  // +1 guards against sub-pixel rounding reporting a phantom overflow.
  if (content <= viewport + 1) return HIDDEN;
  return { visible: true, size: (viewport / content) * track, offset: (scroll / content) * track };
}

/**
 * Drives a custom overlay scrollbar over a scroll container whose native bar is
 * hidden (so it reserves zero layout space). Returns a ref for the scrolling
 * viewport, the geometry for each axis' thumb, and a pointer-drag handler.
 */
export function useOverlayScrollbar(): OverlayScrollbar {
  const viewportRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [vertical, setVertical] = useState<OverlayThumb>(HIDDEN);
  const [horizontal, setHorizontal] = useState<OverlayThumb>(HIDDEN);

  const measure = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = viewportRef.current;
      if (!el) return;
      setVertical(thumbFor(el.clientHeight, el.clientHeight, el.scrollHeight, el.scrollTop));
      setHorizontal(thumbFor(el.clientWidth, el.clientWidth, el.scrollWidth, el.scrollLeft));
    });
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const onThumbPointerDown = useCallback(
    (axis: "x" | "y") => (event: ReactPointerEvent<HTMLDivElement>) => {
      const el = viewportRef.current;
      if (!el) return;
      event.preventDefault();

      const isVertical = axis === "y";
      const startPointer = isVertical ? event.clientY : event.clientX;
      const startScroll = isVertical ? el.scrollTop : el.scrollLeft;
      const track = isVertical ? el.clientHeight : el.clientWidth;
      const content = isVertical ? el.scrollHeight : el.scrollWidth;
      const ratio = content / track;

      const handleMove = (move: PointerEvent) => {
        const delta = (isVertical ? move.clientY : move.clientX) - startPointer;
        if (isVertical) el.scrollTop = startScroll + delta * ratio;
        else el.scrollLeft = startScroll + delta * ratio;
      };
      const handleUp = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      };
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    },
    []
  );

  return { viewportRef, vertical, horizontal, onThumbPointerDown };
}
