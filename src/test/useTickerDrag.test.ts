import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, renderHook } from "@testing-library/react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { tickerX } from "@/atoms/tickerX";
import { useTickerDrag } from "@/hooks/useTickerDrag";
import { audio } from "@/lib/audio";
import { PIXELS_PER_SECOND, positionAt } from "@/lib/ticker";

const OFFSET = 1000;

const pointer = (pointerId: number, clientX: number) =>
  ({ pointerId, clientX, currentTarget: { setPointerCapture: vi.fn() } }) as unknown as ReactPointerEvent;

const setup = () => {
  const offsetRef = { current: OFFSET };
  const isDraggingRef = { current: false };
  const { result } = renderHook(() => useTickerDrag(offsetRef, isDraggingRef));
  return { ...result.current, isDraggingRef };
};

beforeEach(() => {
  Object.defineProperty(audio, "duration", { configurable: true, get: () => 120 });
  Object.defineProperty(audio, "currentTime", { configurable: true, writable: true, value: 10 });
  tickerX.set(positionAt(10, OFFSET));
});

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(audio, "duration");
  Reflect.deleteProperty(audio, "currentTime");
});

describe("useTickerDrag", () => {
  it("띠를 끈 만큼 재생 위치를 옮긴다", () => {
    const { handlePointerDown, handlePointerMove, handlePointerUp, isDraggingRef } = setup();

    handlePointerDown(pointer(1, 500));
    expect(isDraggingRef.current).toBe(true);
    handlePointerMove(pointer(1, 500 - PIXELS_PER_SECOND * 5));
    handlePointerUp(pointer(1, 500 - PIXELS_PER_SECOND * 5));

    expect(isDraggingRef.current).toBe(false);
    expect(audio.currentTime).toBeCloseTo(15);
  });

  it("드래그 중에 닿은 두 번째 손가락은 무시한다", () => {
    const { handlePointerDown, handlePointerMove, handlePointerUp, isDraggingRef } = setup();

    handlePointerDown(pointer(1, 500));
    handlePointerDown(pointer(2, 100));
    handlePointerMove(pointer(2, 900));
    handlePointerMove(pointer(1, 500 - PIXELS_PER_SECOND));
    handlePointerUp(pointer(2, 900));

    expect(isDraggingRef.current).toBe(true);

    handlePointerUp(pointer(1, 500 - PIXELS_PER_SECOND));

    expect(isDraggingRef.current).toBe(false);
    expect(audio.currentTime).toBeCloseTo(11);
  });

  it("드래그가 끝나면 다음 터치로 다시 드래그할 수 있다", () => {
    const { handlePointerDown, handlePointerUp, isDraggingRef } = setup();

    handlePointerDown(pointer(1, 500));
    handlePointerUp(pointer(1, 500));
    handlePointerDown(pointer(7, 300));

    expect(isDraggingRef.current).toBe(true);
  });
});
