import { useRef } from 'react';

const GlareHover = ({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style = {}
}) => {
  const overlayRef = useRef(null);

  // Convert hex to rgba
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%';
    requestAnimationFrame(() => {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = '100% 100%';
    });
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;

    if (playOnce) {
      el.style.transition = 'none';
      el.style.backgroundPosition = '-100% -100%';
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = '-100% -100%';
    }
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: `linear-gradient(${glareAngle}deg, 
      rgba(255,255,255,0) 60%, 
      ${rgba} 70%, 
      rgba(255,255,255,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%',
    borderRadius: 'inherit', // match child border radius
  };

  return (
    <div
      className={`relative overflow-hidden h-fit ${className}`}
      style={{ ...style }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      {children}
      <div ref={overlayRef} style={overlayStyle} />
    </div>
  );
};

export default GlareHover;
