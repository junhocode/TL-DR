const BASE_SPEED = 0.8;
const FPS = 60;

export const PIXELS_PER_SECOND = BASE_SPEED * FPS;
export const COAST_DECEL = 0.97;

export const wrapPosition = (x: number, unitWidth: number) =>
  unitWidth === 0 ? 0 : ((x % unitWidth) - unitWidth) % unitWidth;

export const positionAt = (time: number, offset: number) => offset - time * PIXELS_PER_SECOND;

export const offsetFor = (x: number, time: number) => x + time * PIXELS_PER_SECOND;

export const seekTimeFor = (x: number, offset: number, duration: number) =>
  Math.min(Math.max((offset - x) / PIXELS_PER_SECOND, 0), duration);
