import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef<HTMLDivElement, any>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: any, slot: any, skew: number) =>
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

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  controlledIndex,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}: any) => {
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
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const isInitialLayout = useRef(true);

  // Initial Placement
  useEffect(() => {
    if (isInitialLayout.current) {
      const total = refs.length;
      refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));
      isInitialLayout.current = false;
    }
  }, [refs, cardDistance, verticalDistance, skewAmount]);

  const swapTo = (targetIndex: number) => {
    const currentPos = order.current.indexOf(targetIndex);
    if (currentPos === 0 || currentPos === -1) return;

    if (tlRef.current) {
      tlRef.current.kill(); // Stop any ongoing animation
    }

    const movingToBack = order.current.slice(0, currentPos);
    const movingForward = order.current.slice(currentPos);
    
    const tl = gsap.timeline();
    tlRef.current = tl;

    // 1. Drop cards that are moving to the back
    movingToBack.forEach((idx) => {
      const el = refs[idx].current;
      tl.to(el, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      }, 0);
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);

    // 2. Move remaining cards forward
    movingForward.forEach((idx, newI) => {
      const el = refs[idx].current;
      const slot = makeSlot(newI, cardDistance, verticalDistance, refs.length);
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
        `promote+=${newI * 0.15}`
      );
    });

    const backSlotStart = movingForward.length;
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);

    // 3. Return the dropped cards to the back slots
    movingToBack.forEach((idx, offset) => {
      const el = refs[idx].current;
      const newI = backSlotStart + offset;
      const backSlot = makeSlot(newI, cardDistance, verticalDistance, refs.length);
      
      tl.call(
        () => {
          gsap.set(el, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        el,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );
    });

    tl.call(() => {
      order.current = [...movingForward, ...movingToBack];
    });
  };

  useEffect(() => {
    if (controlledIndex !== undefined && order.current[0] !== controlledIndex) {
      swapTo(controlledIndex);
    }
  }, [controlledIndex]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...((child as any).props.style ?? {}) },
          onClick: (e: any) => {
            (child as any).props.onClick?.(e);
            onCardClick?.(i);
          }
        } as any)
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
