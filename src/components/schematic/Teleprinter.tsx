import type { CSSProperties, ElementType } from 'react';
import { usePrefersReducedMotion } from './useMediaQuery';

type TagName = 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'dd';

type Props = {
  text: string;
  as?: TagName;
  className?: string;
  /** ms between characters. */
  speed?: number;
  /** ms before the first character. */
  delay?: number;
  /** Gate the reveal (e.g. an `inView` flag). Defaults to true = animate on mount. */
  trigger?: boolean;
  /** Trailing blinking caret once typing finishes. */
  caret?: boolean;
};

/**
 * Discrete character-by-character text reveal — the teleprinter / label-maker
 * motion device. Fires once per mount when `trigger` becomes true; falls back
 * to plain static text under prefers-reduced-motion.
 */
export function Teleprinter({
  text,
  as: Tag = 'span',
  className,
  speed = 26,
  delay = 0,
  trigger = true,
  caret = true,
}: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const Component = Tag as ElementType;

  if (reduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const words = text.split(/(\s+)/);
  let charIndex = 0;

  return (
    <Component className={className}>
      <span className="visually-hidden">{text}</span>
      <span
        className={`teleprinter${trigger ? ' teleprinter--play' : ' teleprinter--pending'}`}
        aria-hidden="true"
      >
        {words.map((word, wordIndex) => {
          if (/^\s+$/.test(word)) {
            return (
              <span className="teleprinter__space" key={`s-${wordIndex}`}>
                {word}
              </span>
            );
          }

          return (
            <span className="teleprinter__word" key={`w-${wordIndex}`}>
              {Array.from(word).map((ch) => {
                const i = charIndex++;
                const style = {
                  animationDelay: `${delay + i * speed}ms`,
                } as CSSProperties;

                return (
                  <span
                    key={i}
                    className="teleprinter__char"
                    style={style}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );
        })}
        {caret ? (
          <span
            className="teleprinter__caret"
            style={
              {
                ['--teleprinter-caret-delay' as string]: `${delay + charIndex * speed}ms`,
              } as CSSProperties
            }
          />
        ) : null}
      </span>
    </Component>
  );
}
