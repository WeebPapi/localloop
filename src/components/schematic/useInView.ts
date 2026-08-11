import { useEffect, useRef, useState, type RefObject } from 'react';

type Options = {
  /** Root margin passed to IntersectionObserver. Defaults to a small lookahead. */
  rootMargin?: string;
  /** Intersection ratio required before counting as in view. */
  threshold?: number;
};

/**
 * Fires once the first time the element intersects the viewport.
 * Used to gate one-shot reveals (e.g. Teleprinter) as archive rows scroll in.
 */
export function useInView<T extends Element = HTMLElement>(
  options: Options = {},
): [RefObject<T | null>, boolean] {
  const { rootMargin = '0px 0px -8% 0px', threshold = 0.15 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold]);

  return [ref, inView];
}
