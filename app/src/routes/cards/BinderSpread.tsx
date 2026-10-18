import { useRef } from "react";
import type { Card } from "../../data/schema";
import { PAGE_SIZE } from "../../data/paging";
import { BinderPage } from "./BinderPage";
import { Rings } from "../../ui/Rings";

const SWIPE_DISTANCE = 60;

type Props = {
  left: Card[];
  right: Card[];
  page: number;
  onSwipe: (direction: 1 | -1) => void;
};

export function BinderSpread({ left, right, page, onSwipe }: Props) {
  const swipeStart = useRef<number | null>(null);
  const firstIndex = (page - 1) * PAGE_SIZE;

  return (
    <div
      className="relative touch-pan-y [view-transition-name:binder-page] lg:grid lg:grid-cols-2 lg:gap-[22px]"
      onPointerDown={(event) => {
        swipeStart.current = event.pointerType === "mouse" ? null : event.clientX;
      }}
      onPointerUp={(event) => {
        if (swipeStart.current === null) return;
        const distance = event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(distance) > SWIPE_DISTANCE) onSwipe(distance < 0 ? 1 : -1);
      }}
      onPointerCancel={() => {
        swipeStart.current = null;
      }}
    >
      <Rings />
      <BinderPage cards={left} firstIndex={firstIndex} />
      <BinderPage cards={right} firstIndex={firstIndex + PAGE_SIZE} className="hidden lg:grid" />
    </div>
  );
}
