import { useRef, useEffect, useState, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = forwardRef(({
  text,
  className = '',
  delay = 0.1,            // seconds between characters
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',    // 'chars', 'words', 'lines'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}, ref) => {

  const localRef = useRef(null);
  const animationCompletedRef = useRef(false);
  const elRef = ref || localRef;

  useEffect(() => {
    if (!elRef.current || !text) return;
    const el = elRef.current;

    // Cleanup previous split
    if (el._splitInstance) {
      try { el._splitInstance.revert(); } catch (_) {}
      el._splitInstance = null;
    }

    const startPct = (1 - threshold) * 100;
    const start = `top ${startPct}%`;

    // Create GSAP SplitText instance
    const splitInstance = new GSAPSplitText(el, {
      type: splitType,
      charsClass: 'split-char',
      wordsClass: 'split-word',
      linesClass: 'split-line',
      smartWrap: true,
      autoSplit: true
    });

    const targets = splitType.includes('chars') ? splitInstance.chars :
                    splitType.includes('words') ? splitInstance.words :
                    splitInstance.lines;

    gsap.fromTo(targets,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay,
        scrollTrigger: {
          trigger: el,
          start,
          once: true
        },
        onComplete: () => {
          animationCompletedRef.current = true;
          onLetterAnimationComplete?.();
        },
        force3D: true,
        willChange: 'transform, opacity'
      }
    );

    el._splitInstance = splitInstance;

    return () => {
      try { splitInstance.revert(); } catch (_) {}
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
      el._splitInstance = null;
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onLetterAnimationComplete, elRef]);

  const renderTag = () => {
    const style = { textAlign, wordWrap: 'break-word', willChange: 'transform, opacity' };
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;

    switch(tag) {
      case 'h1': return <h1 ref={elRef} style={style} className={classes}>{text}</h1>;
      case 'h2': return <h2 ref={elRef} style={style} className={classes}>{text}</h2>;
      case 'h3': return <h3 ref={elRef} style={style} className={classes}>{text}</h3>;
      case 'h4': return <h4 ref={elRef} style={style} className={classes}>{text}</h4>;
      case 'h5': return <h5 ref={elRef} style={style} className={classes}>{text}</h5>;
      case 'h6': return <h6 ref={elRef} style={style} className={classes}>{text}</h6>;
      default: return <p ref={elRef} style={style} className={classes}>{text}</p>;
    }
  };

  return renderTag();
});

export default SplitText;
