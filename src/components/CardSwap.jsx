import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = forwardRef(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  // delay = 5000, // Removed delay prop
  // pauseOnHover = false, // Removed pauseOnHover prop
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}, ref) => { // Added ref
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  // const intervalRef = useRef(); // Removed intervalRef
  const container = useRef(null);

    const swap = () => {
      if (order.current.length < 2) return;
  
      // --- Critical change: Update order immediately ---
      const [front, ...rest] = order.current;
      order.current = [...rest, front]; // Update order FIRST
      // --- End Critical change ---
  
      tlRef.current?.kill(); // Kill any ongoing animation
      
      // Now use the *new* front card
      const elFront = refs[front].current; 
      const tl = gsap.timeline();
      tlRef.current = tl;
  
      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });
  
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });
  
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );
  
      // Removed: tl.call(() => { order.current = [...rest, front]; });
      // This part is now handled at the beginning of the function
    };
  useImperativeHandle(ref, () => ({
    swap: swap
  }));

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    // Initial placement only, no automatic swapping
    // swap(); // No initial swap here, let parent trigger
    // intervalRef.current = window.setInterval(swap, delay); // Removed automatic interval

    // Removed pauseOnHover logic since automatic animation is removed
    // if (pauseOnHover) {
    //   const node = container.current;
    //   const pause = () => {
    //     tlRef.current?.pause();
    //     clearInterval(intervalRef.current);
    //   };
    //   const resume = () => {
    //     tlRef.current?.play();
    //     intervalRef.current = window.setInterval(swap, delay);
    //   };
    //   node.addEventListener('mouseenter', pause);
    //   node.addEventListener('mouseleave', resume);
    //   return () => {
    //     node.removeEventListener('mouseenter', pause);
    //     node.removeEventListener('mouseleave', resume);
    //     clearInterval(intervalRef.current);
    //   };
    // }
    // return () => clearInterval(intervalRef.current); // Removed automatic interval cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, skewAmount, easing]); // Removed delay, pauseOnHover from dependencies

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
});

CardSwap.displayName = 'CardSwap'; // Added displayName

export default CardSwap;