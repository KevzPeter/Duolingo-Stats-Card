import { useRef } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { AnimationPlacement, animationLayout, CARD_WIDTH } from '../utils/animation-layout';
import { DuoAnimation, selectDuoAnimation } from '../utils/animations';
import styles from '../styles/Home.module.scss';

interface Props {
  animation?: DuoAnimation;
  height: number;
  placement?: Partial<AnimationPlacement>;
  onChange: (placement: AnimationPlacement) => void;
}

export default function AnimationEditor({ animation, height, placement, onChange }: Readonly<Props>) {
  const gesture = useRef<{ pointer: number; x: number; y: number; scale: number; start: AnimationPlacement; resize: boolean } | null>(null);
  const layout = animationLayout(placement);
  const selectedAnimation = selectDuoAnimation(animation);
  const ratio = selectedAnimation.height / selectedAnimation.width;

  function begin(event: PointerEvent<HTMLButtonElement>, resize: boolean) {
    if (event.button !== 0) return;
    const bounds = event.currentTarget.parentElement.parentElement.getBoundingClientRect();
    if (!bounds.width) return;
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, scale: CARD_WIDTH / bounds.width, start: layout, resize };
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const current = gesture.current;
    if (!current || event.pointerId !== current.pointer) return;
    const dx = (event.clientX - current.x) * current.scale;
    const dy = (event.clientY - current.y) * current.scale;
    const next = current.resize
      ? { ...current.start, size: current.start.size + (dx + dy * ratio) / (1 + ratio ** 2) }
      : { ...current.start, x: current.start.x + dx, y: current.start.y + dy };
    onChange(animationLayout(next));
  }

  function keyboard(event: KeyboardEvent<HTMLButtonElement>, resize: boolean) {
    const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const step = event.shiftKey ? 10 : 1;
    onChange(animationLayout(resize
      ? { ...layout, size: layout.size + (direction[0] + direction[1]) * step }
      : { ...layout, x: layout.x + direction[0] * step, y: layout.y + direction[1] * step }));
  }

  const pointerHandlers = {
    onPointerMove: move,
    onPointerUp: () => { gesture.current = null; },
    onPointerCancel: () => { gesture.current = null; },
    onLostPointerCapture: () => { gesture.current = null; },
  };

  return <div className={styles.animationEditor} style={{ left: `${layout.x / CARD_WIDTH * 100}%`, top: `${layout.y / height * 100}%`, width: `${layout.size / CARD_WIDTH * 100}%`, height: `${layout.size * ratio / height * 100}%` }}>
    <button type="button" className={styles.animationDrag} aria-label="Move Duo animation. Use arrow keys to move; hold Shift for larger steps." title="Drag to move Duo" onPointerDown={event => begin(event, false)} onKeyDown={event => keyboard(event, false)} {...pointerHandlers}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={'/webp/' + selectedAnimation.file} alt="Duo" draggable={false} />
    </button>
    <button type="button" className={styles.animationResize} aria-label="Resize Duo animation. Use arrow keys to resize; hold Shift for larger steps." title="Drag to resize Duo" onPointerDown={event => begin(event, true)} onKeyDown={event => keyboard(event, true)} {...pointerHandlers} />
  </div>;
}
