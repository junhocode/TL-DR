import { describe, expect, it } from "vitest";
import { PIXELS_PER_SECOND, offsetFor, positionAt, seekTimeFor, wrapPosition } from "@/lib/ticker";

describe("wrapPosition", () => {
  it("이미지 폭을 모르면 0을 돌려준다", () => {
    expect(wrapPosition(123, 0)).toBe(0);
  });

  it("결과는 항상 이미지 한 장 폭 안(-폭 < x <= 0)에 있다", () => {
    for (const x of [-1000, -150, -1, 0, 1, 99, 100, 2500]) {
      const wrapped = wrapPosition(x, 100);
      expect(wrapped).toBeGreaterThan(-100);
      expect(wrapped).toBeLessThanOrEqual(0);
    }
  });

  it("이미지 한 장 폭만큼 차이 나는 위치는 같은 자리로 보인다", () => {
    expect(wrapPosition(37, 100)).toBe(wrapPosition(137, 100));
    expect(wrapPosition(-63, 100)).toBe(wrapPosition(-163, 100));
  });
});

describe("positionAt / offsetFor", () => {
  it("재생 1초마다 띠가 PIXELS_PER_SECOND만큼 왼쪽으로 간다", () => {
    expect(positionAt(0, 500) - positionAt(1, 500)).toBe(PIXELS_PER_SECOND);
  });

  it("offsetFor로 잡은 기준점은 지금 위치를 그대로 유지한다", () => {
    const x = -321;
    const time = 42.5;
    expect(positionAt(time, offsetFor(x, time))).toBeCloseTo(x);
  });
});

describe("seekTimeFor", () => {
  const offset = 1000;
  const duration = 120;

  it("띠를 끈 거리만큼 재생 위치가 바뀐다", () => {
    const x = positionAt(30, offset);
    expect(seekTimeFor(x, offset, duration)).toBeCloseTo(30);
    expect(seekTimeFor(x - PIXELS_PER_SECOND * 5, offset, duration)).toBeCloseTo(35);
  });

  it("곡 시작보다 앞으로 되감으면 곡 끝이 아니라 0초에 멈춘다", () => {
    const x = positionAt(1, offset) + PIXELS_PER_SECOND * 4;
    expect(seekTimeFor(x, offset, duration)).toBe(0);
  });

  it("곡 끝 너머로 감으면 곡 길이에서 멈춘다", () => {
    const x = positionAt(duration - 1, offset) - PIXELS_PER_SECOND * 4;
    expect(seekTimeFor(x, offset, duration)).toBe(duration);
  });
});
